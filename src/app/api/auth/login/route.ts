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
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = users.get(email.toLowerCase());

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check password
    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
