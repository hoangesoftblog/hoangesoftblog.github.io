"use client";

import { Dispatch, SetStateAction, useState } from 'react';
import styles from './tic-tac-toe.module.css';


export default function Game() {
    type TurnPlayer = 1 | 2 | null;
    const [squares, setSquares] = useState(Array(9).fill(""));
    const [turnPlayer, setTurnPlayer] : [TurnPlayer, Dispatch<SetStateAction<TurnPlayer>>] = useState(1); 

    function squareClick(pos: number) {
        return () => {
            if (squares.at(pos) !== "") {
                return;
            }

            let nextState = turnPlayer === 2 ? "O" : "X";

            let tempSquares = squares.slice();            
            tempSquares.splice(pos, 1, nextState);
            setSquares(tempSquares);

            if (calculateWinner(tempSquares)) {
                return;
            }

            console.log(turnPlayer);

            if (tempSquares.every(
                ((e, i, arr) => e !== ""), null)
            ) {
                console.log("Game draw!");
                return;
            }

            setTurnPlayer((turnPlayer === 1) ? 2 : 1);
        }
    }

    function calculateWinner(squares: string[]): (TurnPlayer) {
        for (let arr of lines) {
            const [a, b, c] = arr;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                console.log("Win by configuration", arr);
                console.log("The winner is:", turnPlayer);
                return turnPlayer;
            }
        }
        return null;
    }

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return (
        <div>
            <p>Player turn: {turnPlayer}</p>
            <Board squares={squares} setSquares={setSquares} squareClick={squareClick}/>
        </div>
    )
}


function Square({value = 'X', handleClick}: {value?: string, handleClick}) {
    return (
        <button className={styles.square}
            onClick={handleClick}
            >
            {value}
        </button>
    )
}


function Board({squares, setSquares, squareClick}: {squares: string[], setSquares: any, squareClick: any}) {
    return (
        <div>
            <div className={styles['board-row']}>
                <Square value={squares[0]} handleClick={squareClick(0)}></Square>
                <Square value={squares[1]} handleClick={squareClick(1)}></Square>
                <Square value={squares[2]} handleClick={squareClick(2)}></Square>
            </div>
            <div className={styles['board-row']}>
                <Square value={squares[3]} handleClick={squareClick(3)}></Square>
                <Square value={squares[4]} handleClick={squareClick(4)}></Square>
                <Square value={squares[5]} handleClick={squareClick(5)}></Square>
            </div>
            <div className={styles['board-row']}>
                <Square value={squares[6]} handleClick={squareClick(6)}></Square>
                <Square value={squares[7]} handleClick={squareClick(7)}></Square>
                <Square value={squares[8]} handleClick={squareClick(8)}></Square>
            </div>
        </div>
    )
}