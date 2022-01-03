import React from 'react'
import './component.css'
function Die(props){
    const style={
        backgroundColor: props.held? "#5dc25d":'#dbd3d3'
    }
    return(
            <div className='die' style={style} onClick={props.dieClick}>{props.value}</div>
    )
}
export default Die;