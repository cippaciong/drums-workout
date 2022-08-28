import {describe, it, expect} from 'vitest'
import Session from './session'

describe('session', () => {
    const startBPM = 20;
    const stopBPM = 100;
    const increaseBPM = 20;
    const session = new Session(startBPM, stopBPM, increaseBPM);

  it("should initialize successfully", () => {
    expect(session.startBPM).toBe(startBPM);
    expect(session.stopBPM).toBe(stopBPM);
    expect(session.increaseBPM).toBe(increaseBPM);
    expect(session.id).toBeTypeOf("string");
  });

  it("should compute the correct number of series for a session", () => {
    const numSeries = session.numSeries();
    expect(numSeries).toBe(5);
  });

  it("should create the series", () => {
    const series = session.series
    expect(series.length).toBe(5);
    expect(series[0].tempo).toBe(startBPM);
    expect(series[series.length -1].tempo).toBe(stopBPM);
  });
})
