<script setup>
import {ref, reactive} from 'vue'
import Session from './entities/session'

// Initialize default form values
const workDuration = ref(1);
const restDuration = ref(1);
const roundsPerSeries = ref(1);
const increaseBPM = ref(20);
const startBPM = ref(80);
const stopBPM = ref(200);
const settings = parseSettings();
const session = reactive(new Session(startBPM.value, stopBPM.value, increaseBPM.value, settings));

async function start() {
  session.start();
  document.getElementById('btnStop').removeAttribute("disabled")
}

function stop() {
  session.stop()
}

function parseSettings() {

  var settings = {};

  // Timer Configuration
  settings["work_duration"] = workDuration.value / 60; // Convert sec to minutes
  settings["rest_duration"] = restDuration.value / 60; // Convert sec to minutes

  // Metronome Configuration
  settings["rounds_per_series"] = roundsPerSeries.value;
  settings["bpm_increase"] = increaseBPM.value;

  settings["start_bpm"] = startBPM.value;
  settings["stop_bpm"] = stopBPM.value;

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
        <input v-model="workDuration" type="number">
      </div>

      <div class="settings">
        <label><b>Rest Duration (seconds)</b></label>
      </div>
      <div class="settings">
        <input v-model="restDuration" type="number">
      </div>

      <div class="settings">
        <label><b>Rounds per series</b></label>
      </div>
      <div class="settings">
        <input v-model="roundsPerSeries" type="number">
      </div>

      <div class="settings">
        <label><b>BPM increase</b></label>
      </div>
      <div class="settings">
        <input v-model="increaseBPM" type="number">
      </div>

      <div class="settings">
        <label><b>Start BPM</b></label>
      </div>
      <div class="settings">
        <input v-model="startBPM" type="number">
      </div>

      <div class="settings">
        <label><b>Stop BPM</b></label>
      </div>
      <div class="settings">
        <input v-model="stopBPM" type="number">
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
        <b>Speed</b>
        <p v-if="session.currentSeries">{{ session.currentSeries.tempo }}</p>
        <p v-else="session.currentSeries">-</p>
      </div>
      <div class="settings">
        <b>Status</b>
        <p>{{ session.seriesNum || "-" }}</p>
      </div>
    </div>
  </section>
</template>
