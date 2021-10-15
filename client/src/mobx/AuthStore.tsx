import { makeAutoObservable, toJS } from "mobx";
import { parse } from "path";
import { ChangeEvent } from "react";

interface IRefStore {}

export default class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  isAuthenticated = true;
  emailInput = "";
  passwordInput = "";
  usernameInput = "";

  setIsAuthenticated() {
    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
    console.log(this.isAuthenticated);
  }
  login() {
    this.isAuthenticated = true;
  }
  logout() {
    this.isAuthenticated = false;
  }
}
