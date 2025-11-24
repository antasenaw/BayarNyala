import mongoose, { Schema, Document } from 'mongoose';

export interface IPerangkatIot extends Document {
  device_name: string;
  kamar_id: mongoose.Types.ObjectId;
  status_listrik: boolean;
  last_seen: Date;
  created_at: Date;
  updated_at: Date;
}

const PerangkatIotSchema = new Schema<IPerangkatIot>(
  {
    device_name: {
      type: String,
      required: [true, 'Nama device wajib diisi'],
      trim: true,
    },
    kamar_id: {
      type: Schema.Types.ObjectId,
      ref: 'Kamar',
      required: [true, 'Kamar ID wajib diisi'],
    },
    status_listrik: {
      type: Boolean,
      default: false,
      required: true,
    },
    last_seen: {
      type: Date,
      default: Date.now,
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
PerangkatIotSchema.index({ kamar_id: 1 });
PerangkatIotSchema.index({ status_listrik: 1 });
PerangkatIotSchema.index({ last_seen: 1 });

export default mongoose.models.PerangkatIot || 
  mongoose.model<IPerangkatIot>('PerangkatIot', PerangkatIotSchema);