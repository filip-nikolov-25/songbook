import Icon from "@/components/base/Icon";
import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center animate-fade-up">
      <Head>
        <title>Page not found · Songbook</title>
      </Head>
      <p className="bg-linear-to-br from-orange-400 to-amber-500 bg-clip-text text-8xl font-bold tracking-tight text-transparent sm:text-9xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
        This page is out of tune
      </h1>
      <p className="mt-2 max-w-md text-stone-500">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          <Icon name="arrowLeft" className="h-4 w-4" />
          Go home
        </Link>
        <Link href="/allsongs" className="btn-secondary">
          Browse songs
        </Link>
      </div>
    </div>
  );
}
