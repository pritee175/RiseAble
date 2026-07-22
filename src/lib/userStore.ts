export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  createdAt: Date;
}

// Shared in-memory user store used by all /api/auth routes.
// Resets on server restart — swap for a real database for persistence.
const users = new Map<string, StoredUser>();

users.set("demo@riseable.com", {
  id: "1",
  name: "Demo User",
  email: "demo@riseable.com",
  password: "demo123",
  bio: "Passionate learner exploring new skills",
  phone: "+91 98765 43210",
  location: "Mumbai, India",
  website: "https://example.com",
  createdAt: new Date(),
});

export default users;
