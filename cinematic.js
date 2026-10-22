/* GSAP owns photo motion; main.js owns reveals and the single Lenis loop. */
(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", function () {
    document.body.classList.add("cinematic");
    gsap.from(".hero-teks > *, .hero-sisi > p", {
      y: 24, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out"
    });
    gsap.from(".hero .letterbox", {
      clipPath: "inset(8% 0 8% 0 round 22px)",
      duration: 1.4, ease: "power3.out", clearProps: "clipPath"
    });
    document.querySelectorAll(".hero .letterbox, .letterbox-sorot").forEach(function (frame) {
      gsap.fromTo(frame.querySelector("img"), { yPercent: -3, scale: 1.08 }, {
        yPercent: 3, scale: 1.08, ease: "none",
        scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.6 }
      });
    });
    gsap.fromTo(".kaki-kata", { y: 24 }, {
      y: -16, ease: "none",
      scrollTrigger: { trigger: ".kaki", start: "top bottom", end: "bottom bottom", scrub: true }
    });
    if (window.lenis) window.lenis.on("scroll", ScrollTrigger.update);
    return function () { document.body.classList.remove("cinematic"); };
  });
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
