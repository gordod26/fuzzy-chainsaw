import { makeAutoObservable } from "mobx";

export default class BibleStore {
  constructor() {
    makeAutoObservable(this);
  }

  translation: string = "t_kjv";
  b: number = 1;
  c: number = 1;

  handleTranslation(e: string) {
    this.translation = e;
    console.log(e);
  }
}
