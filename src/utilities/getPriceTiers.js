// const MIX_PRICE = process.env.REACT_APP_MIX_PRICE;
// const MASTER_PRICE = process.env.REACT_APP_MASTER_PRICE;
// const MIX_MASTER_PRICE = process.env.REACT_APP_MIX_MASTER_PRICE;

export const getPriceTiers = () => {
  return [
    {
      title: "Mixing",
      // price: MIX_PRICE,
      description:
        "I take raw the tracks you recorded at any professional studio or home studio, and turn them into a professional, polished recording.",
      buttonText: "START MIXING",
      buttonVariant: "contained",
    },
    {
      title: "Mastering",
      // price: MASTER_PRICE,
      description:
        "I transform your final mixes into loud, punchy masters that translate across all platforms and playback systems.",
      buttonText: "START MASTERING",
      buttonVariant: "contained",
    },
  ];
};
