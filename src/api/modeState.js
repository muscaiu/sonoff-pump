const modeState = {
  mode: 'unititialized',

  get getMode() {
    return this.mode;
  },

  set setMode(value) {
    this.mode = value;
  }
};

module.exports = modeState;
