function post(parent, args, context) {
  return context.prisma.vote.findUnique({ where: { id: parent.id } }).post();
}

function user(parent, args, context) {
  return context.prisma.vote.findUnique({ where: { id: parent.id } }).user();
}

module.exports = {
  post,
  user,
};
