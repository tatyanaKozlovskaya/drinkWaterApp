import React, { Component } from 'react';
import { connect } from 'react-redux';
import './settings.css';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/settingsActions.js';
class Settings extends Component {
    
    clickHandler = (e) => {
        const { setNewNormAndVolume, toggleActive } = this.props.actions;
        console.log(this.props.actions)

        if (e.target.className.indexOf('settings-icon') !== -1) {
            const state = !this.props.active;
            toggleActive(state);

        } else if (e.target.className.indexOf('save') !== -1) {
            const newVolume = this.refs.volume.value || this.props.volume;
            const newNorm = this.refs.norm.value || this.props.norm;
            setNewNormAndVolume({
                volume: newVolume,
                norm: newNorm
            });
            const state = !this.props.active;
            toggleActive(state);
        }
    }

    onChangeHandler = (e) => {
        let obj = e.target;
        var value = +obj.value.replace(/\D/g, '') || 0;

        var min = +obj.getAttribute('min');

        var max = +obj.getAttribute('max');

        obj.value = Math.min(max, Math.max(min, value));

    }

    render() {


        const { norm, volume, active } = this.props
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

function mapStateToProps(state) {
    const { volume, norm } = state.main
    const active = state.settings
    return {
        volume: volume,
        norm: norm,
        active: active
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);