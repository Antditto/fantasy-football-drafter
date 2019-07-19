export class Player {
  id: string;
  displayName: string;
  team: string;
  position: string;
};

export class PlayerMap {
  qb: Player[];
  rb: Player[];
  wr: Player[];
  flex: Player[];
  te: Player[];
  k: Player[];
  def: Player[];
  bench: Player[];
}
