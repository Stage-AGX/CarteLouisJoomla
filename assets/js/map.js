document.addEventListener("DOMContentLoaded", function () {
    //on window resize, reload page
    window.onresize = function () {
      location.reload();
    };
  
    // Define country names and their corresponding codes
    const countryNames = {
      ALBA: "Albania",
      AUSTRIA: "Austria",
      BEL: "Belgium",
      BOSNIA: "Bosnia and Herzegovina",
      BULGARIA: "Bulgaria",
      CROATIA: "Croatia",
      REPCZ: "Czechia",
      DAN: "Denmark",
      FINLAND: "Finland",
      FRANCE: "France",
      DEU: "Germany",
      GREECE: "Greece",
      HUNGARY: "Hungary",
      IRELAND: "Ireland",
      ITALY: "Italy",
      LITHUANIA: "Lithuania",
      LUX: "Luxembourg",
      NETH: "Netherlands",
      MECEDONIA: "North Macedonia",
      NORWAY: "Norway",
      POLAND: "Poland",
      PORTUGAL: "Portugal",
      ROMANIA: "Romania",
      SERBIA: "Serbia",
      SLOVAKIA: "Slovakia",
      SLOVENIA: "Slovenia",
      SPAIN: "Spain",
      SWEDEN: "Sweden",
      SWI: "Switzerland",
      UK: "UK",
      UKRAIN: "Ukraine",
    };
  
    // Create an object with country codes as keys and country names as values
    const countryCodes = Object.fromEntries(
      Object.entries(countryNames).map(([key, value]) => [value, key])
    );
  
    // Define start offsets for specific countries
    const croatiaStartOffsets = { x: 0, y: -18 };
    const finlandStartOffsets = { x: 15, y: 28 };
    const swedenStartOffsets = { x: -20, y: 0 };
    const austriaStartOffsets = { x: 20, y: 0 };
    const greeceStartOffsets = { x: -25, y: -18 };
    const italyStartOffsets = { x: 20, y: 0 };
  
    // Function to calculate the position of the popup based on screen size
    function getPopupPosition() {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
  
      let popupTargetX, popupTargetY;
  
      // Example logic to adjust position based on screen size
      if (screenWidth >= 2560) {
        popupTargetX = 120; // for large screens
        popupTargetY = 20;
      } else if (screenWidth < 1664 && screenWidth >= 1070) {
        popupTargetX = -5; // for small screens
        popupTargetY = 30;
      } else if (screenWidth < 1070) {
        popupTargetX = -5;
        popupTargetY = 10;
      } else if (screenWidth <= 2559 && screenWidth >= 1664) {
        popupTargetX = 80; // for medium screens
        popupTargetY = 50;
      }
  
      return { x: popupTargetX, y: popupTargetY };
    }
  
    // Get references to DOM elements
    const paths = document.querySelectorAll("#interactive-map path");
    const popup = document.getElementById("popup");
    const popupCountry = document.getElementById("popup-country");
    const popupCompanyName = document.getElementById("popup-company-name");
    const popupCompanyDesc = document.getElementById("popup-company-desc");
    const popupLink = document.getElementById("popup-link");
    const popupLine = document.getElementById("popup-line");
    const lineDotOuter = document.getElementById("line-outer-circle");
    const lineDotInner = document.getElementById("line-inner-dot");
    let countrySelected = false;
  
    // Add event listeners to each path element
    paths.forEach((path) => {
      // Set initial styles for each path
      path.style.fill = "#D3E8EF";
      path.style.stroke = "#74A2C1";
  
      // Event listener for mouseover event
      path.addEventListener("mouseover", function () {
        const countryId = path.id;
  
        // Fetch country data from JSON file
        fetch("/modules/mod_interactive_map/assets/js/countries.json")
          .then((response) => response.json())
          .then((data) => {
            const countryName = countryNames[countryId];
  
            if (!countrySelected && data[countryName]) {
              // Change styles for all paths except the current one
              paths.forEach((p) => {
                if (p !== path) {
                  p.style.fill = "#E9F1F4";
                  p.style.stroke = "#AAC6D6";
                }
              });
            }
            if (!data[countryName] && !countrySelected) {
              // Reset styles for the current path
              path.style.fill = "#D3E8EF";
              path.style.stroke = "#74A2C1";
            }
          })
          .catch((error) => {
            console.error(error);
          });
      });
  
      // Event listener for mouseout event
      path.addEventListener("mouseout", function () {
        if (!countrySelected) {
          // Reset styles for all paths
          paths.forEach((p) => {
            p.style.fill = "#D3E8EF";
            p.style.stroke = "#74A2C1";
          });
        }
      });
  
      // Event listener for click event
      path.addEventListener("click", function (event) {
        const countryId = path.id;
  
        // Hide all dots/lines
        lineDotOuter.classList.add("hidden");
        lineDotInner.classList.add("hidden");
  
        // Hide all lines
        document.querySelectorAll(".line").forEach((line) => {
          line.classList.add("hidden");
        });
  
        // Hide the popup
        popup.classList.add("hidden");
        
        // Reset styles for all paths
        paths.forEach((p) => {
          p.style.fill = "#E9F1F4";
          p.style.stroke = "#AAC6D6";
        });
        
        // Fetch country data from JSON file
        fetch("/modules/mod_interactive_map/assets/js/countries.json")
          .then((response) => response.json())
          .then((data) => {

            const countryName = countryNames[countryId];

            if (data[countryName]) {
              
                const clickText = document.getElementById("click-text");
                const infoIcon = document.querySelector(".info-icon");
                clickText.style.color = "transparent";
                infoIcon.style.color = "transparent";
                infoIcon.style.backgroundColor = "transparent";
                infoIcon.style.border = "transparent";
                const legenBlock = document.querySelectorAll('.info-block');
                legenBlock.forEach(legenBlock => {
                    legenBlock.style.display = 'flex';
                });
              // Show the popup and update its content
              countrySelected = true;
              path.style.fill = "#C7E4ED";
              path.style.stroke = "#AAC6D6";
              popupCountry.textContent = countryName;
              popupCompanyDesc.textContent = "Railway Company Name";
              popupCompanyName.textContent = data[countryName]["Rail Company"];
              popupLink.href = data[countryName]["link"];
              popupLink.target = "_blank";
              popupLink.textContent = "LINK TO WEBSITE";
  
              // Get the SVG element and calculate coordinates
              const svg = document.querySelector("#interactive-map svg");
              const pathRect = path.getBoundingClientRect();
              const pathCenterX = pathRect.x + pathRect.width / 2;
              const pathCenterY = pathRect.y + pathRect.height / 2;
  
              const svgPoint = svg.createSVGPoint();
              svgPoint.x = pathCenterX;
              svgPoint.y = pathCenterY;
              const svgPathCoord = svgPoint.matrixTransform(
                svg.getScreenCTM().inverse()
              );
  
              let lineEndX = svgPathCoord.x;
              let lineEndY = svgPathCoord.y;
  
              // Get dynamic popup position
              const { x: popupTargetX, y: popupTargetY } = getPopupPosition();
  
              // Set the popup position
              popup.style.right = `${popupTargetX}px`;
              popup.style.top = `${popupTargetY}px`;
  
              const popupRect = popup.getBoundingClientRect();
              const popupCenterX = popupTargetX + popupRect.width / 2;
              const popupCenterY = popupTargetY + popupRect.height / 2;
  
              svgPoint.x = popupCenterX;
              svgPoint.y = popupCenterY;
              const svgPopupCoord = svgPoint.matrixTransform(
                svg.getScreenCTM().inverse()
              );
  
              let lineStartX = svgPopupCoord.x;
              let lineStartY = svgPopupCoord.y;
  
              // Adjust line coordinates based on country
              if (countryId === "CROATIA") {
                lineEndX += croatiaStartOffsets.x;
                lineEndY += croatiaStartOffsets.y;
              }
  
              if (countryId === "FINLAND") {
                lineEndX += finlandStartOffsets.x;
                lineEndY += finlandStartOffsets.y;
              }
  
              if (countryId === "SWEDEN") {
                lineEndX += swedenStartOffsets.x;
                lineEndY += swedenStartOffsets.y;
              }
  
              if (countryId === "AUSTRIA") {
                lineEndX += austriaStartOffsets.x;
                lineEndY += austriaStartOffsets.y;
              }
  
              if (countryId === "GREECE") {
                lineEndX += greeceStartOffsets.x;
                lineEndY += greeceStartOffsets.y;
              }
  
              if (countryId === "ITALY") {
                lineEndX += italyStartOffsets.x;
                lineEndY += italyStartOffsets.y;
              }
  
              // Update line coordinates and show them
              popupLine.setAttribute("x1", 750);
              popupLine.setAttribute("y1", 100);
              popupLine.setAttribute("x2", lineEndX);
              popupLine.setAttribute("y2", lineEndY);
              popupLine.classList.remove("hidden");
  
              lineDotInner.setAttribute("cx", lineEndX);
              lineDotInner.setAttribute("cy", lineEndY);
              lineDotInner.classList.remove("hidden");
  
              lineDotOuter.setAttribute("cx", lineEndX);
              lineDotOuter.setAttribute("cy", lineEndY);
              lineDotOuter.classList.remove("hidden");
  
              svg.appendChild(popupLine);
  
              // Show the popup
              popup.classList.remove("hidden");
  
              // Highlight available and unavailable countries
              const availableCountries =
                data[countryNames[path.id]]["Available Online Ticketing"];
              if (availableCountries) {
                availableCountries.forEach((country) => {
                  const countryId = countryCodes[country];
                  const countryElement = document.getElementById(countryId);
                  if (countryElement) {
                    countryElement.style.fill = "#A9E3A8";
                    countryElement.style.stroke = "#AAC6D6";
                  }
                });
              }
  
              const unavailableCountries =
                data[countryNames[path.id]]["Unavailable Online Ticketing"];
              if (unavailableCountries) {
                unavailableCountries.forEach((country) => {
                  const countryId = countryCodes[country];
                  const countryElement = document.getElementById(countryId);
                  if (countryElement) {
                    countryElement.style.fill = "#FBC381";
                    countryElement.style.stroke = "#AAC6D6";
                  }
                });
              }
            } else {
              // Hide all lines if no data for the country
              popupLine.classList.add("hidden");
              lineDotOuter.classList.add("hidden");
              lineDotInner.classList.add("hidden");
  
              countrySelected = false;
              paths.forEach((p) => {
                p.style.fill = "#D3E8EF";
                p.style.stroke = "#74A2C1";
              });
              const legenBlock = document.querySelectorAll(".info-block");
              legenBlock.forEach((legenBlock) => {
                legenBlock.style.display = "none";
              });
              const clickText = document.getElementById("click-text");
              const infoIcon = document.querySelector(".info-icon");
              clickText.style.removeProperty("color");
              infoIcon.style.color = "#003399";
              infoIcon.style.backgroundColor = "white";
              infoIcon.style.border = "2px solid #003399";
            }
          })
          .catch((error) => {
            console.error(error);
          });
      });
    });
  
    // Event listener for click event on the document
    document.addEventListener("click", function (event) {
      if (!event.target.closest("path") && !event.target.closest(".popup")) {
        // Hide all lines
        popupLine.classList.add("hidden");
        lineDotOuter.classList.add("hidden");
        lineDotInner.classList.add("hidden");
  
        // Reset styles for all paths
        paths.forEach((p) => {
          p.style.fill = "#D3E8EF";
          p.style.stroke = "#74A2C1";
        });
  
        const legenBlock = document.querySelectorAll(".info-block");
        legenBlock.forEach((legenBlock) => {
          legenBlock.style.display = "none";
        });
        const clickText = document.getElementById("click-text");
        const infoIcon = document.querySelector(".info-icon");
        clickText.style.removeProperty("color");
        infoIcon.style.color = "#003399";
        infoIcon.style.backgroundColor = "white";
        infoIcon.style.border = "2px solid #003399";
        countrySelected = false;
        popup.classList.add("hidden");
        document.getElementById("popup-line").classList.add("hidden");
        document.querySelectorAll(".line").forEach((line) => {
          line.classList.add("hidden");
        });
      }
    });
  });
  