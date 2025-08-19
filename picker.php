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
 * Google picker plugin
 *
 * @package     repository_googlepicker
 * @copyright   2025 Matthew<matthewfaulkner@apoaevents.com>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

use core\plugininfo\repository;

require_once('../../config.php');
require_once('lib.php');

$repoid = required_param('repoid',PARAM_INT);
$ctx = required_param('ctx', PARAM_INT);
require_login();

$PAGE->set_url(new moodle_url('/repository/gpicker/picker.php'));
$PAGE->set_context(context_system::instance());
$PAGE->set_pagelayout('popup');

echo $OUTPUT->header();

$repo = new repository_googlepicker($repoid, $ctx);

$repo->initialise_picker();

$OUTPUT->single_button('', 'Open Picker', '');

echo $OUTPUT->footer();