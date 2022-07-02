<script setup>
import ScheduledMetronome from './Metronome.js';

let metronome;
let stopped;

/* document.getElementById('btnStart').onclick = () => start(); */
/* document.getElementById('btnStop').onclick = () => stop(); */

async function start() {
  return new Promise(async (resolve, reject) => {

    const settings = parseSettings();

    let tempo = settings["start_bpm"]
    document.getElementById('btnStop').removeAttribute("disabled")
    while (tempo < settings["stop_bpm"]) {
      stopped = false;
      console.log(`stopped variable is: ${stopped}`);
      console.log("Tempo: " + tempo);
      console.log("Stop BPM: " + settings["stop_bpm"]);

      // Update the status
      document.getElementById('currentSpeed').textContent=tempo;

      // Count the number of clicks that should be played
      const clicks = (settings["work_duration"] + settings["rest_duration"]) * settings["rounds_per_series"] * tempo

      metronome = new ScheduledMetronome(tempo, clicks);

      metronome.start();

      while (metronome.playing) {
        await sleep(10)
      }

      if (stopped) {
        console.log(`Stopping because stopped variable is: ${stopped}`)
        return
      }

      tempo += settings["bpm_increase"]
      console.log(tempo);
    }
    console.log(`Out of while loop because Tempo (${tempo}) is bigger than Stop BPM (${settings["stop_bpm"]})`)

  });
}


function stop() {
  console.log("Invoked stop function")
  stopped = true;
  metronome.stop();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function parseSettings() {

  var settings = {};

  // Timer Configuration
  settings["work_duration"] = parseInt(document.getElementById('workDurationInput').value) / 60; // Convert sec to minutes
  settings["rest_duration"] = parseInt(document.getElementById('restDurationInput').value) / 60; // Convert sec to minutes

  // Metronome Configuration
  settings["rounds_per_series"] = parseInt(document.getElementById('roundsPerSeriesInput').value);
  settings["bpm_increase"] = parseInt(document.getElementById('bpmIncreaseInput').value);

  settings["start_bpm"] = parseInt(document.getElementById('startBpmInput').value);
  settings["stop_bpm"] = parseInt(document.getElementById('stopBpmInput').value);

  return settings
}
</script>

<template>
    <h1>Drums Workout</h1>

    <section>
      <table class="workout">
        <tr>
          <td><label><b>Work Duration (seconds)</b></label></td>
          <td><input id="workDurationInput" value="1" type="number"></td>
          <td><label><b>Rest Duration (seconds)</b></label></td>
          <td><label><input id="restDurationInput" value="1" type="number"></label></td>
        </tr>
        <tr>
          <td><label> <b>Rounds per series</b></label></td>
          <td><input id="roundsPerSeriesInput" value="1" type="number"></td>
          <td><label> <b>BPM increase</b></label></td>
          <td><input id="bpmIncreaseInput" value="20" type="number"></td>
        </tr>
        <tr>
          <td><label> <b>Start BPM</b></label></td>
          <td><input id="startBpmInput" value="80" type="number"></td>
          <td><label> <b>Stop BPM</b></label></td>
          <td><input id="stopBpmInput" value="200" type="number"></td>
        </tr>
        <tr>
          <td></td>
          <td><button @click="start" id="btnStart" class="accent">start</button></td>
          <td><button @click="stop" id="btnStop" disabled="">stop</button></td>
          <td></td>
        </tr>
      </table>
    </section>

    <section>
      <table class="workout">
        <tr>
          <td><b>Speed</b><p id="currentSpeed">-</p></td>
          <td><b>Status</b><p id="currentStatus">-</p></td>
        </tr>
        </table>
    </section>
</template>
