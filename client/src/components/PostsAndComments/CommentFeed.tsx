import React, { useState, useContext } from "react";
import CommentCard from "./SingleComment";
import PostCard from "./PostCard";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { observer } from "mobx-react";
import StoresContext from "../../util/context";
import ReplyCard from "./ReplyCard";
import PostReplyCard from "./PostReplyCard";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { AUTH_TOKEN, COMMENTS_PER_PAGE } from "../../constants/constants";

export const QUERY_POSTS = gql`
  query Query($orderBy: PostOrderByInput, $skip: Int, $take: Int) {
    feed(orderBy: $orderBy, skip: $skip, take: $take) {
      posts {
        id
        parentId
        description
        createdAt
        votes {
          id
        }
        postedBy {
          name
          id
        }
        comments {
          id
          description
          parentId
          createdAt
          postedBy {
            id
            name
          }
          votes {
            id
          }
          comments {
            id
            description
            createdAt
            parentId
            postedBy {
              id
              name
            }
            votes {
              id
            }
            comments {
              id
              description
              parentId
              createdAt
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
        }
      }
    }
  }
`;

const Comments = observer((props: any) => {
  const store = useContext(StoresContext);
  const take = COMMENTS_PER_PAGE;
  const orderBy = { createdAt: "desc" };

  // GET Comment Feed
  const { loading, error, data } = useQuery(QUERY_POSTS, {
    fetchPolicy: "no-cache",
    variables: {
      skip: 0,
      take: take,
      orderBy: orderBy,
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div className={" w-4/5 m-auto mt-5"}>
      <PostCard></PostCard>
      {loading && <p>Loading...</p>}
      {/*map comments*/}
      {data && (
        <div>
          {data.feed.posts.map((i: any, index: number) => (
            <div
              className={`${
                store.refStore.hiddenComments.includes(i.id) && "hidden"
              }`}
            >
              <CommentCard
                username={i.postedBy.name}
                time={i.createdAt}
                post={i.description}
                votes={i.votes.length}
                avatarSize={40}
                children={i.comments.length > 0 ? true : false}
                id={i.id}
              ></CommentCard>
              {i.comments.length > 0 &&
                i.comments.map((i: any, index: number) => (
                  <div>
                    <CommentCard
                      indent={"ml-10"}
                      avatarSize={30}
                      time={i.createdAt}
                      username={i.postedBy.name}
                      post={i.description}
                      votes={i.votes.length}
                      id={i.id}
                    ></CommentCard>
                    {i.comments.length > 0 &&
                      i.comments.map((i: any, index: number) => (
                        <div>
                          <CommentCard
                            indent={"ml-20"}
                            avatarSize={30}
                            time={i.createdAt}
                            username={i.postedBy.name}
                            post={i.description}
                            votes={i.votes.length}
                            id={i.id}
                          ></CommentCard>
                          {i.comments.length > 0 &&
                            i.comments.map((i: any, index: number) => (
                              <div>
                                {/*this div is used for hidding comments*/}
                                <CommentCard
                                  indent={"ml-28"}
                                  avatarSize={30}
                                  username={i.postedBy.name}
                                  time={i.createdAt}
                                  votes={i.votes.length}
                                  post={i.description}
                                  id={i.id}
                                  disableReply={true}
                                ></CommentCard>
                              </div>
                            ))}
                        </div>
                      ))}
                  </div>
                ))}
              {/*<ReplyCard username={i.postedBy.name} post={i.description} />*/}
              {/*<PostReplyCard parentId={Number(i.id)} />*/}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default Comments;
