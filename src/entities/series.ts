import { v4 as uuidv4 } from 'uuid';

export default class Series {
  id: string;
  tempo: number;

  constructor(tempo: number) {
    this.id = uuidv4()
    this.tempo = tempo
  }
}
