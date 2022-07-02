import {ScheduledMetronome} from './metronome.js';

let metronome;

document.getElementById('btnStart').onclick = () => start();
document.getElementById('btnStop').onclick = () => stop();

async function start() {
  return new Promise(async (resolve, reject) => {

    // Timer Configuration
    const WORK_DURATION = parseInt(document.getElementById('workDurationInput').value) / 60; // Convert seconds to minutes
    const REST_DURATION = parseInt(document.getElementById('restDurationInput').value) / 60; // Convert seconds to minutes

    // Metronome Configuration
    const ROUNDS_PER_SERIES = parseInt(document.getElementById('roundsPerSeriesInput').value);
    const BPM_INCREASE = parseInt(document.getElementById('bpmIncreaseInput').value);

    const START_BPM = parseInt(document.getElementById('startBpmInput').value);
    const STOP_BPM = parseInt(document.getElementById('stopBpmInput').value);

    let tempo = START_BPM
    document.getElementById('btnStop').removeAttribute("disabled")
    while (tempo < STOP_BPM) {
      const CLICKS = (WORK_DURATION + REST_DURATION) * ROUNDS_PER_SERIES * tempo

      metronome = new ScheduledMetronome(tempo, CLICKS);
      metronome.start();

      while (metronome.playing) {
        await sleep(1000)
      }

      tempo += BPM_INCREASE
      console.log(tempo);
    }

  });
}

function stop() {
  metronome.stop();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
