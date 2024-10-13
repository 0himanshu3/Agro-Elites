import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    category: { type: String, enum: ["Farmer", "Distributor"], required: true },
});

export default mongoose.models.User || mongoose.model('User', UserSchema, 'login-credentials');
