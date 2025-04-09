import { Pokemon } from './types';
import { fetchTypeEffectiveness } from './utils/fetchTypeEffectiveness';
import logger from './utils/logger';

export async function calculateDamage(
  attacker: Pokemon,
  defender: Pokemon
): Promise<number> {
  const typeEffectiveness = await fetchTypeEffectiveness();
  let typeMultiplier = 1;

  // Get highest type effectiveness multiplier between attacker's and defender's types.
  attacker.type.forEach((attackerType) => {
    defender.type.forEach((defenderType) => {
      const effectiveness =
        typeEffectiveness[attackerType]?.[defenderType] ?? 1;

      if (effectiveness > typeMultiplier) {
        typeMultiplier = effectiveness;
      }
    });
  });

  const weight = parseFloat(attacker.weight);
  const height = parseFloat(attacker.height);
  const multiplier =
    Array.isArray(attacker.multipliers) && attacker.multipliers.length > 0
      ? Math.max(...attacker.multipliers)
      : 1;

  const baseDamage = (weight + height) * multiplier;
  const damage = baseDamage * typeMultiplier;

  return damage;
}

function generateAttackMessage(
  attackerName: string,
  defenderName: string,
  damage: number
) {
  return `${attackerName} attacks ${defenderName} for ${damage.toFixed(
    2
  )} damage \u{26A1}`;
}

export async function simulateBattle(
  team1Input: Pokemon[],
  team2Input: Pokemon[]
): Promise<{ winner: string; battleLog: string[] }> {
  await fetchTypeEffectiveness();

  const battleLog: string[] = [];
  // We assume each Pokemon has a base HP of 100
  const team1 = team1Input.map((p) => ({ pokemon: p, hp: 100 }));
  const team2 = team2Input.map((p) => ({ pokemon: p, hp: 100 }));

  let round = 1;
  // Continue battle as long as both teams have at least one Pokemon alive
  while (team1.some((p) => p.hp > 0) && team2.some((p) => p.hp > 0)) {
    logger.info(`--- Round ${round} \u{23F0} ---`);
    battleLog.push(`--- Round ${round} ---`);

    logger.info(`--- Team 1 attacks Team 2 ---`);
    battleLog.push(`--- Team 1 attacks Team 2 ---`);
    for (let i = 0; i < team1.length; i++) {
      const attacker = team1[i];

      const defender = team2.find((p) => p.hp > 0);
      if (attacker.hp <= 0 || !defender) continue;

      const damage = await calculateDamage(attacker.pokemon, defender.pokemon);
      defender.hp -= damage;

      const msg = generateAttackMessage(
        attacker.pokemon.name,
        defender.pokemon.name,
        damage
      );
      logger.info(msg);
      battleLog.push(msg);
    }

    // Make sure Team 2 is still standing before attacking
    if (team2.some((p) => p.hp > 0)) {
      logger.info(`--- Team 2 attacks Team 1 ---`);
      battleLog.push(`--- Team 2 attacks Team 1 ---`);

      for (let i = 0; i < team2.length; i++) {
        const attacker = team2[i];
        const defender = team1.find((p) => p.hp > 0);
        if (attacker.hp <= 0 || !defender) continue;

        const damage = await calculateDamage(
          attacker.pokemon,
          defender.pokemon
        );
        defender.hp -= damage;

        const msg = generateAttackMessage(
          attacker.pokemon.name,
          defender.pokemon.name,
          damage
        );
        logger.info(msg);
        battleLog.push(msg);
      }
    }

    round++;
  }

  const winner = team1.some((p) => p.hp > 0) ? `Team 1` : `Team 2`;
  battleLog.push(`Winner: ${winner}`);
  logger.info(`Winner: ${winner} \u{2728}`);

  return { winner, battleLog };
}
