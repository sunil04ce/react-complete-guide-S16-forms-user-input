import { useState, useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }

  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }

  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }

  return initialState;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialState);

  // const [enteredValue, setEnteredValue] = useState("");
  // const [isTouched, setIsTouched] = useState(false);

  // const valueIsValid = validateValue(enteredValue);
  // const hasError = !valueIsValid && isTouched;

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const inputChangeHandler = (event) => {
    // setEnteredValue(event.target.value);
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    // setIsTouched(true);
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    // setEnteredValue("");
    // setIsTouched(false);
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError: hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
