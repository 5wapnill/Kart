let time = gsap.timeline();

let dlay = 0.2;
let dration = 0.5;



time.from(".heading h1", {
        scale: 100,
        duration: dration + 3,
        delay: dlay + 0.8,
        ease: "power2.out"
})

time.from(".cat", {
        y: 50,
        delay: dlay,
        duration: dration,
        opacity: 0,
        stagger: 0.3
})


