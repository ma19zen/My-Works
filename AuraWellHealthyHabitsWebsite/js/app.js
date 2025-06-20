function openModal(infoId) {
    var modal = document.getElementById('modal');
    var modalBody = document.getElementById('modal-body');

    switch (infoId) {
        case 'info1':
            modalBody.innerHTML = '<img src="./assets/diet.PNG" alt="Diet"> <h2>Diet</h2><p>A healthy diet is essential for maintaining good health and well-being. It involves consuming a variety of foods in the right proportions and consuming the right amount of food and drink to achieve and maintain a healthy body weight.</p>';
            break;
        case 'info2':
            modalBody.innerHTML = '<img src="./assets/exercise.jpg" alt="exercise"> <h2>Exercise</h2><p>Regular exercise helps improve cardiovascular health, build muscle, and boost mood. Aim for a mix of aerobic exercises and strength training.</p>';
            break;
        case 'info3':
            modalBody.innerHTML = '<img src="./assets/sleep.PNG" alt="sleep"> <h2>Sleep</h2><p>Good quality sleep is crucial for maintaining overall health and well-being. It affects nearly every aspect of our lives, from energy levels and concentration to mood and physical health. To maximize the benefits of sleep.</p>';
            break;
        case 'info4':
            modalBody.innerHTML = '<img src="./assets/hydration.PNG" alt="hydration"> <h2>Hydration</h2><p>Staying hydrated is crucial for maintaining overall health, as it supports vital bodily functions, enhances energy levels, and promotes clear thinking throughout the day.</p>';
            break;
        case 'info5':
            modalBody.innerHTML = '<img src="./assets/mindfulness.png" alt="mindfulness"><h2>Mindfulness</h2><p>Mindfulness practices, such as meditation and deep breathing exercises, can help manage stress and improve mental well-being.</p>';
            break;
        case 'info6':
                modalBody.innerHTML = '<img src="./assets/screen time.jpg" alt="Screen Time"><h2>Screen Time</h2><p>Managing screen time effectively can improve productivity and reduce eye strain. Set limits on your device usage and take regular breaks.</p>';
            break;
    }

    modal.style.display = 'block';
}

function closeModal() {
    var modal = document.getElementById('modal');
    modal.style.display = 'none';
}


window.onclick = function(event) {
    var modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

const username = localStorage.getItem('username');
// document.getElementById('greeting').innerText = `Hello, ${username}!`;
document.getElementById('greeting').innerText = `Hello,`;
