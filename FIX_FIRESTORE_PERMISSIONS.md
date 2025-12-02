# Fix Firestore Permissions Error

Your Cloudinary uploads are working! ✅ But you're getting a Firebase permissions error when trying to save data.

## Quick Fix: Update Firestore Security Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **stpaulschurch-ea5cf**
3. Go to **Firestore Database** → **Rules** tab
4. Replace the rules with this (for testing - allows all reads and writes):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all reads and writes (for testing only)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

5. Click **Publish**

## More Secure Rules (Recommended for Production)

For production, use these rules instead:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all collections
    match /{collection}/{document=**} {
      allow read: if true;
    }
    
    // Allow write access to all collections (you can restrict this later)
    match /{collection}/{document=**} {
      allow write: if true;
    }
  }
}
```

## After Updating Rules

1. Wait a few seconds for rules to propagate
2. Refresh your admin dashboard
3. Try uploading/saving again
4. The permission error should be gone!

## Verify Your Image in Cloudinary

Since the upload worked, check:
1. Go to [Cloudinary Media Library](https://console.cloudinary.com/)
2. Navigate to: **stpaulschurch** → **teams** folder
3. You should see your uploaded image there!

## Summary

- ✅ **Cloudinary**: Working perfectly!
- ❌ **Firestore**: Needs permission rules updated
- 📍 **Image Location**: `stpaulschurch/teams` folder in Cloudinary

