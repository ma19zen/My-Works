document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const confirmationMessage = document.getElementById('confirmationMessage');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        

        if (name && email && message) {

            confirmationMessage.innerHTML = `
                <p>Thank you, ${name}! Your message has been sent successfully.</p>
            `;
            confirmationMessage.style.display = 'block';
            

            contactForm.reset();
        } else {

            confirmationMessage.innerHTML = `
                <p style="color: red;">Please fill out all fields.</p>
            `;
            confirmationMessage.style.display = 'block';
        }
    });
});
