// SearchBar.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
      // Chama a propriedade onSearch com a consulta diretamente
      onSearch(searchQuery);
    } catch (error) {
      console.error('Erro na pesquisa:', error);
    }
  };

  return (
    <>
      <span className="container">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button" onClick={handleSearch} className="pesquisar">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </span>
    </>
  );
}
