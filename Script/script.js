gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(".product-card");
  const animatedElements = document.querySelectorAll('.animate-left, .animate-right');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-show');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  animatedElements.forEach(el => observer.observe(el));

  function animateProductCards() {
    productCards.forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.8,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
      });
    });
  }

  function animateExpertiseContainers() {
    const containers = [
      { selector: ".container", x: -100, y: 0 },
      { selector: ".container-2", x: 100, y: 0 }
    ];

    containers.forEach(({ selector, x, y }) => {
      gsap.from(selector, {
        opacity: 0,
        x: x,
        y: y,
        duration: 1.2,
        scrollTrigger: {
          trigger: selector,
          start: "top 90%",
        },
      });
    });
  }

  const circle = document.getElementById('circle-transition');

  if (!circle) {
    animateProductCards();
    animateExpertiseContainers();
  } else {
    window.addEventListener("load", () => {
      gsap.fromTo(circle,
        { width: "300vw", height: "300vw" },
        {
          duration: 1,
          width: 0,
          height: 0,
          ease: "power4.out",
          delay: 0.2,
          onComplete: () => {
            animateProductCards();
            animateExpertiseContainers();
          }
        }
      );
    });
  }
});

function transitionToPage(url) {
  const circle = document.getElementById('circle-transition');
  if (!circle) return;

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
    if (url.includes(window.location.hostname) && !link.hasAttribute("target")) {
      e.preventDefault();
      transitionToPage(url);
    }
  });
});
