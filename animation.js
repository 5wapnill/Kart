gsap.registerPlugin(ScrollTrigger);


let time = gsap.timeline();

let dlay = 0.2;
let dration = 0.5;

heroPage();
items();


function heroPage() {
        time.from(".heading h1", {
                y: 100,
                scale: 3,
                filter: "blur(20px)",
                opacity: 0,
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
}

function items() {


        ScrollTrigger.batch(".section-heading", {
                onEnter: (elements) => {
                        gsap.from(elements, {
                                opacity: 0,
                                y: 50,
                                duration: 1,
                                ease: "power2.out"
                        });
                }
        });


        ScrollTrigger.batch(".pdiv", {
                onEnter: (elements) => {
                        gsap.from(elements, {
                                opacity: 0,
                                y: 50,
                                duration: 1,
                                ease: "power2.out",
                                rotate: 10,
                        });
                },

                onLeave: (elements) => {
                        gsap.from(elements, {
                                opacity: 0,
                                y: 50,
                                duration: 1,
                                stagger: 0.1,
                                rotate: -10,
                                ease: "power2.out"
                        });
                }
        });
}