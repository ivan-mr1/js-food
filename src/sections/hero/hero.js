const heroTabs = () => {
  const tabs = document.querySelectorAll('.tabs__button');
  const tabsContent = document.querySelectorAll('.tabs__content');
  const tabsParent = document.querySelector('.tabs__buttons');

  const hideTabContent = () => {
    tabsContent.forEach((item) => {
      item.classList.add('is-none');
      item.classList.remove('fade');
    });

    tabs.forEach((item) => {
      item.classList.remove('is-active');
    });
  };

  const showTabContent = (i = 0) => {
    const activeContent = tabsContent[i];
    if (activeContent) {
      activeContent.classList.remove('is-none');
      activeContent.classList.add('fade');
      tabs[i].classList.add('is-active');
    }
  };

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
    const target = e.target.closest('.tabs__button');

    if (target) {
      const i = Array.from(tabs).indexOf(target);

      hideTabContent();
      showTabContent(i);
    }
  });
};

export default heroTabs;
