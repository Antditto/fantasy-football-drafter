import {Player } from './player';

export class Team {
  userId: string;
  qb: [Player];
  rb: [Player, Player];
  wr: [Player, Player];
  flex: [Player];
  te: [Player];
  k: [Player];
  def: [Player];
  bench: [Player, Player, Player, Player, Player, Player];
};
