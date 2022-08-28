/* 
 * Base metronome, with no timing. 
 * More like a "click on command" class. 
 */
class BaseMetronome {
  tempo: number;
  playing: boolean;
  audioCtx: AudioContext;
  tick: OscillatorNode;
  tickVolume: GainNode;
  soundHz: number;

  constructor(tempo = 60) {
    this.tempo = tempo;
    this.playing = false;

    this.audioCtx = null;
    this.tick = null;
    this.tickVolume = null;
    this.soundHz = 1000;
  }

  initAudio() {
    this.audioCtx = new window.AudioContext();
    this.tick = this.audioCtx.createOscillator();
    this.tickVolume = this.audioCtx.createGain();

    this.tick.type = 'sine'; 
    this.tick.frequency.value = this.soundHz;
    this.tickVolume.gain.value = 0;

    this.tick.connect(this.tickVolume);
    this.tickVolume.connect(this.audioCtx.destination);
    this.tick.start(0);  // No offset, start immediately.
  }

  clickAtTime(time: number) {
    // Silence the click.
    this.tickVolume.gain.cancelScheduledValues(time);
    this.tickVolume.gain.setValueAtTime(0, time);

    // Audible click sound.
    this.tickVolume.gain.linearRampToValueAtTime(1, time + .001);
    this.tickVolume.gain.linearRampToValueAtTime(0, time + .001 + .01);
  }

  init() {
    this.playing = true;
    this.initAudio();
  }

  stop(when = 0) {
    this.tick.addEventListener('ended', (event) => {
      console.log("Caught 'ended' event");
      this.playing = false
    });
    console.log("Stopping metronome at " + when);
    this.tick.stop(when);
  }
}

/* 
 * Scheduling is done by prescheduling all the audio events, and
 * letting the WebAudio scheduler actually do the scheduling.
 */
export default class ScheduledMetronome extends BaseMetronome {
  scheduledTicks: number;

  constructor(tempo: number, ticks = 1000) {
    super(tempo);
    this.scheduledTicks = ticks;
  }

  start() {
    super.init();
    const timeoutDuration = (60 / this.tempo);

    let now = this.audioCtx.currentTime;

    // Schedule all the clicks ahead.
    for (let i = 0; i < this.scheduledTicks; i++) {
      this.clickAtTime(now);
      now += timeoutDuration;
    }
    this.stop(now)
  }

  stop(when = 0) {
    super.stop(when);
  }
}
