const { verse, chapter, book } = require("./bible/Query");

async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [{ description: { contains: args.filter } }],
      }
    : {}; // this is a filter for the search not used in the query but is an example

  //im trying to filter for posts with parentId 0
  //const root = args.filter({
  //OR: [{ parentId: { equals: 0 } }],
  //};

  const posts = await context.prisma.post.findMany({
    //root,
    where: {
      parentId: {
        equals: 0,
      },
    },
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
    //include: { comments: true }, //get nested comments 1 deep
    //include: { comments: { include: { comments: true } } }, //get nested 2 deep
    include: {
      comments: {
        include: {
          comments: { include: { comments: { include: { comments: true } } } },
        },
      },
    }, //get nested 3 deep
  });

  console.log(posts);

  const count = await context.prisma.post.count({ where });

  return { posts, count };
}

module.exports = {
  feed,
  verse,
  chapter,
  book,
};
