export default class Session {
  startBPM: number;
  stopBPM: number;
  increaseBPM: number;

  constructor(startBPM :number, stopBPM: number, increaseBPM: number) {
    this.startBPM = startBPM;
    this.stopBPM = stopBPM;
    this.increaseBPM = increaseBPM;
  }

  NumSeries() {
    return (this.stopBPM - this.startBPM) / this.increaseBPM + 1;
  }
}
