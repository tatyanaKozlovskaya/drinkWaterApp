import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDate } from './../utils/utils.js'
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import './main.css'

function Main({ date, volume, glasses, emptyVolume, fullVolume, empty, full, actions }) {

    return <div className="main">
        <h2 className='date'>{getDate(date)}</h2>
        <div>Выпито:{empty} / {emptyVolume}мл</div>
        <div>Осталось:{full} / {fullVolume}мл</div>
        {glasses.map((el, index) => {
            return <div className={`glass-cont glass-cont_${el}`} key={index}>
                <div className='water-cont'>
                    <div className='water' />
                </div>
                <div
                    className={'glass'}
                    data-index={index}
                    onClick={(e) => { actions.setGlassArr(e, glasses, volume) }}>{volume}</div>
            </div>
        })}
    </div>
}

function mapStateToProps(state) {
    const { volume, glasses, date, emptyVolume, fullVolume, empty, full } = state.main
    return {
        volume: volume,
        glasses: glasses,
        date: date,
        emptyVolume: emptyVolume,
        fullVolume: fullVolume,
        empty: empty,
        full: full
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);