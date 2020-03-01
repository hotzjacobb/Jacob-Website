// Created by Jacob Hotz 17 Dec. 2019

// makes the email icon disappear (replaced by text) and then reappear
function copyEmail() {
    correctEmail()

    let emailImg = document.getElementById("emailImg")
    let emailText = document.getElementById("address")
    emailImg.style.display = "none"
    emailText.style.display = "inline-block"   // display my email in text

    setTimeout(function () {            // after ten seconds go back to email icon
        emailText.style.display = "none"
        emailImg.style.display = "block"
    }, 10000)
}

// called when the user puts the mouse over 
// function mouseOverText(btnHovered) {


//  let shape
//  // map text to correct shape
//  switch (btnHovered.id) {
//      case "proj":
//          shape = document.getElementById("red")
//          break;
//     case "about":
//          shape = document.getElementById("blanchedalmond")
//          break;
//     case "resume":
//          shape = document.getElementById("blue")
//          break;
//     case "blog":
//          shape = document.getElementById("blue")
//          break;
//     case "misc":
//          shape = document.getElementById("yellow")
//          break;
//      default:
//          console.error("unexpected btnHovered value")
//  }

 // set to false in animend event listener
//  btnHovered.postponeOnClick = true  // for more info see above onClickDismissShapes

//  shape.classList.add("texthovered")
// }

// called when the user clicks on a button to clear all the other shapes away
// this function when finished calls another function to animate the clicked shape

// use this to change the CSS letiable values from JS
const docStyle = document.documentElement.style;

// Used to delay exectution of click
// transition if hover anim. still in effect. Set to true when hover;
// set to false when hover anim. ends. If hover a...

// NOTE: Decided not to use the above; leaving in this commit as a record
// of the idea; I already deleted other remnants. Skew is
// cool but too much of a hassle given the z-layer hacks and 
// anim transition combo.
// var postponeOnClick = false; 

function onClickDismissShapes(btnClicked) {

    toggleAlts()
    deleteText(btnClicked.id)
    btnClicked.style.cursor = "auto"  // have to do this as text not deleted yet


    let shapeContainer = document.getElementById("shape-container")
    let shapes = shapeContainer.children // Returns an HTMLCollection
    for (let shape of shapes) {
        if (shape.className !== btnClicked.parentElement.className) {
            // potentially set display to none here during transiton
            let xVector = Math.random() - .5
            let yVector = Math.random() - .5
            if (Math.abs(yVector) > Math.abs(xVector)) {   // get movement for one frame
                let ratio = (yVector * 1.0 / xVector)
                ratio = Math.round(ratio)
                yVector = (yVector > 0) ? Math.abs(ratio) : (-1 * Math.abs(ratio))
                xVector = (xVector > 0) ? 1 : -1
            } else {
                let ratio = (xVector * 1.0 / yVector)
                ratio = Math.round(ratio)
                xVector = (xVector > 0) ? Math.abs(ratio) : (-1 * Math.abs(ratio))
                yVector = (yVector > 0) ? 1 : -1
            }   // The smaller of xVector and yVector is now 1 and the larger keeps the same
            // the same ratio; will be used for movement across pixels
            let rect = shape.getBoundingClientRect()
            let windowWidth = window.innerWidth
            let windowHeight = window.innerHeight
            let startingPosX = (rect.right - rect.left) + rect.left
            let startingPosY = (rect.bottom - rect.top) + rect.top
            let tracerXCoord = startingPosX  // no rotations before this
            let tracerYCoord = startingPosY   // no rotations before this
            let tracerSpeedFactor = 5         // desired "precision"; the higher the value further off-screen but really not a big deal
            while (tracerXCoord > -50 && tracerXCoord < windowWidth + 50   // while on-screen
                && tracerYCoord > -50 && tracerYCoord < windowHeight + 50) {
                tracerXCoord += (xVector * tracerSpeedFactor)
                tracerYCoord += (yVector * tracerSpeedFactor)
            }   // upon completion we have the tracer coords. updated to the "offscreen" point we will translate to
            let translateVectorX = tracerXCoord - startingPosX
            let translateVectorY = tracerYCoord - startingPosY
            //shape.style.transform = "translate(" + translateVectorX + "px, " + translateVectorY + "px)" // random translation
            let rotationAngle = Math.random() * 360
            // += on the line below to keep effects of previous transform
            // shape.style.transform += "rotate(" + rotationAngle.toString() + "deg)" // random rotation
            console.log(translateVectorX)
            console.log(rotationAngle)
            docStyle.setProperty("--transform-x-" + shape.id, translateVectorX.toString() + "px")
            docStyle.setProperty("--transform-y-" + shape.id, translateVectorY.toString() + "px")
            docStyle.setProperty("--rotation-" + shape.id, rotationAngle.toString() + "deg")
            shape.classList.add("dismiss")
            window.getComputedStyle(shape).top; 
        }
    }
    // once translation ends remove the shape's button text and hide other page elements
    // and then add class to do transition to submodule

    btnClicked.parentElement.addEventListener('transitionend', function () {
        textClickedFinished(btnClicked.parentElement, btnClicked)
    }, { once: true }) 
    btnClicked.parentElement.classList.add("textclicked")  // move clicked shape into position
}

// Called after the shape has been centred. Animates
// the shape's removal as well as clearing the page
// of other elements to prepare before creating the new module
function textClickedFinished(shape, btnClicked) {
    btnClicked.storedInnerHTML = btnClicked.innerHTML
    btnClicked.innerHTML = ""
    btnClicked.style.cursor = "pointer" // restore for when going back to home screen
    document.getElementById("footer").style.display = "none" // don't display other page elements
    document.getElementById("header").style.display = "none"

    shape.addEventListener('transitionend', function handler() {
        console.log("handler called")
        console.log(event)
        if (event.propertyName !== "border-bottom-left-radius" &&
           event.propertyName !== "border-radius") { return } // guard against earlier animation triggering it
        // css animations + vanilla js is not particulary dev. friendly
        // TODO: Need to find a better guard because this does not apply to all shapes
        console.log("past check")
        shape.removeEventListener('transitionend', handler)
        centredFinished(shape)
    })
    shape.classList.add("centred")
}

// This function first hides that last shape and its container
// and then creates the new div that is the module.
function centredFinished(shapeToHide) {
    shapeToHide.removeEventListener("transitionend", centredFinished)
    let module = document.createElement("DIV")
    module.id = "module"
    let colour = window.getComputedStyle(shapeToHide).getPropertyValue("background-color")
    module.style.backgroundColor = colour   // module has the same colour as button's parent (shape)
    // shapeToHide.style.display = "none"
    let shapeContainer = document.getElementById("shape-container")
    shapeContainer.style.display = "none"
    //document.body.appendChild(module).focus() // similar to two line combo below
    document.body.appendChild(module)
    window.getComputedStyle(module).top; // this line forces a redraw; otherwise no anim.
    module.classList.add("expand")
    // fill module with text and back button when anim. almost done
    setTimeout(function () {
        let backArrow = document.createElement("INPUT")
        backArrow.type = "image"
        // backArrow.src = "./images/noun_back_1521731.png" // alternate back icon; by Besticons noun proj.
        backArrow.src = "./images/noun_back_878298.png"
        backArrow.alt = "Back"
        backArrow.onclick = removeModule
        backArrow.id = "back-arrow"
        document.body.appendChild(backArrow)
    }, 900);
}



// helper function the performs the "animation" of deleting inner text from 
// shapes to be removed; also disables the buttons
function deleteText(clickedButtonId) {
    let shapeContainer = document.getElementById("shape-container")
    let buttons = shapeContainer.getElementsByTagName("BUTTON")
    for (let button of buttons) {  // disable clicking on buttons now that animation in course
        button.disabled = true
    }
    // delete the text of the buttons
    for (let button of buttons) {    // do one letter of one button at a time
        if (button.id !== clickedButtonId) {  // don't delete the text of clicked button
            button.storedInnerHTML = button.innerHTML
            button.innerHTML = ""
            console.log(button.storedInnerHTML)
        }
    }
}

// Triggers a brief animation before deleting the module
// from the page. Places listener which upon completion
// calls restoreInitialPage
function removeModule() {
    console.log("Remove module called")
    let module = document.getElementById("module")
    module.addEventListener("transitionend", restoreInitialPage, {once: true})
    module.classList.remove("expand") // first animate removal of module
    let backArrow = document.getElementById("back-arrow")
    backArrow.remove()
    console.log(document.getElementById("back-arrow"))
}

// Function called when the user clicks on the back button
// restores the initial page state to how it was by changing the html and 
// css attributes manually. If adding changes to the initial page be sure to
// make any corresponding changes here.
function restoreInitialPage() {

    let module = document.getElementById("module")
    module.remove()

    document.getElementById("header").style.display = "block"

    let shapeContainer = document.getElementById("shape-container")
    shapeContainer.style.display = "block"
    let shapes = shapeContainer.children

    for (let shape of shapes) {
        shape.classList.remove("dismiss")
        shape.classList.remove("centred")
        shape.classList.remove("textclicked")
    }

    toggleAlts()  // go back to non-animation labels for correct z-value

    let buttons = document.getElementsByTagName("BUTTON")
    for (let button of buttons) {  // give buttons text again
        button.innerHTML = button.storedInnerHTML
        button.disabled = false
    }

    document.getElementById("footer").style.display = "grid"
}

// Helper function that makes the alt buttons visible for css animations
// or restores the non-alts so that they can be clicked when not in an
// animation.
// For more info read the comment by the "alt" buttons in the CSS file.
function toggleAlts() {
    let alts = document.getElementsByClassName("alt")
    let nonAlts = document.getElementsByClassName("non-alt")
    if (window.getComputedStyle(alts[0]).getPropertyValue("visibility") === "hidden") {
        for (let element of nonAlts) {       // hide nonAlts
            element.style.visibility = "hidden"
        }
        for (let element of alts) {       // show alts
            element.style.visibility = "visible"
        }
    } else {
        for (let element of alts) {       // hide alts
            element.style.visibility = "hidden"
        }
        for (let element of nonAlts) {       // show nonAlts
            element.style.visibility = "visible"
        }
    }
}

// the email in the html is missing a few letters
// so as to not be registered by scrapers
function correctEmail() {
    let address = document.getElementById("address")
    if (address.innerHTML.substring(0, 5) !== "hotzj") {
        address.innerHTML = address.innerHTML.substring(0, 2) + "tzj"
            + address.innerHTML.substring(2, 6) + "b" + address.innerHTML.substring(6)
    }
}
