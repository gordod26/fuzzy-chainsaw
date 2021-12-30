import React from "react";
import UserAvatar from "../Avitar/UserAvatar";
import Avatar from "boring-avatars";
import TextareaAutosize from "react-textarea-autosize";
import { useContext } from "react";
import { observer } from "mobx-react";
import StoresContext from "../../util/context";
import { AUTH_ID, AUTH_NAME, AUTH_TOKEN } from "../../constants/constants";
import { gql, useMutation, useQuery } from "@apollo/client";
import { QUERY_POSTS } from "./CommentFeed";
import { MUTATION_POST } from "../../helpers/mutations";
import { GET_AVATAR } from "../../helpers/querys";

interface Itextarea {
  textarea: JSX.Element;
}

const PostCard = observer(function PostCard(): JSX.Element {
  const authId = Number(localStorage.getItem(AUTH_ID));
  const store = useContext(StoresContext);
  const [postMutation] = useMutation(MUTATION_POST, {
    context: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      },
    },
    variables: {
      description: store.refStore.postInput,
    },
    refetchQueries: [QUERY_POSTS],
    onCompleted: (postMutation) => {
      console.log(postMutation);
    },
  });

  const { loading, error, data } = useQuery(GET_AVATAR, {
    variables: {
      userId: authId,
    },
  });

  return (
    <div className="flex justify-left items-start mb-5">
      <div className="self-start mt-0">
        <UserAvatar userId={authId ? authId : 11} avitarSize={40} />
      </div>
      <div className={"flex flex-col flex-grow pl-3 text-sm"}>
        <div>
          <p className={" font-extralight"}>
            {/*display name from localstorage*/}
            {store.authStore.isAuthenticated
              ? localStorage.getItem(AUTH_NAME)
              : "Margaret Bourke"}
            <span className="ml-3"></span>
          </p>
        </div>
        <p className={"flex "}>
          {store.authStore.isAuthenticated ? (
            <TextareaAutosize
              className={"flex-grow resize-none"}
              placeholder={"What are your thoughts?"}
              value={store.refStore.postInput}
              onChange={(e) => {
                store.refStore.postInputHandler(e);
              }}
            />
          ) : (
            <TextareaAutosize
              className={"flex-grow resize-none"}
              placeholder={"Login to write a post"}
              disabled={true}
              onChange={(e) => {
                store.refStore.postInputHandler(e);
              }}
            />
          )}
        </p>
        <div className={"inline"}>
          {/*up button*/}
          {/*<button>
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
            </button>*/}
          {/*down button*/}
          {/*<button>
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
            </button>*/}
          <div className={" inline font-extralight"}>
            {/*<span className={"ml-6"}>reply</span>*/}
            <span
              onClick={() => {
                postMutation();
                store.refStore.postInputHandler();
              }}
              className={"cursor-pointer"}
            >
              post
            </span>
            {/*<span className={"ml-6"}>save</span>*/}
            {/*<span className={"ml-6"}>hide</span>*/}
            {/*<span className={"ml-6"}>history</span>*/}
          </div>
        </div>
      </div>
    </div>
  );
});

export default PostCard;
