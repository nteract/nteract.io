import React from "react";

import styles from "./home.scss";

//Sections
// import Hero from "./hero/hero";
import HomeHeader from "./page-header";
import Main from "./main/main";

const Home = () => (
  <div>
    <style dangerouslySetInnerHTML={{ __html: styles }} />
    <HomeHeader style="" />
    <Main />
  </div>
);

export default Home;
