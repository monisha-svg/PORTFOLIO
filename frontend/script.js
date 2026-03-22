// SEND TO BACKEND
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  try {
    const res = await fetch("https://portfolio-monisha.onrender.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
      document.getElementById("contactForm").innerHTML =
        '<h3>✅ Thank you! Your message has been sent successfully!</h3>';
    }
  } catch (err) {
    alert("Failed to send message. Please try again.");
  }
});