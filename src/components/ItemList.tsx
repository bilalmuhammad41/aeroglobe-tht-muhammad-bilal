import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { deselectItem, selectItem } from "../store/comboSlice";
import { ItemType } from "../types";

type Props = {
  type: ItemType;
  moveToNextTab: () => void;
};

export const ItemList: React.FC<Props> = ({ type }: Props) => {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
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

  const handleSelect = (item: string, event: React.MouseEvent<HTMLButtonElement>) => {
    if (isSelected(item)) {
      dispatch(deselectItem(type));
      event.currentTarget.blur();
      event.currentTarget.classList.remove('selected');
      
    } else {
      dispatch(selectItem({ type, id: item }));
    }
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

  
  useEffect(() => {
    buttonRefs.current.forEach(button => {
      if (button) {
        const handleMouseEnter = () => {
          button.classList.add('selected');
        };

        const handleMouseLeave = () => {
          if (!button.classList.contains('item-button-selected')) {
            button.classList.remove('selected');
          }
        };

        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          button.removeEventListener('mouseenter', handleMouseEnter);
          button.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    });
  }, [items.length]);

  return (
    <div className="item-grid">
      {items.map((item, index) => (
        <button
          key={item}
          ref={el => buttonRefs.current[index] = el}
          onClick={(event) => handleSelect(item, event)}
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
            onClick={(event) => handleSelect(item, event)}
            className={`item-button`}
          >
            {item}
          </button>
        ))}
    </div>
  );
};

export default ItemList;
