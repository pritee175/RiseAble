import { NextRequest, NextResponse } from 'next/server';

// In-memory user storage (replace with database in production)
const users = new Map<string, {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}>();

// Demo user
users.set('demo@riseable.com', {
  id: '1',
  name: 'Demo User',
  email: 'demo@riseable.com',
  password: 'demo123',
  createdAt: new Date(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (users.has(email.toLowerCase())) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      password, // In production, hash this password
      createdAt: new Date(),
    };

    users.set(email.toLowerCase(), newUser);

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: 'Account created successfully',
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
