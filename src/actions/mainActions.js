import {
    GLASSES_UPDATE
} from '../constants.js';

export function setGlassArr(e, glasses, volume) {

    const index = e.target.dataset.index;
    let arr = [];
    glasses.map((el) => {
        arr.push(el)
    })
    arr[index] = arr[index] === 'empty' ? 'full' : 'empty';
    const newVolume = volume * arr.filter((el) => { return el === 'empty' }).length

    const empty = arr.filter((el) => { return el === 'empty' }).length;
    const full = arr.length - empty;
    const emptyVolume = empty * volume;
    const fullVolume = full * volume;

    console.log(empty, full, emptyVolume, fullVolume)

    return {
        type: GLASSES_UPDATE,
        payload: {
            glasses: arr,
            drinked: newVolume,
            emptyVolume: emptyVolume,
            fullVolume: fullVolume,
            empty: empty,
            full: full
        }
    }
}