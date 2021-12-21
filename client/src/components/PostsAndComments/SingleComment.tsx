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
import DeleteCommentModal from "../Modals/DeleteComment";

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

const DELETE_POST_MUTATION = gql`
  mutation Mutatin($deletePostId: ID!) {
    deletePost(id: $deletePostId) {
      id
    }
  }
`;

const CommentCard = observer((props: any): JSX.Element => {
  const [replyBoxOpen, setReplyBoxOpen] = useState(false);
  //#4
  const [deleteModelIsOpen, setDeleteModelIsOpen] = useState(false);
  const store = useContext(StoresContext);
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const userId = localStorage.getItem(AUTH_ID);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    context: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      },
    },
    variables: {
      deletePostId: props.id,
    },
    refetchQueries: [QUERY_POSTS],
    onCompleted: (deletePost) => {
      console.debug("MUTATION -> DELETE_POST_MUTATION");
    },
  });

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
    onCompleted: (vote) => {
      console.debug("MUTATION -> VOTE_MUTATION");
    },
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
            {props.deleted ? (
              <p className="italic text-gray-400">deleted</p>
            ) : (
              <p>{props.post} </p>
            )}
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
              {userId === props.userId ? (
                <>
                  <div
                    className="inline ml-6"
                    onClick={() => {
                      setDeleteModelIsOpen(true);
                      console.debug("deleteModelIsOpen ->", deleteModelIsOpen);
                    }}
                  >
                    delete
                  </div>
                  <div className={`${deleteModelIsOpen && "modal-open"} modal`}>
                    <div className="modal-box">
                      <p>are you sure you want to delete this post?</p>
                      <div className="modal-action">
                        <div
                          className="btn btn-primary"
                          onClick={() => {
                            //check id being passed to delete mutation
                            /*console.debug(
                              "props.id passed to delete mutation",
                              props.id
                              )*/

                            //call delete mutation
                            deletePost();
                            //close modal
                            setDeleteModelIsOpen(false);
                          }}
                        >
                          Accept
                        </div>
                        <div
                          className="btn"
                          onClick={() => {
                            //close modal
                            setDeleteModelIsOpen(false);
                          }}
                        >
                          Close
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                //          if (authToken && userId === props.userId) {
                //           setDeleteModelIsOpen(!deleteModelIsOpen);

                //deletePost();
                //        }
                //     }}
                //    className={"ml-6 cursor-pointer"}
                // >
                //  delete
                // </a>
                <div className={`ml-6 cursor-pointer inline`}>follow</div>
              )}
              <div className={`ml-6 cursor-pointer inline`}>save</div>
              <div className={`ml-6 cursor-pointer inline`}>history</div>
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
