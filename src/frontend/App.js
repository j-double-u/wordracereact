import React from "react";
import HomeView from "./HomeView";
import GameView from "./GameView";
import ResultsView from "./ResultsView";
import LoginView from "./LoginView";

export default function App() {
  const [mainView, setMainView] = React.useState("loginView");

  function navigateTo(view) {
    setMainView(view);
  }
  
  return (
    <div id="app">
      {mainView === "homeView" && <HomeView navigateTo={navigateTo} />}
      {mainView === "gameView" && <GameView navigateTo={navigateTo} />}
      {mainView === "resultsView" && <ResultsView navigateTo={navigateTo} />}
      {mainView === "loginView" && <LoginView  navigateTo={navigateTo} />}
    </div>
  );
}
