export const GENRES = [
  { value: "romanticballads", label: "Romantic Ballads" },
  { value: "classicrock", label: "Classic Rock" },
  { value: "folk", label: "Folk" },
  { value: "popballads", label: "Pop Ballads" },
];

export const LANGUAGES = [
  { value: "mk", label: "Macedonian" },
  { value: "srb", label: "Serbian" },
  { value: "en", label: "English" },
  { value: "esp", label: "Spanish" },
];

export const KEYS = [
  { label: "Am / C", chords: ["C", "Dm", "Em", "F", "G", "Am", "E"] },
  { label: "Bm / C#", chords: ["C#", "D#m", "Fm", "F#", "G#", "Bm", "F"] },
  { label: "Hm / D", chords: ["D", "Em", "F#m", "G", "A", "Hm", "F#"] },
  { label: "Cm / D#", chords: ["D#", "Fm", "Gm", "G#", "B", "Cm", "G"] },
  { label: "C#m / E", chords: ["E", "F#m", "G#m", "A", "H", "C#m", "G#"] },
  { label: "Dm / F", chords: ["F", "Gm", "Am", "B", "C", "Dm", "A"] },
  { label: "D#m / F#", chords: ["F#", "G#m", "Bm", "H", "C#", "D#m", "B"] },
  { label: "Em / G", chords: ["G", "Am", "Hm", "C", "D", "Em", "H"] },
  { label: "Fm / G#", chords: ["G#", "Bm", "Cm", "C#", "D#", "Fm", "C"] },
  { label: "F#m / A", chords: ["A", "Hm", "C#m", "D", "E", "F#m", "C#"] },
  { label: "Gm / B", chords: ["B", "Cm", "Dm", "D#", "F", "Gm", "D"] },
  { label: "G#m / H", chords: ["H", "C#m", "D#m", "E", "F#", "G#m", "D#"] },
];

export const SECTIONS = ["Intro", "Verse", "Chorus", "Bridge", "Solo", "Outro"];

export const labelOf = (
  list: { value: string; label: string }[],
  value: string | undefined
) => list.find((item) => item.value === value)?.label || value || "";
