export const getService = (service) => {
  console.log(service);
  switch (service) {
    case "mixing":
      return "Mixing";
    case "mastering":
      return "Mastering";
    case "mix&master":
      return `Mix & Master`;
    default:
      return "";
  }
};
