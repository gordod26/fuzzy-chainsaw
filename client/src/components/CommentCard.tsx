import React from "react";
import Avatar from "boring-avatars";

const CommentCard = (): JSX.Element => {
  return (
    <div className="flex justify-left items-start mb-5">
      <div className="self-start mt-0">
        <Avatar
          size={40}
          name="Maria Mitchell"
          variant="marble"
          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        />
      </div>
      <div className={"flex flex-col pl-3 text-sm"}>
        <div>
          <p className={" font-extralight"}>
            commentBoi879
            <span className="ml-3">
              <span></span>5h
            </span>
          </p>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
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
            <span className={"ml-6"}>reply</span>
            <span className={"ml-6"}>follow</span>
            <span className={"ml-6"}>save</span>
            <span className={"ml-6"}>hide</span>
            <span className={"ml-6"}>127d</span>
            <span className={"ml-6"}>history</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
