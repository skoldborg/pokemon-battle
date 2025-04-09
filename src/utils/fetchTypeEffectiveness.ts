import fetch from 'node-fetch';

interface TypeEffectiveness {
  [type: string]: {
    [againstType: string]: number;
  };
}

let typeEffectiveness: TypeEffectiveness = {};

export async function fetchTypeEffectiveness(): Promise<TypeEffectiveness> {
  if (Object.keys(typeEffectiveness).length === 0) {
    const response = await fetch(
      'https://pogoapi.net/api/v1/type_effectiveness.json'
    );
    typeEffectiveness = (await response.json()) as TypeEffectiveness;
  }
  return typeEffectiveness;
}
