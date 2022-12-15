import React, {Fragment, useContext} from 'react';
import SelectNumberOfPlayers from './SelectNumberOfPlayers';
import Player from './Player';
import style from './Normal.module.css';
import {playerContext} from '../../../context/lolrandomizer-context';

const Normal = () => {
	const {players} = useContext(playerContext);

	return <Fragment >
		<SelectNumberOfPlayers />
		<div className={style.players}>
			{ players.map((singleInput, index) =>
				<Player key={index} playerName={players[index].playerName} playerRole={players[index].playerRole} playerChampion={players[index].playerChampion}/>,
			)}
		</div>
	</Fragment>;
};

export default Normal;
