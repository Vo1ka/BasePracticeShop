import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterProducts } from '../../../store/slices/productsSlice';
import { useDebounce } from '../../../hooks/useDebounce';
import React from 'react';
import './searchinput.css'

interface SearchInputProps{
    onSearchChange?: (query: string) => void;
}

const SearchInput =({onSearchChange}:SearchInputProps) => {
    const [inputValue, setInputValue] = useState<string>('');
    const dispatch = useDispatch();
    const debouncedValue = useDebounce<string>(inputValue, 500);

    useEffect(()=>{
        dispatch(filterProducts(debouncedValue));
    },[debouncedValue, dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        if (onSearchChange) {
            onSearchChange(value); 
        }
    };


    return(
        <input type="text"
        onChange={handleChange}
        value={inputValue}
        className='search-input'
        placeholder='Поиск товаров...'
         />
    )
}

export default React.memo(SearchInput);