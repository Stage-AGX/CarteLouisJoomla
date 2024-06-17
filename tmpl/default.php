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

// Load the SVG content
$svgFile = __DIR__ . '/../assets/map.svg';
$svgContent = file_get_contents($svgFile);
?>
<div class="text-top">
    <h1>CER MEMBERS TICKETING MAP</h1>
    <p>Select a country to see to which countries online tickets are available, ensuring cross-border connections and more:</p>
</div>
<div class="full-container">
    <div class="main-container">
        <div class="half-circle-background">
            <div class="infos-blocks">
                <div class="info-block available">
                    <span class="status-icon available"></span>
                    Available online ticketing from the selected country
                </div>
                <div class="info-block unavailable">
                    <span class="status-icon unavailable"></span>
                    Unavailable online ticketing from the selected country
                </div>
            </div>
        </div>
    </div>
    <div class="content-wrapper">
        <div class="map-container">
            <div id="interactive-map" class="map-svg">
                <?php echo $svgContent; ?>
            </div>
            <div id="popup" class="popup hidden">
                <div class="popup-content">
                    <h2 id="popup-country">Country Name</h2>
                    <p id="popup-company-desc">Railway Company Name</p>
                    <p id="popup-company-name">Company Name</p>
                    <a id="popup-link" class="popup-link" href="#">LINK TO WEBSITE</a>
                </div>
            </div>
            <svg id="popup-line-svg">
                <line id="popup-line" x1="0" y1="0" x2="0" y2="0" stroke="#005FAA" stroke-width="2"></line>
            </svg>
        </div>
        <p id="click-text"><span class="info-icon">i</span>Click on a country</p>
    </div>
</div>


