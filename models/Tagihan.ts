import mongoose, { Schema, Document } from 'mongoose';

export interface ITagihan extends Document {
  kamar_id: mongoose.Types.ObjectId;
  penyewa_id: mongoose.Types.ObjectId;
  bulan_tahun: Date;
  jumlah_tagihan: number;
  tenggat_bayar: Date;
  status_pembayaran: 'Belum Lunas' | 'Lunas';
  created_at: Date;
  updated_at: Date;
}

const TagihanSchema = new Schema<ITagihan>(
  {
    kamar_id: {
      type: Schema.Types.ObjectId,
      ref: 'Kamar',
      required: [true, 'Kamar ID wajib diisi'],
    },
    penyewa_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Penyewa ID wajib diisi'],
    },
    bulan_tahun: {
      type: Date,
      required: [true, 'Periode tagihan wajib diisi'],
    },
    jumlah_tagihan: {
      type: Number,
      required: [true, 'Jumlah tagihan wajib diisi'],
      min: [0, 'Jumlah tagihan tidak boleh negatif'],
    },
    tenggat_bayar: {
      type: Date,
      required: [true, 'Tenggat bayar wajib diisi'],
    },
    status_pembayaran: {
      type: String,
      enum: {
        values: ['Belum Lunas', 'Lunas'],
        message: 'Status harus Belum Lunas atau Lunas',
      },
      default: 'Belum Lunas',
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
TagihanSchema.index({ kamar_id: 1 });
TagihanSchema.index({ penyewa_id: 1 });
TagihanSchema.index({ status_pembayaran: 1 });
TagihanSchema.index({ bulan_tahun: 1 });
TagihanSchema.index({ tenggat_bayar: 1 });

// Compound index untuk mencegah duplikasi tagihan per kamar per bulan
TagihanSchema.index({ kamar_id: 1, bulan_tahun: 1 }, { unique: true });

export default mongoose.models.Tagihan || mongoose.model<ITagihan>('Tagihan', TagihanSchema);