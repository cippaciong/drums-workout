import { v4 as uuidv4 } from 'uuid';
import Series from './series'

export default class Session {
  id: string;
  startBPM: number;
  stopBPM: number;
  increaseBPM: number;
  series: Array<Series>;

  constructor(startBPM :number, stopBPM: number, increaseBPM: number) {
    this.id = uuidv4()
    this.startBPM = startBPM;
    this.stopBPM = stopBPM;
    this.increaseBPM = increaseBPM;
    this.#initializeSeries();
  }

  numSeries() {
    return (this.stopBPM - this.startBPM) / this.increaseBPM + 1;
  }

  #initializeSeries() {
    this.series = [];
    for (let i = 0; i < this.numSeries(); i++) {
      const tempo = this.startBPM + (this.increaseBPM * i);
      const series = new Series(tempo)
      this.series.push(series)
    }
  }
}
