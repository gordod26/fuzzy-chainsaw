const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createAvatar(parent, args, context, info) {
  const { userId } = context;

  if (userId === null) throw new Error("Not Authenticated");
  const newAvitar = await prisma.avitar.create({
    data: {
      name: args.name,
      color0: args.color0,
      color1: args.color1,
      color2: args.color2,
      color3: args.color3,
      color4: args.color4,
      user: { connect: { id: userId } },
    },
  });
  console.log("MUTATION postAvitar success for user " + userId);
  return newAvitar;
}

async function changeAvatar(parent, args, context, info) {
  const { userId } = context;

  if (userId === null) throw new Error("Not Authenticated");
  const newAvitar = await prisma.avitar.update({
    where: {
      userId: userId,
    },
    data: {
      name: args.name,
      color0: args.color0,
      color1: args.color1,
      color2: args.color2,
      color3: args.color3,
      color4: args.color4,
    },
  });
  console.log("MUTATION changeAvitar success for user " + userId);
  return newAvitar;
}

async function getAvatar(parent, args, context, info) {
  const userId = Number(args.userId);

  const avitar = await prisma.avitar.findUnique({
    where: { userId },
  });

  console.log("get avitar success " + userId);
  return avitar;
}

async function getStyle(parent, args, context, info) {
  const id = Number(args.id);

  const avitarStyle = await prisma.avitarStyles.findUnique({
    where: { id },
  });
  console.log("get avitarStyle " + id);
  return avitarStyle;
}

module.exports = {
  createAvatar,
  changeAvatar,
  getAvatar,
  getStyle,
};
