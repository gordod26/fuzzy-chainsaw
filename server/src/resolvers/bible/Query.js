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

async function book(parent, args, context, info) {
  const query = await db("key_english")
    .where({
      b: args.b,
    })
    .select();

  //console.log("book", query[0]);

  const b = query[0].b;
  const n = query[0].n;
  return { b, n };
}

module.exports = {
  verse,
  chapter,
  book,
};
