
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface TypeFilterProps {
  types: string[];
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ types, selectedType, onTypeChange }) => {
  return (
    <Select value={selectedType} onValueChange={onTypeChange}>
      <SelectTrigger className="w-full max-w-[200px] bg-background">
        <SelectValue placeholder="Filter by type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Types</SelectItem>
        {types.map((type) => (
          <SelectItem key={type} value={type} className="capitalize">
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TypeFilter;
