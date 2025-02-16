const express = require("express");
require("dotenv").config();
const cors = require("cors");
const sequelize = require("./src/config/dbConnect");
const multer = require("multer");

// Express uygulamasını başlat
const app = express();
const upload = multer();

// Middleware'leri kullan
app.use(cors());
app.use(express.json());
app.use(upload.none());

// PostgreSQL bağlantısını retry mekanizması ile kontrol et
const connectWithRetry = async () => {
  let connected = false;
  while (!connected) {
    try {
      await sequelize.authenticate();
      connected = true;
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 saniye bekle ve tekrar dene
    }
  }
};

// Sunucuyu başlat
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor...agaaa`);
  
  await connectWithRetry();
});
