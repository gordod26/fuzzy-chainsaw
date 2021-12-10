import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Avatar from "boring-avatars";
import { useContext } from "react";
import { observer } from "mobx-react";
import StoresContext from "../../util/context";
import PostReplyCard from "./PostReplyCard";
import { AUTH_TOKEN, AUTH_ID } from "../../constants/constants";
import { QUERY_POSTS } from "./CommentFeed";
import { timeDifferenceForDate } from "../../helpers/time";

const VOTE_MUTATION = gql`
  mutation Mutation($postId: ID!) {
    vote(postId: $postId) {
      post {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const CommentCard = observer((props: any): JSX.Element => {
  const [replyBoxOpen, setReplyBoxOpen] = useState(false);
  const store = useContext(StoresContext);
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const userId = localStorage.getItem(AUTH_ID);

  const [vote] = useMutation(VOTE_MUTATION, {
    context: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      },
    },
    variables: {
      postId: props.id,
    },
    refetchQueries: [QUERY_POSTS],
  });

  //console logs ->
  useEffect(() => {
    //console.log("id", props.id);
    //console.log("props.time", props.time);
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
              <span className="ml-3">{timeDifferenceForDate(props.time)}</span>
            </p>
          </div>
          <div>
            <p>{props.post}</p>
          </div>
          <div className={"inline-block truncate"}>
            {/*upvote button*/}
            <div className={"inline-block"}>
              <button
                className="inline "
                onClick={() => {
                  //only allow vote if user is logged in
                  if (authToken) {
                    vote();
                  }
                }}
              >
                {/*upvote svg*/}
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
              <span>{" " + props.votes}</span>
            </div>
            {/*downvote svg*/}
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
              {!props.disableReply && (
                <span
                  className={"inline ml-6 cursor-pointer"}
                  onClick={() => {
                    setReplyBoxOpen(!replyBoxOpen);
                  }}
                >
                  reply
                </span>
              )}
              <span className={"ml-6 cursor-pointer"}>follow</span>
              <span className={"ml-6 cursor-pointer"}>save</span>
              <span className={"ml-6 cursor-pointer"}>hide</span>
              <span className={"ml-6 cursor-pointer"}>history</span>
            </div>
          </div>
        </div>
      </div>
      {replyBoxOpen && (
        <PostReplyCard parentId={props.id} isOpen={setReplyBoxOpen} />
      )}
    </>
  );
});

export default CommentCard;
