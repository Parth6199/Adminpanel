document.getElementById("adminForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = {
    RowNumber: form.RowNumber.value.trim(),
    AttendedBy: form.AttendedBy.value.trim(),
    FailureResolved: form.FailureResolved.value.trim(),
    Remarks: form.Remarks.value.trim()
  };

  const scriptURL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"; // Replace with your Apps Script URL

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(formData)
  })
    .then(response => response.text())
    .then(data => {
      document.getElementById("responseMsg").textContent = "✅ Complaint updated successfully!";
      form.reset();
    })
    .catch(error => {
      document.getElementById("responseMsg").textContent = "❌ Error updating complaint.";
      console.error("Error:", error);
    });
});