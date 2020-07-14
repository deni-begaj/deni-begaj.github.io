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
    const name = getHTMLElement('name').value;
    if (name.va === null || name === undefined || name === '') {
        getHTMLElement('error-message').innerText = 'Your name is required';
        return;
    }
    const email = getHTMLElement('email').value;
    if (email === null || email === undefined || email === '') {
        getHTMLElement('error-message').innerText = 'Your email is required';
        return;
    }
    const prefix = getHTMLElement('prefix').value;
    const phone = getHTMLElement('phone').value;
    if (prefix === null || prefix === undefined || prefix === '') {
        getHTMLElement('error-message').innerText = 'Your prefix is required';
        return;
    } else if (phone === null || phone === undefined || phone === '') {
        getHTMLElement('error-message').innerText = 'Your phone is required';
        return;
    }
    const subject = 'Deni-Begaj Website: Request for discussion from ' + name;
    const message = getHTMLElement('message').value;
    if (message === null || message === undefined || message === '') {
        getHTMLElement('error-message').innerText = 'A message is required to submit inquiry';
        return;
    }
    const nowDate = new Date().toLocaleDateString();
    const fullMessage = 'Request from Website:' + ' \n\n\n' +
                        message + '\n\n\n' +
                        'Visitor Name: ' + name + '\n' +
                        'Visitor Phone:' + encodeURI(prefix + phone) + '\n' +
                        'Inquiry Date: '  + nowDate;
    const mailToString = 'mailto:' + myEmail + '?subject=' + encodeURI(subject) + '&body=' + encodeURI(fullMessage);

    window.open(mailToString, '_blank');
    getHTMLElement('success-message').innerText = 'Your email is ready to be sent. Check the next tab.';
    return false;
}

function addCountryCodesToSelect() {
    const prefixSelect = getHTMLElement('prefix');
    for(const prefix of countryCodes) {
        const option = document.createElement('option');
        option.text = prefix.name + ' (' + prefix.dial_code + ')';
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
const myEmail = 'denibegaj98@gmail.com';
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