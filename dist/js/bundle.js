/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calculator/calculator.js":
/*!*************************************************!*\
  !*** ./src/js/modules/calculator/calculator.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }
  function getStaticInformation(parentSelector, activeClass) {
    const childElements = document.querySelectorAll(`${parentSelector} div`);
    childElements.forEach(element => {
      element.addEventListener('click', event => {
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
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./src/js/modules/forms/forms.js":
/*!***************************************!*\
  !*** ./src/js/modules/forms/forms.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modal/modal */ "./src/js/modules/modal/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/services */ "./src/js/services/services.js");


function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector),
    onLoadMessage = {
      loading: '../icons/spinner.svg',
      success: 'Success! You will get contacted back soon!',
      failure: 'Something went wrong... Please try again later.'
    };
  forms.forEach(form => {
    bindPostData(form);
  });
  function bindPostData(form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(form),
        formDataJSON = JSON.stringify(Object.fromEntries(formData.entries()));
      let statusMessage = document.createElement('img');
      statusMessage.classList.add('request__status');
      statusMessage.src = onLoadMessage.loading;
      statusMessage.alt = 'loading_circle';
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                margin-top: 20px;
            `;
      form.insertAdjacentElement('afterend', statusMessage);
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('https://hisao-jgf.github.io/projects/Food/db.json/requests', formDataJSON).then(data => {
        console.log(data);
        showResponseModal(onLoadMessage.success);
        statusMessage.remove();
      }).catch(() => {
        showResponseModal(onLoadMessage.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }
  function showResponseModal(message) {
    const prevModalWindow = document.querySelector('.modal__dialog'),
      newModalWindow = document.createElement('div');
    prevModalWindow.style.display = 'none';
    (0,_modal_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);
    newModalWindow.classList.add('modal__dialog');
    newModalWindow.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    document.querySelector('.modal').append(newModalWindow);
    setTimeout(() => {
      newModalWindow.remove();
      prevModalWindow.style.display = 'block';
      (0,_modal_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 3000);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/menuCards/cards.js":
/*!*******************************************!*\
  !*** ./src/js/modules/menuCards/cards.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/services */ "./src/js/services/services.js");

function menuCards() {
  class MenuItem {
    constructor(src, alt, title, description, price, selectorParent) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.parent = document.querySelector(selectorParent);
      for (var _len = arguments.length, elementClasses = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        elementClasses[_key - 6] = arguments[_key];
      }
      this.elementClasses = elementClasses;
      this.UAHExchange = 27;
      this.changeCurrencies();
    }
    changeCurrencies() {
      this.price = +this.price * this.UAHExchange;
    }
    render() {
      const newMenuItem = document.createElement('div');
      newMenuItem.classList.add('menu__item');
      this.elementClasses.forEach(className => newMenuItem.classList.add(className));
      newMenuItem.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
      this.parent.append(newMenuItem);
    }
  }
  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResources)('https://hisao-jgf.github.io/projects/Food/db.json/menu').then(data => {
    data.forEach(_ref => {
      let {
        img,
        alt,
        title,
        description,
        price
      } = _ref;
      new MenuItem(img, alt, title, description, price, '.menu__field .container').render();
    });
  }).catch(() => {
    const errorMessage = document.createElement('div');
    errorMessage.style.cssText = `
                width: 100%;
                margin: 0 auto;
                color: #000000;
                font-size: 20px;
                line-height: 30px;
                text-align: center;
            `;
    errorMessage.innerHTML = 'Could not load data from the server... <br> Please contact us for the details.';
    document.querySelector('.menu__field').append(errorMessage);
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuCards);

/***/ }),

/***/ "./src/js/modules/modal/modal.js":
/*!***************************************!*\
  !*** ./src/js/modules/modal/modal.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function modal(modalSelector, triggerSelector, modalTimerId) {
  const modalWindow = document.querySelector(modalSelector),
    modalTrigger = document.querySelectorAll(triggerSelector);
  function openModalByScrolling() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', openModalByScrolling);
    }
    window.addEventListener('scroll', openModalByScrolling);
  }
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });
  modalWindow.addEventListener('click', event => {
    if (event.target === modalWindow || event.target.getAttribute('data-close') == '') closeModal(modalSelector);
  });
  document.addEventListener('keydown', event => {
    if (event.code === 'Escape' && modalWindow.style.display === 'block') closeModal(modalSelector);
  });
  window.addEventListener('scroll', openModalByScrolling);
}
function openModal(modalSelector, modalTimerId) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.style.display = 'block';
  document.body.style.overflow = 'hidden';
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}
function closeModal(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.style.display = 'none';
  document.body.style.overflow = '';
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./src/js/modules/slider/slider.js":
/*!*****************************************!*\
  !*** ./src/js/modules/slider/slider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer_timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../timer/timer */ "./src/js/modules/timer/timer.js");

function slider(_ref) {
  let {
    container,
    slide,
    wrapper,
    field,
    prev,
    next,
    totalCounter,
    currentCounter
  } = _ref;
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
  total.textContent = (0,_timer_timer__WEBPACK_IMPORTED_MODULE_0__.neaterDate)(slides.length);
  current.textContent = (0,_timer_timer__WEBPACK_IMPORTED_MODULE_0__.neaterDate)(slideIndex);
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
    total.textContent = (0,_timer_timer__WEBPACK_IMPORTED_MODULE_0__.neaterDate)(slides.length);
    current.textContent = (0,_timer_timer__WEBPACK_IMPORTED_MODULE_0__.neaterDate)(slideIndex);
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
    total.textContent = (0,_timer_timer__WEBPACK_IMPORTED_MODULE_0__.neaterDate)(slides.length);
    current.textContent = (0,_timer_timer__WEBPACK_IMPORTED_MODULE_0__.neaterDate)(slideIndex);
    navigationIndicators.forEach(dot => dot.style.opacity = '0.5');
    navigationIndicators[slideIndex - 1].style.opacity = '1';
  });
  navigationIndicators.forEach(dot => {
    dot.addEventListener('click', event => {
      const slideTo = event.target.getAttribute('data-slide-index');
      slideIndex = slideTo;
      fieldOffset = onlyDigits(shownWidth) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${fieldOffset}px)`;
      current.textContent = (0,_timer_timer__WEBPACK_IMPORTED_MODULE_0__.neaterDate)(slideIndex);
      navigationIndicators.forEach(dot => dot.style.opacity = '0.5');
      navigationIndicators[slideIndex - 1].style.opacity = '1';
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs/tabs.js":
/*!*************************************!*\
  !*** ./src/js/modules/tabs/tabs.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsParentSelector, tabsSelector, tabsContentSelector, activeClass) {
  const tabsWrapper = document.querySelector(tabsParentSelector),
    tabsLinks = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector);
  function hideTabContent() {
    tabsContent.forEach(tab => {
      tab.style.display = 'none';
    });
    tabsLinks.forEach(link => {
      link.classList.remove(activeClass);
    });
  }
  function showTabContent() {
    let index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[index].style.display = 'block';
    tabsLinks[index].classList.add(activeClass);
  }
  hideTabContent();
  showTabContent();
  tabsWrapper.addEventListener('click', event => {
    const target = event.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabsLinks.forEach((tab, index) => {
        if (target == tab) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer/timer.js":
/*!***************************************!*\
  !*** ./src/js/modules/timer/timer.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "neaterDate": () => (/* binding */ neaterDate)
/* harmony export */ });
function timer(id, discountEnd) {
  function getRemainingTime(discountEnd) {
    const remainingTime = Date.parse(discountEnd) - Date.parse(new Date()),
      days = Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
      hours = Math.floor(remainingTime / (1000 * 60 * 60) % 24),
      minutes = Math.floor(remainingTime / (1000 * 60) % 60),
      seconds = Math.floor(remainingTime / 1000 % 60);
    return {
      total: remainingTime,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }
  function setTimer(timerSelector, discountEnd) {
    const timer = document.querySelector(timerSelector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateTimer, 1000);
    updateTimer();
    function updateTimer() {
      const remainingTime = getRemainingTime(discountEnd);
      days.innerHTML = neaterDate(remainingTime.days);
      hours.innerHTML = neaterDate(remainingTime.hours);
      minutes.innerHTML = neaterDate(remainingTime.minutes);
      seconds.innerHTML = neaterDate(remainingTime.seconds);
      if (remainingTime.total <= 0) clearInterval(timeInterval);
    }
  }
  setTimer('.timer', discountEnd);
}
function neaterDate(value) {
  if (value >= 0 && value < 10) return `0${value}`;else return value;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResources": () => (/* binding */ getResources),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const postResult = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });
  return await postResult.json();
};
const getResources = async url => {
  const getResult = await fetch(url);
  if (!getResult.ok) {
    throw new Error(`Could not find ${url}, status: ${getResult.status}`);
  }
  return await getResult.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs/tabs */ "./src/js/modules/tabs/tabs.js");
/* harmony import */ var _modules_slider_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider/slider */ "./src/js/modules/slider/slider.js");
/* harmony import */ var _modules_menuCards_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/menuCards/cards */ "./src/js/modules/menuCards/cards.js");
/* harmony import */ var _modules_calculator_calculator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/calculator/calculator */ "./src/js/modules/calculator/calculator.js");
/* harmony import */ var _modules_timer_timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/timer/timer */ "./src/js/modules/timer/timer.js");
/* harmony import */ var _modules_forms_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms/forms */ "./src/js/modules/forms/forms.js");
/* harmony import */ var _modules_modal_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/modal/modal */ "./src/js/modules/modal/modal.js");








window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(() => (0,_modules_modal_modal__WEBPACK_IMPORTED_MODULE_6__.openModal)('.modal', modalTimerId), 30000);
  (0,_modules_tabs_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
  (0,_modules_slider_slider__WEBPACK_IMPORTED_MODULE_1__["default"])({
    container: '.offer__slider',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
    slide: '.offer__slide',
    prev: '.offer__slider-prev',
    next: '.offer__slider-next',
    totalCounter: '#total',
    currentCounter: '#current'
  });
  (0,_modules_menuCards_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_calculator_calculator__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_timer_timer__WEBPACK_IMPORTED_MODULE_4__["default"])('.timer', '2023-01-16');
  (0,_modules_forms_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
  (0,_modules_modal_modal__WEBPACK_IMPORTED_MODULE_6__["default"])('.modal', '[data-modal]', modalTimerId);
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map