import React , { useEffect, useRef, Component } from 'react';
import * as tf  from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/face-landmarks-detection';
import Webcam from 'react-webcam';
import {drawMesh} from './fmutilities.js'

function FaceLandMark() {
    const webcamRef = useRef(null);
    const canvaseRef = useRef(null);
  
  
    const runFacemesh = async () =>  {
      const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
      setInterval(()=>{
        detect(net);
      },100);
    };
    
    const detect = async(net) => {
      if (
        typeof webcamRef.current !== 'undefined' &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
        ){
          // get Video properties
          const video = webcamRef.current.video;
          const videoWidth = webcamRef.current.video.videoWidth;
          const videoheight = webcamRef.current.video.videoHeight;
  
          // Set video width and height
          webcamRef.current.video.width=videoWidth;
          webcamRef.current.video.height=videoheight;
  
          // Set canvas width and height
          
          canvaseRef.current.width=videoWidth;
          canvaseRef.current.height=videoheight;
  
          //Make detections
  
          const face = await net.estimateFaces({input:video});
          //console.log(face);
  
          //Get canvas context
          
            const ctx = canvaseRef.current.getContext('2d');
            requestAnimationFrame(()=>{drawMesh(face,ctx)});
              
          
  
        }
    }
  
    //Load facemesh 
    //document.addEventListener('DOMContentLoaded',()=>{
        useEffect(()=>{runFacemesh()},[]) 
    //})  
    return (
      <div className="App" >
        <h1> Face Landmark</h1>
        <div id='instructions'>
        <ul>
            <li>
                <p>This feature will detect your face and will draw a mesh on your face.</p>
            </li>
            <li>
                <p>Mesh will be drawn by detecting around 500  key points on your face </p>
            </li>
            <li>
                <p>Once you start playing with this feature at least play with this feature for 1 minute before switching to other features </p>
            </li>
        </ul>

        </div>
       
        <header className="App-header">
          <Webcam
           ref = {webcamRef}
           style = {{
             position:'absolute',
             marginLeft:'auto',
             marginRight:'auto',
             left: 0,
             right: 0,
             textAlign: 'center',
             zIndex: 9,
             width: 640,
             height: 480,
           }}
          />
          <canvas
          ref = {canvaseRef}
          style = {{
            position:'absolute',
            marginLeft:'auto',
            marginRight:'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 9,
            width: 640,
            height: 480,
          }} 
          />
        </header>
      </div>
    );
  }
  
  export default FaceLandMark;