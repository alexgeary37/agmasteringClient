const MIX_PRICE = process.env.REACT_APP_MIX_PRICE;
const MASTER_PRICE = process.env.REACT_APP_MASTER_PRICE;
const MIX_MASTER_PRICE = process.env.REACT_APP_MIX_MASTER_PRICE;

export const getPriceTiers = () => {
  return [
    {
      title: "Mixing",
      price: MIX_PRICE,
      description: [
        "1 Stereo main mix",
        "4 alternate versions included",
        "1 revision set included",
      ],
      buttonText: "START MIXING",
      buttonVariant: "contained",
    },
    {
      title: "Mastering",
      // subheader: "Most popular",
      price: MASTER_PRICE,
      description: [
        "1 Stereo main master",
        "Alternate versions (+$10)",
        "2 revision sets included",
      ],
      buttonText: "START MASTERING",
      buttonVariant: "contained",
    },
    {
      title: "Mix & Master",
      price: MIX_MASTER_PRICE,
      description: [
        "1 Stereo main master",
        "4 alternate versions (+$10)",
        "1 revision mix set included",
      ],
      buttonText: "START MIX & MASTER",
      buttonVariant: "contained",
    },
  ];
};
