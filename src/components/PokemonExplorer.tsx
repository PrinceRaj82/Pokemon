
import React, { useState, useMemo } from 'react';
import { usePokemonData, getAllPokemonTypes } from '../services/pokemonService';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription } from './ui/alert';

const PokemonExplorer: React.FC = () => {
  const { pokemonList, isLoading, error } = usePokemonData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Get all unique Pokemon types
  const pokemonTypes = useMemo(() => {
    return getAllPokemonTypes(pokemonList);
  }, [pokemonList]);

  // Filter Pokemon based on search term and selected type
  const filteredPokemon = useMemo(() => {
    return pokemonList.filter((pokemon) => {
      // Filter by name
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by type
      const matchesType = 
        selectedType === 'all' || 
        pokemon.types.some(typeInfo => typeInfo.type.name === selectedType);
      
      return matchesSearch && matchesType;
    });
  }, [pokemonList, searchTerm, selectedType]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="space-y-4 w-full max-w-md">
          <Skeleton className="h-12 w-12 rounded-full mx-auto" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
        <AlertDescription>
          Error loading Pokémon data: {error}. Please refresh the page to try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TypeFilter 
          types={pokemonTypes} 
          selectedType={selectedType} 
          onTypeChange={setSelectedType} 
        />
      </div>
      
      {filteredPokemon.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No Pokémon found matching your search criteria.
          </p>
          <p className="mt-2">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PokemonExplorer;
