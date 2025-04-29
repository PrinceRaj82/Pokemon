
import React from 'react';
import PokemonExplorer from '../components/PokemonExplorer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Interactive Data Explorer</h1>
          <p className="text-center mt-1 text-white/80">Search and filter through the first 150 Pokémon</p>
        </div>
      </header>
      
      <main>
        <PokemonExplorer />
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground mt-8">
        <p>Data provided by <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-primary underline">PokeAPI</a></p>
      </footer>
    </div>
  );
};

export default Index;
