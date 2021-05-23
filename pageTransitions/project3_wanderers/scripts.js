// Add "wiper" div to each page between slides
const bodyTag = document.querySelector("body")
const wiper = document.createElement("div")
wiper.classList.add("wiper")

const wiperImage = document.createElement("img")
wiperImage.setAttribute("src", "logo.svg")

const wiperHolder = document.createElement("div")
const wiperText = document.createElement("h2")
wiperText.innerHTML = "Wanderers"

wiperHolder.appendChild(wiperText)

wiper.appendChild(wiperImage)
bodyTag.appendChild(wiper)


// BARBA + GSAP
barba.init({
  debug: true,
  transitions: [
    {
      name: "next",
      // stuff that happens when we leave a page
      leave( {current, next, trigger} ) {
        return new Promise(resolve => {
          // add a gsap timeline 
          const timeline = gsap.timeline({
            onComplete() {
              current.container.remove()
              resolve()
            }
          })
          // select all header / next+previous tags inside the "container" of "current" page
          const navigation = current.container.querySelectorAll("header, a.next, a.previous")
          const photos = current.container.querySelectorAll("div.photos")
          // use timeline to make these elements go "to" a new opacity
          timeline
            .set(wiper, { x: "-100%" })
            .set(wiperImage, { opacity: 0 })
            .set(wiperText, { y: "100%" })
            .to(navigation, {opacity:0}, 0)
            .to(photos, { opacity: 0, x: 500 }, 0)
            .to(wiper, { x: 0 }, 0)

        })
      },
      // stuff that happens between pages (on "wiper")
      beforeEnter( {current, next, trigger} ) {
        return new Promise(resolve => {
          const timeline = gsap.timeline({
            defaults: {
              duration: 1
            },
            onComplete() {
              resolve()
            }
          })

          timeline  
            .to(wiperImage, { opacity: 1 }, 0 )
            .to(wiperText, { y: 0 }, 0 )
            .to(wiperText, { y: "100%"}, 2 )
            .to(wiperImage, { opacity: 0}, 2)

        })
      },
      // stuff that happens when we enter new page
      enter( {current, next, trigger} ) {
        return new Promise(resolve => {
          const timeline = gsap.timeline({
            onComplete() {
            resolve()
          }
        })

        const navigation = next.container.querySelectorAll("header, a.next, a.previous")
        const photos = next.container.querySelectorAll("div.photos")

        timeline
          .set(navigation, { opacity: 0 })
          .set(photos, { opacity: 0, x: -500 })
          .to(navigation, { opacity: 1 }, 0)
          .to(photos, { opacity: 1, x: 0 }, 0)
          .to(wiper, { x: "100%" }, 0)

        })
      }
    }
  ],
  views: []
})