import { Logo } from "@/components/NavBar";
import Link from "next/link";
import React from "react";

const Footer = () => (
  <footer className="border-t border-stone-200 bg-stone-50 print:hidden">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
      <div>
        <Logo />
        <p className="mt-2 text-sm text-stone-500">
          Chords and lyrics for guitar players, shared by the community.
        </p>
      </div>
      <div className="flex gap-6 text-sm text-stone-600">
        <Link href="/allsongs" className="hover:text-orange-600">
          Browse songs
        </Link>
        <Link href="/library" className="hover:text-orange-600">
          Library
        </Link>
        <Link href="/addsong" className="hover:text-orange-600">
          Add a song
        </Link>
      </div>
      <p className="text-sm text-stone-400">
        © {new Date().getFullYear()} Songbook
      </p>
    </div>
  </footer>
);

export default Footer;
