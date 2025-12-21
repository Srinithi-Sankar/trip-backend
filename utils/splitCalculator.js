function calculateSplits({ amount, splitType, splits, participants }) {
  let result = [];

  if (splitType === "equal") {
    const perPerson = amount / participants.length;
    result = participants.map((user) => ({
      user,
      amount: perPerson
    }));
  }

  if (splitType === "percentage") {
    let totalPercent = 0;

    result = splits.map((s) => {
      totalPercent += s.value;
      return {
        user: s.user,
        amount: (amount * s.value) / 100
      };
    });

    if (totalPercent !== 100) {
      throw new Error("Total percentage must be 100");
    }
  }

  if (splitType === "custom") {
    let totalAmount = 0;

    result = splits.map((s) => {
      totalAmount += s.value;
      return {
        user: s.user,
        amount: s.value
      };
    });

    if (totalAmount !== amount) {
      throw new Error("Split amounts must equal total amount");
    }
  }

  return result;
}

module.exports = calculateSplits;
