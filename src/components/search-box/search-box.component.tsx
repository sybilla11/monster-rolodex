import type { ChangeEvent } from 'react';
import './search-box.style.css';

export interface SearchboxProps {
  placeholder?: string;
  changeHandle: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Searchbox = ({ placeholder, changeHandle }: SearchboxProps) => (
  <input
    className='search'
    type='search'
    aria-label='Search monsters'
    placeholder={placeholder}
    onChange={changeHandle}
  />
);
