"use client";

import { useState } from "react";


export function isWinner(boardState: SquareState[]): boolean {
	const winningForm = [
		// [1, 2, 3], [4, 5, 6], [7, 8, 9],
		// [1, 4, 7], [2, 5, 8], [3, 6, 9],
		// [1, 5, 9], [3, 5, 7],
		[0, 1, 2], [3, 4, 5], [6, 7, 8],
		[0, 3, 6], [1, 4, 7], [2, 5, 8],
		[0, 4, 8], [2, 4, 6]
	];
	
	for (const [a, b, c] of winningForm) {		
		if (boardState[a] 
			&& boardState[a] === boardState[b] 
			&& boardState[a] === boardState[c]) {
				return true;
			}
		}
		
	return false;
}

function index1DTo2D(index: number, boardSize: number) : Array<number> {
	return [index / boardSize, index % boardSize]
}

function index2DTo1D(indexes: Array<number>, boardSize: number): number {
	const [row, col] = indexes;
	return row * boardSize + col;
}

type SquareState = "" | "X" | "O";
type TurnPlayer = 1 | 2;

function Game() {
	const [boardSize, setBoardSize] = useState<number>(3);
	const [boardState, setBoardState] = useState<SquareState[]>(Array(boardSize * boardSize).fill(""));
	const [turn, setTurn] = useState<TurnPlayer>(2);
	// const [declarations, setDeclarations] = useState("");
	let declarations: string | null = null;
	
	function handleClick(index: number) {
		return function (): undefined {
			if (isWinner(boardState) || boardState.at(index) !== "") {
                return;
            }

			const tempBoard = boardState.slice();
			if (turn === 1) {
				tempBoard[index] = "O";
			}
			else {
				tempBoard[index] = "X";
			}

			setBoardState(tempBoard);
			// boardState = tempBoard;
			
			let nextTurn: TurnPlayer = (turn === 1) ? 2 : 1;
			setTurn(nextTurn);
		}
	};

	if (isWinner(boardState)) {
		declarations = "The winner is: Player " + turn;
	}


	function resetGame() {
		setBoardState(Array(boardSize * boardSize).fill(""));
		setTurn(1)
	}

	let boardRender = [...Array(boardSize).keys()].map((i) => {
		return (
			<div key={i} className="divide-x flex flex-row">
				{
					[...Array(boardSize).keys()].map((j) => {
						let squareId = index2DTo1D([i, j], boardSize);
						return (
							<Square key={squareId} 
								value={boardState[squareId]} 
								onClick={handleClick(squareId)}/>
						)
					})
				}
			</div>
		)
	})

	function changeBoardSize(size: number) {
		if (Number.isNaN(size) || (size > 10 || size < 3) ) {
			return;
		}

		setBoardSize(size);
		setBoardState(Array(boardSize * boardSize).fill(""));
	}

	return (
		<div className="mt-4">
			<h1>
				Tic-tac-toe
			</h1>
			{declarations && <b>{declarations}</b>}
			<div>
				<h2>Config</h2>
				<div>
					<b>Board size</b>
					<input id="boardSize" value={boardSize} list="sizeOptions"
						type="number"
						onChange={(e) => {changeBoardSize(Number(e.target.value))}}/>
					<datalist id="sizeOptions">
						<option value="3"></option>
						<option value="4"></option>
						<option value="5"></option>
						<option value="6"></option>
					</datalist>
				</div>
				<div>
					<b>Win length</b>
					<input type="text" id="win" value="" />
					<datalist></datalist>
				</div>
			</div>
			<Board boardState={boardState}>
				<>
					{/* <div className="divide-x flex flex-row">
						<Square value={boardState[0]} onClick={handleClick(0)}/>
						<Square value={boardState[1]} onClick={handleClick(1)}/>
						<Square value={boardState[2]} onClick={handleClick(2)}/>
					</div>
					<div className="divide-x flex flex-row">
						<Square value={boardState[3]} onClick={handleClick(3)}/>
						<Square value={boardState[4]} onClick={handleClick(4)}/>
						<Square value={boardState[5]} onClick={handleClick(5)}/>
					</div>
					<div className="divide-x flex flex-row">
						<Square value={boardState[6]} onClick={handleClick(6)}/>
						<Square value={boardState[7]} onClick={handleClick(7)}/>
						<Square value={boardState[8]} onClick={handleClick(8)}/>
					</div> */}
					{boardRender}
				</>
			</Board>

			<button onClick={resetGame}>Reset</button>
		</div>
	)
}

function Board({boardState, children}: {boardState: SquareState[], children: React.ReactElement}) {
	return (
		<div>
			<div className='border inline-flex flex-col align-top divide-y'>
				{children}
			</div>
		</div>
	)
}


function Square({value, onClick}: {value: SquareState, onClick?: any}) {
	return (
		// h-6 due to line-height is 24px
		<button className='block h-6 w-6 text-center ' 
			style={{}}
			onClick={onClick}
			>
			{value}
		</button>
	)
}

export default Game;