window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("adminForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = {
        RowNumber: form.RowNumber.value.trim(),
        AttendedBy: form.AttendedBy.value.trim(),
        FailureResolved: form.FailureResolved.value.trim(),
        Remarks: form.Remarks.value.trim()
      };

      const scriptURL = "https://script.google.com/macros/s/AKfycbzXHEjdmtSgD-TMbECwB3k1D7g6De_LdvEOZzn-s35dXQkbbx2LlZI9TjAhRQFe3s3qAg/exec";

      fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(formData)
      })
        .then(res => res.json())
        .then(data => {
          if (data.result === "success") {
            document.getElementById("responseMsg").textContent = "✅ Complaint updated successfully!";
            form.reset();
          } else {
            document.getElementById("responseMsg").textContent = "❌ Error: " + data.message;
          }
        })
        .catch(error => {
          document.getElementById("responseMsg").textContent = "❌ Error updating complaint.";
          console.error("Error:", error);
        });
    });
  }

  // ✅ Status checker function
  window.checkStatus = function () {
    const input = document.getElementById("statusIDInput").value.trim();
    if (!input || isNaN(input)) {
      document.getElementById("statusResult").textContent = "❌ Please enter a valid complaint number.";
      return;
    }

    const complaintID = `WR-${input}`;
    const scriptURL = "https://script.google.com/macros/s/AKfycby0RLrGau8X7g6ujXoUHklY2eeu1X7b_8emsSbYGyEGLGcUlenEEgxAhulsCUjyAllA5Q/exec";

    fetch(`${scriptURL}?complaintID=${encodeURIComponent(complaintID)}`)
      .then(res => res.json())
      .then(data => {
        if (data.status) {
          document.getElementById("statusResult").innerHTML =
            `✅ <strong>Status:</strong> ${data.status}<br>
             📝 <strong>Remarks:</strong> ${data.remarks}<br>
             👷 <strong>Attended By:</strong> ${data.attendedBy}`;
        } else {
          document.getElementById("statusResult").textContent = "❌ Complaint ID not found.";
        }
      })
      .catch(err => {
        console.error("Status check error:", err);
        document.getElementById("statusResult").textContent = "❌ Error checking status.";
      });
  };
});