// Impor dependencies dan modul router yang telah dibuat
import mongoose, { ConnectOptions } from 'mongoose';
import express from 'express';
import userRouter from './routes/userRouter';
import productRouter from './routes/productRouter';

// Buat instance aplikasi Express
const app = express();

// Konfigurasi parsing body request
app.use(express.json());

// Membuat koneksi ke database MongoDB
const dbUrl = 'mongodb://127.0.0.1:27017/';
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as ConnectOptions)
  .then(() => {
    console.log('Terhubung ke database MongoDB');
  })
  .catch((error) => {
    console.log('Kesalahan saat terhubung ke database:', error);
  });

// Terapkan router untuk entitas pengguna (User)
app.use('/users', userRouter);

// Terapkan router untuk entitas produk (Product)
app.use('/products', productRouter);

// Jalankan server
const port = 3000; // Ganti dengan port yang ingin Anda gunakan
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
