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

  const {
    playing,
    leftGain,
    rightGain,
    setPlaying,
    volume,
    setVolume,
    panner,
    setPanner,
  } = useWaveSurfer({
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
  const onPannerChange = (e) => {
    setPanner(+e.target.value);
    wavesurfer.current.panner.pan.value = panner;
  };

  const onLeftVolumeChange = (e) => {
    const _volume = +e.target.value;
    leftGain.gain.value = _volume;
  };
  const onRightVolumeChange = (e) => {
    const _volume = +e.target.value;
    rightGain.gain.value = _volume;
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
          <div className=" d-flex flex-row ">
            <span>left</span>
            <input
              className="form-range form-range-track-bg-dark "
              type="range"
              id="panner"
              name="panner"
              min="-1"
              max="1"
              step=".25"
              onChange={onPannerChange}
              defaultValue={panner}
            />
            <span>right</span>
          </div>
          <div className=" d-flex flex-row ">
            <span>right</span>
            <input
              className="form-range form-range-track-bg-dark "
              type="range"
              id="leftVolume"
              name="leftVolume"
              min="0.0"
              max="1"
              step=".025"
              defaultValue="0.5"
              onChange={onLeftVolumeChange}
            />
          </div>
          <div className=" d-flex flex-row ">
            <input
              className="form-range form-range-track-bg-dark "
              type="range"
              id="rightVolume"
              name="rightVolume"
              min="0.0"
              max="1"
              step=".025"
              defaultValue="0.5"
              onChange={onRightVolumeChange}
            />
            <span>left</span>
          </div>
        </div>
      </div>
    </div>
  );
}
