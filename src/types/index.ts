export type ItemType = 'chips' | 'drink' | 'chocolate';

export interface Item {
  id: string;
  name: string;
  type: ItemType;
}

export interface Combo {
  id: string;
  chips: string;
  drink: string;
  chocolate: string;
  
}