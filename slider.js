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

    }
    createNextAndPrevBtns() {
        let { elm: elementSlider } = this.options;
        elementSlider.insertAdjacentHTML('beforeend', `
        
        <div class="btns d-flex justify-content-between">
        <a href="#" class="btn-prev"><i class="bi bi-chevron-left ms-2"></i></a>
        <a href="#" class="btn-next"><i class="bi bi-chevron-right me-2"></i></a>
    </div>
        `);
        elementSlider.querySelector('.btn-prev').addEventListener('click', this.previousSlide)
        elementSlider.querySelector('.btn-next').addEventListener('click', this.nextSlide)

    }
    previousSlide = (e) => {
        e.preventDefault()
        this.showSlides(this.slideIndex -= 1)
    }
    nextSlide = (e) => {
        e.preventDefault()
        this.showSlides(this.slideIndex += 1)
    }

    createDots() {
        let { elm: elementSlider } = this.options;
        let dotElements = [...this.sliders].map((slider, index) => `<div class="dot m-1" data-slider="${index+1}"></div>`);

        let dots = document.createElement('div');
        dots.className = 'dots d-flex mx-auto justify-content-center mt-2';
        dots.innerHTML = dotElements.join('');
        elementSlider.after(dots);
        dots.addEventListener('click', function(e) {
            if (e.target.classList.contains('dot')) {
                console.log(e.target.dataset.slider)
            }
        })
    }
    showSlides(number) {
        if (number > this.sliders.length) this.slideIndex = 1;
        if (number < 1) this.slideIndex = this.sliders.length;
    }
}