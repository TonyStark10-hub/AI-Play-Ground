import React , { useRef, Component } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as bodyPix from "@tensorflow-models/body-pix";
import Webcam from "react-webcam";
function BodySegmentation (){
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const runBodysegment = async () => {
        const net = await bodyPix.load();
        console.log("BodyPix model loaded.");
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
          // * One of (see documentation below):
          // *   - net.segmentPerson
          // *   - net.segmentPersonParts
          // *   - net.segmentMultiPerson
          // *   - net.segmentMultiPersonParts
          // const person = await net.segmentPerson(video);
          const person = await net.segmentPersonParts(video);
          console.log(person);
    
          // const coloredPartImage = bodyPix.toMask(person);
          const coloredPartImage = bodyPix.toColoredPartMask(person);
          const opacity = 0.7;
          const flipHorizontal = false;
          const maskBlurAmount = 0;
          const canvas = canvasRef.current;
    
          bodyPix.drawMask(
            canvas,
            video,
            coloredPartImage,
            opacity,
            maskBlurAmount,
            flipHorizontal
          );
        }
      };
    
      runBodysegment();
    
        return(
           
    <div className="App">
        <h1> Body Segmentation</h1>
        <div id='instructions'>
        <ul>
            <li>
                <p>This feature will detect your body parts and these body segments will be highlighten with diffrent colors and by type.</p>
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

export default BodySegmentation;