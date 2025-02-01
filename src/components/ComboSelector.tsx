import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveTab,
  setCombos,
  setError,
  setLoading,
} from "../store/comboSlice";
import { RootState } from "../store";
import { ItemType } from "../types";
import ItemList from "./ItemList";
import { useEffect } from "react";

export const ComboSelector: React.FC = () => {
  const tabs: ItemType[] = ["chips", "drink", "chocolate"];
  const dispatch = useDispatch();
  const { loading, error, activeTab } = useSelector(
    (state: RootState) => state.combo
  );

  let activeTabIndex = tabs.indexOf(activeTab);

  const moveToNextTab = () => {
    if (activeTabIndex < tabs.length - 1) {
      dispatch(setActiveTab(tabs[activeTabIndex + 1]));
    }
  };
  const moveToTab = (tab: ItemType) => {
    activeTabIndex = tabs.indexOf(tab);

    dispatch(setActiveTab(tab));
  };

  useEffect(() => {
    const fetchCombos = async () => {
      dispatch(setLoading(true));
      try {
        const data = await import("../data/data.json");

        dispatch(setCombos(Array.isArray(data) ? data : data.combos));
      } catch (err) {
        console.error("Error fetching combos:", err);
        dispatch(
          setError(
            err instanceof Error ? err.message : "Failed to fetch combos"
          )
        );
      }
    };

    fetchCombos();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className={`tabs `}>
        <div className="tab-list">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab == tab ? "active" : ""}`}
              onClick={() => moveToTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="tab-content">
          <p className="instruction">
            Click to add a{" "}
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} item
          </p>

          <ItemList type={activeTab} moveToNextTab={moveToNextTab} />
        </div>
      </div>
    </>
  );
};
