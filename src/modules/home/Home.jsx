import React from "react";
import Banner from "./Banner";
import Showing from "./Showing";
import Cinema from "./Cinema";
import Advertise from "../../components/Advertise";

export default function Home() {
  return (
    <div>
      <Banner />
      <Showing />
      <Cinema />
      <Advertise />
    </div>
  );
}
