import {describe, it, expect, test} from 'vitest'
import Session from './session'

describe('Session tests', () => {
  it("should initialize successfully", () => {
    // Given
    const startBPM = 20;
    const stopBPM = 100;
    const increaseBPM = 20;

    // When
    const session = new Session(startBPM, stopBPM, increaseBPM);

    // Then
    expect(session.startBPM).toBe(startBPM);
    expect(session.stopBPM).toBe(stopBPM);
    expect(session.increaseBPM).toBe(increaseBPM);
  });


  it("should return the correct number of series for a session", () => {
    // Given
    const startBPM = 20;
    const stopBPM = 100;
    const increaseBPM = 20;
    const session = new Session(startBPM, stopBPM, increaseBPM);

    // When
    const numSeries = session.NumSeries();

    // Then
    expect(numSeries).toBe(5);
  });
})
