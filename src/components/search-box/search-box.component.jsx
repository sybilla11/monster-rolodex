import React from 'react';
import './search-box.style.css';

export const Searchbox= ({placeholder, changeHandle}) => (
<input className = 'search' type = 'search' placeholder = {placeholder} onChange = {changeHandle}/>
)