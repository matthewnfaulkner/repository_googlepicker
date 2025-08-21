<?php
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
 * Plugin strings are defined here.
 *
 * @package     repository_googlepicker
 * @category    string
 * @copyright   2025 Matthew<matthewfaulkner@apoaevents.com>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$string['googlepicker:view'] = 'View Google Picker Repository';
$string['pluginname'] = 'Google Picker Repository';
$string['invalidfiletype'] = 'Invalid file type';

$string['pickerapikey'] = 'Google Picker API Key';
$string['pickerapikey_help'] = 'Enter your google cloud API key. 
        <a href="https://developers.google.com/workspace/drive/picker/guides/overview#create-api-key">
            How to get an API key
        </a>';
$string['nopickerapikey'] = 'No Google Cloud API Key set';
$string['appid'] = 'Oauth2 App ID';
$string['docsformat'] = 'Default document import format';
$string['drawingformat'] = 'Default drawing import format';
$string['googledocs:view'] = 'View Google Drive repository';
$string['importformat'] = 'Configure the default import formats from Google';
$string['mydrive'] = 'My Drive';
$string['pluginname'] = 'Google Drive';
$string['presentationformat'] = 'Default presentation import format';
$string['shareddrives'] = 'Shared Drives';
$string['spreadsheetformat'] = 'Default spreadsheet import format';
$string['issuer'] = 'OAuth 2 service';
$string['issuer_help'] = 'Select the OAuth 2 service that is configured to talk to the Google Drive API. If the service does not exist yet, you will need to create it.';
$string['servicenotenabled'] = 'Access not configured. Make sure the service \'Drive API\' is enabled.';
$string['oauth2serviceslink'] = '<a href="{$a}" title="Link to OAuth 2 services configuration">OAuth 2 services configuration</a>';
$string['searchfor'] = 'Search results for:';
$string['internal'] = 'Internal (files stored in Moodle)';
$string['external'] = 'External (only links stored in Moodle)';
$string['both'] = 'Internal and external';
$string['supportedreturntypes'] = 'Supported files';
$string['defaultreturntype'] = 'Default return type';
$string['fileoptions'] = 'The types and defaults for returned files is configurable here. Note that all files linked externally will be updated so that the owner is the Moodle system account.';
$string['owner'] = 'Owned by: {$a}';
$string['cachedef_folder'] = 'Google file IDs for folders in the system account';
$string['privacy:metadata:repository_googlepicker'] = 'The Google Picker repository plugin does not store any personal data, but does transmit user data from Moodle to the remote system.';
$string['privacy:metadata:repository_googlepicker:email'] = 'The email of the Google Drive repository user.';
$string['privacy:metadata:repository_googlepicker:searchtext'] = 'The Google Drive repository user search text query.';