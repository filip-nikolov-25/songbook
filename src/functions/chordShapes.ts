export interface ChordShape {
  frets: number[];
  barre?: { fret: number; from: number };
}

const NOTE_VALUES: Record<string, number> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 10,
  H: 11,
};

const OPEN_SHAPES: Record<string, number[]> = {
  C: [-1, 3, 2, 0, 1, 0],
  Cmaj7: [-1, 3, 2, 0, 0, 0],
  C7: [-1, 3, 2, 3, 1, 0],
  D: [-1, -1, 0, 2, 3, 2],
  Dm: [-1, -1, 0, 2, 3, 1],
  D7: [-1, -1, 0, 2, 1, 2],
  Dm7: [-1, -1, 0, 2, 1, 1],
  Dmaj7: [-1, -1, 0, 2, 2, 2],
  Dsus2: [-1, -1, 0, 2, 3, 0],
  Dsus4: [-1, -1, 0, 2, 3, 3],
  E: [0, 2, 2, 1, 0, 0],
  Em: [0, 2, 2, 0, 0, 0],
  E7: [0, 2, 0, 1, 0, 0],
  Em7: [0, 2, 0, 0, 0, 0],
  Esus4: [0, 2, 2, 2, 0, 0],
  Fmaj7: [-1, -1, 3, 2, 1, 0],
  G: [3, 2, 0, 0, 0, 3],
  G7: [3, 2, 0, 0, 0, 1],
  A: [-1, 0, 2, 2, 2, 0],
  Am: [-1, 0, 2, 2, 1, 0],
  A7: [-1, 0, 2, 0, 2, 0],
  Am7: [-1, 0, 2, 0, 1, 0],
  Amaj7: [-1, 0, 2, 1, 2, 0],
  Asus2: [-1, 0, 2, 2, 0, 0],
  Asus4: [-1, 0, 2, 2, 3, 0],
  H7: [-1, 2, 1, 2, 0, 2],
};

const E_FORM: Record<string, (number | null)[]> = {
  "": [0, 2, 2, 1, 0, 0],
  m: [0, 2, 2, 0, 0, 0],
  "7": [0, 2, 0, 1, 0, 0],
  m7: [0, 2, 0, 0, 0, 0],
  sus4: [0, 2, 2, 2, 0, 0],
};
const A_FORM: Record<string, (number | null)[]> = {
  "": [null, 0, 2, 2, 2, 0],
  m: [null, 0, 2, 2, 1, 0],
  "7": [null, 0, 2, 0, 2, 0],
  m7: [null, 0, 2, 0, 1, 0],
  maj7: [null, 0, 2, 1, 2, 0],
  sus2: [null, 0, 2, 2, 0, 0],
  sus4: [null, 0, 2, 2, 3, 0],
  "6": [null, 0, 2, 2, 2, 2],
  m6: [null, 0, 2, 2, 1, 2],
  dim: [null, 0, 1, 2, 1, null],
  aug: [null, 0, 3, 2, 2, 1],
};

const normalizeQuality = (suffix: string) => {
  const quality = suffix.replace(/-?dur$/, "").replace(/[()]/g, "");
  const aliases: Record<string, string> = {
    "": "",
    maj: "",
    M: "",
    m: "m",
    min: "m",
    "-": "m",
    "7": "7",
    "9": "7",
    "13": "7",
    m7: "m7",
    min7: "m7",
    m9: "m7",
    maj7: "maj7",
    M7: "maj7",
    maj9: "maj7",
    sus: "sus4",
    sus4: "sus4",
    "7sus4": "sus4",
    sus2: "sus2",
    add9: "",
    "6": "6",
    m6: "m6",
    dim: "dim",
    dim7: "dim",
    "°": "dim",
    m7b5: "dim",
    aug: "aug",
    "+": "aug",
  };
  if (quality in aliases) return aliases[quality];
  return quality.startsWith("m") ? "m" : "";
};

export const getChordShape = (chord: string): ChordShape | null => {
  const match = chord.replace(/[()]/g, "").match(/^([A-H])([#b]?)([^/]*)/);
  if (!match) return null;

  const [, root, accidental, suffix] = match;
  let value = NOTE_VALUES[root];
  if (accidental === "#") value += 1;
  if (accidental === "b") value -= 1;
  value = (value + 12) % 12;

  const quality = normalizeQuality(suffix);
  const rootName = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "B", "H"][value];

  const open = OPEN_SHAPES[rootName + quality];
  if (open) return { frets: open };

  const eFret = (value - 4 + 12) % 12 || 12;
  const aFret = (value - 9 + 12) % 12 || 12;
  const useE = quality in E_FORM && (!(quality in A_FORM) || eFret <= aFret);
  const template = useE ? E_FORM[quality] : A_FORM[quality] ?? A_FORM[""];
  const fret = useE ? eFret : aFret;

  return {
    frets: template.map((offset) => (offset === null ? -1 : offset + fret)),
    barre: template[5] === 0 ? { fret, from: useE ? 0 : 1 } : undefined,
  };
};
