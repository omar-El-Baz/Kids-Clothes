document.addEventListener('DOMContentLoaded', () => {
    // change Name
    const changeNameBtn = document.getElementById('change-name-btn');
    const nameForm = document.getElementById('name-form');
    const saveNameBtn = document.getElementById('save-name-btn');
    const nameDisplay = document.getElementById('name-display');
    const newName = document.getElementById('new-name');

    changeNameBtn.addEventListener('click', () => {
        nameForm.classList.toggle('hidden');
    });

    saveNameBtn.addEventListener('click', () => {
        nameDisplay.textContent = newName.value;
        nameForm.classList.add('hidden');
    });

    // change Email
    const changeEmailBtn = document.getElementById('change-email-btn');
    const emailForm = document.getElementById('email-form');
    const saveEmailBtn = document.getElementById('save-email-btn');
    const emailDisplay = document.getElementById('email-display');
    const newEmail = document.getElementById('new-email');

    // email validation regex pattern
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    changeEmailBtn.addEventListener('click', () => {
        emailForm.classList.toggle('hidden');
    });

    saveEmailBtn.addEventListener('click', () => {
        const enteredEmail = newEmail.value;

        // check if the email is valid
        if (!emailRegex.test(enteredEmail)) {
            alert('Please enter a valid email address.');
            return; // don't save the email if it's invalid
        }

        emailDisplay.textContent = enteredEmail;
        emailForm.classList.add('hidden');
    });

    // Change Address
    const changeAddressBtn = document.getElementById('change-address-btn');
    const addressForm = document.getElementById('address-form');
    const saveAddressBtn = document.getElementById('save-address-btn');
    const addressDisplay = document.getElementById('address-display');
    const newAddress = document.getElementById('new-address');

    changeAddressBtn.addEventListener('click', () => {
        addressForm.classList.toggle('hidden');
    });

    saveAddressBtn.addEventListener('click', () => {
        addressDisplay.textContent = newAddress.value;
        addressForm.classList.add('hidden');
    });

    // wishlist, orders, and sign Out
    document.getElementById('wishlist-btn').addEventListener('click', () => {
        window.location.href = '../src/views/wishlist.html'; 
    });

    document.getElementById('orders-btn').addEventListener('click', () => {
        window.location.href = 'orders.html';
    });

   

    document.getElementById('sign-out-btn').addEventListener('click', () => {
        window.location.href = 'signin.html';
    });

});
