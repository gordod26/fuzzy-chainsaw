import { makeAutoObservable, toJS } from "mobx";
import { parse } from "path";
import { ChangeEvent } from "react";

interface IRefStore {}

export default class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  isAuthenticated = false;
  emailInput = "";
  passwordInput = "";
  usernameInput = "";
}
