const MIX_PRICE = process.env.REACT_APP_MIX_PRICE;
const MASTER_PRICE = process.env.REACT_APP_MASTER_PRICE;
const MIX_MASTER_PRICE = process.env.REACT_APP_MIX_MASTER_PRICE;

// Return amount in cents
export const getPrice = (service) => {
  switch (service) {
    case "mixing":
      return MIX_PRICE * 100;
    case "mastering":
      return MASTER_PRICE * 100;
    case "mix&master":
      return MIX_MASTER_PRICE * 100;
    default:
      return 0;
  }
};
