# API Reference - Accessibility Settings

## Base URL
```
http://localhost:3000/api
```

---

## Endpoints

### GET /accessibility
Retrieve accessibility settings for the current user.

**Headers:**
```
GET /api/accessibility
x-user-id: {userId}
Content-Type: application/json
```

**Response (200 OK):**
```json
{
  "id": "abc123",
  "userId": "user-id-123",
  "voiceNavigation": false,
  "screenReader": true,
  "highContrast": false,
  "largeText": true,
  "keyboardNav": false,
  "createdAt": "2024-02-10T10:00:00.000Z",
  "updatedAt": "2024-02-10T10:00:00.000Z"
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized: No user ID provided"
}
```

**Response (500 Internal Error):**
```json
{
  "error": "Internal server error"
}
```

---

### PUT /accessibility
Update accessibility settings for the current user.

**Headers:**
```
PUT /api/accessibility
x-user-id: {userId}
Content-Type: application/json
```

**Request Body:**
```json
{
  "voiceNavigation": boolean,
  "screenReader": boolean,
  "highContrast": boolean,
  "largeText": boolean,
  "keyboardNav": boolean,
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:3000/api/accessibility \
  -H "x-user-id: user-id-123" \
  -H "Content-Type: application/json" \
  -d '{
    "voiceNavigation": true,
    "screenReader": false,
    "highContrast": true,
    "largeText": false,
    "keyboardNav": true
  }'
```

**Response (200 OK):**
```json
{
  "id": "abc123",
  "userId": "user-id-123",
  "voiceNavigation": true,
  "screenReader": false,
  "highContrast": true,
  "largeText": false,
  "keyboardNav": true,
  "createdAt": "2024-02-10T10:00:00.000Z",
  "updatedAt": "2024-02-10T10:30:00.000Z"
}
```

**Response (400 Bad Request - Validation Error):**
```json
{
  "error": "Validation error",
  "details": [
    {
      "code": "invalid_type",
      "expected": "boolean",
      "received": "string",
      "path": ["voiceNavigation"],
      "message": "Expected boolean, received string"
    }
  ]
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized: No user ID provided"
}
```

**Response (500 Internal Error):**
```json
{
  "error": "Internal server error"
}
```

---

## Request/Response Models

### AccessibilitySettings Object
```typescript
{
  id: string                    // Unique identifier (CUID)
  userId: string               // Foreign key to User
  voiceNavigation: boolean     // Enable voice navigation
  screenReader: boolean        // Enable screen reader mode
  highContrast: boolean        // Enable high contrast colors
  largeText: boolean          // Enable larger font sizes
  keyboardNav: boolean        // Enable keyboard navigation indicators
  createdAt: ISO8601DateTime  // When settings were created
  updatedAt: ISO8601DateTime  // Last update timestamp
}
```

### Error Response
```typescript
{
  error: string                  // Error message
  details?: ValidationError[]    // Details for validation errors
}

ValidationError {
  code: string                   // Error code (e.g., "invalid_type")
  expected: string              // Expected type
  received: string              // Received type
  path: string[]               // Path to invalid field
  message: string              // Human-readable message
}
```

---

## Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Request successful |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing x-user-id header |
| 500 | Server Error | Database or server error |

---

## Authentication

### Current Implementation (Development)
Uses `x-user-id` header for user identification:
```
x-user-id: user-id-123
```

### Production Authentication
Should be replaced with:
- NextAuth.js with JWT
- OAuth providers
- Session cookies

---

## Rate Limiting

Currently **NOT IMPLEMENTED**. For production, add:
- 100 requests per minute per user
- 1000 requests per hour per IP
- Use middleware or external service (Upstash, Redis)

---

## Examples

### JavaScript/TypeScript

```typescript
// Using fetch API
const userId = 'user-123'

// Get settings
const getSettings = async () => {
  const response = await fetch('/api/accessibility', {
    method: 'GET',
    headers: {
      'x-user-id': userId,
    },
  })
  const data = await response.json()
  return data
}

// Update settings
const updateSettings = async (settings) => {
  const response = await fetch('/api/accessibility', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify(settings),
  })
  const data = await response.json()
  return data
}
```

### React Hook (Recommended)

```typescript
import { useAccessibility } from '@/hooks/use-accessibility'

export function MyComponent() {
  const { settings, updateSetting, isLoading, error } = useAccessibility()
  
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      <label>
        <input
          type="checkbox"
          checked={settings.highContrast}
          onChange={(e) => updateSetting('highContrast', e.target.checked)}
        />
        High Contrast
      </label>
    </>
  )
}
```

### cURL

```bash
# Get settings
curl -X GET http://localhost:3000/api/accessibility \
  -H "x-user-id: user-123"

# Update settings
curl -X PUT http://localhost:3000/api/accessibility \
  -H "x-user-id: user-123" \
  -H "Content-Type: application/json" \
  -d '{
    "voiceNavigation": true,
    "screenReader": true,
    "highContrast": false,
    "largeText": true,
    "keyboardNav": false
  }'
```

### Python

```python
import requests

BASE_URL = 'http://localhost:3000/api'
USER_ID = 'user-123'

headers = {'x-user-id': USER_ID}

# Get settings
response = requests.get(f'{BASE_URL}/accessibility', headers=headers)
settings = response.json()

# Update settings
new_settings = {
    'voiceNavigation': True,
    'screenReader': False,
    'highContrast': True,
    'largeText': False,
    'keyboardNav': True,
}
response = requests.put(
    f'{BASE_URL}/accessibility',
    headers={**headers, 'Content-Type': 'application/json'},
    json=new_settings
)
updated = response.json()
```

---

## Error Handling

### Common Errors

**Missing User ID:**
```json
{
  "error": "Unauthorized: No user ID provided",
  "status": 401
}
```
**Fix**: Add `x-user-id` header to request

**Invalid JSON:**
```json
{
  "error": "Unexpected end of JSON input",
  "status": 400
}
```
**Fix**: Ensure request body is valid JSON

**Wrong Data Types:**
```json
{
  "error": "Validation error",
  "details": [
    {
      "code": "invalid_type",
      "expected": "boolean",
      "received": "string",
      "path": ["voiceNavigation"]
    }
  ],
  "status": 400
}
```
**Fix**: Use correct data types (boolean, not string)

**Database Error:**
```json
{
  "error": "Internal server error",
  "status": 500
}
```
**Fix**: Check server logs, verify database connection

---

## Best Practices

1. **Always include `x-user-id` header** in requests
2. **Validate input** before sending to API
3. **Handle errors gracefully** in UI
4. **Don't expose errors** to users in production
5. **Use the React hook** instead of calling API directly
6. **Cache settings** to reduce API calls
7. **Debounce updates** if making rapid changes

---

## Versioning

Current API Version: **v1**

Future versions will be at:
- `/api/v2/accessibility`
- `/api/v3/accessibility`

---

**Last Updated**: February 10, 2026
