class SLIDER {
    slideIndex = 1;
    constructor(options) {
        this.options = options;
        this.initialStuff();
        this.createNextAndPrevBtns();
        this.createDots();
        this.showSlides(this.slideIndex);
        this.setInterval();
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
        this.resetInterval();
        this.showSlides(this.slideIndex -= 1)
    }
    nextSlide = (e) => {
        e.preventDefault()
        this.resetInterval();
        this.showSlides(this.slideIndex += 1)
    }
    currentSlider = n => {
        this.slideIndex = n;
        this.resetInterval();
        this.showSlides(this.slideIndex)
    }
    createDots() {
        let { elm: elementSlider } = this.options;
        let dotElements = [...this.sliders].map((slider, index) => `<div class="dot m-1" data-slider="${index+1}"></div>`);

        let dots = document.createElement('div');
        this.dotsElements = dots;
        dots.className = 'dots d-flex mx-auto justify-content-center mt-2';
        dots.innerHTML = dotElements.join('');
        elementSlider.after(dots);

        dots.querySelectorAll('.dot').forEach(dot => dot.addEventListener('click', e => { this.currentSlider(e.target.dataset.slider) }))
    }
    showSlides(index) {
        let { elm: elementSlider, slideClass, currentSlider } = this.options;
        if (index > this.sliders.length) this.slideIndex = 1;
        if (index < 1) this.slideIndex = this.sliders.length;

        elementSlider.querySelector(`.${slideClass}.active`).classList.remove('active');
        this.dotsElements.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));

        this.sliders[this.slideIndex - 1].classList.add('active');
        currentSlider(this.sliders[this.slideIndex - 1]);
        this.dotsElements.children[this.slideIndex - 1].classList.add('active');
    }
    setInterval() {
        if (this.auto !== 0) {
            this.interval = setInterval(() => {
                this.showSlides(this.slideIndex += 1);
            }, this.auto);
        }
    }
    resetInterval() {
        clearInterval(this.interval);
        this.setInterval();
    }
}