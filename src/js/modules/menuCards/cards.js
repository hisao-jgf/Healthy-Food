import { getResources } from "../../services/services";

function menuCards() {
    class MenuItem {
        constructor(src, alt, title, description, price, selectorParent, ...elementClasses) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parent = document.querySelector(selectorParent);
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
    
    getResources('https://hisao-jgf.github.io/projects/Food/db.json/menu')
        .then(data => {
            data.forEach(({img, alt, title, description, price}) => {
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

export default menuCards;