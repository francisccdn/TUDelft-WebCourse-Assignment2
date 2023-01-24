const VALID_INPUT = "valid";
const validInputMsg = "Looks good!";

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTUVWXYZ";

const formEl = document.getElementById("signupform")
const inputFieldsParentEl = document.getElementById("sign-up-inputs")

const fieldRules = {
    "Username" : (value) => {
        if (value == "" || value == null) {
            return "Please input a username";
        }

        if (value.length < 5) {
            return "Username must be at least 5 characters";
        }

        if (value.length > 12) {
            return "Username must be at most 12 characters";
        }

        const firstChar = value.charAt(0);
        if (firstChar !== firstChar.toUpperCase()) {
            return "First character must be uppercase";
        }

        const lastChar = value.charAt(value.length - 1);
        if (alphabet.includes(lastChar)) {
            return "Last character must be number or special character";
        }

        return VALID_INPUT;
    },
    "Password" : (value) => {return VALID_INPUT;}, // TODO
    "Name" : (value) => {return VALID_INPUT;}, // TODO
    "Address" : (value) => {return VALID_INPUT;},
    "Country" : (value) => (value) => {
        if (value == "" || value == null) {
            return "This is a required field";
        }

        return VALID_INPUT;
    },
    "ZIP code" : (value) => {
        if (value == "" || value == null) {
            return VALID_INPUT;
        }

        if (value.length != 6) {
            return "Not a valid ZIP code";
        }

        for (let i = 0; i < 4; i++) {
            const char = value.charAt(i);
            
            if (isNaN(parseInt(char))) {
                return "First four characters must be digits";
            }
        }
        for (let i = 4; i < 6; i++) {
            const char = value.charAt(i);
            
            if (!alphabet.includes(char)) {
                return "Last two characters must be letters";
            }
        }
    
        return VALID_INPUT;
    },
    "Email" : (value) => {return VALID_INPUT;}, // TODO
    "Sex" : (value) => {
        if (value == "" || value == null) {
            return "This is a required field";
        }

        return VALID_INPUT;
    },
    "Language" : (value) => (value) => {
        if (value == "" || value == null) {
            return "This is a required field";
        }

        return VALID_INPUT;
    },
    "Bio" : (value) => {return VALID_INPUT;},
    "Reason of use" : (value) => {return VALID_INPUT;},
    "A fun joke" : (value) => {return VALID_INPUT;},
}

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
