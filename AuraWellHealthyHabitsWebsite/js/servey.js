document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('survey-form');
    const resultContainer = document.getElementById('result');
    const resultFields = {
        name: document.getElementById('result-name'),
        email: document.getElementById('result-email'),
        age: document.getElementById('result-age'),
        gender: document.getElementById('result-gender'),
        height: document.getElementById('result-height'),
        weight: document.getElementById('result-weight'),
        goal: document.getElementById('result-goal'),
        diet: document.getElementById('result-diet'),
        exercise: document.getElementById('result-exercise'),
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        for (const [key, value] of formData.entries()) {
            if (resultFields[key]) {
                resultFields[key].textContent = value;
            }
        }

        resultContainer.style.display = 'block';
        form.reset();
    });
});
