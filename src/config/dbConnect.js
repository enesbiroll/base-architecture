const { Sequelize } = require("sequelize");
const config = require("./database")[process.env.NODE_ENV || "development"];

// SQLite kullanımı için `config.storage` güncellendi
const sequelize = new Sequelize({
  dialect: "sqlite",  // Sequelize dialect ismi SQLite olarak değiştirildi
  storage: config.storage,  // SQLite dosya yolu
  logging: false,  // Logları kapattık
  retry: {
    max: 10, // 10 defa tekrar dene
    match: [/SQLITE_BUSY/], // SQLite meşgul hatası alındığında tekrar dene
  },
});

// SQLite bağlantısını retry mekanizması ile kontrol et
const connectWithRetry = async () => {
  let connected = false;
  while (!connected) {
    try {
      await sequelize.authenticate();
      console.log("✅ SQLite bağlantısı başarılı!");
      connected = true;
    } catch (error) {
      console.error("⏳ SQLite'e bağlanılamadı, tekrar deneniyor...", error.message);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 saniye bekle ve tekrar dene
    }
  }
};

connectWithRetry(); // Bağlantıyı kontrol et ve bekle

module.exports = sequelize;