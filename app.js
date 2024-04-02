//window event listener
eventListeners();
function eventListeners() {
    const ui = new UI();
    window.addEventListener('load', function () {
        ui.hidePreloader();
    });
    //nav btn
    document.querySelector('.navBtn').addEventListener('click', function () {
        ui.showNav();
    });
    //control video
    document.querySelector('.video-switch').addEventListener('click', function () {
        ui.videoControls();
    });
    //submit the form
    document.querySelector('.drink-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.querySelector(".input-name").value;
        const lastName = document.querySelector(".input-lastname").value;
        const email = document.querySelector(".input-email").value;
        let value = ui.isEmpty(name, lastName, email);
        if (!value) {
            let customer = new Customer(name, lastName, email);
            ui.addCustomer(customer);
            ui.showFeedback('customer added to the list', 'success');
            ui.clearFields();
        }
        else {
            ui.showFeedback('some form values are empty!', 'error')
        }
    });
    //display modal
    const links = document.querySelectorAll('.work-item-icon');
    console.log(links);
    links.forEach(function (item) {
        item.addEventListener('click', function (event) {
            ui.showModal(event);
        });
    });
    //hide modal
    document.querySelector('.work-modal-close').addEventListener('click',function(){
        ui.closeModal();
    });
}

function UI() {

}
//hide preloader
UI.prototype.hidePreloader = function () {
    document.querySelector('.preloader').style.display = 'none';
}
//shownav bar
UI.prototype.showNav = function () {
    document.querySelector('.nav').classList.toggle('nav-show');
}
//play /pause the video
UI.prototype.videoControls = function () {
    let btn = document.querySelector('.video-switch-btn');
    if (!btn.classList.contains('btn-slide')) {
        btn.classList.add('btn-slide');
        document.querySelector('.video-item').pause();
    }
    else {
        btn.classList.remove('btn-slide');
        document.querySelector('.video-item').play();
    }
}
UI.prototype.isEmpty = function (name, lastName, email) {
    let res;
    if (name === '' || lastName === '' || email === '') {
        res = true;
    }
    else {
        res = false;
    }
    return res;
}

UI.prototype.showFeedback = function (text, type) {
    const feedback = document.querySelector('.drink-form-feedback');
    if (type === 'success') {
        feedback.classList.add('success');
        feedback.innerText = text;
        this.removeAlert('success');
    }
    else if (type === 'error') {
        feedback.classList.add('error');
        feedback.innerText = text;
        this.removeAlert('error');
    }
}
//remove alert
UI.prototype.removeAlert = function (type) {
    setTimeout(function () {
        document.querySelector('.drink-form-feedback').classList.remove(type);
    }, 3000);
}
// add customer
UI.prototype.addCustomer = function (customer) {
    const images = [1, 2, 3, 4, 5];
    let random = Math.floor(Math.random() * images.length);
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML =
        `<img src="/img/person-${random}.jpeg" alt="person" class="person-thumbnail">
    <h4 class="person-name">${customer.name}</h4>
    <h4 class="last-name">${customer.lastName}</h4>`;
    document.querySelector('.drink-card-list').appendChild(div);
}
//clear fields

UI.prototype.clearFields = function () {
    document.querySelector('.input-name').value = '';
    document.querySelector('.input-lastname').value = '';
    document.querySelector('.input-email').value = '';
}

// show modal
UI.prototype.showModal = function (event) {
    event.preventDefault();
    if (event.target.parentElement.classList.contains('work-item-icon'));
    let id = event.target.parentElement.dataset.id;
    const modal = document.querySelector('.work-modal');
    const modalItem = document.querySelector('.work-modal-item');
    modal.classList.add('work-modal-show');
    modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`;
}
//hide modal
UI.prototype.closeModal=function(){
    document.querySelector('.work-modal').classList.remove('work-modal-show');
}



function Customer(name, lastName, email) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
}
