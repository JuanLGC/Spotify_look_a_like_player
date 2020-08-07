import React, { useState, useEffect } from "react";

export default function MusicPlayer() {
	// Defining States and Variables.
	let [arraysongs, setArraySongs] = useState([]);
	let [songUrl, setSongUrl] = useState(
		"https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"
	);
	const musicPlayer = document.querySelector("#musicPlayer");
	//  Creating Array of songs

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/sound/all")
			.then(response => {
				return response.json(); //devuelve un objeto
			})
			.then(responseAsJson => {
				setArraySongs(responseAsJson["data/songs.json"]); //entre corchetes la key del object como valor un array con las canciones!!
			});
	}, []);

	console.log(songUrl);
	return (
		<div>
			<div className="row mt-3">
				<ol className="col-12 ">
					{arraysongs
						? arraysongs.map(songDetails => {
								console.log(songDetails);
								return (
									<li
										key={songDetails.url}
										onClick={() => {
											setSongUrl(
												"https://assets.breatheco.de/apis/sound/" +
													songDetails.url
											);
											musicPlayer.load();
											musicPlayer.play();
										}}>
										<span className="ml-3">
											{songDetails.name}
										</span>
									</li>
								);
						  })
						: "Loading... Wait you son of a bitch"}
				</ol>
			</div>
			<div className="navbar justify-content-center">
				<div className="audio-buttons mx-4 my-2">
					<i className="fa fa-backward fa-2x" aria-hidden="true" />
				</div>
				<div className="audio-buttons mx-4 my-2 fa-2x">
					<i className="fa fa-play" aria-hidden="true" />
				</div>
				<div className="audio-buttons mx-4 my-2 fa-2x">
					<i className="fa fa-forward" aria-hidden="true" />
				</div>
			</div>
			<audio id="musicPlayer">
				<source src={songUrl} type="audio/mpeg" />
			</audio>
		</div>
	);
}
