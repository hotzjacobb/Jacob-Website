// Created by Jacob Hotz 17 Dec. 2019

// makes the email icon disappear (replaced by text) and then reappear
function copyEmail() {   
    let emailImg = document.getElementById("emailImg")
    let emailText = document.getElementById("address")
    emailImg.style.display = "none"
    emailText.style.display = "inline-block"   // display my email in text
    setTimeout(function() {            // after ten seconds go back to email icon
        emailText.style.display = "none"
        emailImg.style.display = "block"
    }, 10000) 
}

// called when the user clicks on the "project button"
function onClickProjects() {
    var shapeContainer = document.getElementById("shape-container")
    var shapes  = shapeContainer.children // Returns an HTMLCollection
    for (shape of shapes) {
        if (shape.className !== "shape circle red") {
            // shape.style.display = "none"
            var rect = shape.getBoundingClientRect()
            // Potentially change to x and y and use subtraction
            var shapeLeftPos = rect.left
            var shapeTopPos = rect.shapeTopPos
            // potentially set display to none here during transiton
            shape.style.position = "absolute"
            shape.style.left = "50%"
        }
    }
}

// f
function shapesExit() {

}