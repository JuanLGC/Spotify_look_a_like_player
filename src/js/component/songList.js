import React, { useState, useEffect } from "react";

export default function MusicPlayer() {
	// Defining States and Variables.
	let [arraysongs, setArraySongs] = useState([]);
	let [songUrl, setSongUrl] = useState(
		"https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"
	);
	let [halfLink, setHalfLink] = useState(
		"https://assets.breatheco.de/apis/sound/"
	);
	let [isPlaying, setIsPlaying] = useState(false);
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

	const previousSong = () => {
		for (let i = 0; i < arraysongs.length; i++) {
			if (halfLink + arraysongs[i].url == songUrl) {
				setSongUrl(
					"https://assets.breatheco.de/apis/sound/" +
						arraysongs[i - 1].url
				);
				musicPlayer.load();
				musicPlayer.play();
				setIsPlaying(true);
			}
		}
	};

	const nextSong = () => {
		for (let i = 0; i < arraysongs.length; i++) {
			if (halfLink + arraysongs[i].url == songUrl) {
				setSongUrl(
					"https://assets.breatheco.de/apis/sound/" +
						arraysongs[i + 1].url
				);
				musicPlayer.load();
				musicPlayer.play();
				setIsPlaying(true);
			}
		}
	};

	const playMusic = () => {
		if (isPlaying) {
			musicPlayer.pause();
			setIsPlaying(false);
		} else {
			musicPlayer.load();
			musicPlayer.play();
			setIsPlaying(true);
		}
	};

	if (arraysongs) {
		return (
			<div>
				<div className="row mt-3">
					<ol className="col-12 ">
						{arraysongs
							? arraysongs.map(songDetails => {
									return (
										<li
											key={songDetails.url}
											onClick={() => {
												setSongUrl(
													"https://assets.breatheco.de/apis/sound/" +
														songDetails.url
												);
												musicPlayer.load();
												setIsPlaying(true);
												musicPlayer.play();
											}}>
											<span className="ml-3">
												{songDetails.name}
											</span>
										</li>
									);
							  })
							: "Loading..."}
					</ol>
				</div>
				<div className="navbar justify-content-center">
					<div className="audio-buttons mx-4 my-2">
						<i
							className="fa fa-backward fa-2x"
							aria-hidden="true"
							onClick={() => {
								previousSong();
							}}
						/>
					</div>
					<div className="audio-buttons mx-4 my-2 fa-2x">
						{isPlaying ? (
							<i
								className="fa fa-pause"
								aria-hidden="true"
								onClick={() => {
									playMusic();
								}}
							/>
						) : (
							<i
								className="fa fa-play"
								aria-hidden="true"
								onClick={() => {
									playMusic();
								}}
							/>
						)}
					</div>
					<div className="audio-buttons mx-4 my-2 fa-2x">
						<i
							className="fa fa-forward"
							aria-hidden="true"
							onClick={() => {
								nextSong();
							}}
						/>
					</div>
				</div>
				<audio id="musicPlayer">
					<source src={songUrl} type="audio/mpeg" />
				</audio>
			</div>
		);
	} else {
		<div>
			<div className="row mt-3">
				<ol className="col-12 ">
					<li>Loading...Please Wait.</li>
				</ol>
			</div>
			<div className="navbar justify-content-center">
				<div className="audio-buttons mx-4 my-2">
					<i
						className="fa fa-backward fa-2x"
						aria-hidden="true"
						onClick={() => {
							previousSong();
						}}
					/>
				</div>
				<div className="audio-buttons mx-4 my-2 fa-2x">
					<i
						className="fa fa-play"
						aria-hidden="true"
						onClick={() => {
							musicPlayer.load();
							musicPlayer.play();
							setIsPlaying(true);
						}}
					/>
				</div>
				<div className="audio-buttons mx-4 my-2 fa-2x">
					<i
						className="fa fa-forward"
						aria-hidden="true"
						onClick={() => {
							nextSong();
						}}
					/>
				</div>
			</div>
			<audio id="musicPlayer">
				<source src={songUrl} type="audio/mpeg" />
			</audio>
		</div>;
	}
}
