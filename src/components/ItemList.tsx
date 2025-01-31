import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { selectItem } from "../store/comboSlice";
import { ItemType } from "../types";

type Props = {
  type: ItemType;
  moveToNextTab: () => void;
};

export const ItemList:React.FC<Props> = ({ type }: Props) => {

  const dispatch = useDispatch();
  const { combos, selectedChips, selectedDrink, selectedChocolate } =
    useSelector((state: RootState) => state.combo);

  const getAvailableItems = (): string[] => {
    if (!Array.isArray(combos)) {
      console.error("Combos is not an array:", combos);
      return [];
    }

    let items: string[] = [];

    switch (type) {
      case "chips":
        items = combos
          .filter((c) => !selectedDrink || c.drink === selectedDrink)
          .filter(
            (c) => !selectedChocolate || c.chocolate === selectedChocolate
          )
          .map((c) => c.chips);
        break;

      case "drink":
        items = combos
          .filter((c) => !selectedChips || c.chips === selectedChips)
          .filter(
            (c) => !selectedChocolate || c.chocolate === selectedChocolate
          )
          .map((c) => c.drink);
        break;

      case "chocolate":
        items = combos
          .filter((c) => !selectedChips || c.chips === selectedChips)
          .filter((c) => !selectedDrink || c.drink === selectedDrink)
          .map((c) => c.chocolate);
        break;

      default:
        return [];
    }

    return [...new Set(items)];
  };

  const items = getAvailableItems();

  const handleSelect = (item: string) => {
    dispatch(selectItem({ type, id: item }));
  };

  const isSelected = (item: string) => {
    switch (type) {
      case "chips":
        return selectedChips === item;
      case "drink":
        return selectedDrink === item;
      case "chocolate":
        return selectedChocolate === item;
      default:
        return false;
    }
  };

  return (
    <div className="item-grid">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => handleSelect(item)}
          className={`item-button ${isSelected(item) ? "selected" : ""}`}
        >
          {item}
        </button>
      ))}
      {items
        .filter((item) => !items.includes(item))
        .map((item) => (
          <button
            key={item}
            onClick={() => handleSelect(item)}
            className={`item-button`}
          >
            {item}
          </button>
        ))}
    </div>
  );
};

export default ItemList;
