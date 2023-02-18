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
const modal = document.getElementById("myModal");
const closeBtn = document.getElementById("js-close-btn");
const span = document.getElementsByClassName("close")[0];

closeBtn.onclick = function() {
    modal.style.display = "none";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
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
    if (email) {
        return !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(email))
    } else {
        return true
    }
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
            modal.style.display = "block"
            submitButton.disabled = false
            input.disabled = false
            form.reset()
        })
        .catch(e => {
            console.log(e.message)
            submitButton.disabled = false
            input.disabled = false
        })
}

