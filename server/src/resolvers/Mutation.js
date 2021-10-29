const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function post(parent, args, context, info) {
  const { userId, prisma } = context;

  if (userId === null) throw new Error("Not Authenticated");
  const newPost = await prisma.post.create({
    data: {
      description: args.description,
      postedBy: { connect: { id: userId } },
      parentId: args.parentId,
    },
  });
  context.pubsub.publish("NEW_POST", newPost);
  return newPost;
}

async function vote(parent, args, context, info) {
  // 1
  const { userId, prisma } = context;

  // 2
  const vote = await prisma.vote.findUnique({
    where: {
      postId_userId: {
        postId: Number(args.postId),
        userId: userId,
      },
    },
  });

  if (Boolean(vote)) {
    throw new Error(`Already voted for post: ${args.postId}`);
  }

  // 3
  const newVote = prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      post: { connect: { id: Number(args.postId) } },
    },
  });
  context.pubsub.publish("NEW_VOTE", newVote);

  return newVote;
}

async function updatePost(parent, args, context, info) {
  const { userId } = context;

  const id = +args.id;

  if (userId === null) throw new Error("Not Authenticated");

  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });

  return updatedPost;
}

async function modDeletePost(parent, args, context, info) {
  const { userId } = context;

  const id = +args.id;

  if (userId === null) throw new Error("Not Authenticated");

  const deletePost = await prisma.post.delete({
    where: { id },
  });

  return deletePost;
}

//async function userDeletePost(parent, args, context, info) {
//const { userId, prisma } = context;
////const id = +args.id;

////const post = await prisma.post.findUnique({
////where: { id, postedBy: { id: { userId } } },
////});
//const post = await prisma.post.findUnique({
//where: {
//id_postedById: {
//id: Number(args.id),
//},
//},
//});

////if (Boolean(post)) {
////throw new Error(
////`You cannot delete a post you did not post: ${args.postId}`
////);
////}

////const deletePost = await prisma.post.delete({
////where: { id },
////});

//return post;
//}

module.exports = {
  signup,
  login,
  post,
  vote,
  updatePost,
  modDeletePost,
  //userDeletePost,
};
