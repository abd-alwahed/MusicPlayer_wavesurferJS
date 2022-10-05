import React, { useRef } from "react";
import {
  faPlay,
  faForward,
  faBackward,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { useWaveSurfer } from "../hooks/useWaveSurfer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Waveform({ url, img, title }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const { playing, setPlaying, volume, setVolume } = useWaveSurfer({
    url,
    waveformRef,
    wavesurfer,
  });
  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.current.playPause();
  };
  const handleForward = () => {
    wavesurfer.current.skipForward(3);
  };
  const handleBackward = () => {
    wavesurfer.current.skipBackward(3);
  };
  const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  return (
    <div
      className="card m-auto mt-3"
      style={{ width: "20rem", background: "" }}
    >
      <img
        src={img}
        class="card-img-top"
        alt="music"
        style={{ width: "20rem" }}
      ></img>
      <div class="card-body">
        <h5 class="card-title text-center">{title}</h5>
        <div id="waveform" ref={waveformRef} />

        <div className="controls">
          <div
            class="btn-group d-flex flex-row justify-content-center"
            role="group"
          >
            <button
              type="button"
              class="btn btn-outline-primary"
              onClick={handleBackward}
            >
              <FontAwesomeIcon icon={faBackward} />
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              onClick={handlePlayPause}
            >
              {!playing ? (
                <FontAwesomeIcon icon={faPlay} />
              ) : (
                <FontAwesomeIcon icon={faPause} />
              )}
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              onClick={handleForward}
            >
              <FontAwesomeIcon icon={faForward} />
            </button>
          </div>
          <div>
            <input
              className="form-range form-range-track-bg-dark "
              type="range"
              id="volume"
              name="volume"
              min="0.01"
              max="1"
              step=".025"
              onChange={onVolumeChange}
              defaultValue={volume}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
