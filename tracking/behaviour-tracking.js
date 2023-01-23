// Initialize variables that store tracked data
let startTime = Date.now();
let numClicks = 0;
let numKeyPresses = 0;

// Hide form and show tracked data when submit is clicked
const submitButtonEl = document.getElementsByClassName("submitButton")[0];
submitButtonEl.onclick = () => {
    // Get elements that will show data
    const numClicksEl = document.getElementById("num-clicks");
    const timeSpentEl = document.getElementById("time-spent");
    const numKeyPressesEl = document.getElementById("num-key-presses");
    const numCharsEl = document.getElementById("num-chars");
    
    // Put tracked data in elements
    numClicksEl.innerHTML += numClicks;
    timeSpentEl.innerHTML += computeTimeSpent();
    numKeyPressesEl.innerHTML += numKeyPresses;
    numCharsEl.innerHTML += computeNumCharsTyped();
    
    // Hide form and show tracked data
    const signUpBoxEl = document.getElementById("signUpPage");
    const trackedDataEl = document.getElementById("tracked-data");

    signUpBoxEl.hidden = true;
    trackedDataEl.hidden = false;
};

// Track clicks
document.onclick = () => {
    numClicks++;
}

// Track key presses
const signUpBoxEl = document.getElementById("signUpPage");
signUpBoxEl.onkeydown = () => {
    numKeyPresses++;
}

// Track number of characters typed
function computeNumCharsTyped() {
    const signUpFormEl = document.getElementById("signupform");
    let total = 0;
    for (const field of signUpFormEl.children) {
        if (field.localName == "input") {
            total += field.value.length; 
        }
    }
    return total;
}

// Track time spent on page
function computeTimeSpent() {
    const ms = Date.now() - startTime;
    const sec = Math.floor(ms / 1000);
    const min = Math.floor(sec / 60);
    const secOverMin = sec - (min*60);
    
    if (min > 0) {
        return min + " minutes and " + secOverMin + " seconds";
    }
    else {
        return sec + " seconds";
    }
}
