
import { useState, useEffect } from 'react';

export interface Pokemon {
  id: number;
  name: string;
  types: {
    type: {
      name: string;
    }
  }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      }
    }
  };
}

interface ListResponse {
  results: {
    name: string;
    url: string;
  }[];
}

export const usePokemonData = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setIsLoading(true);
        
        // First, get the list of the first 150 Pokemon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        if (!response.ok) throw new Error('Failed to fetch Pokémon list');
        
        const data: ListResponse = await response.json();
        
        // Then fetch details for each Pokemon
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            if (!detailResponse.ok) throw new Error(`Failed to fetch details for ${pokemon.name}`);
            return detailResponse.json();
          })
        );
        
        setPokemonList(pokemonDetails);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching Pokémon data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return { pokemonList, isLoading, error };
};

export const getAllPokemonTypes = (pokemonList: Pokemon[]): string[] => {
  const typesSet = new Set<string>();
  
  pokemonList.forEach(pokemon => {
    pokemon.types.forEach(typeInfo => {
      typesSet.add(typeInfo.type.name);
    });
  });
  
  return Array.from(typesSet).sort();
};
