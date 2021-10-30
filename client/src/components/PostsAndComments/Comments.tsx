import React, { useState, useContext } from "react";
import CommentCard from "./CommentCard";
import PostCard from "./PostCard";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { observer } from "mobx-react";
import StoresContext from "../../util/context";
import ReplyCard from "./ReplyCard";
import PostReplyCard from "./PostReplyCard";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

export const QUERY_POSTS = gql`
  query Query($orderBy: PostOrderByInput, $skip: Int, $take: Int) {
    feed(orderBy: $orderBy, skip: $skip, take: $take) {
      posts {
        id
        parentId
        description

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
            postedBy {
              id
              name
            }
            comments {
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
        }
      }
    }
  }
`;

const Comments = observer((props: any) => {
  const store = useContext(StoresContext);
  const { loading, error, data } = useQuery(QUERY_POSTS, {
    fetchPolicy: "no-cache",
    variables: {
      skip: 0,
      take: 20,
      orderBy: { createdAt: "desc" },
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
                post={i.description}
                votes={i.votes.length}
                avatarSize={40}
                children={i.comments.length > 0 ? true : false}
              ></CommentCard>
              {i.comments.length > 0 &&
                i.comments.map((i: any, index: number) => (
                  <div>
                    <CommentCard
                      indent={"ml-10"}
                      avatarSize={30}
                      username={i.postedBy.name}
                      post={i.description}
                      votes={i.votes.length}
                    ></CommentCard>
                    {i.comments.length > 0 &&
                      i.comments.map((i: any, index: number) => (
                        <div>
                          <CommentCard
                            indent={"ml-20"}
                            avatarSize={30}
                            username={i.postedBy.name}
                            post={i.description}
                          ></CommentCard>
                          {i.comments.length > 0 &&
                            i.comments.map((i: any, index: number) => (
                              <div>
                                {/*this div is used for hidding comments*/}
                                <CommentCard
                                  indent={"ml-28"}
                                  avatarSize={30}
                                  username={i.postedBy.name}
                                  post={i.description}
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
