// const MIX_PRICE = process.env.REACT_APP_MIX_PRICE;
// const MASTER_PRICE = process.env.REACT_APP_MASTER_PRICE;
// const MIX_MASTER_PRICE = process.env.REACT_APP_MIX_MASTER_PRICE;

export const getPriceTiers = () => {
  return [
    {
      title: "Mixing",
      // price: MIX_PRICE,
      description:
        "I take your raw tracks recorded at either a professional or home studio, and bring them together to give your music clarity, energy and a balanced sound that translates well across all platforms and playback systems.",
      buttonText: "START MIXING",
      buttonVariant: "contained",
    },
    {
      title: "Mastering",
      // price: MASTER_PRICE,
      description:
        "I transform your final mixes into loud, characterful stereo masters, ready for release on all major streaming platforms. Stem mastering is also available for projects that could benefit from additional polish.",
      buttonText: "START MASTERING",
      buttonVariant: "contained",
    },
  ];
};
