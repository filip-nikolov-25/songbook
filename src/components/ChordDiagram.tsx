import { getChordShape } from "@/functions/chordShapes";
import React from "react";

const STRING_GAP = 12;
const FRET_GAP = 15;
const FRETS_SHOWN = 4;
const LEFT = 16;
const TOP = 18;

const ChordDiagram = ({ chord }: { chord: string }) => {
  const shape = getChordShape(chord);
  if (!shape) return null;

  const played = shape.frets.filter((fret) => fret > 0);
  const highest = Math.max(0, ...played);
  const baseFret = highest > FRETS_SHOWN ? Math.min(...played) : 1;
  const width = LEFT + STRING_GAP * 5 + 10;
  const height = TOP + FRET_GAP * FRETS_SHOWN + 6;
  const x = (string: number) => LEFT + string * STRING_GAP;
  const y = (fret: number) => TOP + (fret - baseFret + 0.5) * FRET_GAP;

  return (
    <figure className="flex flex-col items-center rounded-xl border border-stone-200 bg-white px-2 pt-2 pb-1">
      <figcaption className="font-mono font-bold text-sm text-stone-900">
        {chord}
      </figcaption>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label={`${chord} chord diagram`}
      >
        {baseFret === 1 ? (
          <rect x={x(0)} y={TOP - 3} width={STRING_GAP * 5} height={3} className="fill-stone-800" />
        ) : (
          <text x={2} y={y(baseFret) + 4} className="fill-stone-500 text-[9px]">
            {baseFret}
          </text>
        )}
        {Array.from({ length: FRETS_SHOWN + 1 }, (_, i) => (
          <line
            key={`f${i}`}
            x1={x(0)}
            x2={x(5)}
            y1={TOP + i * FRET_GAP}
            y2={TOP + i * FRET_GAP}
            className="stroke-stone-300"
          />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line
            key={`s${i}`}
            x1={x(i)}
            x2={x(i)}
            y1={TOP}
            y2={TOP + FRETS_SHOWN * FRET_GAP}
            className="stroke-stone-400"
          />
        ))}
        {shape.barre && shape.barre.fret >= baseFret && (
          <rect
            x={x(shape.barre.from) - 5}
            y={y(shape.barre.fret) - 5}
            width={x(5) - x(shape.barre.from) + 10}
            height={10}
            rx={5}
            className="fill-orange-500"
          />
        )}
        {shape.frets.map((fret, string) =>
          fret === -1 ? (
            <text
              key={string}
              x={x(string)}
              y={TOP - 6}
              textAnchor="middle"
              className="fill-stone-400 text-[9px]"
            >
              ×
            </text>
          ) : fret === 0 ? (
            <circle
              key={string}
              cx={x(string)}
              cy={TOP - 9}
              r={3}
              className="fill-none stroke-stone-500"
            />
          ) : (
            <circle
              key={string}
              cx={x(string)}
              cy={y(fret)}
              r={4.5}
              className="fill-orange-500"
            />
          )
        )}
      </svg>
    </figure>
  );
};

export default ChordDiagram;
