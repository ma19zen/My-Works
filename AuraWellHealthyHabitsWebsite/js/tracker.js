document.getElementById("weightForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let date = document.getElementById("date").value;
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;
    
    let progressDiv = document.getElementById("progress");
    let entry = document.createElement("p");
    entry.textContent = `Date: ${date}, Weight: ${weight} kg, Height: ${height} m`;
    progressDiv.appendChild(entry);
    
    document.getElementById("weightForm").reset();
});
