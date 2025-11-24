import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

// Import models to register them (required for mongoose.models)
import '@/models/User';
import '@/models/Kamar';
import '@/models/PenyewaDetails';
import '@/models/Sewa';
import '@/models/Tagihan';
import '@/models/RiwayatPembayaran';
import '@/models/PerangkatIot';

export async function GET() {
  try {
    await connectDB();

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((c) => c.name);

    return NextResponse.json({
      success: true,
      message: 'Database connected successfully!',
      database: db.databaseName,
      collections: collectionNames,
      models: Object.keys(mongoose.models),
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}