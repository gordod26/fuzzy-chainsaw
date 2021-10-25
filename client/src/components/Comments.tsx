import CommentCard from "./CommentCard";
import PostCard from "./PostCard";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

export const QUERY_POSTS = gql`
  query Query(
    $filter: String
    $skip: Int
    $take: Int
    $orderBy: PostOrderByInput
  ) {
    feed(filter: $filter, skip: $skip, take: $take, orderBy: $orderBy) {
      posts {
        description
        postedBy {
          name
        }
        votes {
          id
        }
      }
    }
  }
`;

export default function Comments() {
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
    <div className={" w-4/5 m-auto mt-4"}>
      <PostCard></PostCard>
      {loading && <p>Loading...</p>}
      {/*map comments*/}
      {data && (
        <div>
          {data.feed.posts.map((i: any) => (
            <CommentCard
              username={i.postedBy.name}
              post={i.description}
            ></CommentCard>
          ))}
        </div>
      )}
    </div>
  );
}
