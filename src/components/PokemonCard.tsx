
import React from 'react';
import { Pokemon } from '../services/pokemonService';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  // Format the Pokemon ID to be 3 digits (e.g. #001, #025)
  const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;
  
  // Capitalize first letter of Pokemon name
  const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-4 flex flex-col items-center">
        <div className="w-36 h-36 mb-2">
          <img 
            src={pokemon.sprites.other['official-artwork'].front_default || '/placeholder.svg'} 
            alt={`${pokemon.name}`}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        <p className="text-sm text-muted-foreground">{formattedId}</p>
        <h3 className="font-bold text-lg mb-2">{capitalizedName}</h3>
        <div className="flex gap-2 flex-wrap justify-center">
          {pokemon.types.map((typeInfo, index) => (
            <Badge 
              key={index} 
              className={`type-${typeInfo.type.name} text-white`}
              variant="outline"
            >
              {typeInfo.type.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
