function calculateBMI() {

    const height = parseFloat(document.getElementById('bmiHeight').value) / 100;
    const weight = parseFloat(document.getElementById('bmiWeight').value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert('Please enter valid height and weight.');
        return;
    }


    const bmi = weight / (height * height);
    let bmiCategory;


    if (bmi < 18.5) {
        bmiCategory = 'Underweight';
    } else if (bmi < 24.9) {
        bmiCategory = 'Normal weight';
    } else if (bmi < 29.9) {
        bmiCategory = 'Overweight';
    } else {
        bmiCategory = 'Obesity';
    }


    document.getElementById('bmiResult').innerHTML = `
        <p>Your BMI is ${bmi.toFixed(1)}</p>
        <p>Category: ${bmiCategory}</p>
    `;
}
