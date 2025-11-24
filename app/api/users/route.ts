import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// GET - Get all users
export async function GET() {
  try {
    await connectDB();

    const users = await User.find().select('-password_hash');

    return NextResponse.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// POST - Create new user
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { nama, email, password, role } = body;

    // Validasi input
    if (!nama || !email || !password || !role) {
      return NextResponse.json(
        { success: false, error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      nama,
      email,
      password_hash,
      role,
    });

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password_hash;

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: userResponse,
    }, { status: 201 });
  } catch (error) {
    // Handle duplicate email error
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Email sudah terdaftar' },
        { status: 400 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}