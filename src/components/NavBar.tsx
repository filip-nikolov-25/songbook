import Icon from "@/components/base/Icon";
import { DefaultUserContext } from "@/context/loggedInUserContext";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const LINKS = [
  { href: "/allsongs", label: "Browse" },
  { href: "/library", label: "Library" },
  { href: "/addsong", label: "Add a song" },
];

export const Logo = () => (
  <Link href="/" className="flex items-center gap-2.5 font-bold text-lg">
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-md shadow-orange-500/30">
      <Icon name="music" className="h-5 w-5" />
    </span>
    Songbook
  </Link>
);

const NavBar = () => {
  const router = useRouter();
  const { currentUser, authLoading } = useContext(DefaultUserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [router.asPath]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error sign out:", error);
    }
  };

  const isActive = (href: string) => router.pathname.startsWith(href);

  const account = authLoading ? (
    <div className="h-9 w-24" />
  ) : currentUser ? (
    <div className="flex items-center gap-3">
      {currentUser.photoURL ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={currentUser.photoURL}
          alt=""
          referrerPolicy="no-referrer"
          className="h-9 w-9 rounded-full ring-2 ring-orange-100"
        />
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-700 font-semibold">
          {(currentUser.displayName || "?")[0]}
        </span>
      )}
      <button onClick={handleLogout} className="icon-btn" title="Sign out">
        <Icon name="logout" className="h-4 w-4" />
      </button>
    </div>
  ) : (
    <Link href="/signin" className="btn-primary !py-2">
      Sign in
    </Link>
  );

  return (
    <header
      className={`border-b transition ${
        isScrolled
          ? "border-stone-200 bg-white/85 backdrop-blur-lg"
          : "border-transparent bg-white"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <ul className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive(link.href)
                    ? "bg-orange-50 text-orange-600"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">{account}</div>

        <button
          className="icon-btn md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <Icon name={isMenuOpen ? "close" : "menu"} className="h-5 w-5" />
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pb-4">
          <ul className="py-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-xl px-3 py-3 font-medium ${
                    isActive(link.href)
                      ? "bg-orange-50 text-orange-600"
                      : "text-stone-700"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {account}
        </div>
      )}
    </header>
  );
};

export default NavBar;
