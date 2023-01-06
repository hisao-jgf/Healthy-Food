function calculator() {
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initializeLocalStorage(selector, activeClass) {
        const localElements = document.querySelectorAll(selector);

        localElements.forEach(element => {
            element.classList.remove(activeClass);
            if (element.getAttribute('id') === localStorage.getItem('sex')) {
                element.classList.add(activeClass);
            }
            if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                element.classList.add(activeClass);
            }
        });
    }

    function calculateTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '___';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    function getStaticInformation(parentSelector, activeClass) {
        const childElements = document.querySelectorAll(`${parentSelector} div`);

        childElements.forEach(element => {
            element.addEventListener('click', (event) => {
                if (event.target.getAttribute('data-ratio')) {
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = event.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }
    
                childElements.forEach(child => {
                    child.classList.remove(activeClass);
                });
                event.target.classList.add(activeClass);
                
                calculateTotal();
            });
        });
    }
    function getInputInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = '1px solid #54ED39';
            }

            switch (input.getAttribute('id')) {
                case 'height': height = +input.value; break;
                case 'weight': weight = +input.value; break;
                case 'age': age = +input.value; break;
            }
            calculateTotal();
        });
    }

    calculateTotal();

    initializeLocalStorage('#gender div', 'calculating__choose-item_active');
    initializeLocalStorage('.calculating__choose_big div', 'calculating__choose-item_active');

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
    
    getInputInformation('#height');
    getInputInformation('#weight');
    getInputInformation('#age');
}

export default calculator;