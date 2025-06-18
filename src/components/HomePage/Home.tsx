import Image from "next/image";
import Link from "next/link";
import SignInWIthGoogleButton from "../SignInWIthGoogleButton";

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="w-full">
        <Image
          src={"/Images/GuitarOnFire.jpg"}
          width={2500}
          height={1600}
          alt="image"
        />
      </div>
      <div className="absolute text-white left-10  top-52  z-10">
        <h1 className="text-7xl">Welcome to our SongBook</h1>
        <h3 className="text-4xl mt-5">
          Feel free to learn some new songs today
        </h3>
      </div>
      <div className="absolute text-white left-10  top-[33%]  z-10">
        <Link href={"/searchsong"}>
          <button
            className={`mr-5 border-b-2 border-white rounded-b-xl px-5 py-5 cursor-pointer 
            "shadow-slate-600 hover:shadow-slate-100 shadow-white shadow-2xl `}
          >
            Choose a song to play
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
