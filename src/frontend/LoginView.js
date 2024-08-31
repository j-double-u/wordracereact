import React from "react";
import * as crud from "./crud.js"

export default function LoginView(props) {
    const [loginData, setLoginData] = React.useState({
        username: "",
        password: ""
    })

    async function handleSubmit(event) {
        event.preventDefault();

        const readProfile = await crud.readProfile(loginData.username);
        if (readProfile.status === 404) {
            const createProfile = await crud.createProfile(loginData.username, loginData.password);
            if (!createProfile.ok) {
                alert("New profile not created. Try again.");
            }
            else {
                const profile = await createProfile.json();
                props.navigateTo("homeView");
                props.setUser(profile["_id"]);
            }
        }
        else if (readProfile.status === 200) {
            const profile = await readProfile.json();
            if (loginData.password !== profile['password']) {
                alert("Incorrect password. Try again.");
            }
            else {
                props.navigateTo("homeView");
                props.setUser(profile["_id"]);
            }
        }
        else {
            alert("Failed to read inputs. Try again.");
        }
    }

    async function handleReset(event) {
        event.preventDefault();

        const updateProfile = await crud.updateProfile(loginData.username, loginData.password);
        if (updateProfile.status === 404) {
            alert("username does not exist.");
        }
        else if (updateProfile.status === 500) {
            alert("Failed to update. Try again.");
        }
    }

    async function handleDelete(event) {
        event.preventDefault();

        const deleteProfile = await crud.deleteProfile(loginData.username);
        if (deleteProfile.status === 404) {
            alert("username does not exist.");
        }
        else if (deleteProfile.status === 500) {
            alert("Failed to update. Try again.");
        }
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div id="login-view">
            <h1 className="header">Login View</h1>
            
            <form onSubmit={handleSubmit}>
                <div id="username-elm">
                    <label htmlFor="username">Username: </label>
                    <input 
                        id="username"
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={loginData.username}
                    />
                </div>
                
                <div>
                    <label htmlFor="password">Password: </label>
                    <input 
                        id="password"
                        type="text"
                        name="password"
                        onChange={handleChange}
                        value={loginData.password}
                    />
                </div>

                <div>
                    <button id="login-button">Login</button>
                    <button type="button" id="reset-button" onClick={handleReset}>Reset</button>
                    <button type="button" id="delete-button" onClick={handleDelete}>Delete</button>

                </div>
            </form>     
        </div>
    );
}