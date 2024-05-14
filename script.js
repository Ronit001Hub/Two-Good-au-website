// SCROLL TRIGGER CODEPEN JS FILE ....

function scrollTriggerAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
scrollTriggerAnimations();

// Your Down Code

gsap.from("#nav", {
  opacity: 0,
  y: -20,
  duration: 1,
  delay: 0.1,
});

gsap.from("#page1>h1 , .inline>h1", {
  opacity: 0,
  y: 30,
  duration: 0.6,
  delay: 0.5,
  stagger: 0.3,
});

function cursorAnimation() {
  var crsr = document.querySelector(".customCursor");
  var page6_left = document.querySelector("#page6>.left");
  var page6_right = document.querySelector("#page6>.right");

  page6_left.onmouseenter = function () {
    gsap.to(crsr, {
      transform: `translate(-50%, -50%) scale(1)`,
    });
  };

  page6_left.onmouseleave = function () {
    gsap.to(crsr, {
      transform: `translate(-50%, -50%) scale(0)`,
    });
  };

  page6_left.onmousemove = function (dets) {
    gsap.to(crsr, {
      left: dets.x + "px",
      top: dets.y + "px",
    });
  };

  page6_right.onmouseenter = function () {
    gsap.to(crsr, {
      transform: `translate(-50%, -50%) scale(1)`,
    });
  };

  page6_right.onmouseleave = function () {
    gsap.to(crsr, {
      transform: `translate(-50%, -50%) scale(0)`,
    });
  };

  page6_right.onmousemove = function (dets) {
    gsap.to(crsr, {
      left: dets.x + "px",
      top: dets.y + "px",
    });
  };
}
cursorAnimation();

gsap.from("#page8>h1", {
  y: -30,
  opacity: 0,
  ScrollTrigger: {
    trigger: "#page8",
    scroller: "#main",
    markers: true,
    start: "top bottom",
    end: "bottom top",
    scrub: 2,
  },
});
