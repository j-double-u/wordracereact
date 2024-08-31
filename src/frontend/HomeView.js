import * as crud from './crud.js';
import React from "react";

export default function HomeView(props) {

    const [personalBlurb, setPersonalBlurb] = React.useState("");

    function handleLogout() {
        props.navigateTo("loginView");
    }

    function handlePlay() {
        props.navigateTo("gameView");
    }

    React.useEffect(() => {
        async function displayPersonal() {
            if (props.mainView === "homeView") {
                const readProfile = await crud.readProfile(props.user);
                if (!readProfile.ok) {
                    setPersonalBlurb("Sorry. Personalized homepage could not be made.");
                }
                else {
                    const profile = await readProfile.json();
                    setPersonalBlurb(`Welcome ${profile['_id']}! Your high score is ${profile['highScore']}.`);
                }
            }            
        }
        displayPersonal();
    }, []);

    return (
        <div id="home-view">
            <button id="logout" onClick={handleLogout}>Logout</button>
            <h1 className="header">Home View</h1>
            <p>{personalBlurb}</p>
            <button id="play-button" onClick={handlePlay}>Play!</button>
        </div>
    );
}