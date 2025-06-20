document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    localStorage.setItem('username', username);
    window.location.href = 'index.html';
});


document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const Password = document.getElementById('password').value;
    const retypePassword = document.getElementById('retypepassword').value;

    if (Password !== retypePassword) {
        alert("The pass words arn't matched")
    } else {
        localStorage.setItem('username', username);
        window.location.href = 'index.html';
    }
});
