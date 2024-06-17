<?php
/*-----------------------------------------------------------------------------------------------------/
	@version		1.2.0
	@build			15th March, 2024
	@created		15th March, 2024
	@package		Darklight
	@subpackage		script.php
	@author			Louis Patachon - Agence Agerix <https://www.agerix.fr>
	@copyright		Copyright (C) 2023. All Rights Reserved
	@license		GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html
	  __    ___  ____  __ _   ___  ____     __    ___  ____  ____  __  _  _
	 / _\  / __)(  __)(  ( \ / __)(  __)   / _\  / __)(  __)(  _ \(  )( \/ )
	/    \( (_ \ ) _) /    /( (__  ) _)   /    \( (_ \ ) _)  )   / )(  )  (
	\_/\_/ \___/(____)\_)__) \___)(____)  \_/\_/ \___/(____)(__\_)(__)(_/\_)
/------------------------------------------------------------------------------------------------------*/

defined('_JEXEC') or die;

// Load the JSON data
$jsonFile = JModuleHelper::getLayoutPath('mod_interactive_map', 'assets/countries.json');
$jsonData = file_get_contents($jsonFile);
$countries = json_decode($jsonData, true);

// Add CSS and JS
$doc = JFactory::getDocument();
$doc->addStyleSheet(JUri::root() . 'modules/mod_interactive_map/assets/css/map.css');
$doc->addScript(JUri::root() . 'modules/mod_interactive_map/assets/js/map.js');

// Render the layout
require JModuleHelper::getLayoutPath('mod_interactive_map', 'default');
