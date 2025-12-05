import mongoose, { Schema, Document } from 'mongoose';

export interface IRiwayatPembayaran extends Document {
  tagihan_id: mongoose.Types.ObjectId;
  payer_id: mongoose.Types.ObjectId;
  jumlah_bayar: number;
  metode_pembayaran: 'Cash' | 'Transfer';
  status_verifikasi: boolean;
  verified_by?: mongoose.Types.ObjectId;
  verified_at?: Date;
  bukti_transfer_path?: string;
  created_at: Date;
  updated_at: Date;
}

const RiwayatPembayaranSchema = new Schema<IRiwayatPembayaran>(
  {
    tagihan_id: {
      type: Schema.Types.ObjectId,
      ref: 'Tagihan',
      required: [true, 'Tagihan ID wajib diisi'],
    },
    payer_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Payer ID wajib diisi'],
    },
    jumlah_bayar: {
      type: Number,
      required: [true, 'Jumlah bayar wajib diisi'],
      min: [0, 'Jumlah bayar tidak boleh negatif'],
    },
    metode_pembayaran: {
      type: String,
      enum: {
        values: ['Cash', 'Transfer'],
        message: 'Metode pembayaran harus Cash atau Transfer',
      },
      required: [true, 'Metode pembayaran wajib diisi'],
    },
    status_verifikasi: {
      type: Boolean,
      default: false,
    },
    verified_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    verified_at: {
      type: Date,
      required: false,
    },
    bukti_transfer_path: {
      type: String,
      required: false,
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
RiwayatPembayaranSchema.index({ tagihan_id: 1 });
RiwayatPembayaranSchema.index({ payer_id: 1 });
RiwayatPembayaranSchema.index({ status_verifikasi: 1 });
RiwayatPembayaranSchema.index({ tanggal_bayar: 1 });

// Validasi: bukti_transfer_path wajib jika metode Transfer
RiwayatPembayaranSchema.pre('save', function () {
  if (this.metode_pembayaran === 'Transfer' && !this.bukti_transfer_path) {
    throw new Error('Bukti transfer wajib diisi untuk metode Transfer');
  }
});

export default mongoose.models.RiwayatPembayaran || 
  mongoose.model<IRiwayatPembayaran>('RiwayatPembayaran', RiwayatPembayaranSchema);