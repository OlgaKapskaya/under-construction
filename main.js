let container = document.getElementsByClassName('container')
let timer = document.getElementById('timer')

//added times block
document.addEventListener('DOMContentLoaded', function () {
    const data = ['days', 'hours', 'minutes', 'seconds']
    for (let i = 0; i < data.length; i++) {
        let excel = document.createElement('div')
        timer.appendChild(excel)
        excel.classList.add('time')

        let title = document.createElement('span')
        excel.appendChild(title)
        title.setAttribute('id', data[i])

        let wrapper = document.createElement('div')
        excel.appendChild(wrapper)
        wrapper.classList.add('text-wrapper')

        let img = document.createElement('img')
        wrapper.appendChild(img)
        img.alt = data[i]
        img.src = 'assets/img/Vector.png'

        let text = document.createElement('span')
        wrapper.appendChild(text)
        text.classList.add('text')
        text.innerHTML = data[i]
        text.style.textTransform = 'capitalize'

        let divider = document.createElement('div')
        timer.appendChild(divider)
        divider.classList.add('divider')
        if (i !== data.length - 1) divider.innerHTML = ':'
    }

//date timer logic
    const endDate = new Date("May 5, 2023 00:00:00").getTime();

    const interval = setInterval(function () {

        const now = new Date().getTime();

        const distance = endDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);


        document.getElementById("days").innerHTML = " " + days;
        document.getElementById("hours").innerHTML = addZero(hours);
        document.getElementById("minutes").innerHTML = addZero(minutes);
        document.getElementById("seconds").innerHTML = addZero(seconds);

    }, 1000);


function addZero(num) {
    if (num >= 0 && num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}


//modal window logic
function createModal(title, description = '') {
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

function useModal() {
    const modal = document.getElementById("myModal");
    const closeBtn = document.getElementById("js-close-btn");
    const span = document.getElementsByClassName("close")[0];

    closeBtn.onclick = function () {
        deleteModal()
    }
    span.onclick = function () {
        deleteModal()
    }
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

function deleteModal() {
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
            form.reset()
        })
        .catch(e => {
            createModal(e.message)
            useModal()
        })
        .finally(() => {
            submitButton.disabled = false
            input.disabled = false
        })
}
})

