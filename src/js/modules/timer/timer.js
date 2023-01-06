function timer(id, discountEnd) {

    function getRemainingTime(discountEnd) {
        const remainingTime = Date.parse(discountEnd) - Date.parse(new Date()),
              days = Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
              hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((remainingTime / (1000 * 60)) % 60),
              seconds = Math.floor((remainingTime / 1000) % 60);

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
    if (value >= 0 && value < 10) return `0${value}`;
    else return value;
}

export default timer;
export {neaterDate};