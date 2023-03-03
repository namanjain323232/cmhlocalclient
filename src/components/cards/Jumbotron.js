import React from "react";
import Typewriter from "typewriter-effect";

const Jumbotron = ({ text }) => (
  <Typewriter
    options={{
      strings: text,
      autoStart: true,
      loop: true,
      wrapperClassName: "typeWriterText",
    }}
  />
);

export default Jumbotron;
