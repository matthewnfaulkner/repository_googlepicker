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
 * Google Picker cache definitions
 *
 * @package     repository_googlepicker
 * @category    access
 * @copyright   2025 Matthew<matthewfaulkner@apoaevents.com>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

$definitions = array(

    // Used to store file ids for folders.
    // The keys used are full path to the folder, the values are the id in google drive.
    // The static acceleration size has been based upon the depths of a single path.
    'folder' => array(
        'mode' => cache_store::MODE_APPLICATION,
        'simplekeys' => false,
        'simpledata' => true,
        'staticacceleration' => true,
        'staticaccelerationsize' => 10,
        'canuselocalstore' => true
    ),
);
