import { makeAutoObservable } from "mobx";

export default class PostStore {
  constructor() {
    makeAutoObservable(this);
  }
  openCommentId: number | null = null;
  handleopenCommentId = (id: number | null) => {
    this.openCommentId = id;
  };
}
