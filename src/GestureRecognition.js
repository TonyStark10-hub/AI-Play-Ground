import React , {useState,useEffect, useRef, Component } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as fp from "fingerpose";
import victory from "./victory.png";
import thumbs_up from "./thumbs_up.png";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import {drawHand } from './grutilities.js'


function GestureRecognition(){
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [emoji,setEmoji] = useState(null);
    const images = {thumbs_up:thumbs_up,victory:victory}

    const runHandpose = async () => {
    const net = await handpose.load();
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
      const hand = await net.estimateHands(video);
      
      if (hand.length > 0){
          const GE = new fp.GestureEstimator([
              fp.Gestures.VictoryGesture,
              fp.Gestures.ThumbsUpGesture
          ]);
          const gesture = await GE.estimate(hand[0].landmarks, 5);
          if(gesture.gestures !== 'undefined' && gesture.gestures.length > 0){
              const confidence = gesture.gestures.map((prediction) => prediction.confidence);
              const maxConfidence = confidence.indexOf(Math.max.apply(null,confidence));

              setEmoji(gesture.gestures[maxConfidence].name);
          }
      } 
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  useEffect(()=>{runHandpose()},[]);
        return(
            <div className="App">
                <h1> Gesture Recognition</h1>
                <div id='instructions'>
        <ul>
            <li>
                <p>This feature will detect your hand gensture in real time</p>
            </li>
            <li>
                <p>Detection will allow model to draw a hand replica over your hand with around 20 key points </p>
            </li>
            <li>
                <p>Fun part of this feature is when you do thumbs up gesture or victory gesture it will detect it and show you an emoji on the screen </p>
            </li>
            <li>
                <p>Once you start playing with this feature at least play with this feature for 1 minute before switching to other features </p>
            </li>
        </ul>

        </div>
            <header className="App-header">
              <Webcam
                ref={webcamRef}
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
              {emoji !== null ? (
                  <img 
                  src={images[emoji]}
                  style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 400,
                    bottom: 200,
                    right: 0,
                    textAlign: "center",
                    height: 100,
                  }}
                  />
              ):""}
      
              <canvas
                ref={canvasRef}
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
              
            </header>
          </div>
         
        );
}

export default GestureRecognition;