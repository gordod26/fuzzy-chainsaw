import { useContext } from "react";
import { observer } from "mobx-react";
import StoresContext from "../util/context";
import Bible from "./Bible";
import Comments from "./Comments";
import BibleSectionContainer from "./BibleSectionContainer";
import IconMenuComments from "./IconMenuComments";

const Nav = observer(function Nav() {
  const store = useContext(StoresContext);

  return (
    <>
      {/*Bible container*/}
      {store.navStore.navPosition === "top" ? (
        ""
      ) : (
        <div className={`overflow-auto flex-1`}>
          {" "}
          <BibleSectionContainer />{" "}
        </div>
      )}
      {/* Nav container */}
      <div className={"flex justify-center flex-initial w-4/5 m-auto"}>
        <IconMenuComments />
        {/*up button*/}
        <button
          onClick={() => {
            store.navStore.handleNavPosition("top");
            console.log(store.navStore.navPosition);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
        {/*down button*/}
        <button
          onClick={() => {
            store.navStore.handleNavPosition("bottom");
            console.log(store.navStore.navPosition);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <button className={"ml-6 ml-auto justify-self-end "}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      {/*Comments container*/}
      {store.navStore.navPosition === "bottom" ? (
        ""
      ) : (
        <div className={"overflow-auto flex-1"}>
          <Comments />
        </div>
      )}
    </>
  );
});

export default Nav;
