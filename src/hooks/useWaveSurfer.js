import { formWaveSurferOptions } from "../lib/formWaveSurferOptions";
import WaveSurfer from "wavesurfer.js";
import { useEffect, useState } from "react";
import axios from "axios";
export const useWaveSurfer = ({ url, wavesurfer, waveformRef }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [panner, setPanner] = useState(0);
  const [leftGain, setLeftGain] = useState();
  const [rightGain, setRightGain] = useState();
  let _waveSurfer = {};
  useEffect(() => {
    setPlaying(false);
    const options = formWaveSurferOptions(waveformRef.current);
    _waveSurfer = WaveSurfer.create(options);
    _waveSurfer.panner = _waveSurfer.backend.ac.createStereoPanner();
    const channelSplitterNode = _waveSurfer.backend.ac.createChannelSplitter(2);
    const channelMergerNode = _waveSurfer.backend.ac.createChannelMerger(2);
    const leftGainNode = _waveSurfer.backend.ac.createGain();
    const rightGainNode = _waveSurfer.backend.ac.createGain();
    channelSplitterNode.connect(leftGainNode, 0);
    leftGainNode.gain.value = 0.8;
    channelSplitterNode.connect(rightGainNode, 1);
    rightGainNode.gain.value = 0.8;
    leftGainNode.connect(channelMergerNode, 0, 0);
    rightGainNode.connect(channelMergerNode, 0, 1);
    _waveSurfer.backend.setFilters([
      channelSplitterNode,
      leftGainNode,
      channelMergerNode,
      _waveSurfer.panner,
    ]);
    wavesurfer.current = _waveSurfer;
    axios(url, { responseType: "blob" })
      .then((E) => E.data)
      .then((e) => {
        console.log(e);
        wavesurfer.current.loadBlob(e);
      });
    wavesurfer?.current?.on("ready", function () {
      if (wavesurfer?.current) {
        wavesurfer.current.setVolume(volume);
      }
    });
    setLeftGain(leftGainNode);
    setRightGain(rightGainNode);
    return () => {
      return wavesurfer.current.destroy();
    };
  }, [url, waveformRef, wavesurfer]);

  return {
    volume,
    setVolume,
    playing,
    setPlaying,
    panner,
    setPanner,
    leftGain,
    rightGain,
  };
};
