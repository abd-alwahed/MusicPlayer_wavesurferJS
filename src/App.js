import React, { useState } from "react";

import Waveform from "./components/Waveform";
import PlayList from "./components/PlayList";
import { tracks } from "./consts/tracks";

export default function App() {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);
  // console.log(tracks[0].img);
  return (
    <div className="App">
      <Waveform
        url={selectedTrack.url}
        img={selectedTrack.img}
        title={selectedTrack.title}
      />
      <PlayList
        tracks={tracks}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
      />

      <br />
    </div>
  );
}
