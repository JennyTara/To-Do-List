import React from 'react';
import './Button.css'

export default function Button ({title}: {title:string}) : React.JSX.Element {
    return (
        <button className="button">{title}</button>
    )
}