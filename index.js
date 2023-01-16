import { createStore } from "./store.js";

const ACTION_INCREASE = "action_increase";
const ACTION_DECREASE = "action_decrease";
const INIT_STATE = { count: 0 };

const display = document.querySelector("#display");
const plusButton = document.querySelector("#plus");
const minusButton = document.querySelector("#minus");

function init() {
  const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case ACTION_INCREASE:
        return { ...state, count: state.count + 1 };
      case ACTION_DECREASE:
        return { ...state, count: state.count - 1 };
      default:
        return state;
    }
  };
  const updateCountUI = (state) => {
    if (display) {
      display.textContent = `Current: ${state.count}`;
    }
  };

  const store = createStore(reducer);
  store.subscribe(updateCountUI);

  const handleClickToPlus = () => store.dispatch({ type: ACTION_INCREASE });
  const handleClickToMinus = () => store.dispatch({ type: ACTION_DECREASE });

  if (plusButton) plusButton.addEventListener("click", handleClickToPlus);
  if (minusButton) minusButton.addEventListener("click", handleClickToMinus);
}

init();
