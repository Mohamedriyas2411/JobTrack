// Mock inventory API simulation

const inventory = {
  "Oil Filter": 350,
  "Air Filter": 250,
  "Engine Oil": 900,
  "Brake Pad": 1200
};

exports.getPartPrice = (partName) => {
  return inventory[partName] || 0;
};
