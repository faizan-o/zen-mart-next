import cloudinary from "@/utils/CloudinaryConfig";

export const uploadImage = async (file: File, folder: string) => {
  
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise(async (resolve, reject) => {
    
    await cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: folder,
      },
        async (err, res) => {
            if (err) return reject(err);
            
            return resolve(res);
      }
    ).end(bytes);
  });
};
