import React from "react";
import Home from "@/components/HomePage/Home";
import { GetStaticProps } from "next";

const Homepage = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default Homepage;

export const getStaticProps: GetStaticProps = async () => {
  const chordRes = await fetch("http://localhost:5000/allChords");
  const allChordsData = await chordRes.json();

  return {
    props: {
      allChordsData,
    },
  };
};
