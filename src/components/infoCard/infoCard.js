import React, { Component } from 'react';
import { getDateFromDate } from './../utils/utils.js'
import './infoCard.css'


function InfoCard({date, dataObj, closeFunc}) {
    const { norm, volume } = dataObj;
    const emptyGlasses = dataObj.emptyGlasses || 0;
    const drinkedVolume = emptyGlasses * volume;


    return <div className="info-card" onClick={closeFunc}>
        {norm && volume ?
            <div>
                <h2 className='info-card__date'>{getDateFromDate(date)}</h2>
                <div>Выпито {emptyGlasses} из {norm} стаканов</div>
                <div> {drinkedVolume} мл</div>
            </div>
            :
            <div>Нет информации по этому дню</div>
        }
    </div>
}

export default InfoCard;