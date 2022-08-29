"use strict";

let maps = [];
let currentMapIndex = 2;

let debug = false;

// I do not use JQuery - Made my own $() function
// It is located inside of hr-scripts.js
// Thank you!

if (debug) {
    $("#debug-text").style.visibility = `visible`;
}

// Known bug - On firefox, sometimes it doesn't load instantly even though I am using JS images here. Weird.
class MapElement extends Image {
    sourceHeight;
    sourceWidth;
    index;

    constructor(index, sourceHeight, sourceWidth) {
        super();
        this.index = index;
        this.id = `map-${index}`
        this.src = `maps/${index}.gif`;
        this.sourceHeight = sourceHeight;
        this.sourceWidth = sourceWidth;
        this.draggable = false;
        this.style.position = "absolute";
        this.style.left = `0px`;
        this.style.top = `0px`;
    }
}

maps.push(new MapElement(1, 1283, 997));
maps.push(new MapElement(2, 2047, 1589));
maps.push(new MapElement(3, 3063, 2373));
maps.push(new MapElement(4, 4084, 3164));

// For the navigation / Lookup feature
let mapLocations = {
    "hospital": [1433.5, 883],
    "memchu": [1863.5, 1908],
    "memorial church": [1863.5, 1908],
    "bookstore": [2044.5, 2176],
    "cantor center": [1843, 1117],
    "wilbur hall": [2612, 2288]
}

$("#controls").addEventListener('submit', (event) => {event.preventDefault();});

let mapContainer = $("#map-container");
mapContainer.draggable = false;
mapContainer.appendChild(maps[1]);

function getCurrentMap() {
    return maps[currentMapIndex - 1];
}

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function getNextBiggestMap() {
    if(currentMapIndex < 4) currentMapIndex++;
    removeChildren(mapContainer);
    mapContainer.appendChild(maps[currentMapIndex - 1]);
    return maps[currentMapIndex - 1];
}

function getNextSmallestMap() {
    if(currentMapIndex > 1) currentMapIndex--;
    removeChildren(mapContainer);
    mapContainer.appendChild(maps[currentMapIndex - 1]);
    return maps[currentMapIndex - 1];
};

function inBox(x,y) {
	return (x >= 50 && x <= 50 + mapContainer.offsetWidth
				&& y >= 30 && y <= 30 + mapContainer.offsetHeight);
}

function goToMapLocation(x, y){
    let boxSizeX = mapContainer.offsetWidth;
    let boxSizeY = mapContainer.offsetHeight;

    let m = getCurrentMap();
    m.style.left = `${-x + boxSizeX/2}px`;
    m.style.top = `${-y + boxSizeY/2}px`;
}

function getMapCoords() {
    let boxSizeX = mapContainer.offsetWidth;
    let boxSizeY = mapContainer.offsetHeight;
    let m = getCurrentMap();

    let x = boxSizeX/2 - parseInt(m.style.left);
    let y = boxSizeY/2 - parseInt(m.style.top);
    return {x: x, y: y};
}

function getCenterScreenCoords(){
    let thisMap = getCurrentMap();
    let boxSizeX = mapContainer.offsetWidth;
    let boxSizeY = mapContainer.offsetHeight;

    let mapLeft = parseInt(thisMap.style.left);
    let mapTop = parseInt(thisMap.style.top);


    let mapCenterX = boxSizeX/2 - mapLeft;
    let mapCenterY = boxSizeY/2 - mapTop;

    return {x: mapCenterX, y: mapCenterY};
}

function getRelativeMouseCoords(rawMouseX, rawMouseY) {
    let boxSizeX = mapContainer.offsetWidth;
    let boxSizeY = mapContainer.offsetHeight;

    let newMouseX = rawMouseX - boxSizeX/2;
    let newMouseY = rawMouseY - boxSizeY/2;

    return {x: newMouseX - 30, y: (newMouseY)};
}

$("#zoom-in").addEventListener("click", () => {
    let prevMap = getCurrentMap();
    let prevMapCenterData = getCenterScreenCoords();

    let m = getNextBiggestMap();

    if(prevMap == m) return;

    let newX = prevMapCenterData.x * (m.sourceWidth / prevMap.sourceWidth);
    let newY = prevMapCenterData.y * (m.sourceHeight / prevMap.sourceHeight);

    goToMapLocation(newX, newY);
}, false);


/*  OLD
    m.style.left = `${((m.sourceWidth / prevMap.sourceWidth) * parseInt(prevMap.style.left)) + (m.sourceWidth / prevMap.sourceWidth) * 140}px`;
    m.style.top =  `${(m.sourceHeight / prevMap.sourceHeight ) * parseInt(prevMap.style.top) + (m.sourceHeight / prevMap.sourceHeight) * 90}px`;
*/

$("#zoom-out").addEventListener("click", () => {
    let prevMap = getCurrentMap();
    let prevMapCenterData = getCenterScreenCoords();

    let m = getNextSmallestMap();

    if(prevMap == m) return;

    let newX = prevMapCenterData.x * (m.sourceWidth / prevMap.sourceWidth);
    let newY = prevMapCenterData.y * (m.sourceHeight / prevMap.sourceHeight);

    goToMapLocation(newX, newY);
}, false);


$("#move-right").addEventListener("click", () => {
    let m = getCurrentMap();    
    m.style.left = `${parseInt(m.style.left) - parseInt(mapContainer.offsetWidth)/2}px`;
}, false);


$("#move-left").addEventListener("click", () => {
    let m = getCurrentMap();    
    m.style.left = `${parseInt(m.style.left) + parseInt(mapContainer.offsetWidth)/2}px`;
}, false);


$("#move-up").addEventListener("click", () => {
    let m = getCurrentMap();    
    m.style.top = `${parseInt(m.style.top) + parseInt(mapContainer.offsetHeight)/2}px`;
}, false);


$("#move-down").addEventListener("click", () => {
    let m = getCurrentMap();    
    m.style.top = `${parseInt(m.style.top) - parseInt(mapContainer.offsetHeight)/2}px`;
}, false);

let isDragging = false;

let startMousePosX = 0;
let startMousePosY = 0;

document.addEventListener("mousemove", (evt) => {
    let map = getCurrentMap();

    let mapMouseOffsetX = getRelativeMouseCoords(evt.clientX, evt.clientY).x;
    let mapMouseOffsetY = getRelativeMouseCoords(evt.clientX, evt.clientY).y;
    
    if(debug) $("#debug-text").innerText = `MouseX: ${evt.clientX}\nMouseY: ${evt.clientY}\nMapTop: ${map.style.top}\nMapLeft: ${map.style.left}\nMapX: ${getMapCoords().x}\nMapY: ${getMapCoords().y}\nMouseOffsetX: ${mapMouseOffsetX}\nMouseOffsetY: ${mapMouseOffsetY}`;

    if(!isDragging) return;

    let newPosX = startMousePosX - evt.clientX;
    let newPosY = startMousePosY - evt.clientY;

    startMousePosX = evt.clientX;
    startMousePosY = evt.clientY;

    map.style.left = `${(map.offsetLeft - newPosX)}px`;
    map.style.top = `${(map.offsetTop - newPosY)}px`;
}); 

document.addEventListener("mousedown", (evt) => {
    if(!inBox(evt.clientX, evt.clientY)) return;
    getCurrentMap().style.cursor = "move";
    startMousePosX = evt.clientX;
    startMousePosY = evt.clientY;

    isDragging = true;
}); 

document.addEventListener("mouseup", (evt) => {
    if(!isDragging) return;
    getCurrentMap().style.cursor = "default";
    isDragging = false;

}); 

document.addEventListener("dblclick", (evt) => {
    if(!inBox(evt.clientX, evt.clientY)) return;
    let prevMap = getCurrentMap();
    let prevMapCenterData = getCenterScreenCoords();

    let mapMouseOffsetX = getRelativeMouseCoords(evt.clientX, evt.clientY).x;
    let mapMouseOffsetY = getRelativeMouseCoords(evt.clientX, evt.clientY).y;
    
    let newX = (prevMapCenterData.x + mapMouseOffsetX);
    let newY = (prevMapCenterData.y + mapMouseOffsetY);
    
    /*
    let m;
    while (currentMapIndex != 4) {
        m = getNextBiggestMap();
    }

    
    if(prevMap.index != 4) {
        newX *= (m.sourceWidth / prevMap.sourceWidth);
        newY *= (m.sourceHeight / prevMap.sourceHeight);
    }
    */

    goToMapLocation(newX, newY);
}); 

$(`body`).onload = function(){
    let h = window.innerHeight;
    let w = window.innerWidth;

    mapContainer.style.width = `${(w - 200)}px`;
    mapContainer.style.height = `${(h - 200)}px`;

    $(`#zoom-btns`).style.left = `${(w - 100)}px`;
    $(`#move-btns`).style.left = `${(w - 100)}px`; 
    $(`#search-text`).style.left = `${(w - 320)}px`; 
    $(`#search-text`).style.top = `${parseInt(mapContainer.style.height) + 50}px`; 

}

window.addEventListener("resize", () => {
    let h = window.innerHeight;
    let w = window.innerWidth;

    mapContainer.style.width = `${(w - 200)}px`;
    mapContainer.style.height = `${(h - 200)}px`;

    $(`#zoom-btns`).style.left = `${(w - 100)}px`;
    $(`#move-btns`).style.left = `${(w - 100)}px`;
    $(`#search-text`).style.left = `${(w - 320)}px`; 
    $(`#search-text`).style.top = `${parseInt(mapContainer.style.height) + 50}px`; 

}, false);

// Extra Lookup Feature
$("#search-text").addEventListener("keypress", (e) => {
    let searchTextInput = $("#search-text").value;
    if (e.key !== "Enter" || searchTextInput == "" || searchTextInput == " " ||! searchTextInput) return;

    let toLookUp = null;
    for (let prop in mapLocations) {
        if(prop.toLowerCase().includes(searchTextInput)) {
            toLookUp = prop;
        }
    }

    if(toLookUp != null) {
        let currentMap = getCurrentMap();
        let maxMap = maps[3];

        let newX = mapLocations[toLookUp.toLowerCase()][0] * (currentMap.sourceWidth / maxMap.sourceWidth);
        let newY = mapLocations[toLookUp.toLowerCase()][1] * (currentMap.sourceHeight / maxMap.sourceHeight);
        goToMapLocation(newX, newY);
    }
    else {
        $("#search-text").style.borderColor = "red";
        setTimeout(() => {$("#search-text").style.borderColor = "grey";}, 2000)
    }
});