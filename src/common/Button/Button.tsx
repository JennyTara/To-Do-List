import React from 'react';
import './Button.css'

type ButtonPropsTypes = {
    title: string,
    className: string,
    disabled?: boolean,
    onClick?: () => void,
}

export default function Button ({title, className, disabled, onClick}: ButtonPropsTypes) {
    return (
        <button className={className} onClick={onClick} disabled={disabled}>{title}</button>
    )
}