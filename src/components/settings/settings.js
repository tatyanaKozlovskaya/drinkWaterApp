import React, { Component } from 'react';
import { connect } from 'react-redux';
import './settings.css';

class Settings extends Component {

    clickHandler = (e) => {
        if (e.target.className.indexOf('settings-icon') !== -1) {
            const state = !this.props.state.settings;
            this.props.toggleActive(state)
        } else if (e.target.className.indexOf('save') !== -1) {
            const volume = +this.refs.volume.value || this.props.state.main.volume;
            const norm = +this.refs.norm.value || this.props.state.main.norm;
            this.props.setNewNormAndVolume({
                volume: volume,
                norm: norm
            })
        }
    }

    render() {
        const { norm, volume } = this.props.state.main;
        const active = this.props.state.settings;

        return <div className="settings">
            <div className={`settings-block ${(active ? 'settings-block_active' : '')}`}>
                <div className='norm'>Количество стакнов(шт):
                    <input type='number' placeholder={norm} ref='norm' />
                </div>
                <div className='volume'>Объем стакана(мл):
                    <input type='number' placeholder={volume} ref='volume' />
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