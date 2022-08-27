import { expect, test } from 'vitest'
import Session from './session'

test('create a new session', () => {
  let newSession = new Session(20, 100, 20);
  expect(newSession.startBPM).toBe(20);
  expect(newSession.stopBPM).toBe(100);
});

test('compute the number of series', () => {
  let newSession = new Session(20, 100, 20);
  expect(newSession.NumSeries()).toBe(5);
});
