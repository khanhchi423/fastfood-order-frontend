import { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        onSearch('');
        inputRef.current?.focus();
    };

    return (
        <div className="relative max-w mx-auto">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    placeholder="Tìm món hoặc quán ăn"
                    className="w-full pl-10 pr-10 py-3 rounded-full border border-gray-300 
                        focus:outline-none focus:ring-1 focus:ring-gray-300"
                    onChange={handleInputChange}
                />
                {searchTerm && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full
                            hover:bg-gray-100"
                    >
                        <X className="w-4 h-4 text-gray-400" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default SearchBar;   