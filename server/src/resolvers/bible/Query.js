const db = require("../../../db/db");

async function verse(parent, args, context, info) {
  const query = await db
    .where({
      id: args.id,
    })
    .select()
    .table(args.translation);

  const id = query[0].id,
    b = query[0].b,
    c = query[0].c,
    v = query[0].v,
    t = query[0].t;

  return { id, b, c, v, t };
}

async function chapter(parent, args, context, info) {
  const query = await db
    .where({
      c: args.c,
      b: args.b,
    })
    .select()
    .table(args.translation);

  const chapter = { c: query };
  return chapter;
}

module.exports = {
  verse,
  chapter,
};
