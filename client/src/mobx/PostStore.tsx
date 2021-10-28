import { makeAutoObservable } from "mobx";

export default class PostStore {
  constructor() {
    makeAutoObservable(this);
  }
}
