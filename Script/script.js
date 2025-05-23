gsap.registerPlugin(ScrollTrigger);
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll('.animate-left, .animate-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-show');
      }
    });
  }, {
    threshold: 0.1
  });

  animatedElements.forEach(el => {
    observer.observe(el);
  });
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
