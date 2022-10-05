import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";

const PlayList = ({ tracks, selectedTrack, setSelectedTrack }) => {
  const [nowTrack, setNowTrack] = useState(0);
  const handleNext = () => {
    setNowTrack((pv) => {
      let newPv = pv;
      if (tracks.length > pv + 1) {
        newPv = pv + 1;
      }
      setSelectedTrack(tracks[newPv]);
      return newPv;
    });
  };
  const handleBack = () => {
    setNowTrack((pv) => {
      let newPv = pv;
      if (newPv) {
        newPv = pv - 1;
      }
      setSelectedTrack(tracks[newPv]);
      return newPv;
    });
  };
  const handleTrack = () => {
    setSelectedTrack(selectedTrack);
  };
  return (
    <div
      className="card m-auto mt-3 d-flex flex-row justify-content-between"
      style={{ width: "20rem", background: "" }}
    >
      <button
        type="button"
        class="btn btn-outline-primary"
        onClick={handleBack}
        disabled={!nowTrack ? true : false}
      >
        <FontAwesomeIcon icon={faBackward} />
      </button>
      {
        <span key={selectedTrack.id} onClick={handleTrack}>
          {selectedTrack.title}
        </span>
      }
      <button
        type="button"
        class="btn btn-outline-primary"
        onClick={handleNext}
        disabled={nowTrack >= tracks.length - 1 ? true : false}
      >
        {console.log(nowTrack, tracks.length)}
        <FontAwesomeIcon icon={faForward} />
      </button>
    </div>
  );
};

export default PlayList;
