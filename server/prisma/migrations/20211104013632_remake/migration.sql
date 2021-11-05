-- RedefineIndex
DROP INDEX "Tags.name_unique";
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- RedefineIndex
DROP INDEX "User.email_unique";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- RedefineIndex
DROP INDEX "Vote.postId_userId_unique";
CREATE UNIQUE INDEX "Vote_postId_userId_key" ON "Vote"("postId", "userId");
