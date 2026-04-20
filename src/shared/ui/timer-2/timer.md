import timer from './timer.js';

// Вариант 1: До конкретной даты
timer('2026-12-31T23:59:59', '[data-timer]', {
lang: 'ru',
endMessage: 'Акция завершена!'
});

// Вариант 2: Таймер обратного отсчета на 3600 секунд (1 час)
timer(3600, '.my-custom-timer', {
onEnd: () => console.log('Время вышло!')
});
