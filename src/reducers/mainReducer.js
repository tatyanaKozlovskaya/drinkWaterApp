
import { getDateForData } from '../components/utils/utils.js';
import { GLASSES_UPDATE,NEW_NORM_AND_VOLUME } from '../constants.js'

const todayDate = Date.now();

const getGlasses = (norm, empty) => {
  let glasses = [];
  for (var i = 0; i < norm; i++) {
    if (empty && (i < empty)) {
      glasses.push('empty')
    } else {
      glasses.push('full')
    }
  }
  return glasses
}

const getDataObj = () => {
  const data = JSON.parse((localStorage.getItem('DrinkWaterAppData'))) || {};
  return data
};

const setDatObj = (state, date, obj) => {
  const newObjJson = JSON.stringify({ ...state.dataObj, [date]: obj })
  localStorage.setItem('DrinkWaterAppData', newObjJson)
}


const getInitialState = () => {

  const dataObj = getDataObj();
  const norm = (dataObj[getDateForData(todayDate)] && dataObj[getDateForData(todayDate)].norm) || 10;
  const volume = (dataObj[getDateForData(todayDate)] && dataObj[getDateForData(todayDate)].volume) || 200;
  const empty = (dataObj[getDateForData(todayDate)] && dataObj[getDateForData(todayDate)].emptyGlasses) || 0;
  const emptyVolume = (empty * volume) || 0;
  const full = (norm - empty) || 10;
  const fullVolume = (full * volume) || 2;

  const initialState = {
    dataObj,
    date: todayDate,
    norm,
    volume,
    drinked: 0,
    empty,
    emptyVolume,
    full,
    fullVolume
  }
  initialState.glasses = getGlasses(norm, empty);

  return initialState
};



export default function mainReducer(state = getInitialState(), action) {
  const { type, payload } = action;

  switch (type) {

    case 'NEW_DATE': {

      const date = payload || '';

      return {
        ...state,
        date
      }
    }

    case NEW_NORM_AND_VOLUME: {

      const norm = +payload.norm || state.norm;
      const volume = +payload.volume || state.volume;
      const emptyVolume = (+payload.volume === state.volume) && ((norm * volume) >= state.emptyVolume) ? state.emptyVolume : 0;
      const fullVolume = norm * volume - emptyVolume;
      const empty = (+payload.volume === state.volume) && ((norm * volume) >= state.emptyVolume) ? state.empty : 0;
      const full = norm - empty;
      const date = getDateForData(state.date);
      const obj = {
        norm: norm,
        volume: volume,
        emptyGlasses: empty
      }

      setDatObj(state, date, obj);

      return {
        ...state,
        dataObj: { ...state.dataObj, [date]: obj },
        norm,
        volume,
        emptyVolume,
        fullVolume,
        empty,
        full,
        glasses: getGlasses(norm, empty)
      }
    }

    case GLASSES_UPDATE: {

      const { glasses, drinked, emptyVolume, fullVolume, empty, full } = payload
      const date = getDateForData(state.date);
      const obj = {
        norm: state.norm,
        volume: state.volume,
        emptyGlasses: empty
      }

      setDatObj(state, date, obj);

      return {
        ...state,
        dataObj: { ...state.dataObj, [date]: obj },
        glasses,
        drinked,
        emptyVolume,
        fullVolume,
        empty,
        full
      }
    }

    default:
      return state;
  }
}