let openOverlays = [];

let overlays = new Map;

$(".overlay").forEach(overlay => {
    overlays.set(overlay.id.replace("-overlay", ""), overlay);
});

let savedColors = {
    "text": ["0", "0", "0"],
    "background": ["255", "255", "255"],
    "border": ["0", "0", "255"]
}

let fontOverlaySettings = {
    "font-family": "serif",
    "font-size": 12
};

let savedBox = {
    "border": "5",
    "padding": "0",
    "margin": "0"
}

function toggleOverlay(overlayObj) {
        if(openOverlays.includes(overlayObj)) {
            // Remove it from the array
            let thisOverlayWidth = overlayObj.offsetWidth;
            let indexOfThis = openOverlays.indexOf(overlayObj);
            openOverlays.splice(indexOfThis, 1);

            console.log(indexOfThis);
            log(openOverlays.length);

            // We need to move the other ones over
            for(let i = indexOfThis; i < openOverlays.length; i++) {
                openOverlays[i].style.left = `${parseInt(openOverlays[i].style.left) - thisOverlayWidth - 10}px`;
            }

            overlayObj.style.visibility = "collapse";

            return;
        }

    if(openOverlays.length > 0) {
        let closestNeighborOverlay = openOverlays[openOverlays.length - 1];
        overlayObj.style.left = `${parseInt(closestNeighborOverlay.style.left) + closestNeighborOverlay.offsetWidth + 10}px`
        openOverlays.push(overlayObj);
    }
    else {
        overlayObj.style.left = `10px`
        openOverlays.push(overlayObj);
    }
    overlayObj.style.visibility = "visible";

}

$(`#color-btn`).addEventListener("click", () => {
    toggleOverlay(overlays.get($(`#color-btn`).id.replace("-btn", "")));
});

$(`#font-btn`).addEventListener("click", () => {
    toggleOverlay(overlays.get($(`#font-btn`).id.replace("-btn", "")));

    let fntBtns = document.getElementsByName("font-fam");
    fntBtns.forEach(fntBtn => {
        if(fntBtn.value == fontOverlaySettings["font-family"]) {
            fntBtn.checked = "checked";
        }
        else if (fntBtn.checked == "checked"){
            fntBtn.attributes.removeNamedItem("checked");   
        }
    });

    $(`size`).value = `${fontOverlaySettings[font-size]}`;
});

$(`#box-btn`).addEventListener("click", () => {
    toggleOverlay(overlays.get($(`#box-btn`).id.replace("-btn", "")));

    $("#border").value = savedBox["border"];
    $("#padding").value = savedBox["padding"];
    $("#margin").value = savedBox["margin"];
});


$(".close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        toggleOverlay(overlays.get(btn.id.replace("close-btn-", "")));
    });
});

let colorSelector = $(`#element-selector-color`);

function changeColor() {
    let elemToChangeColorOf = colorSelector.value;

    
    let valRed = parseInt($("#red").value);
    let valGreen = parseInt($("#green").value);
    let valBlue = parseInt($("#blue").value);

    $(`#color-preview`).style.backgroundColor = `rgb(${valRed}, ${valGreen}, ${valBlue})`;
    savedColors[$(`#element-selector-color`).value][0] = `${valRed}`;
    savedColors[$(`#element-selector-color`).value][1] = `${valGreen}`;
    savedColors[$(`#element-selector-color`).value][2] = `${valBlue}`;

    if(elemToChangeColorOf == "text") {
        $("p").forEach(elem => {
            elem.style.color = `rgb(${valRed}, ${valGreen}, ${valBlue})`;
        });

        $("h1").style.color = `rgb(${valRed}, ${valGreen}, ${valBlue})`;
    }
    else if (elemToChangeColorOf == "background") {
        document.body.style.backgroundColor = `rgb(${valRed}, ${valGreen}, ${valBlue})`;
    }
    else if(elemToChangeColorOf == "border") {
        $(`#theImage`).style.borderColor = `rgb(${valRed}, ${valGreen}, ${valBlue})`;
    }

    $(`#color-preview`).style.backgroundColor = `rgb(${valRed}, ${valGreen}, ${valBlue})`;
    console.log(`${elemToChangeColorOf}: ${valRed}, ${valGreen}, ${valBlue}`);
}

$("#paragraph-font-form").addEventListener('submit', (event) => {
    event.preventDefault();
});


$(`#element-selector-color`).addEventListener("change", () => {
    $(`#red`).value = `${savedColors[$(`#element-selector-color`).value][0]}`;
    $(`#green`).value = `${savedColors[$(`#element-selector-color`).value][1]}`;
    $(`#blue`).value = `${savedColors[$(`#element-selector-color`).value][2]}`;
    changeColor();
})

$(`#red`).addEventListener("change", () => {
    changeColor();
});

$(`#green`).addEventListener("change", () => {
    changeColor();
});

$(`#blue`).addEventListener("change", () => {
    changeColor();
});

$(`#size`).addEventListener("change", () => {
    if(parseInt($(`#size`).value) > 999) $(`#size`).value = `999`
    else if (parseInt($(`#size`).value) < 0) $(`#size`).value = `0`;
});

$(`#change-font-btn`).addEventListener("click", () => {
    let sizeToChangeFontTo = $(`#size`).value;
    $("p").forEach(elem => {
        elem.style.fontSize = `${sizeToChangeFontTo}pt`;
    });


    let fntBtns = document.getElementsByName("font-fam");
    fntBtns.forEach(fntBtn => {
        if(fntBtn.checked){
            fontOverlaySettings["font-family"] = fntBtn.value;
            $("p").forEach(elem => {
                elem.style.fontFamily = `${fntBtn.value}`;
            });
        }
    });

    fontOverlaySettings["font-size"] = sizeToChangeFontTo;
});

$(`#border`).addEventListener("change", () => {
    if(parseInt($(`#border`).value) > 999) $(`#border`).value = `999`
    else if (parseInt($(`#border`).value) < 0) $(`#border`).value = `0`;
});

$(`#padding`).addEventListener("change", () => {
    if(parseInt($(`#padding`).value) > 999) $(`#padding`).value = `999`
    else if (parseInt($(`#padding`).value) < 0) $(`#padding`).value = `0`;
});

$(`#margin`).addEventListener("change", () => {
    if(parseInt($(`#margin`).value) > 999) $(`#margin`).value = `999`
    else if (parseInt($(`#margin`).value) < 0) $(`#margin`).value = `0`;
});

$(`#change-box-btn`).addEventListener("click", () => {
    savedBox["border"] = $("#border").value;
    savedBox["padding"] = $("#padding").value;
    savedBox["margin"] = $("#margin").value;

    $(`#theImage`).style.borderRadius = `${savedBox["border"]}px`;
    $(`#theImage`).style.padding = `${savedBox["padding"]}px`;
    $(`#theImage`).style.margin = `${savedBox["margin"]}px`;
})