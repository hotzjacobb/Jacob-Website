// Created by Jacob Hotz 17 Dec. 2019


// Called on page load to decide whether to show the mobile or desktop version; 
// also sets to correct email for mobile after short timeput to avoid scrapers

window.onload = onLoadVersion

function onLoadVersion() {
    if (mobileCheck()) {
        document.getElementById("mobile").style.display = "block"
    } else {
        document.getElementById("desktop").style.display = "block"
    }
    setTimeout(function() {   // basic scraper defense
        let emailLink = document.getElementById("email-link-mobile")
        emailLink.href = emailLink.href.substring(0,10) + "z" + emailLink.href.substring(10)
    }, 150)
}

function mobileCheck() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

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


// called when the user clicks on a button to clear all the other shapes away
// this function when finished calls another function to animate the clicked shape

// use this to change the CSS letiable values from JS
const docStyle = document.documentElement.style;

function onClickDismissShapes(btnClicked) {

    toggleAlts()
    let clickedShape = getCorrectShape(btnClicked)
    let displayedButton = getDisplayButton(btnClicked)

    console.log(displayedButton)

    deleteText(btnClicked.id)
    btnClicked.style.cursor = "auto"  // have to do this as text not deleted yet


    let shapeContainer = document.getElementById("shape-container")
    let shapes = shapeContainer.children // Returns an HTMLCollection
    for (let shape of shapes) {
        if (shape.className !== clickedShape.className) {
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
            }   
            // The smaller of xVector and yVector is now 1 and the larger keeps the same
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
            let rotationAngle = Math.random() * 360
            docStyle.setProperty("--transform-x-" + shape.id, translateVectorX.toString() + "px")
            docStyle.setProperty("--transform-y-" + shape.id, translateVectorY.toString() + "px")
            docStyle.setProperty("--rotation-" + shape.id, rotationAngle.toString() + "deg")
            shape.classList.add("dismiss")
            window.getComputedStyle(shape).top; 
        }
    }
    // once translation ends remove the shape's button text and hide other page elements
    // and then add class to do transition to submodule
    btnClicked.classList.add("no-hover")  // disables underlining
    clickedShape.addEventListener('transitionend', function () {
        btnClicked.storedInnerHTML = btnClicked.innerHTML // save html button text
        displayedButton.storedInnerHTML = displayedButton.innerHTML
        textClickedFinished(clickedShape, displayedButton)
    }, { once: true }) 
    clickedShape.classList.add("textclicked")  // move clicked shape into position
}

// Called after the shape has been centred. Animates
// the shape's removal as well as clearing the page
// of other elements to prepare before creating the new module
function textClickedFinished(shape, displayedButton) {
    displayedButton.style.cursor = "pointer" // restore for when going back to home screen
    displayedButton.innerHTML = ""
    document.getElementById("footer").style.display = "none" // don't display other page elements
    document.getElementById("header").style.display = "none"
    // Note: the below setTimeout is hacky and not ideal; I spent
    // a lot of time looking for a better solution even asking stack 
    // overflow if there's a better way but it seems like there's not.
    // It's a guard against a preemptive call as Javascript receives 
    // multiple CSS events. Currently the fastest transition is 100ms 
    // which this sufficiently allows. Moral of the story is probably 
    // use an animation library next time. 
    setTimeout(function () {
        shape.addEventListener('transitionend', function handler() {
        shape.removeEventListener('transitionend', handler)
        centredFinished(shape, displayedButton)
    })}, 60)
    shape.classList.add("centred")
}

// This function first hides that last shape and its container
// and then creates the new div that is the module.
function centredFinished(shapeToHide, btnClicked) {
    shapeToHide.removeEventListener("transitionend", centredFinished)
    
    let colour
    if (shapeToHide.id === "blanchedalmond") { // necessary b/c of triangle
        colour = window.getComputedStyle(shapeToHide).getPropertyValue("border-bottom-color")
    } else {
        colour = window.getComputedStyle(shapeToHide).getPropertyValue("background-color")
    }
    // module.style.backgroundColor = colour  // module has the same colour as button's parent (shape)
    displayModule(colour)
    let shapeContainer = document.getElementById("shape-container")
    shapeContainer.style.display = "none"

    // // fill module with text and back button when anim. almost done
    let module = document.getElementById("module")
    moduleAnimDone(btnClicked, module, restoreInitialPage)
}

// Helper function that creates and displays the module
function displayModule(colour) {
    let module = document.createElement("DIV")
    module.id = "module"
    module.style.backgroundColor = colour
    document.body.appendChild(module)
    window.getComputedStyle(module).top; // this line forces a redraw; otherwise no anim.
    module.classList.add("expand")
    return module
}

// Helper function that waits and right as module finishes anim. prepares it
function moduleAnimDone(btnClicked, module, cleanUpFunction) {
    setTimeout(function () {
        let backArrow = document.createElement("INPUT")
        backArrow.type = "image"
        backArrow.src = "./images/noun_back_878298.png"
        backArrow.alt = "Back"
        backArrow.onclick = () => removeModule(cleanUpFunction);
        backArrow.id = "back-arrow"
        document.body.appendChild(backArrow)
        getModuleContent(btnClicked, module) // get the appropriate content
    }, 750);
}

// Helper function to get the module's appropriate content on desktop
function getModuleContent(btnClicked, module) {
    switch (btnClicked.storedInnerHTML) {
        case "Projects":
            let projHidden = document.getElementById("proj-hidden")
            module.appendChild(projHidden)
            projHidden.style.display = "block"
            break
        case "About me":
            let aboutMeHidden = document.getElementById("about-me-hidden")
            module.appendChild(aboutMeHidden)
            aboutMeHidden.style.display = "block"
            break
        case "Blog":
            let blog = document.getElementById("blog-hidden")
            module.appendChild(blog)
            blog.style.display = "block"
            break
        case "Misc.":
            let misc = document.getElementById("misc-hidden")
            module.appendChild(misc)
            misc.style.display = "block"
            break
        case "Résumé":
            let resume = document.getElementById("resume-hidden")
            module.appendChild(resume)
            resume.style.display = "block"
            break
        default:
            break
    }
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
            if (clickedButtonId === "blog" && button.id === "blog-alt") {continue} // special cases
            if (clickedButtonId === "resume" && button.id === "resume-alt") {continue} 
            button.storedInnerHTML = button.innerHTML
            button.innerHTML = ""
        }
    }
}

// Triggers a brief animation before deleting the module
// from the page. Places listener which upon completion
// calls restoreInitialPage
function removeModule(callbackAfterAnim) {
    let module = document.getElementById("module")
    module.addEventListener("transitionend", callbackAfterAnim, {once: true})
    module.classList.remove("expand") // first animate removal of module
    let backArrow = document.getElementById("back-arrow")
    backArrow.remove()
    // Hide content and then put back in main body
    let content = module.children[0]
    content.style.display = "none";
    document.body.appendChild(content)
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
        shape.classList.remove("textclicked")
        shape.classList.remove("centred")
    }

    toggleAlts()  // go back to non-animation labels for correct z-value

    let buttons = document.getElementsByTagName("BUTTON")
    for (let button of buttons) {  // give buttons text again
        button.innerHTML = button.storedInnerHTML
        button.disabled = false
        button.classList.remove("no-hover")
    }

    document.getElementById("footer").style.display = "grid"
}

function restoreInitialPageMobile() {

    let module = document.getElementById("module")
    module.remove()

    let menu = document.getElementById("mobile-menu")
    menu.style.display = "block"
}

// Helper function that maps the button to its correct shape
// regardless of the parent eleement

function getCorrectShape(btnClicked) {
    switch (btnClicked.id) {
    case "resume":
         return document.getElementById("blue")
    case "blog":
         return document.getElementById("blue")
     default:
         return btnClicked.parentElement
    }
}

// Helper function that gets the button displayed during anim.
function getDisplayButton(btnClicked) {
    switch (btnClicked.id) {
    case "resume":
         return document.getElementById("resume-alt")
    case "blog":
         return document.getElementById("blog-alt")
     default:
         return btnClicked
    }
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

// Mobile
// function called when user chooses option from mobile menu
function onClickMobile(btnClicked) {
    btnClicked.storedInnerHTML = btnClicked.innerHTML
    let menu = document.getElementById("mobile-menu").style.display = "none"
    let module
    if (btnClicked.innerHTML === "Projects") {   // special case; projects looks better in red
        module = displayModule(window.getComputedStyle(document.getElementById("blog-mobile")).getPropertyValue("background-color"))
    } else {
        module = displayModule(window.getComputedStyle(btnClicked.parentElement).getPropertyValue("background-color")) // display module
    }
    moduleAnimDone(btnClicked, module, restoreInitialPageMobile)
}
