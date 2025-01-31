import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab, setCombos, setError, setLoading, deselectItem } from '../store/comboSlice';
import { RootState } from '../store';
import { ItemType } from '../types';
import { SelectedComboCard } from './SelectedComboCard';
import ItemList from './ItemList';
import { useEffect } from 'react';

type Props = {}

export const ComboSelector = (props: Props) => {
  const tabs: ItemType[] = ['chips', 'drink', 'chocolate'];
  const dispatch = useDispatch();
  const { loading, error, activeTab, selectedChips, selectedDrink, selectedChocolate } = useSelector((state: RootState) => state.combo);

  let activeTabIndex = tabs.indexOf(activeTab);

  const moveToNextTab = () => {
    if (activeTabIndex < tabs.length - 1) {
      dispatch(setActiveTab(tabs[activeTabIndex + 1]));
    }
  };

  const handleBack = () => {
    if (activeTabIndex > 0) {
      dispatch(deselectItem(activeTab));
      dispatch(setActiveTab(tabs[activeTabIndex - 1]));
    }
    if(activeTabIndex === 0){
      dispatch(deselectItem(activeTab));
    }
  };

  useEffect(() => {
    const fetchCombos = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch('/api/data.json');
        const data = await response.json();
       
        dispatch(setCombos(Array.isArray(data) ? data : data.combos));
      } catch (err) {
        console.error('Error fetching combos:', err);
        dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch combos'));
      }
    };

    fetchCombos();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="tabs">
      <div className="tab-list">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab == tab ? 'active' : ''}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="tab-content">
        <ItemList type={activeTab} moveToNextTab={moveToNextTab} />
      </div>

      <div>
        {activeTabIndex >= 0 && (
          <button className="back-active" onClick={handleBack}>Back</button>
        )}
      </div>

      <SelectedComboCard />
    </div>
  );
};