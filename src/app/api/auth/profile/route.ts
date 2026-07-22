import { NextRequest, NextResponse } from 'next/server';
import users from '@/lib/userStore';

// GET - Fetch user profile
export async function GET(request: NextRequest) {
  try {
    const email = request.headers.get('x-user-email');

    if (!email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = users.get(email.toLowerCase());

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const email = request.headers.get('x-user-email');

    if (!email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = users.get(email.toLowerCase());

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name, bio, phone, location, website } = body;

    // Update user data
    const updatedUser = {
      ...user,
      name: name || user.name,
      bio: bio !== undefined ? bio : user.bio,
      phone: phone !== undefined ? phone : user.phone,
      location: location !== undefined ? location : user.location,
      website: website !== undefined ? website : user.website,
    };

    users.set(email.toLowerCase(), updatedUser);

    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
