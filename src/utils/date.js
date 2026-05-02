const getStartOfDayUTC = (dateInput) => {
  const date = new Date(dateInput);
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      0,
      0,
      0,
      0
    )
  );
};

module.exports = {
  getStartOfDayUTC,
};
