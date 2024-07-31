const MIX_PRICE = process.env.REACT_APP_MIX_PRICE;
const MASTER_PRICE = process.env.REACT_APP_MASTER_PRICE;
const MIX_MASTER_PRICE = process.env.REACT_APP_MIX_MASTER_PRICE;

export const getPriceTiers = () => {
  return [
    {
      title: "Mixing",
      // price: MIX_PRICE,
      description:
        "Individual and combined processing of all the elements of a song to create a cohesive, balanced sound. Alternate versions such as instrumental, acapella, etc are available.",
      buttonText: "START MIXING",
      buttonVariant: "contained",
    },
    {
      title: "Mastering",
      // price: MASTER_PRICE,
      description:
        "Processing applied to the final mix to create a fully defined master with optimal loudness to cut an album or release on streaming services. Alternate versions are available and revisions if necessary.",
      buttonText: "START MASTERING",
      buttonVariant: "contained",
    },
  ];
};
