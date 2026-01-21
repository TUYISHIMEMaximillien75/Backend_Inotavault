import cloudinary from "src/config/cloudinary";

export const uploadToCloudinary = async (
    buffer: Buffer,
    folder: string
): Promise<{ secureUrl: string, publicId: string }> => {
    return new Promise((resolve, reject) => {
        if (!buffer) {
            return reject(new Error("No buffer provided"));
        }

        const uploadStram = cloudinary.uploader.upload_stream({
            folder,
            resource_type: "auto",

        },
            (error: any, result: any) => {
                if (error) {
                    return reject(error);
                }
                if (!result) {
                    return reject(new Error("No result provided"));
                }
                resolve({
                    secureUrl: result.secure_url,
                    publicId: result.public_id,
                });
            },
        );

        uploadStram.end(buffer);

    })

}