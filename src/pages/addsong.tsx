import CreateSong from "@/components/AddSongPage/CreateSong";
import Loading from "@/components/base/Loading";
import NoUserComponent from "@/components/base/NoUserComponent";
import { DefaultUserContext } from "@/context/loggedInUserContext";
import { getSong } from "@/functions/userService";
import { SongRecord } from "@/types/types";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const AddSong = () => {
  const router = useRouter();
  const { currentUser, authLoading } = useContext(DefaultUserContext);
  const { edit, genre, language, name } = router.query as Record<string, string>;
  const isEditing = Boolean(edit && genre && language && name);
  const [record, setRecord] = useState<SongRecord | null | undefined>(undefined);

  useEffect(() => {
    if (!router.isReady || !isEditing) return;
    getSong(name, genre, language).then(setRecord);
  }, [router.isReady, isEditing, name, genre, language]);

  if (authLoading || !router.isReady || (isEditing && record === undefined)) {
    return <Loading />;
  }

  if (!currentUser) {
    return <NoUserComponent />;
  }

  if (isEditing && (!record || record.authorId !== currentUser.uid)) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold">You can&apos;t edit this song</h1>
        <p className="mt-2 text-stone-500">
          Only the person who added a song can edit it.
        </p>
        <Link href="/allsongs" className="btn-primary mt-8">
          Browse songs
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{isEditing ? "Edit song" : "Add a song"} · Songbook</title>
      </Head>
      <CreateSong
        author={{
          name: currentUser.displayName || currentUser.email || "Anonymous",
          uid: currentUser.uid,
        }}
        editing={
          isEditing && record
            ? { original: { genre, language, name }, record }
            : undefined
        }
      />
    </>
  );
};

export default AddSong;
