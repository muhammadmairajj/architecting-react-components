import React from 'react';

import TextField from "../textfield";
import Timer from "../timer";

import "./style.css";

function Header({ onLanguageChange, language, onKeyPress, timer, enabledTyping }) {
    return (
        <div className='header'>
            <TextField text={language} disabled={enabledTyping} onInput={onLanguageChange} onKeyPress={onKeyPress} />
            <Timer timer={timer} />
        </div>
    )
}

export default Header;