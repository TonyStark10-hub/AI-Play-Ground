import React , { Component } from 'react';


class GetStarted extends Component{
    state = {
        minutes : 3,
        seconds : 0,
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render(){
        const { minutes, seconds } = this.state
        return(
        <div>
            <div id='timer'>
                { minutes === 0 && seconds === 0
                    ? <h1>Now you can play with all the features</h1>
                    : <h1>Timer to Fun : {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
            </div>
            <ul>
                <li>
                   <p>As you can see countdown timer running on top, once the timer goes to 00:00 your device will explode !!!! </p>
                </li>
                <li>
                <p>Just kidding, your device is safe.Real reason for the countdown is to load up all the nural networks for our AI features</p>
                </li>
                <li>
                <p>Generally it takes about 3 minutes to load up all the models and Once the timer goes off you can start playing with all the AI features</p>
                </li>
                
            </ul>
            <h2>Note:-Once the loading is done and you start playing with features and in between you comeback to this page you will be shown the contdown again but you don't have to wait for the timer this time</h2>
            <h1 id='thank'>Thank you for your patience and have fun</h1>
            
           
            
            

        </div>
         
        );
    }
}

export default GetStarted;