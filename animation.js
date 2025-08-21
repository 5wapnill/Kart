let time = gsap.timeline();

let dlay = 0.2;
let dration = 0.5;



time.from(".heading h1", {
        y:100,
        scale: 3,
        filter: "blur(20px)",
        opacity:0,
        duration: dration + 1,
        delay: dlay + 0.8,
        ease: "power2.out"
})

time.from(".cat", {
        y: 50,
        delay: dlay,
        duration: dration,
        opacity: 0,
        stagger: 0.3,
        filter: "blur(20px)",
})