export const getDescription = (service, numberSongs) => {
  const file = numberSongs > 1 ? "files" : "file";
  const song = numberSongs > 1 ? "songs" : "song";
  switch (service) {
    case "mixing":
      return `Mixed WAV ${file} of ${numberSongs} ${song}`;
    case "mastering":
      return `Mastered WAV ${file} of ${numberSongs} ${song}`;
    case "mix&master":
      return `Mixed & Mastered WAV ${file} of ${numberSongs} ${song}`;
    default:
      return "";
  }
};
