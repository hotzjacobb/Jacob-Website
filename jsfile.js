// Created by Jacob Hotz 17 Dec. 2019

// makes the email icon disappear (replaced by text) and then reappear
function copyEmail() {
    let emailImg = document.getElementById("emailImg")
    let emailText = document.getElementById("address")
    emailImg.style.display = "none"
    emailText.style.display = "inline-block"   // display my email in text
    setTimeout(function () {            // after ten seconds go back to email icon
        emailText.style.display = "none"
        emailImg.style.display = "block"
    }, 10000)
}

// called when the user clicks on a button to clear all the other shapes away
// this function when finished calls another function to animate the clicked shape
function onClickDismissShapes(btnClicked) {
    toggleAlts()
    deleteText(btnClicked.id)
    var shapeContainer = document.getElementById("shape-container")
    var shapes = shapeContainer.children // Returns an HTMLCollection
    // TODO: Disable all buttons during animation
    for (shape of shapes) {
        if (shape.className !== btnClicked.parentElement.className) {
            // potentially set display to none here during transiton
            var xVector = Math.random() - .5
            var yVector = Math.random() - .5
            console.log(shape.className + "'s x-vec is " + xVector.toString())
            console.log(shape.className + "'s y-vec is " + yVector.toString())
            if (Math.abs(yVector) > Math.abs(xVector)) {   // get movement for one frame
                var ratio = (yVector * 1.0 / xVector)
                console.log("The ratio before rounding is" + ratio)
                ratio = Math.round(ratio)
                console.log("The ratio after rounding is" + ratio)
                yVector = (yVector > 0) ? Math.abs(ratio) : (-1 * Math.abs(ratio))
                xVector = (xVector > 0) ? 1 : -1
            } else {
                var ratio = (xVector * 1.0 / yVector)
                console.log("The ratio before rounding is" + ratio)
                ratio = Math.round(ratio)
                console.log("The ratio after rounding is" + ratio)
                xVector = (xVector > 0) ? Math.abs(ratio) : (-1 * Math.abs(ratio))
                yVector = (yVector > 0) ? 1 : -1
            }   // The smaller of xVector and yVector is now 1 and the larger keeps the same
            // the same ratio; will be used for movement across pixels
            console.log(shape.className + "'s x-vec NOW is " + xVector.toString())
            console.log(shape.className + "'s y-vec NOW is " + yVector.toString())
            var rect = shape.getBoundingClientRect()
            let windowWidth = window.innerWidth
            let windowHeight = window.innerHeight
            let startingPosX = (rect.right - rect.left) + rect.left
            let startingPosY = (rect.bottom - rect.top) + rect.top
            var tracerXCoord = startingPosX  // no rotations before this
            var tracerYCoord = startingPosY   // no rotations before this
            let tracerSpeedFactor = 3         // desired "precision"; the higher the value further off-screen but really not a big deal
            while (tracerXCoord > 0 && tracerXCoord < windowWidth    // while on-screen
                && tracerYCoord > 0 && tracerYCoord < windowHeight) {
                tracerXCoord += (xVector * tracerSpeedFactor)
                tracerYCoord += (yVector * tracerSpeedFactor)
            }   // upon completion we have the tracer coords. updated to the "offscreen" point we will translate to
            console.log(shape.className + "'s x-vec is " + xVector.toString())
            console.log(shape.className + "'s y-vec is " + yVector.toString())
            shape.style.position = "absolute"
            let translateVectorX = tracerXCoord - startingPosX
            let translateVectorY = tracerYCoord - startingPosY
            console.log("translate(" + translateVectorX + "px, " + translateVectorY + "px)")
            shape.style.transform = "translate(" + translateVectorX + "px, " + translateVectorY + "px)" // random translation
            let rotationAngle = Math.random() * 360
            // += on the line below to keep effects of previous transform
            shape.style.transform += "rotate(" + rotationAngle.toString() + "deg)" // random rotation
            shape.style.opacity = 0
            // shape.style.display = "none"
        }
    }
    btnClicked.parentElement.classList.add("textclicked")
}

// helper function the performs the "animation" of deleting inner text from 
// shape to be removed; also disables the buttons
function deleteText(clickedButtonId) {
    let shapeContainer = document.getElementById("shape-container")
    let buttons = shapeContainer.getElementsByTagName("BUTTON")
    for (button of buttons) {  // disable clicking on buttons now that animation in course
        button.disabled = true
    }
    // delete the text of the buttons
    for (button of buttons) {    // do one letter of one button at a time
        if (button.id !== clickedButtonId) {  // don't delete the text of clicked button
            button.innerHTML = ""
        }
    }
}



// Function called when the user clicks on the back button
// restores the initial page state to how it was by changing the html and 
// css attributes manually. If adding changes to the initial page be sure to
// make any corresponding changes here.
function restoreInitialPage() {

}

// Helper function that makes the alt buttons visible for css animations
// or restores the non-alts so that they can be clicked when not in an
// animation.
// For more info read the comment by the "alt" buttons in the CSS file.
function toggleAlts() {
    var alts = document.getElementsByClassName("alt")
    var nonAlts = document.getElementsByClassName("non-alt")
    if (window.getComputedStyle(alts[0]).getPropertyValue("visibility") === "hidden") {
        console.log("hey")
        for (element of nonAlts) {       // hide nonAlts
            element.style.visibility = "hidden"
        }
        for (element of alts) {       // show alts
            element.style.visibility = "visible"
        }
    } else {
        console.log("hi")
        for (element of alts) {       // hide alts
            element.style.visibility = "hidden"
        }
        for (element of nonAlts) {       // show nonAlts
            element.style.visibility = "visible"
        }
    }
}