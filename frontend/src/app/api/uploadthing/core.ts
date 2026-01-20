import { createUploadthing, type FileRouter } from "uploadthing/next"
import { getUserFromToken } from "@/lib/jwt-config"

const f = createUploadthing()

export const ourFileRouter = {
    newsImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async ({ req }) => {
            // Check if user is authenticated and is admin
            const userId = await getUserFromToken(req as any)

            if (!userId) {
                throw new Error("Unauthorized")
            }

            return { userId }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            return { uploadedBy: metadata.userId, url: file.url }
        }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
