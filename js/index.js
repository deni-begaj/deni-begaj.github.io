function updateHTMLElement(id, value) {
    const element = document.getElementById(id);
    if (element !== null && element !== undefined) {
        element.innerText = value;
    }
}

function getHTMLElement(id) {
    const element = document.getElementById(id);
    return element;
}

function onContactFormSubmitted() {
    const name = getHTMLElement('name');
    const email = getHTMLElement('email');
    const subject = getHTMLElement('subject');
    const message = getHTMLElement('message');
    alert("The form was submitted");
    console.log(countryCodes);
}

function addCountryCodesToSelect() {
    const prefixSelect = getHTMLElement('prefix');
    for(const prefix of countryCodes) {
        const option = document.createElement('option');
        option.text = prefix.name;
        option.value = prefix.dial_code;
        prefixSelect.add(option);
    }
}


// Age calculation
const birthDate = new Date('1998-02-02');
const yearsDate = new Date ( Date.now() - birthDate ) ;
const years = Math.abs(yearsDate.getUTCFullYear() - 1970);
updateHTMLElement('my-age', years);


// Constants
const website = 'deni-begaj.github.io';
updateHTMLElement('my-website', website);

const certificates = 5;
updateHTMLElement('my-certificates', certificates);
const customers = 13;
updateHTMLElement('my-customers', customers);
const projects = 15;
updateHTMLElement('my-projects', projects);
const bugsSolved = 13;
updateHTMLElement('my-bugsSolved', bugsSolved);

addCountryCodesToSelect();