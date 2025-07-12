document.getElementById("subscriberForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = document.getElementById("subscriberForm");

  const formData = {
    Name: form.Name.value,
    Designation: form.Designation.value,
    Department: form.Department.value,
    AutoTel: form.AutoTel.value,
    Phone: form.Phone.value,
    RequestType: form.RequestType.value,
    ComplaintType: form.ConnectionType ? form.ConnectionType.value : '',
    ComplaintDetails: form.ComplaintDetails ? form.ComplaintDetails.value : '',
    Status: "Pending"
  };

  const scriptURL ="https://script.google.com/macros/s/AKfycbxSMQxzGvBsJZUeem5YffSzrm8Z9U-aZTnqyzrtoBV9rMpOckv0VcFEHX2j5QIeWYZb6Q/exec";

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(formData)
  })
    .then((res) => res.text())
    .then(data => {
  if (form.RequestType.value === "New Connection") {
    const popup = document.getElementById("connectionPopup");
    popup.classList.remove("opacity-0", "pointer-events-none");
    setTimeout(() => {
      popup.classList.add("opacity-0", "pointer-events-none");
    }, 4000);
  }

  document.getElementById("responseMsg").textContent = "✅ Submitted successfully!";
  form.reset();
  toggleComplaintFields();
    })
    .catch((err) => {
      console.error("Error!", err.message);
      document.getElementById("responseMsg").textContent = "❌ Something went wrong.";
    });
});