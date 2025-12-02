// Cloudinary Configuration
const cloudinaryConfig = {
    cloudName: "dwzajmb65",
    apiKey: "145713588768137",
    apiSecret: "6sh-SaguYvzTti-qYnJq6F5PlJ8", // Not needed for unsigned uploads, but stored for reference
    uploadPreset: "stpaulschurch_unsigned"
};

// Cloudinary Upload URL
const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;

