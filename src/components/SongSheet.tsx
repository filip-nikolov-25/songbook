import { SongLine } from "@/functions/chords";
import React from "react";

interface Props {
  lines: SongLine[];
  fontSize?: number;
}

const SongSheet = ({ lines, fontSize = 18 }: Props) => {
  if (lines.length === 0) {
    return (
      <p className="text-stone-400 italic">
        Your song will appear here as you type.
      </p>
    );
  }

  return (
    <div
      className="font-mono leading-snug overflow-x-auto pb-2"
      style={{ fontSize }}
    >
      {lines.map((line, index) => {
        if (line.kind === "empty") {
          return <div key={index} className="h-[1.2em]" />;
        }
        if (line.kind === "section") {
          return (
            <p
              key={index}
              className="mt-4 mb-1.5 inline-block rounded-md bg-orange-50 px-2 py-0.5 font-sans text-[0.7em] font-bold uppercase tracking-widest text-orange-600 print:bg-transparent print:px-0"
            >
              {line.label}
            </p>
          );
        }
        return (
          <div key={index} className="whitespace-pre">
            {line.chords && (
              <div className="font-bold text-orange-600 print:text-black">
                {line.chords}
              </div>
            )}
            {line.lyrics.trim() && (
              <div className="text-stone-800">{line.lyrics}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SongSheet;
