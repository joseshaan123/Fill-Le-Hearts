gsap.registerPlugin(ScrollTrigger);

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

function transitionToPage(url) {
  const circle = document.getElementById('circle-transition');

  gsap.to(circle, {
    duration: 0.8,
    width: "300vw",
    height: "300vw",
    ease: "power4.inOut",
    onComplete: () => {
      window.location.href = url;
    }
  });
}
document.querySelectorAll("a").forEach(link => {
  const url = link.href;
  link.addEventListener("click", (e) => {
    if (url.includes(window.location.hostname)) {
      e.preventDefault();
      transitionToPage(url);
    }
  });
});
window.addEventListener("load", () => {
  const circle = document.getElementById('circle-transition');
  gsap.fromTo(circle, {
    width: "300vw",
    height: "300vw"
  }, {
    duration: 1,
    width: 0,
    height: 0,
    ease: "power4.out",
    delay: 0.2
  });
});
