const cheaperOrMoreExpensive = (value) => {
  if (value > 0) {
    return `${value}% more than the market average`;
  }
  if (value < 0) {
    return `${value}% less than the market average`;
  }
  return "at the same rate as the market";
};

const tooltipMessage = (rent) => {
  const message = `Rent has risen ${cheaperOrMoreExpensive(rent)}`;
  return message;
};

module.exports = { tooltipMessage };
