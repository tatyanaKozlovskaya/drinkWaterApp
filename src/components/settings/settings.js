import React, { Component } from 'react';
import { connect } from 'react-redux';
import './settings.css';

class Settings extends Component {

    clickHandler = (e) => {
        if (e.target.className.indexOf('settings-icon') !== -1) {
            const state = !this.props.state.settings;
            this.props.toggleActive(state);
        } else if (e.target.className.indexOf('save') !== -1) {

            const newVolume = this.refs.volume.value || this.props.state.main.volume;
            const newNorm = this.refs.norm.value|| this.props.state.main.norm;
            this.props.setNewNormAndVolume({
                volume: newVolume,
                norm: newNorm
            });
            const state = !this.props.state.settings;
            this.props.toggleActive(state);
        }
    }

    onChangeHandler = (e) => {
        let obj = e.target;
        var value= +obj.value.replace(/\D/g,'')||0;
       
        var min = +obj.getAttribute('min');
       
        var max = +obj.getAttribute('max');
       
        obj.value = Math.min(max, Math.max(min, value));
       
    }

    render() {
        const { norm, volume } = this.props.state.main;
        const active = this.props.state.settings;

        return <div className="settings">
            <div className={`settings-block ${(active ? 'settings-block_active' : '')}`}>
                <div className='norm'>Количество стакнов(шт), max - 20:
                    <input type='number' defaultValue={norm} ref='norm' min='1' max='20' onBlur={this.onChangeHandler} />
                </div>
                <div className='volume'>Объем стакана(мл), max - 1000:
                    <input type='number' defaultValue={volume} ref='volume' min='100' max='1000' onBlur={this.onChangeHandler} />
                </div>
                <div className='save' onClick={this.clickHandler}>Сохранить</div>
            </div>
            <div className='settings-icon' onClick={this.clickHandler}></div>
        </div>
    }
}

export default connect(
    state => ({
        state: state
    }),
    dispatch => ({
        toggleActive: (state) => {
            dispatch({
                type: 'NEW_SETTINGS_STATE',
                payload: state
            })
        },
        setNewNormAndVolume: (obj) => {
            dispatch({
                type: 'NEW_NORM_AND_VOLUME',
                payload: obj
            })
        }
    })
)(Settings);