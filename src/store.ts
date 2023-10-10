export interface StoreData {
  wrapLines: boolean;
}

class Store {
  private data: StoreData = {
    wrapLines: true,
  };

  private initialized: boolean;
  private listeners: Array<(state: StoreData) => void> = [];

  init() {
    if (this.initialized) {
      throw new Error('Store already initialized!');
    }

    this.initialized = true;

    // @TODO - Load from settings
    this.data.wrapLines = true;
  }

  reset() {
    if (!this.initialized) {
      throw new Error('Store not initialized!');
    }

    this.initialized = false;
  }

  addListener = (listener: (value: StoreData) => void) => {
    this.listeners.push(listener);
  };

  removeListener = (listener: (value: StoreData) => void) => {
    this.listeners = this.listeners.filter((l) => l !== listener);
  };

  private notifyListeners = () => {
    this.listeners.forEach((l) => l(this.data));
  };

  get wrapLines(): boolean {
    return this.data.wrapLines;
  }

  set wrapLines(value: boolean) {
    this.data.wrapLines = value;

    this.notifyListeners();
  }
}

const store = new Store();

export default store;
