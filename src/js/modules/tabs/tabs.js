function tabs(tabsParentSelector, tabsSelector, tabsContentSelector, activeClass) {
    const tabsWrapper = document.querySelector(tabsParentSelector),
          tabsLinks = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector);
    
    function hideTabContent() {
        tabsContent.forEach((tab) => {
            tab.style.display = 'none';
        });

        tabsLinks.forEach((link) => {
            link.classList.remove(activeClass);
        });
    }
    function showTabContent(index = 0) {
        tabsContent[index].style.display = 'block';
        tabsLinks[index].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsWrapper.addEventListener('click', (event) => {
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

export default tabs;