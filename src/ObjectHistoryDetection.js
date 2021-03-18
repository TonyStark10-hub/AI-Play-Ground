import React , { useEffect,useRef ,Component } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "./odutilities";

function ObjectHistoryDetection(){
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    // Main function
    const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    // Check data is available
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

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx); 
    }
  };

  useEffect(()=>{runCoco()},[]);

        return(
            <div className="App">
                <h1> Object history detection</h1>
                <div id='instructions'>
        <ul>
            <li>
                <p>This feature will detect diffrent objects in the camera frame</p>
            </li>
            <li>
                <p>fun part is each identified objects will be shoen in separete rectegular frames with object name diplayed on top </p>
            </li>
            <li>
                <p>Once you start playing with this feature at least play with this feature for 1 minute before switching to other features </p>
            </li>
        </ul>

        </div>
            <header className="App-header">
              <Webcam
                ref={webcamRef}
                muted={true} 
                style={{
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  zindex: 9,
                  width: 640,
                  height: 480,
                }}
              />
      
              <canvas
                ref={canvasRef}
                style={{
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  zindex: 8,
                  width: 640,
                  height: 480,
                }}
              />
            </header>
          </div>
         
        );
}

export default ObjectHistoryDetection;