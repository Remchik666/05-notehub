import { useState, useEffect } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
    onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        onSearch(debouncedSearch);
    }, [debouncedSearch, onSearch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            value={search}
            onChange={handleChange}
        />
    );
}