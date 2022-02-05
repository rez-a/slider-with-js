class SLIDER {
    slideIndex = 1;
    constructor(options) {
        this.options = options;
        this.initialStuff();
        this.createNextAndPrevBtns();
        this.createDots();
        this.showSlides(1);
    }

    initialStuff() {
        let { elm: elementSlider, slideClass, auto } = this.options;
        if (!elementSlider) throw console.error('slider element is not exists');
        if (!slideClass) slideClass = 'slider';
        Number.isInteger(auto) ? this.auto = auto : this.auto = 0;

        this.sliders = [...elementSlider.children].filter(elm => elm.classList.contains(slideClass))
        console.log(this.sliders)

    }
}