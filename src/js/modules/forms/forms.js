import { openModal, closeModal } from "../modal/modal";
import { postData } from "../../services/services";

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
        form.addEventListener('submit', (event) => {
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
            
            postData('https://hisao-jgf.github.io/projects/Food/db.json/requests', formDataJSON)
                .then(data => {
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
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
        }, 3000);
    }
}

export default forms;