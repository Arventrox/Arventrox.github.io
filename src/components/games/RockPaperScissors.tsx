import style from './RockPaperScissors.module.css';
import React, {useEffect, useState} from 'react';
import scissorsPng from '../../images/scissors-image.png';
import rockPng from '../../images/rock-image.png';
import paperPng from '../../images/paper-image.jpg';

const RockPaperScissors = () => {
	const [computerResult, setComputerResult] = useState('');
	const [playerResult, setPlayerResult] = useState('');
	const [winner, setWinner] = useState('');
	const [computerImage, setComputerImage] = useState('');
	const [playerImage, setPlayerImage] = useState('');

	const rock = 'ROCK';
	const scissors = 'SCISSORS';
	const paper = 'PAPER';
	const player = 'PLAYER WON';
	const computer = 'COMPUTER WON';
	const draw = 'DRAW';

	// Computer Chooses

	const computerChosen = () => {
		const random = Math.random();

		if (random < 0 && random > 0) {
			return;
		}

		if (random < 0.33) {
			setComputerResult(rock);
			setComputerImage(rockPng);
		}

		if (random > 0.33 && random < 0.66) {
			setComputerResult(paper);
			setComputerImage(paperPng);
		}

		if (random > 0.66) {
			setComputerResult(scissors);
			setComputerImage(scissorsPng);
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
				setWinner(draw);
				break;
		}
	}, [computerResult, playerResult]);

	return (
		<div className={style.centered}>
			<h1>Choose one:</h1>
			<p>Result : {winner}</p>

			<div className={style.images_container}>
				<span className={style.images}>
					<p>The Player Chose: {playerResult}</p>
					<img src={playerImage} alt='player chosen image'/>
				</span>
				<span className={style.images}>
					<p>The Computer Chose: {computerResult} </p>
					<img src={computerImage} alt='computer chosen image'/>
				</span>
			</div>
			<div >
				<button
					onClick={() => {
						chosenHandler(rock);
						setPlayerImage(rockPng);
					}}>
					ROCK
				</button>
				<button
					onClick={() => {
						chosenHandler(paper);
						setPlayerImage(paperPng);
					}}>
					PAPER
				</button>
				<button
					onClick={() => {
						chosenHandler(scissors);
						setPlayerImage(scissorsPng);
					}}>
					SCISSORS
				</button>
			</div>
		</div>
	);
};

export default RockPaperScissors;
