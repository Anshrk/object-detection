// Import dependencies
import React, { useRef, useEffect } from "react";
// eslint-disable-next-line
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";

import Webcam from "react-webcam";
import "./App.css";
import {drawRect} from "./draw";
import githubIM from "./assets/github.svg";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);


  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);
      console.log(obj);
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
      drawRect(obj, ctx);
    }
  };

  useEffect(()=>{
    const runCoco = async () => {
      // cocoss.load() reads the web cam
      const net = await cocossd.load();
      setInterval(() => {
        detect(net);
      }, 10);
    };
    runCoco();

  },[]);

  return (
    <>
    <h1 id="header">Object Detection</h1>
    <div className="App">
      <header className="App-header">
        <Webcam id="webcam"
          ref={webcamRef}
          muted={true} 
        />

        <canvas id="canvas"
          ref={canvasRef}
        />
      </header>
    </div>
    {/* <div id="footer">
      <p>Made by&nbsp;
        <a href="https://github.com/anshrk">Ansh Kashyap</a>
        , source code availabe <a href="https://github.com/anshrk/object-detection">
          here
        </a>
      </p>
      &nbsp;
      <div className="github-icon-div"><img src={githubIM} alt="Github Logo" /></div>
    </div> */}
    </>
  );
}

export default App;
