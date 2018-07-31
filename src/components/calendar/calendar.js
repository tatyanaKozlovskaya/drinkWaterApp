import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfoCard from '../infoCard/infoCard.js'
import './calendar.css';

const weekdaysNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const monthsNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

const initState = () => {
    const date = new Date();
    const day = date.getDate();
    const weekDay = date.getDay() || 7;
    const month = date.getMonth();
    const year = date.getFullYear();
    const currMonthCellsArr = getCurrMonthCellsArr(month, year);
    const prevMonthCellsArr = getPrevMonthCellsArr(month, year);
    const nextMonthCellsArr = getNextMonthCellsArr(month, year, prevMonthCellsArr, currMonthCellsArr);

    return {
        day,
        weekDay,
        date,
        month,
        year,
        realMonth: month,
        realYear: year,
        prevMonthCellsArr,
        currMonthCellsArr,
        nextMonthCellsArr,
        showInfoCard: false,
        choosedDayObj: {},
        choosedDay: ''
    }

}

const getSumDayOfMonth = (month, year) => {

    var here = new Date(year, month);
    here.setDate(32);
    return 32 - here.getDate();
}

const getCurrMonthCellsArr = (month, year) => {
    const sumDayOfCurrMonth = getSumDayOfMonth(month, year)
    let arr = [];
    for (var i = 1; i <= sumDayOfCurrMonth; i++) {
        arr.push(i + '-' + (month + 1) + '-' + year);
    }
    return arr
}

const getPrevMonthCellsArr = (month, year) => {
    const startMonthDate = new Date(year, month, 1);
    const startWeekDay = startMonthDate.getDay() || 7;
    year = month === 0 ? year - 1 : year;
    month = month === 0 ? 11 : month - 1;
    const sumDayOfPrevMonth = getSumDayOfMonth(month, year)
    let arr = []
    for (var i = 1; i <= sumDayOfPrevMonth; i++) {
        arr.push(i + '-' + (month + 1) + '-' + year);
    }
    const newArr = arr.slice(sumDayOfPrevMonth - startWeekDay + 1, sumDayOfPrevMonth)
    return newArr
}

const getNextMonthCellsArr = (month, year, prevMonthCellsArr, currMonthCellsArr) => {
    const nextMonthCellsArrLength = 42 - (prevMonthCellsArr.length + currMonthCellsArr.length)
    let arr = []
    for (var i = 1; i <= nextMonthCellsArrLength; i++) {
        arr.push(i + '-' + (month + 2) + '-' + year);
    }
    return arr
}

class Calendar extends Component {

    state = initState()

    clickHandler = (e) => {
        if (e.target.className.indexOf('calendar-btn--left') !== -1) {
            const newMonth = this.state.month === 0 ? 11 : this.state.month - 1;
            const newYear = this.state.month === 0 ? this.state.year - 1 : this.state.year;
            this.setNewMonth(newMonth, newYear)
        } else if (e.target.className.indexOf('calendar-btn--right') !== -1) {
            const newMonth = this.state.month === 11 ? 0 : this.state.month + 1;
            const newYear = this.state.month === 11 ? this.state.year + 1 : this.state.year;
            this.setNewMonth(newMonth, newYear)
        } else if (e.target.dataset.date) {
            const date = e.target.dataset.date;
            const dayObj = this.props.data[date] || {}
            this.setState({
                choosedDay: date,
                choosedDayObj: dayObj,
                showInfoCard: true
            })
        }
    }

    setNewMonth = (newMonth, newYear) => {
        const newCurrMonthCellsArr = getCurrMonthCellsArr(newMonth, newYear);
        const newPrevMonthCellsArr = getPrevMonthCellsArr(newMonth, newYear);
        const newNextMonthCellsArr = getNextMonthCellsArr(newMonth, newYear, newPrevMonthCellsArr, newCurrMonthCellsArr);
        this.setState({
            month: newMonth,
            year: newYear,
            currMonthCellsArr: newCurrMonthCellsArr,
            prevMonthCellsArr: newPrevMonthCellsArr,
            nextMonthCellsArr: newNextMonthCellsArr
        })
    }

    closeInfoCard = () => {
        this.setState({
            showInfoCard: false
        })
    }

    isToday = (day) => {
        if (day === this.state.day && this.state.month === this.state.realMonth && this.state.year === this.state.realYear) {
            return true
        } else {
            return false
        }
    }

    render() {

        const { day, month, year, prevMonthCellsArr, currMonthCellsArr, nextMonthCellsArr, choosedDayObj, showInfoCard, choosedDay } = this.state
        const { data } = this.props

        return <div className="calendar" onClick={this.clickHandler}>
            <div className='calendar-wrapper'>
                <div className='calendar-date'>{`${monthsNames[month]} ${year}`}</div>
                <div className='calendar-head'>
                    {weekdaysNames.map((el, index) => {
                        return <div className='calendar-head-cell' key={index}>{el}</div>
                    })}
                </div>
                <div className='calendar-table'>
                    {prevMonthCellsArr.map((el, index) => {
                        return <div className='calendar-table-cell calendar-table-cell--prev' key={index} data-date={el}>
                            {data[el] && <div className='glass-wrapper'>
                                {Array.apply(null, Array(data[el].emptyGlasses)).map((el, index) => {
                                    return <div className='glass glass--little' key={index}></div>
                                })}
                            </div>}
                            <div className='calendar-table-cell_date'>{el.split('-')[0]}</div>
                        </div>
                    })}
                    {currMonthCellsArr.map((el, index) => {
                        return <div className={`calendar-table-cell  ${this.isToday(index + 1) ? 'calendar-table-cell--today' : null}`} key={index} data-date={el}>
                            {data[el] && <div className='glass-wrapper'>
                                {Array.apply(null, Array(data[el].emptyGlasses)).map((el, index) => {
                                    return <div className='glass glass--little' key={index}></div>
                                })}
                            </div>}
                            <div className='calendar-table-cell_date'>{el.split('-')[0]}</div>
                        </div>
                    })}
                    {nextMonthCellsArr.map((el, index) => {
                        return <div className='calendar-table-cell calendar-table-cell--next' key={index} data-date={el}>
                            {data[el] && <div className='glass-wrapper'>
                                {Array.apply(null, Array(data[el].emptyGlasses)).map((el, index) => {
                                    return <div className='glass glass--little' key={index} ></div>
                                })}
                            </div>}
                            <div className='calendar-table-cell_date'>{el.split('-')[0]}</div>
                        </div>
                    })}
                </div>
            </div>
            <div className='calendar-btn calendar-btn--left'>{'<'}</div>
            <div className='calendar-btn calendar-btn--right'>{'>'}</div>
            {showInfoCard &&
                <InfoCard
                    date={choosedDay}
                    dataObj={choosedDayObj}
                    closeFunc={this.closeInfoCard} />}
        </div>
    }
}

export default connect(
    state => ({
        data: state.main.dataObj
    }),
    dispatch => ({

    })
)(Calendar);