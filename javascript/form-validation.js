const VALID_INPUT = "valid";
const validInputMsg = "Looks good!";

const formEl = document.getElementById("signupform")
const inputFieldsParentEl = document.getElementById("sign-up-inputs")

const fieldRules = {
    "Username" : (value) => {
        if (value == "" || value == null) {
            return "Please input a username";
        }

        return VALID_INPUT;
    },
    "Password" : (value) => {return VALID_INPUT;},
    "Name" : (value) => {return VALID_INPUT;},
    "Address" : (value) => {return VALID_INPUT;},
    "Country" : (value) => {return VALID_INPUT;},
    "ZIP code" : (value) => {return VALID_INPUT;},
    "Email" : (value) => {return VALID_INPUT;},
    "Sex" : (value) => {return VALID_INPUT;},
    "Language" : (value) => {return VALID_INPUT;},
    "Bio" : (value) => {return VALID_INPUT;},
    "Reason of use" : (value) => {return VALID_INPUT;},
    "A fun joke" : (value) => {return VALID_INPUT;},
}

console.log(formEl);

formEl.addEventListener("submit", (e) => {
    let invalidInput = false;
    
    for (const div of inputFieldsParentEl.children) {
        const field = div.children[0];
        if (field.localName != "input") { continue; }

        const fieldName = field.placeholder;
        const msgEl = document.getElementById(fieldName + "-msg");
        
        const valueCheck = fieldRules[fieldName];
        const check = valueCheck(field.value);
        if (check == VALID_INPUT) {
            msgEl.innerHTML = validInputMsg;
            msgEl.style = "color: green;";
        }
        else {
            msgEl.innerHTML = check;
            msgEl.style = "color: red;";
            invalidInput = true;
        }
    }

    if (invalidInput) {
        e.preventDefault();
    }
});
