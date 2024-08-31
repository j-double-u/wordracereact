import React from "react";
import HomeView from "./HomeView.js";
import GameView from "./GameView.js";
import ResultsView from "./ResultsView.js";
import LoginView from "./LoginView.js";

export default function App() {
  const [mainView, setMainView] = React.useState("loginView");
  const [user, setUser] = React.useState("");

  function navigateTo(view) {
    setMainView(view);
  }
  
  return (
    <div id="app">
      {mainView === "homeView" && <HomeView navigateTo={navigateTo} user={user} mainView={mainView}/>}
      {mainView === "gameView" && <GameView navigateTo={navigateTo} />}
      {mainView === "resultsView" && <ResultsView navigateTo={navigateTo} />}
      {mainView === "loginView" && <LoginView  navigateTo={navigateTo}  setUser={setUser} />}
    </div>
  );
}
