import { ComboSelector } from "./ComboSelector";

export const ComboDealWrapper = () => {
  return (
    <>
      <div className="main-container">
        <h1 className="combo-title">Create your snack combo!</h1>
        <div className="combo-wrapper">
          <ComboSelector />
        </div>
      </div>
    </>
  );
};
