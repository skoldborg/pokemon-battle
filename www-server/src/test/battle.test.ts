import { describe, expect, it } from 'vitest';
import { calculateDamage } from '../battle';
import { Pokemon } from '../types';

describe('calculateDamage', () => {
  it('should calculate damage correctly based on type effectiveness', async () => {
    const attacker: Partial<Pokemon> = {
      name: 'Pikachu',
      type: ['Electric'],
      weight: '6.0 kg',
      height: '0.41 m',
      multipliers: [2.34],
    };

    const defender: Partial<Pokemon> = {
      name: 'Squirtle',
      type: ['Water'],
      weight: '9.0 kg',
      height: '0.51 m',
      multipliers: [2.1],
    };

    const damage = await calculateDamage(
      attacker as Pokemon,
      defender as Pokemon
    );
    expect(damage).toBeGreaterThan(0);
  });
});
