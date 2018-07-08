const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
const getDate = (miliseconds) => {
    if (!miliseconds) return
    const date = new Date(miliseconds);
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return day + ' ' + month + ' ' + year;
}

export { getDate }