import React from 'react';
import './search-box.style.css';

export interface SearchboxProps {
  placeholder?: string;
  changeHandle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Searchbox = ({ placeholder, changeHandle }: SearchboxProps) => (
  <input className='search' type='search' placeholder={placeholder} onChange={changeHandle} />
);
