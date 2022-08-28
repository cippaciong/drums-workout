import {v4 as uuidv4} from 'uuid';
import ScheduledMetronome from './metronome';

export default class Series {
  id: string;
  tempo: number;
  workDuration: number;
  restDuration: number;
  roundsPerSeries: number;
  metronome: ScheduledMetronome;


  constructor(tempo: number, workDuration: number, restDuration: number, roundsPerSeries: number) {
    this.id = uuidv4()
    this.tempo = tempo
    this.workDuration = workDuration;
    this.restDuration = restDuration;
    this.roundsPerSeries = roundsPerSeries;
  }

  async start() {
    // Count the number of clicks that should be played
    const clicks = (this.workDuration + this.restDuration) * this.roundsPerSeries * this.tempo

    this.metronome = new ScheduledMetronome(this.tempo, clicks);
    this.metronome.start();
  }

  playing() {
    return this.metronome.playing
  }

  stop() {
    this.metronome.stop();
  }
}
