import Icon from "@/components/base/Icon";
import SongSheet from "@/components/SongSheet";
import { GENRES, KEYS, LANGUAGES, SECTIONS } from "@/constants/songOptions";
import { parseSong, uniqueChords } from "@/functions/chords";
import {
  createSong,
  songPath,
  SongInput,
  updateSong,
} from "@/functions/userService";
import { SongRecord } from "@/types/types";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";

const DRAFT_KEY = "songbook:draft";

interface Props {
  author: { name: string; uid: string };
  editing?: {
    original: { genre: string; language: string; name: string };
    record: SongRecord;
  };
}

const EMPTY: SongInput = { name: "", artist: "", genre: "", language: "", text: "" };

const readDraft = (): SongInput | null => {
  try {
    const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
    return draft && (draft.text || draft.name) ? { ...EMPTY, ...draft } : null;
  } catch {
    return null;
  }
};

const CreateSong = ({ author, editing }: Props) => {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [initialDraft] = useState(() => (editing ? null : readDraft()));
  const [song, setSong] = useState<SongInput>(() =>
    editing
      ? {
          name: editing.original.name,
          artist: editing.record.artist || "",
          genre: editing.original.genre,
          language: editing.original.language,
          text: editing.record.text,
        }
      : initialDraft || EMPTY
  );
  const [keyIndex, setKeyIndex] = useState(0);
  const [customChord, setCustomChord] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [draftRestored, setDraftRestored] = useState(Boolean(initialDraft));

  const update = (changes: Partial<SongInput>) =>
    setSong((current) => ({ ...current, ...changes }));

  useEffect(() => {
    if (editing) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(song));
    } catch {}
  }, [song, editing]);

  const previewLines = useMemo(() => parseSong(song.text), [song.text]);
  const chordCount = useMemo(() => uniqueChords(previewLines).length, [previewLines]);

  const insertAtCursor = (snippet: string) => {
    const textarea = textareaRef.current;
    const start = textarea ? textarea.selectionStart : song.text.length;
    const end = textarea ? textarea.selectionEnd : song.text.length;
    update({ text: song.text.slice(0, start) + snippet + song.text.slice(end) });

    requestAnimationFrame(() => {
      if (!textarea) return;
      const position = start + snippet.length;
      textarea.focus();
      textarea.setSelectionRange(position, position);
    });
  };

  const insertSection = (section: string) => {
    const start = textareaRef.current?.selectionStart ?? song.text.length;
    const needsNewLine = start > 0 && song.text[start - 1] !== "\n";
    insertAtCursor(`${needsNewLine ? "\n" : ""}${section}:\n`);
  };

  const insertCustomChord = () => {
    const chord = customChord.trim().replace(/[\[\]]/g, "");
    if (!chord) return;
    insertAtCursor(`[${chord}]`);
    setCustomChord("");
  };

  const clearDraft = () => {
    setSong(EMPTY);
    setDraftRestored(false);
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {}
  };

  const handleSubmit = async () => {
    const missing = [
      !song.name.trim() && "song name",
      !song.genre && "genre",
      !song.language && "language",
      !song.text.trim() && "lyrics and chords",
    ].filter(Boolean);

    if (missing.length > 0) {
      setError(`Please add the ${missing.join(", ")}.`);
      return;
    }

    setError("");
    setIsSaving(true);
    const result = editing
      ? await updateSong(editing.original, song, editing.record)
      : await createSong(song, author);
    setIsSaving(false);

    if ("error" in result) {
      setError(result.error);
      return;
    }
    if (!editing) {
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {}
    }
    router.push(songPath(song.genre, song.language, result.key));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            {editing ? "Edit song" : "Add a song"}
          </h1>
          <p className="mt-2 text-stone-500">
            Type the lyrics, put your cursor where a chord changes and click
            the chord.
          </p>
        </div>
        {draftRestored && (
          <p className="flex items-center gap-3 rounded-full bg-orange-50 px-4 py-2 text-sm text-orange-700">
            Your draft was restored
            <button onClick={clearDraft} className="font-semibold underline">
              Start over
            </button>
          </p>
        )}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <section className="card p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className="label">Song name</span>
                <input
                  value={song.name}
                  placeholder="e.g. Wonderwall"
                  className="input"
                  onChange={(e) => update({ name: e.target.value })}
                />
              </label>
              <label>
                <span className="label">Artist</span>
                <input
                  value={song.artist}
                  placeholder="e.g. Oasis"
                  className="input"
                  onChange={(e) => update({ artist: e.target.value })}
                />
              </label>
            </div>

            <span className="label mt-6">Genre</span>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((item) => (
                <button
                  key={item.value}
                  onClick={() => update({ genre: item.value })}
                  className={`chip ${song.genre === item.value ? "chip-on" : "chip-off"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <span className="label mt-6">Language</span>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((item) => (
                <button
                  key={item.value}
                  onClick={() => update({ language: item.value })}
                  className={`chip ${song.language === item.value ? "chip-on" : "chip-off"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </section>

          <section className="card p-6">
            <div className="flex items-center justify-between gap-4">
              <span className="label mb-0!">Chords</span>
              <select
                value={keyIndex}
                onChange={(e) => setKeyIndex(Number(e.target.value))}
                className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-sm font-medium focus:border-orange-400 focus:outline-hidden"
                aria-label="Key"
              >
                {KEYS.map((key, index) => (
                  <option key={key.label} value={index}>
                    Key: {key.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {KEYS[keyIndex].chords.map((chord) => (
                <button
                  key={chord}
                  onClick={() => insertAtCursor(`[${chord}]`)}
                  className="h-12 min-w-12 rounded-xl border border-orange-200 bg-orange-50 px-3 font-mono font-bold text-orange-700 transition hover:-translate-y-0.5 hover:bg-orange-500 hover:text-white hover:shadow-md hover:shadow-orange-500/30"
                >
                  {chord}
                </button>
              ))}
              <div className="flex gap-2">
                <input
                  value={customChord}
                  placeholder="Other: Asus4"
                  className="input w-36! py-2.5! font-mono"
                  onChange={(e) => setCustomChord(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && insertCustomChord()}
                />
                <button onClick={insertCustomChord} className="btn-secondary px-4!" aria-label="Insert chord">
                  <Icon name="plus" className="h-4 w-4" />
                </button>
              </div>
            </div>

            <span className="label mt-6">Sections</span>
            <div className="flex flex-wrap gap-2">
              {SECTIONS.map((section) => (
                <button
                  key={section}
                  onClick={() => insertSection(section)}
                  className="chip chip-off"
                >
                  + {section}
                </button>
              ))}
            </div>

            <textarea
              ref={textareaRef}
              value={song.text}
              spellCheck={false}
              placeholder={
                "Type the lyrics here.\n\n" +
                "You can also paste a song with chords written above the lyrics:\n\n" +
                "Am           G\nFirst line of the song\nF            E\nSecond line of the song"
              }
              onChange={(e) => update({ text: e.target.value })}
              className="input mt-6 h-112 resize-y font-mono text-sm leading-relaxed"
            />
            <p className="mt-2 text-xs text-stone-400">
              Tip: chords are saved as <code className="text-orange-600">[Am]</code> inside
              the lyrics. Lines ending with <code className="text-orange-600">:</code>{" "}
              (like <code>Chorus:</code>) become section labels.
            </p>
          </section>
        </div>

        <div className="lg:sticky lg:top-24 self-start">
          <section className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 px-6 py-3">
              <span className="label mb-0!">Live preview</span>
              <span className="text-xs text-stone-400">{chordCount} chords</span>
            </div>
            <div className="max-h-[65vh] overflow-y-auto p-6">
              <h2 className="text-2xl font-bold">{song.name || "Song name"}</h2>
              <p className="mb-6 text-stone-500">{song.artist || "Artist"}</p>
              <SongSheet lines={previewLines} fontSize={15} />
            </div>
            <div className="border-t border-stone-200 p-6">
              {error && (
                <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}
              <div className="flex gap-3">
                <button onClick={handleSubmit} disabled={isSaving} className="btn-primary flex-1">
                  <Icon name={editing ? "check" : "upload"} className="h-4 w-4" />
                  {isSaving ? "Saving…" : editing ? "Save changes" : "Publish song"}
                </button>
                {editing && (
                  <button onClick={() => router.back()} className="btn-secondary">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreateSong;
