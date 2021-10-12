import AuthStore from "./AuthStore";
import NavStore from "./NavStore";
import RefStore from "./RefStore";
import BibleStore from "./BibleStore";

// GUIDE: Import more store here
// ex:
// import UserStore from "./UserStore";

const store = {
  navStore: new NavStore(),
  refStore: new RefStore(),
  bibleStore: new BibleStore(),
  authStore: new AuthStore(),
};

export default store;
