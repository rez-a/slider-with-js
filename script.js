new SLIDER({
    elm: document.querySelector('#sliders'),
    slideClass: 'slider',
    currentSlider: (slider) => {
        console.log(slider)
    },
    auto: 3000
})