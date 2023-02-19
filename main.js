//date timer logic
const endDate = new Date("May 5, 2023 00:00:00").getTime();

const interval = setInterval(function() {

    const now = new Date().getTime();

    const distance = endDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);


    document.getElementById("days").innerHTML = " " + days;
    document.getElementById("hours").innerHTML = " " + hours;
    document.getElementById("minutes").innerHTML = " " + minutes;
    document.getElementById("seconds").innerHTML = " " + seconds;

}, 1000);


//modal window logic
function createModal(title, description = ''){
    let container = document.getElementsByClassName('container')

    let modal = document.createElement('div')
    container[0].appendChild(modal)
    modal.classList.add('modal')
    modal.setAttribute('id', 'myModal')

    let modalContent = document.createElement('div')
    modal.appendChild(modalContent)
    modalContent.classList.add('modal-content')

    let close = document.createElement('span')
    modalContent.appendChild(close)
    close.classList.add('close')
    close.innerHTML = '&times;'

    let modalContentBody = document.createElement('div')
    modalContent.appendChild(modalContentBody)
    modalContentBody.classList.add('modal-content-body')

    let modalContentTitle = document.createElement('h2')
    modalContentBody.appendChild(modalContentTitle)
    modalContentTitle.classList.add('modal-content-title')
    modalContentTitle.innerHTML = title

    let modalContentDescription = document.createElement('div')
    modalContentBody.appendChild(modalContentDescription)
    modalContentDescription.classList.add('modal-content-description')
    modalContentDescription.innerHTML = description

    let closeBtn = document.createElement('button')
    modalContentBody.appendChild(closeBtn)
    closeBtn.classList.add('event-button')
    closeBtn.classList.add('modal-content-close-btn')
    closeBtn.setAttribute('id', 'js-close-btn')
    closeBtn.innerHTML = 'Close'
}
function useModal(){
    const modal = document.getElementById("myModal");
    const closeBtn = document.getElementById("js-close-btn");
    const span = document.getElementsByClassName("close")[0];

    closeBtn.onclick = function() {
        deleteModal()
    }
    span.onclick = function() {
        deleteModal()
    }
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}
function deleteModal(){
    const container = document.getElementsByClassName('container')[0]
    const modal = document.getElementById("myModal");
    container.removeChild(modal)
}


//sent form logic
const form = document.getElementById('form');
const input = document.getElementById('js-notification-form-input')
const submitButton = document.getElementById('js-submit-btn')

form.addEventListener('submit', formSubmit);

function formSubmit(e) {
    e.preventDefault();

    let error = validate();

    if (!error) {
        input.classList.remove('error')
        sentForm();
    } else {
        input.classList.add('error')
        console.log('error')
    }
}
function validate() {
    const email = input.value.trim()
    let isError = true
    if (email) {
        isError = !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(email))
    }
    return isError
}

function sentForm() {
    const formData = new FormData(form);
    const object = {};
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    submitButton.disabled = true
    input.disabled = true
    fetch('server.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(object)
    })
        .then(data => {
            createModal('SUCCESS!', 'You have successfully subscribed to the email newsletter')
            useModal()
            submitButton.disabled = false
            input.disabled = false
            form.reset()
        })
        .catch(e => {
            createModal(e.message)
            useModal()
            submitButton.disabled = false
            input.disabled = false
        })
}

