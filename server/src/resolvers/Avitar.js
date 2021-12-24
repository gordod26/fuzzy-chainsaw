const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createAvitar(parent, args, context, info) {
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

async function changeAvitar(parent, args, context, info) {
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

module.exports = {
  createAvitar,
  changeAvitar,
};
