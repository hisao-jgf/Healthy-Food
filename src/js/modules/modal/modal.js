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

    modalWindow.addEventListener('click', (event) => {
        if (event.target === modalWindow || event.target.getAttribute('data-close') == '') closeModal(modalSelector);
    });

    document.addEventListener('keydown', (event) => {
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

export default modal;
export {openModal, closeModal};