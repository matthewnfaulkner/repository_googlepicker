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
define(['core/log'], function(Log) {
    'use strict';

    /**
     * Initialise the Google Picker flow.
     *
     * @param {string} clientid Google OAuth client ID.
     * @param {string} apikey Google API key.
     * @param {string} appid Google App ID (project number).
     */
    function init(clientid, apikey, appid) {
        Log.debug(clientid, apikey, appid);
        const CLIENT_ID = clientid;
        const API_KEY   = apikey;
        const APP_ID    = appid;
        const DEVELOPER_KEY = API_KEY;

        let oauthToken = null;
        let pickerApiLoaded = false;

        /**
         * Called when the Google Auth API is loaded.
         * Triggers authentication to retrieve OAuth token.
         */
        function onAuthApiLoad() {
            Log.debug(CLIENT_ID);
            gapi.auth.authorize(
                {
                    client_id: CLIENT_ID,
                    scope: ['https://www.googleapis.com/auth/drive.file'],
                    immediate: false
                },
                handleAuthResult
            );
        }

        /**
         * Callback from Google Auth with auth result.
         *
         * @param {Object} authResult The result returned by gapi.auth.authorize.
         */
        function handleAuthResult(authResult) {
            if (authResult && !authResult.error) {
                Log.debug(authResult);
                oauthToken = authResult.access_token;
                createPicker();
            } else {
                Log.debug('Google Picker auth failed: ' + JSON.stringify(authResult));
            }
        }

        /**
         * Called when the Google Picker API is loaded.
         */
        function onPickerApiLoad() {
            pickerApiLoaded = true;
        }

        /**
         * Builds and shows the Google File Picker.
         */
        function createPicker() {
            Log.debug(pickerApiLoaded);
            Log.debug(oauthToken);
            if (pickerApiLoaded && oauthToken) {
                const view = new google.picker.DocsView()
                    .setIncludeFolders(true)
                    .setSelectFolderEnabled(true);

                const picker = new google.picker.PickerBuilder()
                    .enableFeature(google.picker.Feature.NAV_HIDDEN)
                    .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
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
         * Callback when a file is picked.
         *
         * @param {Object} data Picker response data.
         */
        function pickerCallback(data) {
            if (data.action === google.picker.Action.PICKED) {
                const doc = data.docs[0];
                Log.debug('Picked file: ' + JSON.stringify(doc));

                // TODO: Call Moodle filepicker API here, e.g.:
                // window.parent.M.core_filepicker.select_file(doc);
            }
        }

        // Load Google APIs
        gapi.load('auth', {'callback': onAuthApiLoad});
        gapi.load('picker', {'callback': onPickerApiLoad});
    }

    return { init: init };
});
