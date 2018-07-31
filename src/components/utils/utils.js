const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
const getDate = (miliseconds) => {
    if (!miliseconds) return
    const date = new Date(miliseconds);
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return day + ' ' + month + ' ' + year;
}

const getDateForData = (miliseconds) => {
    if (!miliseconds) return
    const date = new Date(miliseconds);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return day + '-' + month + '-' + year;
}

const getDateFromDate = (date) => {
    const dateArr = date.split('-');
    const newDate = dateArr[0] + ' ' + monthNames[dateArr[1] - 1] + ' ' + dateArr[2];
    return newDate

}

export { getDate, getDateForData, getDateFromDate }