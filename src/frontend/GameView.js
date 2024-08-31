import { dictionary } from "./freevocabulary_words.js";
import React from "react";

export default function GameView(props) {

    const [problem, setProblem] = React.useState({
        curr: 60,
        numProblems: 0,
        wordNum: Math.floor(Math.random() * dictionary.length),
        definitionElements: [],
        updateTimer: null
    });


    React.useEffect(() => {
        problem.updateTimer = setInterval(() => {
            setProblem(prevState => ({...prevState, curr: prevState.curr - 1}));
            if (problem.curr <= 0) {
                clearInterval(problem.updateTimer);
                props.navigateTo("resultsView");
            }
        }, 1000);
    }, []);

    React.useEffect(() => {
        if (problem.numProblems > 9) {
            clearInterval(problem.updateTimer);
            props.navigateTo("resultsView");
        }
        setProblem(prevState => ({...prevState, wordNum: Math.floor(Math.random() * dictionary.length)}));
    }, [problem.numProblems])


    React.useEffect(() => {
        const tasks = [];
        tasks.push(problem.wordNum);
        let i = 0;
        while (i < 3) {
            const candidateWordIndex = Math.floor(Math.random() * dictionary.length);
            const candidateWord = dictionary[candidateWordIndex];
            if (candidateWord["type"] === dictionary[problem.wordNum]["type"]) {
                tasks.push(candidateWordIndex);
                i++;
            }
        }
        tasks.sort();
        problem.definitionElements = tasks.map(num => {
            return (
                <button className="definition" onClick={ (event) => { 
                    if (event.target.textContent === dictionary[problem.wordNum]["word"]) {
                        props.setCorrect(prevState => prevState + 1);
                    }
                    setProblem(prevState => ({...prevState, numProblems: prevState.numProblems + 1}))
                    }
                }>
                    {dictionary[num]["definition"]}
                </button>
            );
        });


    }, [problem.wordNum]);

    return (
        <div id="game-view">
            <h1 className="header">Game View</h1>
            
            <div id="game-container">
                <p id="timer">{problem.curr}</p>
                <p id="word">{dictionary[problem.wordNum]["word"]}</p>

                <div id="definition-list">
                    {problem.definitionElements}
                </div>
            </div>     
        </div>
    );
}