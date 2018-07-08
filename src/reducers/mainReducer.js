
const getGlasses = (norm) => {
  let glasses = [];
  for (var i = 0; i < norm; i++) {
    glasses.push('full')
  }
  return glasses
}

const initialState = {
  date: Date.now(),
  norm: 10,
  volume: 200,
  drinked: 0,
  emptyVolume: 0,
  empty: 0,
  full: 10,
  fullVolume: 2000
};

initialState.glasses = getGlasses(initialState.norm)


export default function mainReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case 'NEW_DATE': {

      const date = payload || '';

      return {
        ...state,
        date
      }
    }

    case 'NEW_NORM_AND_VOLUME': {

      const norm = payload.norm || '';
      const volume = payload.volume || '';
      const emptyVolume = 0;
      const fullVolume = norm * volume;
      const full = norm;
      const empty = 0;

      return {
        ...state,
        norm,
        volume,
        emptyVolume,
        fullVolume,
        empty,
        full,
        glasses: getGlasses(norm)
      }
    }

    case 'GLASSES_UPDATE': {

      const { glasses, drinked, emptyVolume, fullVolume, empty, full } = payload

      return {
        ...state,
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