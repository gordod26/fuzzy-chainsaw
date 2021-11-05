import React, { useEffect } from "react";
import Avatar from "boring-avatars";
import { useContext } from "react";
import { observer } from "mobx-react";
import StoresContext from "../../util/context";
import PostReplyCard from "./PostReplyCard";

const CommentCard = observer((props: any): JSX.Element => {
  const store = useContext(StoresContext);
  useEffect(() => {
    console.log("parentId", props.parentId);
  }, []);
  return (
    <>
      <div className={`flex justify-left items-start pb-5 ${props.indent}`}>
        <div className="self-start mt-0">
          <Avatar
            size={props.avatarSize}
            name="Eunice Kennedy"
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
        </div>
        <div className={"flex flex-col pl-3 text-sm"}>
          <div>
            <p className={" font-extralight"}>
              {props.username}
              <span className="ml-3">
                <span></span>5h
              </span>
            </p>
          </div>
          <div>
            <p>{props.post}</p>
          </div>
          <div className={"inline"}>
            {/*up button*/}
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            {/*down button*/}
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className={" inline font-extralight"}>
              {!props.disableReply && (
                <span
                  className={"ml-6"}
                  onClick={() => {
                    store.refStore.toggleReplyBox();
                  }}
                >
                  reply
                </span>
              )}
              <span className={"ml-6"}>follow</span>
              <span className={"ml-6"}>save</span>
              <span className={"ml-6"}>hide</span>
              <span className={"ml-6"}>127d</span>
              <span className={"ml-6"}>history</span>
            </div>
          </div>
        </div>
      </div>
      {store.refStore.replyBox && <PostReplyCard parentId={props.parentId} />}
    </>
  );
});

export default CommentCard;
