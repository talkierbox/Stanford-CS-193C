"use strict";
let categoriesMap = {};
let dietaryMap = {};

let checkedDietOptions = new Set();

function isMatchingArrays(arr1, arr2) {
    if(arr1.length !== arr2.length) return false;

    let isMatching = true;
    for(let i = 0; i < arr1.length; i++) {
        let item = arr1[i];
        if(!arr2.includes(item)) isMatching = false;
    }

    return isMatching;
}

for (let i = 0; i < menu.length; i++) {
    let menuItem = menu[i];

    if(categoriesMap[menuItem.category]) {
        categoriesMap[menuItem.category].push(menuItem);
    } else {
        categoriesMap[menuItem.category] = [menuItem];
    }

    if(menuItem.dietaryInformation) menuItem.dietaryInformation.forEach(dietInfo => {
        if(dietaryMap[dietInfo]) {
            dietaryMap[dietInfo].push(menuItem);
        }
        else {
            dietaryMap[dietInfo] = [menuItem];
        }
    });
}

let categorySelect = $("#category-select");

for (let prop in categoriesMap) {
    let newOption = new Option(prop, prop);
    categorySelect.appendChild(newOption);
}

for (let prop in dietaryMap) {
    let newCheckbox = document.createElement("input");
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.value = prop;
    newCheckbox.id = `${prop.replaceAll(" ", "")}-checkbox`;

    let newLabel = document.createElement("label");
    newLabel.setAttribute("for", newCheckbox.id);

    newLabel.innerHTML = prop;

    newCheckbox.checked = false;

    $("#diet-options-container").appendChild(newCheckbox);
    $("#diet-options-container").appendChild(newLabel);

    $("#diet-options-container").appendChild(document.createElement("br"));
}

function search() {
    let category = categorySelect.value;
    let dietaryRestrictions = Array.from(checkedDietOptions);

    let htmlToAppend = ``;

    if(category == "All") {
        for(let categoryTitle in categoriesMap) {
            let categoryHasComp = false;

            htmlToAppend += `<h3>${categoryTitle}</h3>`

            let mArr = categoriesMap[categoryTitle]
                mArr.forEach(item => {
                    if (dietaryRestrictions.length == 1 && item.dietaryInformation) {
                        if(item.dietaryInformation.includes(dietaryRestrictions[0])) {
                            htmlToAppend += `<p><b>${item.title}</b></p>`
                            htmlToAppend += `<p>${item.description} <i>$${item.price}</i></p>`
                            categoryHasComp = true;
                        }
                    }
                    else if (dietaryRestrictions.length > 1 && item.dietaryInformation){
                        if(isMatchingArrays(dietaryRestrictions, item.dietaryInformation)) {
                            htmlToAppend += `<p><b>${item.title}</b></p>`
                            htmlToAppend += `<p>${item.description} <i>$${item.price}</i></p>`
                            categoryHasComp = true;
                        }
                    }
                    else if (dietaryRestrictions.length == 0) {
                        htmlToAppend += `<p><b>${item.title}</b></p>`
                        htmlToAppend += `<p>${item.description} <i>$${item.price}</i></p>`
                        categoryHasComp = true;
                    }
            });
            console.log(`${categoryTitle}: ${categoryHasComp}`);
            if(!categoryHasComp) {
                htmlToAppend = htmlToAppend.replace(`<h3>${categoryTitle}</h3>`, ``);
            }
            else {
                htmlToAppend += `<br>`
            }
        }

    } else {
        for(let categoryTitle in categoriesMap) {
            if(categoryTitle != category) continue;

            let categoryHasComp = false;

            let mArr = categoriesMap[categoryTitle]
                mArr.forEach(item => {
                    if (dietaryRestrictions.length == 1 && item.dietaryInformation) {
                        if(item.dietaryInformation.includes(dietaryRestrictions[0])) {
                            htmlToAppend += `<p><b>${item.title}</b></p>`
                            htmlToAppend += `<p>${item.description} <i>$${item.price}</i></p>`
                            categoryHasComp = true;
                        }
                    }
                    else if (dietaryRestrictions.length > 1 && item.dietaryInformation){
                        if(isMatchingArrays(dietaryRestrictions, item.dietaryInformation)) {
                            htmlToAppend += `<p><b>${item.title}</b></p>`
                            htmlToAppend += `<p>${item.description} <i>$${item.price}</i></p>`
                            categoryHasComp = true;
                        }
                    }
                    else if (dietaryRestrictions.length == 0) {
                        htmlToAppend += `<p><b>${item.title}</b></p>`
                        htmlToAppend += `<p>${item.description} <i>$${item.price}</i></p>`
                        categoryHasComp = true;
                    }
            });
        }
    }

    $(`#results`).innerHTML = htmlToAppend;
};

search();

categorySelect.addEventListener("change", () => {
    search();
});

let checkBoxes = $("input");
// Add the onclick functionality for checkboxes
checkBoxes.forEach((newCheckbox) => {
    newCheckbox.addEventListener("click", () => {
        if(checkedDietOptions.has(newCheckbox.value)) {
            checkedDietOptions.delete(newCheckbox.value);
        }
        else {
            checkedDietOptions.add(newCheckbox.value);
        }
        search()
    }, false);
});