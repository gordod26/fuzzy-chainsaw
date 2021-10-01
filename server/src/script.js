// 1
const { PrismaClient } = require("@prisma/client");

// 2
const prisma = new PrismaClient();

// 3
async function main() {
  const newPost = await prisma.post.create({
    data: {
      description: "Fullstack tutorial for graphql",
    },
  });
  const allPosts = await prisma.post.findMany();
  const post = (parent, args, context, info) => {
    prisma.post.findUnique({
      while: {
        id: {
          equals: args,
        },
      },
    });
  };
  console.log(allPosts);
  console.log(post);
}

// 4
main()
  .catch((e) => {
    throw e;
  })
  // 5
  .finally(async () => {
    await prisma.$disconnect();
  });
