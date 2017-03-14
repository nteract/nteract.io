import React from "react";
import Layout from "../components/layout/layout";
import styles from "./home/home.scss";
import Home from "./home/home";

const Index = () => (
  <Layout>
    <style dangerouslySetInnerHTML={{ __html: styles }} />
    <Home />
  </Layout>
);

export default Index;
