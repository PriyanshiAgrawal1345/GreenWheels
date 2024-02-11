function calculate() {
    var electricity = parseFloat(document.getElementById('electricity').value);
    var vehicleDistance = parseFloat(document.getElementById('vehicle-distance').value);

    var electricityFootprint = electricity * 0.542; // 0.542 kg CO2 per kWh
    var vehicleFootprint = vehicleDistance * 0.404; // 0.404 kg CO2 per mile

    var totalFootprint = electricityFootprint + vehicleFootprint;

    document.getElementById('result').innerHTML = "Your total carbon footprint is approximately " + totalFootprint.toFixed(2) + " kg CO2 per day.";
}