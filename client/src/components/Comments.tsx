import CommentCard from "./CommentCard";
import PostCard from "./PostCard";

export default function Comments() {
  return (
    <div className={" w-4/5 m-auto mt-4"}>
      <PostCard></PostCard>
      <CommentCard username="gordod26" post="blablablabla"></CommentCard>
    </div>
  );
}
