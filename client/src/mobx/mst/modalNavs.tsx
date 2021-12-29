import { unprotect, getSnapshot, types } from "mobx-state-tree";

export const Modals = types
  .model("Modals", {
    avitarModel: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    toggleModel() {
      self.avitarModel = !self.avitarModel;
    },
  }));
