import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// GET - Get user by ID
export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const params = await props.params;
    const user = await User.findById(params.id).select('-password_hash');

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// PUT - Update user
export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const params = await props.params;
    const body = await request.json();
    const { nama, email, password, role } = body;

    // Build update data
    const updateData: Record<string, unknown> = {};
    if (nama !== undefined) updateData.nama = nama;
    if (email !== undefined) updateData.email = email;
    if (role !== undefined) updateData.role = role;

    // Hash password jika ada
    if (password !== undefined) {
      updateData.password_hash = await bcrypt.hash(password, 10);
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password_hash');

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
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

// DELETE - Delete user
export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const params = await props.params;
    const user = await User.findByIdAndDelete(params.id);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
      data: {
        _id: user._id,
        nama: user.nama,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
