import React, { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  TimelineSlider,
  HomeEvents,
  HomeNotices,
  HomeBlogs,
  FunFact,
} from "../../components/Home";
import MessageFromPrincipal from "../../components/Home/MessageFromPrincipal";
import Welcome from "../../components/Home/Welcome";
import "./../../assets/css/home.scss";

function Home() {
  return (
    <>
      <TimelineSlider />
      <Welcome />
      <HomeEvents />
      <MessageFromPrincipal />
      <HomeNotices />
      <FunFact />
      <HomeBlogs />
    </>
  );
}

export default Home;
