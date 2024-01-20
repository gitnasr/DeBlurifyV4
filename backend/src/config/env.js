module.exports = {
    PORT: process.env.PORT || 3000,
    ENV: process.env.NODE_ENV || "development",
    JWT: process.env["JWT_SECRET"],
    MONGO: process.env.MONGO_URI,
    CLOUDINARY: {
        CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        API_KEY: process.env.CLOUDINARY_API_KEY,
        API_SECRET: process.env.CLOUDINARY_API_SECRET,
    },
    IPINFO: process.env.IPINFO,
    IS_PRODUCTION: process.env.NODE_ENV === "production",
    REPLICATA:{
        CODEFORMER_API_KEY: process.env.REPLICATA_CODEFORMER_API_KEY,
    }
};
