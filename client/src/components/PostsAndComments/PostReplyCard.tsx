import React from "react";
import Avatar from "boring-avatars";
import TextareaAutosize from "react-textarea-autosize";
import { useContext } from "react";
import { observer } from "mobx-react";
import StoresContext from "../../util/context";
import { AUTH_NAME, AUTH_TOKEN } from "../../constants/constants";
import { gql, useMutation } from "@apollo/client";
import { QUERY_POSTS } from "./CommentFeed";

interface Itextarea {
  textarea: JSX.Element;
}
interface Iprops {
  postId?: string;
  userId?: number;
  userName?: string;
  userAvatar?: string;
  parentId?: number;
  isOpen: any;
}

const MUTATION_COMMENT = gql`
  mutation CommentMutation($description: String!, $parentId: Int) {
    comment(description: $description, parentId: $parentId) {
      id
      description
      postedBy {
        id
        name
      }
      votes {
        id
      }
      parentId
    }
  }
`;

const PostReplyCard = observer((props: Iprops): JSX.Element => {
  const store = useContext(StoresContext);
  const [commentMutation] = useMutation(MUTATION_COMMENT, {
    context: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      },
    },
    variables: {
      description: store.refStore.replyInput,
      parentId: Number(props.parentId), //make sure it's a number
    },
    refetchQueries: [QUERY_POSTS],
    onCompleted: (commentMutation) => {
      console.log(commentMutation);
    },
  });

  return (
    <div className="flex justify-left items-start ml-8 mb-5">
      <div className="self-start mt-0">
        <Avatar
          size={30}
          name={
            store.authStore.isAuthenticated
              ? "Maria Mitchell"
              : "Bessie Coleman"
          }
          variant="beam"
          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        />
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
              value={store.refStore.replyInput}
              onChange={(e) => {
                store.refStore.replyInputHandler(e);
              }}
            />
          ) : (
            <TextareaAutosize
              className={"flex-grow resize-none"}
              placeholder={"Login to write a reply"}
              disabled={true}
              onChange={(e) => {
                store.refStore.replyInputHandler(e);
              }}
            />
          )}
        </p>
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
            <span
              onClick={() => {
                commentMutation();
                store.refStore.replyInputHandler();
                props.isOpen(false);
              }}
              className={"ml-6"}
            >
              post
            </span>
            <span
              className={"ml-6"}
              onClick={() => {
                props.isOpen(false);
              }}
            >
              cancel
            </span>

            <span className={"ml-6"}>127d</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PostReplyCard;
