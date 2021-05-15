const headers = document.querySelectorAll('h2, h3');
const imageHolders = document.querySelectorAll("div.image");

// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        // checks entry for it becoming 10% visible in viewport (0.1)
        if (entry.intersectionRatio >= 0.1) {
            entry.target.classList.add("in-view")
        } else {
            entry.target.classList.remove("in-view")
        }
    })
    }, {    
        // thresholds we determine for actions to occur on
        threshold: [0, 0.1, 1]
});

headers.forEach(header => {
    observer.observe(header)
});

imageHolders.forEach(holder => {
    observer.observe(holder)
});