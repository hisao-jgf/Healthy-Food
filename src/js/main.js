import tabs from './modules/tabs/tabs';
import slider from './modules/slider/slider';
import menuCards from './modules/menuCards/cards';
import calculator from './modules/calculator/calculator';
import timer from './modules/timer/timer';
import forms from './modules/forms/forms';
import modal from './modules/modal/modal';
import { openModal } from './modules/modal/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 30000);

    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    slider({
        container: '.offer__slider',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        slide: '.offer__slide',
        prev: '.offer__slider-prev',
        next: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current'
    });
    menuCards(); 
    calculator();
    timer('.timer', '2023-01-16');
    forms('form', modalTimerId);
    modal('.modal', '[data-modal]', modalTimerId);
});