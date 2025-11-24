import mongoose, { Schema, Document } from 'mongoose';

export interface IPenyewaDetails extends Document {
  user_id: mongoose.Types.ObjectId;
  nomor_hp: string;
  alamat: string;
}

const PenyewaDetailsSchema = new Schema<IPenyewaDetails>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID wajib diisi'],
      unique: true,
    },
    nomor_hp: {
      type: String,
      required: [true, 'Nomor HP wajib diisi'],
      trim: true,
      match: [/^(\+62|62|0)[0-9]{9,12}$/, 'Format nomor HP tidak valid'],
    },
    alamat: {
      type: String,
      required: [true, 'Alamat wajib diisi'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index
PenyewaDetailsSchema.index({ user_id: 1 });

export default mongoose.models.PenyewaDetails || 
  mongoose.model<IPenyewaDetails>('PenyewaDetails', PenyewaDetailsSchema);