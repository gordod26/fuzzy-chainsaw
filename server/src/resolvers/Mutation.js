const bcrypt = require("bcryptjs");
const { createAvatar, changeAvatar } = require("./Avitar");
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

  // create default avitar when new user signsup
  const newAvitar = await prisma.avitar.create({
    data: {
      name: user.name,
      color0: "#69d2e7",
      color1: "#a7dbd8",
      color2: "#e0e4cc",
      color3: "#f38630",
      color4: "#fa6900",
      user: { connect: { id: user.id } },
    },
  });

  console.log("MUTATION postAvitar success for user " + user.id);

  return {
    token,
    user,
    newAvitar,
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
    },
  });
  context.pubsub.publish("NEW_POST", newPost);
  return newPost;
}

async function comment(parent, args, context, info) {
  const { userId, prisma } = context;

  if (userId === null) throw new Error("Not Authenticated");
  const newComment = await prisma.post.create({
    data: {
      description: args.description,
      postedBy: { connect: { id: userId } },
      parent: { connect: { id: args.parentId } },
    },
  });
  return newComment;
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

  const id = Number(args.id);

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

async function deletePost(parent, args, context, info) {
  const { userId, prisma } = context;

  const id = Number(args.id);

  console.debug("Mutation: deletePost");
  if (userId === null) throw new Error("Not Authenticated");

  const deletePost = await prisma.post.update({
    where: { id },
    data: {
      deleted: true,
    },
  });

  return deletePost;
}

//async function userDeletePost(parent, args, context, info) {
//const { userId, prisma } = context;
//const id = Number(args.id);

//const post = await prisma.post.findUnique({
//where: { id, postedBy: { id: { userId } } },
//});
////const post = await prisma.post.findUnique({
////where: {
////id_postedById: {
////id: Number(args.id),
////},
////},
////});

//if (Boolean(post)) {
//throw new Error(
//`You cannot delete a post you did not post: ${args.postId}`
//);
//}

//const deletePost = await prisma.post.update({
//where: { id },
//data: {
//deleted: true,
//},
//});

//return { deletePost, post };
//}

module.exports = {
  signup,
  login,
  post,
  vote,
  updatePost,
  deletePost,
  comment,
  createAvatar,
  changeAvatar,
};
