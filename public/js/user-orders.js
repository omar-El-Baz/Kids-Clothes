document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-details');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const orderDetails = button.nextElementSibling;
            orderDetails.classList.toggle('hidden');

            if (orderDetails.classList.contains('hidden')) {
                button.textContent = 'View Details';
            } else {
                button.textContent = 'Hide Details';
            }
        });
    });
});
