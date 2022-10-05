import { formWaveSurferOptions } from "../lib/formWaveSurferOptions";
import WaveSurfer from "wavesurfer.js";
import { useEffect, useState } from "react";

export const useWaveSurfer = ({ url, wavesurfer, waveformRef }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    setPlaying(false);
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    fetch(url)
      .then((e) => {
        return e.blob();
      })
      .then((e) => {
        wavesurfer.current.loadBlob(e);
      });

    wavesurfer.current.on("ready", function () {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    return () => wavesurfer.current.destroy();
  }, [url]);
  return { volume, setVolume, playing, setPlaying };
};
