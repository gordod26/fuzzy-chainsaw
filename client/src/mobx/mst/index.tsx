import { unprotect, getSnapshot, types } from "mobx-state-tree";
import { Modals } from "./events";

const RootStore = types.model("RootStore", {
  version: 1,
  modals: Modals,
});

const store = RootStore.create({
  modals: {},
});

export default store;
