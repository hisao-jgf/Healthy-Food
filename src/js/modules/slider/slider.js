import { neaterDate } from "../timer/timer";

function slider({container, slide, wrapper, field, prev, next, totalCounter, currentCounter}) {
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          slidesWrapper = document.querySelector(wrapper),

          slidesField = document.querySelector(field),
          slidesNavigation = document.createElement('ol'),
          navigationIndicators = [],
          shownWidth = window.getComputedStyle(slidesWrapper).width,

          prevArrow = document.querySelector(prev),
          nextArrow = document.querySelector(next),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter);

    let slideIndex = 1,
        fieldOffset = 0;

    function onlyDigits(value) {
        const result = value.replace(/\D/g, '');
        return +result;
    }

    total.textContent = neaterDate(slides.length);
    current.textContent = neaterDate(slideIndex);

    slidesWrapper.style.overflow = 'hidden';

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.6s all';

    slides.forEach(slide => {
        slide.style.width = shownWidth;
    });

    slider.style.position = 'relative';
    slidesNavigation.classList.add('carousel-indicators');
    slidesNavigation.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(slidesNavigation);
    
    for (let i = 0; i < slides.length; i++) {
        const navigationIndicator = document.createElement('div');
        navigationIndicator.setAttribute('data-slide-index', i + 1);
        navigationIndicator.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            navigationIndicator.style.opacity = '1';
        }

        slidesNavigation.appendChild(navigationIndicator);
        navigationIndicators.push(navigationIndicator);
    }

    nextArrow.addEventListener('click', () => {
        if (fieldOffset == onlyDigits(shownWidth) * (slides.length - 1)) {
            fieldOffset = 0;
        } else {
            fieldOffset += onlyDigits(shownWidth);
        }

        slidesField.style.transform = `translateX(-${fieldOffset}px)`;
        
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        total.textContent = neaterDate(slides.length);
        current.textContent = neaterDate(slideIndex);

        navigationIndicators.forEach(dot => dot.style.opacity = '0.5');
        navigationIndicators[slideIndex - 1].style.opacity = '1';
    });
    prevArrow.addEventListener('click', () => {
        if (fieldOffset == 0) {
            fieldOffset = onlyDigits(shownWidth) * (slides.length - 1);
        } else {
            fieldOffset -= onlyDigits(shownWidth);
        }
        slidesField.style.transform = `translateX(-${fieldOffset}px)`;
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        total.textContent = neaterDate(slides.length);
        current.textContent = neaterDate(slideIndex);

        navigationIndicators.forEach(dot => dot.style.opacity = '0.5');
        navigationIndicators[slideIndex - 1].style.opacity = '1';
    });

    navigationIndicators.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-index');
            slideIndex = slideTo;

            fieldOffset = onlyDigits(shownWidth) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${fieldOffset}px)`;

            current.textContent = neaterDate(slideIndex);

            navigationIndicators.forEach(dot => dot.style.opacity = '0.5');
            navigationIndicators[slideIndex - 1].style.opacity = '1';
        });
    });
}

export default slider;