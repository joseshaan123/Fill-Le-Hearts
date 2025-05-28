// Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

gsap.set([".hero-left", ".hero-right", ".logo", ".hero-txt", ".border", ".h-image"], {
  x: 0,
  y: 0,
  rotation: 0,
  opacity: 1,
  transformOrigin: "center center",
  force3D: true
});

const heroTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top center",
    end: "bottom top",
    scrub: true,
    markers: false
  }
});


heroTimeline
  .to(".hero-left", {
    x: "-70vw",
    y: "-30vh",
    rotation: -15,
    opacity: 0,
    ease: "power1.inOut"
  }, 0.2)
  .to(".hero-right", {
    x: "70vw",
    y: "-30vh",
    rotation: 15,
    opacity: 0,
    ease: "power1.inOut"
  }, 0.2);

heroTimeline
  .to(".logo", {
    x: -100,
    y: -100,
    opacity: 50,
    ease: "power1.inOut"
  }, 0)

  .to(".hero-txt", {
    x: -200,
    y: -150,
    opacity: 0,
    ease: "power1.inOut"
  }, 0.10)

  .to(".border", {
    y: -100,
    opacity: 0,
    ease: "power1.inOut"
  }, 0.20)

  .to(".h-image", {
    x: 100,
    y: -100,
    opacity: 0,
    ease: "power1.inOut"
  }, 0.1);


gsap.utils.toArray('.feature-item').forEach((item, index) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 80%",
      toggleActions: "play reverse play reverse"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay: index * 0.1
  });
});


gsap.from('.halwa-image', {
  scrollTrigger: {
    trigger: '.halwa-image',
    start: "top 80%",
    toggleActions: "play reverse play reverse"
  },
  x: -100,
  opacity: 0,
  duration: 1.2,
  ease: "power2.out"
});



gsap.fromTo('.section3-img',
  { opacity: 0, y: 60 },
  {
    opacity: 1, y: 0,
    scrollTrigger: {
      trigger: '.section3-img',
      start: 'top 80%',
      end: 'top 20%',
      scrub: true
    }
  }
);


  const textTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".scroll-animation-section",
      start: "top center",
      end: "bottom center",
      scrub: true,
      markers: false
    }
  });

  textTimeline
    .to(".scroll-text-what", { x: "-100vw", duration: 2 })
    .to(".scroll-text-everyone", { x: "100vw", duration: 2 }, "<")
    .to(".scroll-text-talking", { y: "100vh", duration: 2 }, "<");

  
  const cards = gsap.utils.toArray(".media-card");

  cards.forEach((card, index) => {
    const direction = index % 2 === 0 ? -1 : 1;

    gsap.from(card, {
      scrollTrigger: {
        trigger: ".cards-container",
        start: "top center",
        end: "bottom center",
        scrub: true,
        markers: false
      },
      x: direction * 100 + "vw",
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.out"
    });
  });


gsap.fromTo(".text-background h1", 
  {
    y: 100,
    opacity: 0
  },
  {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.15,
    scrollTrigger: {
      trigger: ".h-pull",
      start: "top 75%",
      end: "bottom center",
      toggleActions: "play reverse play reverse",
      markers: false
    }
  }
);




document.addEventListener("DOMContentLoaded", () => {
  const mediaCards = document.querySelectorAll('.media-card');

  mediaCards.forEach(card => {
    card.addEventListener('click', () => {
      const source = card.querySelector('video source').src;

      const overlay = document.createElement('div');
      overlay.classList.add('video-popup-overlay');

      const popupCard = document.createElement('div');
      popupCard.classList.add('popup-video-card');

      const popupVideo = document.createElement('video');
      popupVideo.src = source;
      popupVideo.controls = true;
      popupVideo.autoplay = true;
      popupVideo.muted = false;
      popupVideo.playsInline = true;

      popupCard.appendChild(popupVideo);
      overlay.appendChild(popupCard);
      document.body.appendChild(overlay);
      document.body.classList.add('no-scroll');

      gsap.fromTo(popupCard, {
        scale: 0.6,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out"
      });

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          gsap.to(popupCard, {
            scale: 0.6,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              popupVideo.pause();
              overlay.remove();
              document.body.classList.remove('no-scroll');
            }
          });
        }
      });
    });
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
