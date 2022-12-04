import style from './RockPaperScissors.module.css';
import React, {useEffect, useState} from 'react';
const RockPaperScissors = () => {
	const [computerResult, setComputerResult] = useState('');
	const [playerResult, setPlayerResult] = useState('');
	const [winner, setWinner] = useState('');

	const rock = 'ROCK';
	const scissors = 'SCISSORS';
	const paper = 'PAPER';
	const player = 'PLAYER';
	const computer = 'COMPUTER';

	// Computer Chooses

	const computerChosen = () => {
		const random = Math.random();

		if (random < 0.33) {
			setComputerResult(rock);
		}

		if (random > 0.33 && random < 0.66) {
			setComputerResult(paper);
		}

		if (random > 0.66) {
			setComputerResult(scissors);
		}
	};

	// Player Chooses

	const chosenHandler = (playerInput: string) => {
		setPlayerResult(playerInput);
		computerChosen();
	};

	// Winner is Chosen
	useEffect(() => {
		// eslint-disable-next-line default-case
		switch (playerResult + computerResult) {
			case 'SCISSORSPAPER':
			case 'ROCKSCISSORS':
			case 'PAPERROCK':
				setWinner(player);
				break;
			case 'PAPERSCISSORS':
			case 'SCISSORSROCK':
			case 'ROCKPAPER':
				setWinner(computer);
				break;
			case 'ROCKROCK':
			case 'SCISSORSSCISSORS':
			case 'PAPERPAPER':
				setWinner('DRAW');
				break;
		}
	}, [computerResult, playerResult]);

	return (
		<div>
			<div className={style.container}>
				<h1>Choose one:</h1>
				<button
					onClick={() => {
						chosenHandler(rock);
					}}>
					ROCK
				</button>
				<button
					onClick={() => {
						chosenHandler(paper);
					}}>
					PAPER
				</button>
				<button
					onClick={() => {
						chosenHandler(scissors);
					}}>
					SCISSORS
				</button>
			</div>
			<div>
				<p>The Player Chose: {playerResult}</p>
				<p>The Computer Chose: {computerResult} </p>
				<p>The Winner is the :{winner}</p>
			</div>
		</div>
	);
};

export default RockPaperScissors;
