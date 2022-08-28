<script setup>
import ScheduledMetronome from './entities/metronome';

let metronome;
let stopped;

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
    <h1 class="font-bold text-4xl">Drums Workout</h1>

    <section>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div class="settings">
          <label><b>Work Duration (seconds)</b></label>
        </div>
        <div class="settings">
          <input id="workDurationInput" value="1" type="number">
        </div>

        <div class="settings">
          <label><b>Rest Duration (seconds)</b></label>
        </div>
        <div class="settings">
          <input id="restDurationInput" value="1" type="number">
        </div>

        <div class="settings">
          <label> <b>Rounds per series</b></label>
        </div>
        <div class="settings">
          <input id="roundsPerSeriesInput" value="1" type="number">
        </div>

        <div class="settings">
          <label> <b>BPM increase</b></label>
        </div>
        <div class="settings">
          <input id="bpmIncreaseInput" value="20" type="number">
        </div>

        <div class="settings">
          <label> <b>Start BPM</b></label>
        </div>
        <div class="settings">
          <input id="startBpmInput" value="80" type="number">
        </div>

        <div class="settings">
          <label> <b>Stop BPM</b></label>
        </div>
        <div class="settings">
          <input id="stopBpmInput" value="200" type="number">
        </div>

        <div class="settings md:col-span-3">
          <button @click="start" id="btnStart" class="accent">start</button>
        </div>

        <div class="settings">
          <button @click="stop" id="btnStop" disabled="">stop</button>
        </div>
      </div>
    </section>

    <section>
      <div class="grid grid-cols-2 gap-4">
        <div class="settings">
          <b>Speed</b><p id="currentSpeed">-</p>
        </div>
        <div class="settings">
          <b>Status</b><p id="currentStatus">-</p>
        </div>
      </div>
    </section>
</template>
