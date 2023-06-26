import img from './spinner.gif'
import React from 'react';

const Spinner = () => {
    return (
        <img style={{ alignSelf: 'center', justifySelf: 'center' }} src={img} alt='Spinner' />
    )
}

export default Spinner;