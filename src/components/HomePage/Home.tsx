import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/Images/GuitarOnFire.jpg"
          alt="Guitar on Fire"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute top-24 sm:top-32 md:top-52 left-4 md:left-10 z-10 text-white max-w-[90%] sm:max-w-[80%]">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold">
          Welcome to our SongBook
        </h1>
        <h3 className="text-lg sm:text-2xl md:text-4xl mt-4 md:mt-5">
          Feel free to learn some new songs today
        </h3>

        <div className="mt-6">
          <Link href="/searchsong">
            <button
              className="border-b-2 border-white rounded-b-xl px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base shadow-white shadow-2xl hover:shadow-slate-100 transition"
            >
              Choose a song to play
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
