import {makeAutoObservable} from "mobx";

type Position = 'top' | 'center'| 'bottom'
export default class NavStore {
  constructor() {
    makeAutoObservable(this);
  }

  navPosition : Position = 'center'

  handleNavPosition(pos : Position){
    if((this.navPosition === 'top' && pos === 'bottom') || (this.navPosition === 'bottom' && pos === 'top')){
      this.navPosition = 'center'
    } else {
    this.navPosition = pos
    }

  }


}

