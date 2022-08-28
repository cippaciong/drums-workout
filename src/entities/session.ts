import { v4 as uuidv4 } from 'uuid';

export default class Session {
  id: string;
  startBPM: number;
  stopBPM: number;
  increaseBPM: number;

  constructor(startBPM :number, stopBPM: number, increaseBPM: number) {
    this.id = uuidv4()
    this.startBPM = startBPM;
    this.stopBPM = stopBPM;
    this.increaseBPM = increaseBPM;
  }

  NumSeries() {
    return (this.stopBPM - this.startBPM) / this.increaseBPM + 1;
  }
}
