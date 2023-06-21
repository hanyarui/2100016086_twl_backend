// Impor dependencies dan model User
import express, { Request, Response } from 'express';
import UserModel, { User } from '../models/User';

// Buat router instance
const router = express.Router();

// Rute untuk membuat pengguna (Create)
router.post('/', async (req: Request, res: Response) => {
    try {
        const { email, displayName, password, profile } = req.body;

        const newUser: User = new UserModel({
            email,
            displayName,
            password,
            profile
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat membuat pengguna baru.', error });
    }
});

// Rute untuk mendapatkan daftar pengguna (Read)
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil daftar pengguna.', error });
    }
});

// Rute untuk mendapatkan pengguna berdasarkan ID (Read by ID)
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil pengguna.', error });
    }
});

// Rute untuk memperbarui pengguna berdasarkan ID (Update)
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { email, displayName, password, profile } = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            { email, displayName, password, profile },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
        }

        res.json(updatedUser);
    } catch (error) {

        res.status
            (500).json({ message: 'Terjadi kesalahan saat memperbarui pengguna.', error });
    }
});

// Rute untuk menghapus pengguna berdasarkan ID (Delete)
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedUser = await UserModel.findByIdAndRemove(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
        }

        res.json({ message: 'Pengguna berhasil dihapus.' });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat menghapus pengguna.', error });
    }
});

export default router;
