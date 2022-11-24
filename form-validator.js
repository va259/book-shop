const datePicker = document.getElementById("datePicker");
const tomorrow = new Date(Date.now() + (3600 * 1000 * 24)).toISOString().split("T")[0];
datePicker.setAttribute('min', tomorrow);
