import mongoose, { Schema, Document } from 'mongoose';

export interface IKamar extends Document {
  nomor_unit: string;
  harga_sewa: number;
  status_ketersediaan: boolean;
  managed_by: mongoose.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const KamarSchema = new Schema<IKamar>(
  {
    nomor_unit: {
      type: String,
      required: [true, 'Nomor unit wajib diisi'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    harga_sewa: {
      type: Number,
      required: [true, 'Harga sewa wajib diisi'],
      min: [0, 'Harga sewa tidak boleh negatif'],
    },
    status_ketersediaan: {
      type: Boolean,
      default: true,
      required: true,
    },
    managed_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Admin pengelola wajib diisi'],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

// Index
KamarSchema.index({ nomor_unit: 1 });
KamarSchema.index({ status_ketersediaan: 1 });
KamarSchema.index({ managed_by: 1 });

export default mongoose.models.Kamar || mongoose.model<IKamar>('Kamar', KamarSchema);