import { v2 as cloudinary } from "cloudinary";

const deleteFromCloudinary = async (url, resourceType = "image") => {
    try {
        if (!url) return;

        // Extract public_id from URL
        const parts = url.split("/");
        const filename = parts[parts.length - 1]; // e.g., "filename.mp4"
        const publicId = parts[parts.length - 2] + "/" + filename.split(".")[0];

        // Call Cloudinary API
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType, // "image" or "video"
        });

        return result;
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        throw error;
    }
};

export default deleteFromCloudinary;
