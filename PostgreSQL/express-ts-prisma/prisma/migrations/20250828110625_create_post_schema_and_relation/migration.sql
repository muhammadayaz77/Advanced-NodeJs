-- CreateTable
CREATE TABLE "public"."Post" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(555) NOT NULL,
    "description" VARCHAR(2000) NOT NULL,
    "user_id" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
