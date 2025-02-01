import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { resetSelection, setActiveTab } from "../store/comboSlice";

export const SelectedComboCard:React.FC = () => {
  const dispatch = useDispatch();
  const { selectedChips, selectedDrink, selectedChocolate } = useSelector(
    (state: RootState) => state.combo
  );

  if (!selectedChips && !selectedChocolate && !selectedDrink) {
    return <div className="selected-combo-items"><span className="no-items">No Item Selected</span></div>;
  }
  return (
    <div className={`selected-combo`}>
      <h3 className="selected-combo-title">Selected Combo</h3>
      <div className="selected-combo-items">
        {selectedChips && (
          <div>
            Chips: <strong>{selectedChips}</strong>
          </div>
        )}
        {selectedDrink && (
          <div>
            Drink: <strong>{selectedDrink}</strong>
          </div>
        )}
        {selectedChocolate && (
          <div>
            Chocolate: <strong>{selectedChocolate}</strong>
          </div>
        )}
      </div>
      <button
        onClick={() => {
          dispatch(resetSelection());
          dispatch(setActiveTab("chips"));
        }}
        className="reset-button"
      >
        Clear
      </button>
    </div>
  );
};
