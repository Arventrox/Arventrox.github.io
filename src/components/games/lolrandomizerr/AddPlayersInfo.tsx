import React, { type FC, useContext } from "react";
import { playerContext } from "../../../context/lolrandomizer-context";

const NameInput: FC = (props) => {
	const {
		playerName,
		submitHandler,
		playerNameHandler,
		removePlayerNameHandler,
		inputsHandler,
	} = useContext(playerContext);

	return (
		<form onSubmit={submitHandler}>
			{playerName.map((singleInput, index) => (
				<div key={index}>
					<label htmlFor="playersName">Enter Player {index + 1}: </label>
					<input
						type="text"
						id="playersName"
						value={singleInput}
						onChange={(e) => {
							playerNameHandler(e, index);
						}}
					/>
					<span>
						<button
							onClick={(e) => {
								removePlayerNameHandler(index, e);
							}}>
							Remove Player
						</button>
					</span>
				</div>
			))}
			<button onClick={inputsHandler}>Select the number of players</button>
			{playerName.length !== 0 && <button>Submit Players</button>}
		</form>
	);
};

export default NameInput;
