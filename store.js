class Store {
  #state;
  #reducer;
  #listeners = [];
  #isDispatching = false;

  constructor(reducer) {
    this.#reducer = reducer;
  }

  getState() {
    if (this.#isDispatching)
      throw new Error("dispatch fires while running getState()");
    return this.#state;
  }

  subscribe(listener) {
    if (this.#isDispatching)
      throw new Error("dispatch fires while running subscribe()");
    this.#listeners.push(listener);
  }

  dispatch(action) {
    this.#isDispatching = true;
    if (typeof this.#reducer === "function") {
      this.#state = this.#reducer(this.#state, action);
      // run subsribed listeners
      if (this.#listeners.length > 0) this.#handleSubscribe();
    }
    this.#isDispatching = false;
  }

  #handleSubscribe() {
    this.#listeners.forEach((listener) => {
      if (typeof listener === "function") {
        listener(this.#state);
      }
    });
  }
}

export function createStore(reducer) {
  return new Store(reducer);
}
