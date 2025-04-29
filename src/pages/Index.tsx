
import React from 'react';
import PokemonExplorer from '../components/PokemonExplorer';
import ThemeToggle from '../components/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white py-6 shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Interactive Data Explorer</h1>
              <p className="mt-1 text-white/80">Search and filter through the first 150 Pokémon</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <PokemonExplorer />
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground mt-8">
        <p>Data provided by <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-primary underline">PokeAPI</a></p>
      </footer>
    </div>
  );
};

export default Index;
