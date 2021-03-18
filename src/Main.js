import React,{ Component } from 'react';
import { Route , NavLink , HashRouter } from 'react-router-dom';
import GetStarted from './GetStarted.js';
import FaceLandMark from './FaceLandMark.js';
import GestureRecognition from './GestureRecognition.js';
import BodyPoseEstimation from './BodyPoseEstimation.js';
import ObjectHistoryDetection from './ObjectHistoryDetection.js';
import BodySegmentation from './BodySegmentation.js';



class Main extends Component {
    render(){
        return (
    <HashRouter>
         <div>
         <h1>Welcome to the Tony's world of Artificial Intelligence</h1>
             <ul className="header">
                 <li><NavLink exact to="/"> Get Started </NavLink></li>
                 <li><NavLink to="/Face-Landmark">Face LandMark</NavLink></li>
                 <li><NavLink to="/Gesture-Recognition">Gesture Recognition</NavLink></li>
                 <li><NavLink to="/Body-Pose-Estimation">Body Pose Estimation</NavLink></li>
                 <li><NavLink to="/Object-History-Detection">Object History Detection</NavLink></li>
                 <li><NavLink to="/Body-Segmentation">Body Segmentation</NavLink></li>
             </ul>
             <div className="content">
                 
                 <Route  exact path="/" component={GetStarted} />
                 <Route   path="/Face-Landmark" component={FaceLandMark} />
                 <Route   path="/Gesture-Recognition" component={GestureRecognition} />
                 <Route   path="/Body-Pose-Estimation" component={BodyPoseEstimation} />
                 <Route   path="/Body-Segmentation" component={BodySegmentation} />
                 <Route   path="/Object-History-Detection" component={ObjectHistoryDetection} />


             </div>
         </div>
    </HashRouter>
        );
    }
}

export default Main;