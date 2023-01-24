const VALID_INPUT = "valid";
const validInputMsg = "Looks good!";

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*";

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
    "Password" : (value) => {
        var validInputMsgPassword = "Looks good!";

        if (value == "" || value == null) {
            return "Please input a password";
        }

        if (value.length < 12) {
            return "Password must be at least 12 characters";
        }

        for (let i=0; i<value.length; i++){
            if(alphabet.includes(value[i])){
                break;
            }

            if(i==value.length-1){
                return "Password must contain at least one uppercase and at least one lowercase letter"
            }
        }

        for (let i=0; i<value.length; i++){
            if(numbers.includes(value[i])){
                break;
            }

            if(i==value.length-1){
                return "Password must contain at least one number"
            }
        }

        for (let i=0; i<value.length; i++){
            if(symbols.includes(value[i])){
                break;
            }

            if(i==value.length-1){
                return "Password must contain at least one special symbol (!@#$%^&*)"
            }

            if(value.length < 14){
                validInputMsgPassword = "This is ok, but a password of more than 14 characters is stronger!";
            } //TODO doesntwooork. 
        }

        
        return VALID_INPUT;
    },

    "Name" : (value) => {
        if (value == "" || value == null) {
            return "Please input a name";
        }

        for (let i=0; i<value.length; i++){
            if(!alphabet.includes(value[i])){
                return "Name can only contain letters"
            }
        }

        return VALID_INPUT;
    }, 
    "Address" : (value) => {return VALID_INPUT;},
    "Country" : (value) => (value) => {
        if (value == "" || value == null) {
            return "This is a required field";
        }

        return VALID_INPUT;
    },
    "ZIP code" : (value) => {
        if (value == "" || value == null) {
            return "Please enter a ZIP code";
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
    "Email" : (value) => {
        if (value == "" || value == null) {
            return "Please input an email address";
        }

        if(!(value.includes('@'))){
            return "Please enter a valid email address"
        }

        if(!(value.includes('.com') || value.includes('.nl') || value.includes('.org') || value.includes('.net') || value.includes('.in') || value.includes('.us') || value.includes('.info'))){
            return "Please enter a valid email address"
        } //not complete but for our users will probably be fine

        const arr = value.split('@');
        if(arr[0] == '' || arr[1] == '' || arr[1].split('.')[0] == ''){
            return "Please enter a valid email address"
        } //checking that there is something before and after the @ and period

        if(value[0] == '.' || value.includes('..')){
            return "Please enter a valid email address"
        } //checking that the first char is not a period and that there are no double periods

        return VALID_INPUT;
    },
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

        if(check == VALID_INPUT && fieldName =='Password'){ //TODO all i have created now is a bug
            msgEl.innerHTML = validInputMsgPassword;
            msgEl.style = "color: orange;";
        }
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
