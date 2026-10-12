export type SongLine =
  | { kind: "empty" }
  | { kind: "section"; label: string }
  | { kind: "line"; chords: string; lyrics: string };

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
const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "B", "H"];

const CHORD_TOKEN =
  /^\(?[A-H][#b]?(m|maj|min|dim|aug|sus|add|dur|M|-|\+|°|ø|[b#]?\d+)*(\/[A-H][#b]?)?\)?$/;
const DECORATION_TOKEN = /^(\||\/|-+|\.{2,}|%|\(?x\d+\)?|\(?\d+x\)?)$/i;
const SECTION_LINE = /^\s*([^\[\]:]{1,24}):\s*$/;

export const transposeChord = (chord: string, steps: number) => {
  if (!steps) return chord;
  return chord.replace(/([A-H])([#b]?)/g, (_, root: string, accidental: string) => {
    let value = NOTE_VALUES[root];
    if (accidental === "#") value += 1;
    if (accidental === "b") value -= 1;
    return NOTE_NAMES[(((value + steps) % 12) + 12) % 12];
  });
};

const isChordLine = (line: string) => {
  if (line.includes("[")) return false;
  const tokens = line.trim().split(/\s+/).filter(Boolean);
  return (
    tokens.some((token) => CHORD_TOKEN.test(token)) &&
    tokens.every((token) => CHORD_TOKEN.test(token) || DECORATION_TOKEN.test(token))
  );
};

const sectionLabel = (line: string) => {
  const match = line.match(SECTION_LINE);
  return match && !isChordLine(match[1]) ? match[1].trim() : null;
};

const mergeChordLine = (chordLine: string, lyricLine: string) => {
  const tokens = [...chordLine.matchAll(/\S+/g)];
  const lastIndex = tokens[tokens.length - 1]?.index ?? 0;
  let merged = lyricLine.padEnd(lastIndex);
  for (let i = tokens.length - 1; i >= 0; i--) {
    const index = tokens[i].index ?? 0;
    merged = `${merged.slice(0, index)}[${tokens[i][0]}]${merged.slice(index)}`;
  }
  return merged;
};

const layoutLine = (line: string, steps: number): SongLine => {
  const parts = line.split(/\[([^\]]*)\]/);
  let chords = "";
  let lyrics = "";

  parts.forEach((part, index) => {
    if (index % 2 === 0) {
      lyrics += part;
      return;
    }
    const chord = transposeChord(part.trim(), steps);
    if (!chord) return;
    let column = lyrics.length;
    if (chords.length > 0 && chords.length + 1 > column) {
      column = chords.length + 1;
    }
    lyrics = lyrics.padEnd(column);
    chords = chords.padEnd(column) + chord;
  });

  return { kind: "line", chords, lyrics: lyrics.trimEnd() };
};

export const parseSong = (text: string, steps = 0): SongLine[] => {
  const lines = text.replace(/\r\n?/g, "\n").replace(/\t/g, "    ").split("\n");
  const result: SongLine[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!line.trim()) {
      result.push({ kind: "empty" });
      continue;
    }

    const label = sectionLabel(line);
    if (label) {
      result.push({ kind: "section", label });
      continue;
    }

    if (isChordLine(line)) {
      const next = lines[i + 1];
      const nextIsLyrics =
        next !== undefined &&
        next.trim() !== "" &&
        !next.includes("[") &&
        !isChordLine(next) &&
        !sectionLabel(next);
      result.push(layoutLine(mergeChordLine(line, nextIsLyrics ? next : ""), steps));
      if (nextIsLyrics) i++;
      continue;
    }

    result.push(layoutLine(line, steps));
  }

  while (result[0]?.kind === "empty") result.shift();
  while (result[result.length - 1]?.kind === "empty") result.pop();
  return result;
};

export const uniqueChords = (lines: SongLine[]) => {
  const chords = new Set<string>();
  for (const line of lines) {
    if (line.kind !== "line") continue;
    for (const token of line.chords.split(/\s+/)) {
      const chord = token.replace(/[()]/g, "");
      if (CHORD_TOKEN.test(chord)) chords.add(chord);
    }
  }
  return [...chords];
};

export const firstChord = (lines: SongLine[]) => {
  for (const line of lines) {
    if (line.kind === "line" && line.chords.trim()) {
      return line.chords.trim().split(/\s+/)[0].replace(/[()]/g, "");
    }
  }
  return "";
};
