import {v4 as uuidv4} from 'uuid';
import Series from './series'
import ScheduledMetronome from './metronome';

export default class Session {
  id: string;
  startBPM: number;
  stopBPM: number;
  increaseBPM: number;
  series: Array<Series>;
  settings: Object;
  stopped: boolean;
  currentSeries: Series;
  seriesNum: number;

  constructor(startBPM: number, stopBPM: number, increaseBPM: number, settings: Object) {
    this.id = uuidv4()
    this.startBPM = startBPM;
    this.stopBPM = stopBPM;
    this.increaseBPM = increaseBPM;
    this.settings = settings;
    this.#initializeSeries();
  }

  numSeries() {
    return (this.stopBPM - this.startBPM) / this.increaseBPM + 1;
  }

  #initializeSeries() {
    console.log(`Starting series creation`)
    this.series = [];
    for (let i = 0; i < this.numSeries(); i++) {
      console.log(`Creating series number ${i}`)
      const tempo = this.startBPM + (this.increaseBPM * i);
      const series = new Series(tempo, this.settings["work_duration"], this.settings["rest_duration"], this.settings["rounds_per_series"]);
      this.series.push(series)
    }
    console.log(`Series created: ${this.series}`)
  }


  async start() {
    this.seriesNum = 0;
    this.stopped = false;

    // Run all series one after the other
    for (const s of this.series) {
      this.seriesNum++ 
      this.currentSeries = s;
      this.currentSeries.start();

      while (this.currentSeries.playing()) {
        await this.sleep(10)
      }

      if (this.stopped) {
        console.log(`Stopping because stopped variable is: ${this.stopped}`)
        return
      }
    }
  }

  stop() {
    console.log("Invoked stop function")
    this.stopped = true;
    this.currentSeries.stop();
    this.currentSeries = null;
    this.seriesNum = null;
  }

  async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
