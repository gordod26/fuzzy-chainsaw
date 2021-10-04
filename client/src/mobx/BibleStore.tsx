import { makeAutoObservable } from "mobx";

type Translation =
  | "t_asv"
  | "t_kjv"
  | "t_bbe"
  | "t_dby"
  | "t_wbt"
  | "t_web"
  | "t_ylt";

export default class NavStore {
  constructor() {
    makeAutoObservable(this);
  }

  translation: Translation = "t_kjv";

  handleTranslation(e: Translation) {
    this.translation = e;
    console.log(e);
  }

}
