const heroTabs = () => {
  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabsParent = document.querySelector('.tabheader__items');

  const hideTabContent = () => {
    tabsContent.forEach((item) => item.classList.add('is-none'));
    tabsContent.forEach((item) => item.classList.remove('fade'));

    tabs.forEach((item) => item.classList.remove('tabheader__item--active'));
  };

  const showTabContent = (i = 0) => {
    tabsContent[i].classList.remove('is-none');
    tabsContent[i].classList.add('fade');
    tabs[i].classList.add('tabheader__item--active');
  };

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
};
export default heroTabs;
