const contactForm = document.querySelector('.contact-form');
let person = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message'); 

contactForm.addEventListener('submit', (e)=> {
    e.preventDefault();
   
    let formData = {
        person: person.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
        console.log(xhr.responseText)
        if(xhr.responseText == 'success') {
            alert('Email Sent');
            person.value =''
            email.value =''
            subject.value =''
            message.value =''
        } else {
            alert('Something went wrong.');
        }
    }
    xhr.send(JSON.stringify(formData));
})
