# 🔍 Error Diagnosis & Fix Guide - CyberProbes Website

## 🎯 Quick Diagnosis Steps

### 1️⃣ Check Browser Console
```bash
# Open Chrome DevTools
1. Right-click → Inspect
2. Go to Console tab
3. Look for red error messages
```

**Common Errors:**
- `Cannot read property 'title' of undefined` → Missing data/null check
- `Failed to fetch` → API connection issue
- `500 Internal Server Error` → Backend/database issue
- `401 Unauthorized` → Auth token expired

---

### 2️⃣ Check Network Tab
```bash
1. Open DevTools → Network tab
2. Refresh page
3. Click on failed requests (red status)
4. Check Response tab for error details
```

**Status Codes:**
- ✅ **200** = Success
- ⚠️ **400** = Bad Request (check request data)
- ⚠️ **401** = Unauthorized (login required)
- ⚠️ **403** = Forbidden (no permission)
- ❌ **404** = Not Found (wrong endpoint)
- ❌ **500** = Server Error (backend crash)

---

## 🔧 Common Issues & Fixes

### (A) API Connection Failed

**Symptoms:**
- "Network error" message
- Failed to fetch errors
- 500 status codes

**Diagnosis:**
```javascript
// Check API URL in browser console
console.log('API URL:', process.env.NEXT_PUBLIC_BASE_URL);
```

**Fix:**
1. Check `.env.local` file:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

2. Verify backend is running:
```bash
# Check if backend server is running
curl http://localhost:3000/api/debug
```

3. Check CORS settings if calling external API

---

### (B) Authentication Token Expired

**Symptoms:**
- Redirected to login page
- 401 Unauthorized errors
- Session expired messages

**Diagnosis:**
```javascript
// Check token in console
console.log('Token:', localStorage.getItem('authToken'));
```

**Fix:**
1. Clear storage and re-login:
```javascript
localStorage.clear();
sessionStorage.clear();
// Then login again
```

2. Check token expiration:
```javascript
// Token validation is now automatic via GlobalErrorHandler
// Expired tokens are cleared automatically
```

---

### (C) Database Connection Issue

**Symptoms:**
- 500 errors on data fetch
- "Database connection failed"
- Empty data responses

**Diagnosis:**
```bash
# Check database connection
npm run check-db
# Or visit: /api/debug
```

**Fix:**
1. Check `.env` database URL:
```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

2. Verify database is running:
```bash
# PostgreSQL
pg_isready

# MySQL
mysqladmin ping
```

3. Check connection pool limits

---

### (D) Frontend Runtime Error

**Symptoms:**
- White screen
- "Something went wrong!" page
- Component crashes

**Diagnosis:**
Check console for:
- `TypeError: Cannot read property...`
- `ReferenceError: X is not defined`
- Component render errors

**Fix:**
1. Add null checks:
```typescript
// Before
<h3>{course.title}</h3>

// After
<h3>{course?.title || 'No title'}</h3>
```

2. Use optional chaining:
```typescript
const data = response?.data?.courses || [];
```

3. Add error boundaries (already implemented)

---

### (E) Environment Variables Missing

**Symptoms:**
- Build succeeds but runtime errors
- "undefined" in API calls
- Missing configuration errors

**Diagnosis:**
```bash
# Check env variables
echo $NEXT_PUBLIC_BASE_URL
```

**Fix:**
1. Create `.env.local`:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
DATABASE_URL=your-database-url
```

2. Restart dev server after adding env vars:
```bash
npm run dev
```

---

## 🛠️ Error Handling System

### ✅ Implemented Features

1. **Global Error Handler** (`src/components/GlobalErrorHandler.tsx`)
   - Catches unhandled errors
   - Logs errors with context
   - Shows user-friendly messages

2. **API Error Handler** (`src/lib/errorHandler.ts`)
   - Centralized fetch wrapper
   - Automatic error parsing
   - Status code handling
   - Auth token management

3. **Error Boundary** (`src/app/error.tsx`)
   - Catches React component errors
   - Shows error UI
   - Reset functionality

4. **Middleware Error Handling** (`src/middleware.ts`)
   - Catches middleware errors
   - Prevents site crashes
   - Security headers

---

## 📊 Error Logging

### Development Mode
- All errors logged to console
- Stack traces visible
- Error details shown

### Production Mode
- Errors logged (ready for Sentry integration)
- User-friendly messages shown
- No sensitive data exposed

---

## 🔍 Debugging Checklist

| Area | Check | Expected |
|------|-------|----------|
| 🔌 **API URL** | `.env.local` file | Correct URL |
| 💾 **Database** | Connection string | Connected |
| 🔐 **Auth** | Token present | Valid token |
| ⚙️ **Frontend** | Console errors | No errors |
| 💸 **Payment** | Gateway config | Valid keys |
| 🧱 **Deployment** | Build paths | Correct paths |

---

## 🚨 Emergency Fixes

### Quick Fix #1: Clear Cache
```bash
# Clear browser cache
Ctrl+Shift+Delete (Windows)
Cmd+Shift+Delete (Mac)

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Quick Fix #2: Restart Everything
```bash
# Stop all processes
# Then restart:
npm run dev
```

### Quick Fix #3: Check Logs
```bash
# Check server logs
npm run dev
# Look for error messages in terminal
```

---

## 📞 Support

If errors persist:
1. Check browser console for specific errors
2. Check Network tab for failed requests
3. Check server logs
4. Review error messages carefully

**Error Handler automatically:**
- ✅ Logs all errors
- ✅ Shows user-friendly messages
- ✅ Handles network errors
- ✅ Manages auth tokens
- ✅ Prevents site crashes

---

## 🎯 Next Steps

1. **Monitor Errors**: Check console regularly
2. **Fix Root Causes**: Don't just hide errors
3. **Add Logging**: Integrate Sentry for production
4. **Test Thoroughly**: Test all error scenarios
5. **Document**: Keep error solutions documented

---

**Last Updated**: November 5, 2025  
**Version**: 1.0

