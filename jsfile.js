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
            // potentially set display to none here during transiton
            let xVector = Math.random() - 1
            let yVector = Math.random() - 1
            if (Math.abs(yVector) > Math.abs(xVector)) {   // get movement for one frame
                xVector = 1
                yVector = Math.round(yVector / xVector)
            } else {
                yVector = 1
                xVector = Math.round(xVector / yVector)
            }
            console.log(shape.className + "'s x-vec is " + xVector.toString())
            console.log(shape.className + "'s y-vec is " + xVector.toString())
            var rect = shape.getBoundingClientRect()
            let windowWidth = window.innerWidth
            let windowHeight = window.innerHeight
            var tracerXCoord = (rect.right - rect.left) + rect.left  // no rotations before this
            var tracerYCoord = (rect.bottom - rect.top) + rect.top   // no rotations before this
            let tracerSpeedFactor = 3
            while (tracerXCoord > 0 && tracerXCoord < windowWidth    // while on-screen
                && tracerYCoord > 0 && tracerYCoord < windowHeight) {   
                    tracerXCoord += (xVector * tracerSpeedFactor)
                    tracerYCoord += (yVector * tracerSpeedFactor)
            }   // upon completion we have the tracer coords. updated to the "offscreen" point we will translate to
            console.log(shape.className + "'s x-vec is " + xVector.toString())
            console.log(shape.className + "'s y-vec is " + xVector.toString())
            shape.style.position = "absolute"
            console.log("translate(" + tracerXCoord + "px, " + tracerYCoord + "px)")
            shape.style.transform = "translate(" + tracerXCoord + "px, " + tracerYCoord + "px)" // random translation
            let rotationAngle = Math.random() * 360
            //shape.style.transform = "rotate(" + rotationAngle.toString() + "deg)" // random rotation
            shape.style.opacity = 0
        }
    }
}

// f
function shapesExit() {

}