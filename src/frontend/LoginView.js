export default function LoginView(props) {
    return (
        <div id="login-view">
            <h1 className="header">Login View</h1>
            
            <form>
                <div id="username-elm">
                    <label htmlFor="username">Username: </label>
                    <input 
                        id = "username"
                        type="text"
                    />
                </div>
                
                <div>
                    <label htmlFor="password">Password: </label>
                    <input 
                        id = "password"
                        type="text"
                    />
                </div>

                <button id="login-button">Login</button>
            </form>
            
        </div>
    );
}