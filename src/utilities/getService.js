export const getService = (service) => {
  switch (service) {
    case "mixing":
      return "Mixing";
    case "mastering":
      return "Mastering";
    case "mix&master":
      return "Mix & Master";
    default:
      return "";
  }
};
