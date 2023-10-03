import React, { useState } from "react";

function App() {
  const [showInitialInputs, setShowInitialInputs] = useState(true);
  const [inputCount, setInputCount] = useState(1);
  const [inputValues, setInputValues] = useState([""]);
  const [pivotIndex, setPivotIndex] = useState(null);

  const handleNext = () => {
    setShowInitialInputs(false);
  };

  const handleAddInput = () => {
    setInputCount(inputCount + 1);
    setInputValues([...inputValues, ""]);
  };

  const handleRemoveInput = (indexToRemove) => {
    setInputCount(inputCount - 1);
    setInputValues((prevValues) =>
      prevValues.filter((_, index) => index !== indexToRemove)
    );
  };

  const calculatePivotIndex = () => {
    let sumLeft = 0;
    let sumRight = inputValues.reduce((acc, value) => acc + Number(value), 0);

    for (let i = 0; i < inputValues.length; i++) {
      sumRight -= Number(inputValues[i]);
      if (sumLeft === sumRight) {
        setPivotIndex(i);
        return;
      }
      sumLeft += Number(inputValues[i]);
    }

    // If no pivot index is found, set it to null.
    setPivotIndex(-1);
  };

  return (
    <div className="App">
      {showInitialInputs ? (
        <div>
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) =>
              setInputValues([e.target.value, ...inputValues.slice(1)])
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setInputValues([inputValues[0], e.target.value])}
          />
          <button onClick={handleNext}>Next</button>
        </div>
      ) : (
        <div>
          {inputValues.map((value, index) => (
            <div key={index}>
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  const newInputValues = [...inputValues];
                  newInputValues[index] = e.target.value;
                  setInputValues(newInputValues);
                }}
              />
              {inputCount > 1 && (
                <button onClick={() => handleRemoveInput(index)}>-</button>
              )}
            </div>
          ))}
          <button onClick={handleAddInput}>+</button>
          <button onClick={calculatePivotIndex}>Submit</button>
          <button onClick={() => setShowInitialInputs(true)}>Go Back</button>
          {pivotIndex !== null && <p>Pivot Index: {pivotIndex}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
