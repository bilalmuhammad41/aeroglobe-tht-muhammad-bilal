import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { resetSelection, setActiveTab } from '../store/comboSlice';

type Props = {}

export const SelectedComboCard = (props: Props) => {
  const dispatch = useDispatch();
  const { selectedChips, selectedDrink, selectedChocolate } = 
    useSelector((state: RootState) => state.combo);

  if (!selectedChips && !selectedDrink && !selectedChocolate) {
    return <div className='selected-combo'>No Item Selected</div>;
  }

  return (
    <div className="selected-combo">
      <h3>Selected Combo</h3>
      {selectedChips && <div>Chips: {selectedChips}</div>}
      {selectedDrink && <div>Drink: {selectedDrink}</div>}
      {selectedChocolate && <div>Chocolate: {selectedChocolate}</div>}
      <button
        onClick={() => {
          dispatch(resetSelection())
          dispatch(setActiveTab("chips"))
        }}
        className="reset-button"
      >
        Clear
      </button>
    </div>
  );
};
