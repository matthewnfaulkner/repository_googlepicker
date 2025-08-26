// This file is part of Moodle - https://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Google picker js
 *
 * @copyright   2025 Matthew<matthewfaulkner@apoaevents.com>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/* global gapi, google */
define(['core/log', 'core/str'], function(Log, String) {
    'use strict';

    /**
     * Initialise the Google Picker flow.
     *
     * @param {string} token Google OAuth client ID.
     * @param {string} apikey Google API key.
     * @param {string} appid Google App ID (project number).
     * @param {string} sesskey session key.
     * @param {string} secret secret key.
     * @param {string} mimetypes restrict to these mimetypes
     */
    function init(token, apikey, appid, sesskey, secret, mimetypes) {
        const API_KEY   = apikey;
        const APP_ID    = appid;
        const DEVELOPER_KEY = API_KEY;
        const SESSKEY = sesskey;
        const SECRET = secret;
        const MIMETYPES = mimetypes;

        let oauthToken = token;
        let pickerApiLoaded = false;

        /**
         * Called when the Google Picker API is loaded.
         */
        function onPickerApiLoad() {
            pickerApiLoaded = true;
            createPicker();
        }

        /**
         *  Performs hash on source for checksum
         *
         * @param {string} input
         * @returns
         */
        async function sha1(input) {
            const encoder = new TextEncoder();
            const data = encoder.encode(input);
            const hashBuffer = await crypto.subtle.digest('SHA-1', data);
            const hashArray= Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        }

        /**
         * Builds and shows the Google File Picker.
         */
        function createPicker() {
            if (pickerApiLoaded && oauthToken) {
                const view = new google.picker.DocsView()
                    .setIncludeFolders(false)
                    .setSelectFolderEnabled(false);

                if (MIMETYPES) {
                    view.setMimeTypes(MIMETYPES);
                }

                const picker = new google.picker.PickerBuilder()
                    .enableFeature(google.picker.Feature.NAV_HIDDEN)
                    .enableFeature(google.picker.Feature.MULTISELECT_DISABLED)
                    .setAppId(APP_ID)
                    .setOAuthToken(oauthToken)
                    .setDeveloperKey(DEVELOPER_KEY)
                    .addView(view)
                    .setCallback(pickerCallback)
                    .build();

                picker.setVisible(true);
            }
        }

        /**
         * Checks file mimetype is one of valid types.
         *
         * @param {string} mimeType
         * @returns {boolean} whether mimetype is valid
         */
        function validateMimeType(mimeType) {

            Log.debug(mimeType, MIMETYPES);
            if (!MIMETYPES) {
                return true;
            }
            const mimeTypeArray = MIMETYPES.split(',').map(s => s.trim());
            return mimeTypeArray.includes(mimeType);
        }

        /**
         * Callback when a file is picked.
         *
         * @param {Object} data Picker response data.
         */
        function pickerCallback(data) {

            if (data.action === google.picker.Action.PICKED) {
                const doc = data.docs[0];

                if(!validateMimeType(doc.mimeType)) {
                    return String.get_string("invalidfiletype", "repository_googlepicker")
                        .done(function(s) {
                            window.parent.M.core_filepicker.active_filepicker.display_error(s);
                        });
                }
                doc.exportformat = 'download';
                sha1(JSON.stringify(doc) + SECRET + SESSKEY).then(function(hash){
                    var resource = {};
                    resource.title = doc.name;
                    resource.source = JSON.stringify(doc);
                    resource.sourcekey = hash;
                    resource.thumbnail = doc.iconUrl;
                    resource.author = '';
                    resource.license = "";
                    window.parent.M.core_filepicker.select_file(resource);
                });
            }
        }

        gapi.load('picker', {'callback': onPickerApiLoad});
    }

    return { init: init };
});
