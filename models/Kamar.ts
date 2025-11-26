import mongoose, { Schema, Document } from 'mongoose';

export interface IKamar extends Document {
  nomor_unit: string;
  harga_sewa: number;
  status_ketersediaan: boolean;
  managed_by: mongoose.Types.ObjectId;
  detail_kamar?: {
    luas?: number;
    fasilitas?: string[];
    lantai?: number;
    tipe?: 'Standard' | 'Deluxe' | 'Premium';
    kapasitas?: number;
    foto?: string[];
    deskripsi?: string;
  };
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
    detail_kamar: {
      luas: {
        type: Number,
        min: [0, 'Luas tidak boleh negatif'],
      },
      fasilitas: {
        type: [String],
        default: [],
      },
      lantai: {
        type: Number,
        min: [0, 'Lantai tidak boleh negatif'],
      },
      tipe: {
        type: String,
        enum: {
          values: ['Standard', 'Deluxe', 'Premium'],
          message: 'Tipe harus Standard, Deluxe, atau Premium',
        },
      },
      kapasitas: {
        type: Number,
        min: [1, 'Kapasitas minimal 1 orang'],
        max: [10, 'Kapasitas maksimal 10 orang'],
      },
      foto: {
        type: [String],
        default: [],
      },
      deskripsi: {
        type: String,
        trim: true,
        maxlength: [500, 'Deskripsi maksimal 500 karakter'],
      },
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