
const bodyTag = document.querySelector("body")
// Intersection Observer API 
// (built-in to javascript to handle items when then eynter/exit viewport)

// create a function to run Intersection Observer script whenever we need it
// otherwise it only runs on first page load
const runScripts = () => {
    const headers = document.querySelectorAll("h2, h3")
    const imageHolders = document.querySelectorAll("div.image")

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // add new class when entry is at least 10% in view
            if (entry.intersectionRatio >= 0.1) {
                entry.target.classList.add("in-view")
            } else {
                entry.target.classList.remove("in-view")
            }
        })
    }, {
        // percentages of viewability to tell observer to observe & react to
        threshold: [0, 0.1, 1]
    })

    headers.forEach(header => {
        observer.observe(header)
    })

    imageHolders.forEach(holder => {
        observer.observe(holder)
    })
}

runScripts()

// BARBA (and GSAP to create timelines)
barba.init({
    transitions: [
        {
            name: "switch",
            // 'once' for handling transition for opening/refreshing page
            once({ current, next, trigger }) {
                return new Promise(resolve => {
                    const timeline = gsap.timeline({
                        onComplete() {
                            resolve()
                        }
                    })

                    timeline
                        .set(next.container, { opacity: 0 })
                        .to(next.container, { opacity: 1, delay: 1 })
                })
            },
            // Timeline for Leave
            leave({ current, next, trigger }) {
                return new Promise(resolve => {
                    const timeline = gsap.timeline({
                        onComplete() {
                            current.container.remove()
                            resolve()
                        }
                    })

                    timeline
                    .to("header", { y: "-100%" })
                    .to("footer", { y: "100%" })
                    .to(current.container, { opacity: 0 })
                })
            },

            // Timeline for Enter
            enter({ current, next, trigger }) {
                return new Promise(resolve => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })

                    const timeline = gsap.timeline({
                        onComplete() {
                            runScripts()
                            resolve()
                        }
                    })

                    timeline
                    .set(next.container, { opacity: 0 })
                    .to("header", { y: "0%" }, 0)
                    .to("footer", { y: "0%" }, 0)
                    .to(next.container, { opacity: 1 })
                })
            }
        }
    ],
    // Views and hooks via Barba doc
    // to make alterations that do not need transitions
    views: [
        {
            // add this namespace to the Product page html
            namespace: "product",
            beforeEnter() {
                bodyTag.classList.add("product")
            },
            afterLeave() {
                bodyTag.classList.remove("product")
            }
        }
    ],
    debug: true
})