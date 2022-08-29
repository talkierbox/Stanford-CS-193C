/*
WARNING!

There are a lot of functions I made here related to trying to sort the columns on click.
I ended up giving up on this extra challenge but I couldn't be bothered to delete the functions that do basically nothing now
Sorry, please ignore those :)
*/
var univArray = new Array(
		{name: "Stanford University", nickname: "Stanford", ownership: "private", SATh: 1570, SATl: 1380, tuition: 44757},
		{name: "University of California, Berkeley", nickname: "UC Berkeley", ownership: "public", SATh: 1500, SATl: 1250, tuition: 13844},
		{name: "University of California, Santa Cruz", nickname: "UC Santa Cruz", ownership: "public", SATh: 1280, SATl: 1000, tuition: 13398},
		{name: "San Francisco State University", nickname: "SFSU", ownership: "public", SATh: 1110, SATl: 880, tuition: 6468},
		{name: "San Jose State University", nickname: "SJSU", ownership: "public", SATh: 1160, SATl: 880, tuition: 9496},
		{name: "Sonoma State University", nickname: "Sonoma State", ownership: "public", SATh: 1090, SATl: 880, tuition: 7276},
		{name: "California State University, East Bay", nickname: "CalState East Bay", ownership: "public", SATh: 1010, SATl: 800, tuition: 6550, room: 6435},
		{name: "University of San Francisco", nickname: "USF", ownership: "private", SATh: 1270, SATl: 1070, tuition: 41450},
		{name: "Santa Clara University", nickname: "SCU", ownership: "private", SATh: 1380, SATl: 1190, tuition: 43812},
		{name: "Mills College", nickname: "Mills College", ownership: "private", SATh: 1250, SATl: 1040, tuition: 42918}
);

// This is not JQuery - This is from my hr-scripts.js file. I have utility functions I made in pure vanilla JS
// and I am using them here. Thanks!
let submitBTN = $("#submit-btn");

function wipeTable() {
	let tableElements = Array.from(document.getElementsByTagName("tr"));
	for (let i = 1; i < tableElements.length; i++) {
		let item = tableElements[i];
		item.parentElement.removeChild(item);
	}
}

let searchObj = {
	schoolType: "none",
	satHigh: -1,
	satLow: -1,
	maxCost: -1
};

function colorTable(){
	let table = $("#college-table");
	let tableRows = Array.from(table.rows);
	for (let index = 1; index < tableRows.length; index++){
		let currRow = tableRows[index];
		if(index % 2 == 0) {
			currRow.classList.add("table-grey");
		}
		else {
			currRow.classList.add("table-white");
		}
	}
}

function generateTable(searchOBJ) {
	let univToShow = univArray;


	if(searchOBJ.maxCost > 0) {
		univToShow = univToShow.filter(uni => uni.tuition <= searchOBJ.maxCost);
	}

	if(searchOBJ.satLow > 0) {
		univToShow = univToShow.filter(uni => uni.SATl >= searchOBJ.satLow);
	}

	if(searchOBJ.satHigh > 0) {
		univToShow = univToShow.filter(uni => uni.SATh <= searchOBJ.satHigh);
	}

	if(searchOBJ.schoolType == "public") {
		univToShow = univToShow.filter(uni => uni.ownership == "public");
	}
	else if(searchOBJ.schoolType == "private") {
		univToShow = univToShow.filter(uni => uni.ownership == "private");
	}

	wipeTable();

	// Build the table using the universities;
	univToShow.forEach((uni, index) => {
		let table = $("#college-table");
		let currRow = table.insertRow(index + 1);
		currRow.insertCell(0).innerHTML = uni.nickname;
		currRow.insertCell(1).innerHTML = uni.SATh;
		currRow.insertCell(2).innerHTML = uni.SATl;
		currRow.insertCell(3).innerHTML = toMoney(uni.tuition);
	});
	colorTable();
}

// List all universities on load
generateTable(searchObj);

/*
let headingsArr = [$("#name-heading"), $("#sat-high-heading"), $("#sat-low-heading"), $("#tuition-heading")];
let headingClicked = false;

function sortCol(rowIndex){
	let table = $("#college-table");
	let rows = Array.from(table.rows);

	let arrContainer = [];
	for (let i = 1; i < rows.length; i++){
		let currRow = rows[i];
		let currCells = Array.from(currRow.cells);
		arrContainer.push(currCells[rowIndex].innerText);
	}
	
	// Gave up on the extra challenge of row sorting on click
	if(rowIndex == 2 || rowIndex == 1) {

	}
	else if (rowIndex == 0){
		
	}
	else if (rowIndex == 3) {

	}

}

headingsArr.forEach((heading, index) => {
	heading.addEventListener("click", () => {
		// This is the first heading clicked 
		if (!headingClicked) {
			heading.classList.add("clicked");
			headingClicked = true;
			sortCol(index);
			return;
		}

		let currentlyClickedHeading = Array.from(document.getElementsByClassName("clicked"))[0];

		if(currentlyClickedHeading.id == heading.id) {
			currentlyClickedHeading.classList.remove("clicked");
			currentlyClickedHeading.innerText = currentlyClickedHeading.innerText.replaceAll(" ▾", "");
			headingClicked = false;
			generateTable(searchObj);
		} 
	});
});
*/

submitBTN.addEventListener("click", () => {
	let searchForm = $(`#search`);
	let radioOption = Array.from(document.getElementsByName("school-type"));
	
	radioOption.forEach(radioBTN => {
		if(radioBTN.checked) {
			searchObj.schoolType = radioBTN.value;
		}
	})

	let maxSAT = $("#sat-max").value;
	let maxCOST = $("#cost-max").value;
	let lowSAT = $("#sat-low").value;

	if(maxSAT) searchObj.satHigh = parseInt(maxSAT);
	if(lowSAT) searchObj.satLow = parseInt(lowSAT);
	if(maxCOST) searchObj.maxCost = parseInt(maxCOST);

	/*
	if(headingClicked) {
		let currentlyClickedHeading = Array.from(document.getElementsByClassName("clicked"))[0];
		currentlyClickedHeading.classList.remove("clicked");
		currentlyClickedHeading.innerText = currentlyClickedHeading.innerText.replaceAll(" ▾", "");
		headingClicked = false;
	}
	*/
	
	generateTable(searchObj);
});
