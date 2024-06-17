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

class mod_interactive_mapInstallerScript
{
    public function postflight($type, $parent)
	{
		
		if ($type == 'install') {
			
			echo '<p>Your map is ready to be used ! <br> Follow the documentation we sent you to use it.</p>' . '<img height="150px" width="300px" src="/modules/mod_interactive_map/assets/images/Logo-Karma.png"/>';

			$db = JFactory::getDbo();
			// Search for the module
			$query = $db->getQuery(true)
						->select($db->quoteName('extension_id'))
						->from($db->quoteName('#__extensions'))
						->where($db->quoteName('type') . ' = ' . $db->quote('module'))
						->where($db->quoteName('element') . ' = ' . $db->quote('mod_interactive_map'));
			$db->setQuery($query);
			$extentionID = $db->loadResult();
			
			// if the module is found put the position to status and publish it
			if ($extentionID) {
				
				$query = $db->getQuery(true)
							->select($db->quoteName('id'))
							->from($db->quoteName('#__modules'))
							->where($db->quoteName('module') . ' = ' . $db->quote('mod_interactive_map'));
				$db->setQuery($query);
				$moduleId = $db->loadResult();
				
				$query = $db->getQuery(true)
							->update($db->quoteName('#__modules'))
							->set($db->quoteName('published') . ' = 1') 
                            ->set($db->quoteName('title') . ' = ' . $db->quote('Interactive Map'))
							->set($db->quoteName('position') . ' = ' . $db->quote('interactive-map')) 
							->set($db->quoteName('showtitle') . ' = 0')
							->where($db->quoteName('module') . ' = ' . $db->quote('mod_interactive_map'));
				$db->setQuery($query);
				$db->execute();
				
				// Add the module to all pages
				$query = $db->getQuery(true)
							->delete($db->quoteName('#__modules_menu'))
							->where($db->quoteName('moduleid') . ' = ' . $db->quote($moduleId));
				$db->setQuery($query);
				$db->execute();
	
				$query = $db->getQuery(true)
							->insert($db->quoteName('#__modules_menu'))
							->columns(array($db->quoteName('moduleid'), $db->quoteName('menuid')))
							->values(implode(',', array($db->quote($moduleId), $db->quote(0)))); // 0 for all pages
				$db->setQuery($query);
				$db->execute();
				
			}
		}
		
		if ($type == 'update') {
			echo '<p>Module updated, you are ready to go !</p>';
		}
	
        
		
	}

    public function uninstall($parent)
	{
		
		// Set db if not set already.
		if (!isset($db))
		{
			$db = JFactory::getDbo();
		}
		// Set app if not set already.
		if (!isset($app))
		{
			$app = JFactory::getApplication();
		}
		// Remove darklight from the action_logs_extensions table
		$darklight_action_logs_extensions = array( $db->quoteName('extension') . ' = ' . $db->quote('mod_interactive_map') );
		// Create a new query object.
		$query = $db->getQuery(true);
		$query->delete($db->quoteName('#__action_logs_extensions'));
		$query->where(darklight_action_logs_extensions);
		$db->setQuery($query);
		// Execute the query to remove Cookix
		$darklight_removed_done = $db->execute();
		if ($darklight_removed_done)
		{
			// If successfully remove Cookix add queued success message.
			$app->enqueueMessage(JText::_('The mod_interactive_map extension was removed from the <b>#__action_logs_extensions</b> table'));
		}

		// Set db if not set already.
		if (!isset($db))
		{
			$db = JFactory::getDbo();
		}
		// Set app if not set already.
		if (!isset($app))
		{
			$app = JFactory::getApplication();
		}
		// Remove $darklight Service from the action_log_config table
		$service_action_log_config = array( $db->quoteName('type_alias') . ' = '. $db->quote('mod_interactive_map.service') );
		// Create a new query object.
		$query = $db->getQuery(true);
		$query->delete($db->quoteName('#__action_log_config'));
		$query->where($service_action_log_config);
		$db->setQuery($query);
		// Execute the query to remove com_cookix.service
		$service_action_log_config_done = $db->execute();
		if ($service_action_log_config_done)
		{
			// If successfully removed Cookix Service add queued success message.
			$app->enqueueMessage(JText::_('The mod_interactive_map.service type alias was removed from the <b>#__action_log_config</b> table'));
		}

		// Set db if not set already.
		if (!isset($db))
		{
			$db = JFactory::getDbo();
		}
		// Set app if not set already.
		if (!isset($app))
		{
			$app = JFactory::getApplication();
		}
		// Remove $darklight Var from the action_log_config table
		$var_action_log_config = array( $db->quoteName('type_alias') . ' = '. $db->quote('mod_interactive_map.var') );
		// Create a new query object.
		$query = $db->getQuery(true);
		$query->delete($db->quoteName('#__action_log_config'));
		$query->where($var_action_log_config);
		$db->setQuery($query);
		// Execute the query to remove com_cookix.var
		$var_action_log_config_done = $db->execute();
		if ($var_action_log_config_done)
		{
			// If successfully removed Cookix Var add queued success message.
			$app->enqueueMessage(JText::_('The mod_interactive_map.var type alias was removed from the <b>#__action_log_config</b> table'));
		}

		// Set db if not set already.
		if (!isset($db))
		{
			$db = JFactory::getDbo();
		}
		// Set app if not set already.
		if (!isset($app))
		{
			$app = JFactory::getApplication();
		}
		// Remove $darklight Action from the action_log_config table
		$action_action_log_config = array( $db->quoteName('type_alias') . ' = '. $db->quote('mod_interactive_map.action') );
		// Create a new query object.
		$query = $db->getQuery(true);
		$query->delete($db->quoteName('#__action_log_config'));
		$query->where($action_action_log_config);
		$db->setQuery($query);
		// Execute the query to remove com_cookix.action
		$action_action_log_config_done = $db->execute();
		if ($action_action_log_config_done)
		{
			// If successfully removed Cookix Action add queued success message.
			$app->enqueueMessage(JText::_('The mod_interactive_map.action type alias was removed from the <b>#__action_log_config</b> table'));
		}


}
}