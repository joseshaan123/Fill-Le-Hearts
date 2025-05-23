console.log("Script loaded");
document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    console.log("Form submitted");

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:4000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('response-message').innerText = result.message;
            this.reset();
        } else {
            document.getElementById('response-message').innerText = result.error || 'An error occurred.';
        }
    } catch (error) {
        document.getElementById('response-message').innerText = 'Failed to connect to the server.';
        console.error(error);
    }
});