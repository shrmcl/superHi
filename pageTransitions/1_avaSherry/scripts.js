const bodyTag = document.querySelector("body")

// connects the barba-css.js file
barba.use(barbaCss)
// init barba
barba.init({
    // customize to our needs
    transitions: [
        {
            name: "fade",
            // adds a one-time use hook for when site is first opened
            once() {},
            // adding in a barba hook to make each transition arrive at top of page
            // any barba hook will include these 3 parameters
            beforeEnter({current, next, trigger}) {
                // reset classes for header links between transitions
                const headerLinks = document.querySelectorAll("header a")
                // via barba hooks documentation
                const href = next.url.path
                headerLinks.forEach(link => {
                    if (link.getAttribute("href") === href) {
                        link.classList.add("selected")
                    } else {
                        link.classList.remove("selected")
                    }  
                })
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            }
        }
    ],
    views: [
        {
            // page or area of the site; allows for more specificity
           namespace:  "feed",
           beforeEnter() {
               bodyTag.classList.add("feed")
           },
           beforeLeave() {
               bodyTag.classList.remove("feed")
           }
        }
    ]
})