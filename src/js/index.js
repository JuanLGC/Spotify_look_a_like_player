import React from "react";
import ReactDOM from "react-dom";
import MusicPlayer from "./component/songList.js";
import "bootstrap";


import "../styles/index.scss";

ReactDOM.render(<MusicPlayer />, document.querySelector("#app"));
