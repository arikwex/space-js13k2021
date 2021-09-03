export default (() => {
  var minerals = 0;
  var level = 0;
  var upgrades = {};
  var deck = [];

  return {
    getMinerals: () => minerals,
    addMineral: (m) => minerals += m,

    getLevel: () => level,
    setLevel: (l) => level = l,

    resetUpgrades: () => upgrades = {},
    setUpgrade: (u) => upgrades[u] = true,
    hasUpgrade: (u) => upgrades[u],

    clearDeck: (c) => deck = [],
    addToDeck: (c) => deck.push(c),
  };
})();