import {ScheduledMetronome} from './metronome.js';

let metronome;

document.getElementById('btnStart').onclick = () => start();
document.getElementById('btnStop').onclick = () => stop();

async function start() {
  return new Promise((resolve, reject) => {
    const DURATION = parseFloat(document.getElementById('durationInput').value);
    const TEMPO = parseFloat(document.getElementById('tempoInput').value);
    const CLICKS = DURATION * TEMPO

    metronome = new ScheduledMetronome(TEMPO, CLICKS);
    metronome.start(() => {});
    document.getElementById('btnStop').removeAttribute("disabled")
  });
}

function stop() {
  console.log("Stopping metronome");
  metronome.stop();
}
