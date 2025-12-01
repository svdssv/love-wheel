export enum IntimacyLevel {
  Sweet = 'SWEET',   // 甜蜜 (Level 1)
  Flirty = 'FLIRTY', // 暧昧 (Level 2)
  Hot = 'HOT'        // 激情 (Level 3)
}

export enum ItemType {
  Reward = 'REWARD',
  Punishment = 'PUNISHMENT'
}

export interface WheelItem {
  id: string;
  text: string;
  type: ItemType;
  color: string;
}

export interface GameState {
  isSpinning: boolean;
  rotation: number;
  selectedItem: WheelItem | null;
  level: IntimacyLevel;
  items: WheelItem[];
}