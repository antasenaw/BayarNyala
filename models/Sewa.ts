import mongoose, { Schema, Document } from 'mongoose';

export interface ISewa extends Document {
  penyewa_id: mongoose.Types.ObjectId;
  kamar_id: mongoose.Types.ObjectId;
  tanggal_mulai: Date;
  tanggal_selesai: Date;
  status: 'aktif' | 'selesai' | 'menunggu pembayaran';
  created_at: Date;
  updated_at: Date;
}

const SewaSchema = new Schema<ISewa>(
  {
    penyewa_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Penyewa ID wajib diisi'],
    },
    kamar_id: {
      type: Schema.Types.ObjectId,
      ref: 'Kamar',
      required: [true, 'Kamar ID wajib diisi'],
    },
    tanggal_mulai: {
      type: Date,
      required: [true, 'Tanggal mulai wajib diisi'],
    },
    tanggal_selesai: {
      type: Date,
      required: [true, 'Tanggal selesai wajib diisi'],
    },
    status: {
      type: String,
      enum: {
        values: ['aktif', 'selesai', 'menunggu pembayaran'],
        message: 'Status harus aktif, selesai, atau menunggu pembayaran',
      },
      default: 'menunggu pembayaran',
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
SewaSchema.index({ penyewa_id: 1 });
SewaSchema.index({ kamar_id: 1 });
SewaSchema.index({ status: 1 });
SewaSchema.index({ tanggal_mulai: 1, tanggal_selesai: 1 });

// Validasi: tanggal_selesai harus setelah tanggal_mulai
SewaSchema.pre('save', function () {
  if (this.tanggal_selesai <= this.tanggal_mulai) {
    throw new Error('Tanggal selesai harus setelah tanggal mulai');
  }
});

export default mongoose.models.Sewa || mongoose.model<ISewa>('Sewa', SewaSchema);