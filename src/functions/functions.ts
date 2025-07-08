export const parseToChordAndText = (input: string) => {
  const result: { chord: string; text: string }[] = [];
  let i = 0;
  let currentText = "";

  while (i < input.length) {
    if (input[i] === "[") {
      if (currentText) {
        if (result.length === 0) {
          result.push({ chord: "", text: currentText });
        } else {
          result[result.length - 1].text += currentText;
        }
        currentText = "";
      }

      i++; 
      const chordStart = i;
      while (i < input.length && input[i] !== "]") i++;
      const chord = input.slice(chordStart, i);
      i++; 

      const lyricStart = i;
      while (i < input.length && input[i] !== "[") i++;
      const lyricText = input.slice(lyricStart, i);

      result.push({ chord, text: lyricText });
    } else {
      currentText += input[i];
      i++;
    }
  }

  if (currentText) {
    if (result.length === 0) {
      result.push({ chord: "", text: currentText });
    } else {
      result[result.length - 1].text += currentText;
    }
  }

  return result;
};

