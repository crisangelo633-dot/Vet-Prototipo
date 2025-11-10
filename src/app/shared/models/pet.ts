export type Species = 'perro' | 'gato' | 'ave' | 'reptil' | 'otro';

export interface Pet {
  id?: number;
  ownerId: number;
  name: string;
  species: Species;
  breed?: string;
  sex?: 'macho' | 'hembra';
  birthDate?: string; // ISO
  weightKg?: number;
  neutered?: boolean;
  notes?: string;
}
