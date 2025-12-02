# Firebase Setup Instructions

This application has been migrated to use Firebase Firestore for data storage and Firebase Storage for image uploads.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

## Step 2: Enable Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Start in **test mode** (you can secure it later)
4. Choose a location for your database

## Step 3: Image Storage - Cloudinary (Not Firebase Storage)

**Note:** This application uses **Cloudinary** for image storage instead of Firebase Storage. Cloudinary offers a generous free tier (25GB storage, 25GB bandwidth/month).

**You do NOT need to enable Firebase Storage.** Instead, follow the Cloudinary setup instructions in `CLOUDINARY_SETUP.md`.

## Step 4: Get Your Firebase Configuration

1. In your Firebase project, go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (`</>`) to add a web app
4. Register your app with a nickname
5. Copy the Firebase configuration object

## Step 5: Update Firebase Configuration

1. Open `js/firebase-config.js`
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

## Step 6: Set Up Security Rules (Important!)

### Firestore Security Rules

Go to Firestore Database > Rules and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all collections
    match /{collection}/{document=**} {
      allow read: if true;
    }
    
    // Allow write access only to authenticated users (or adjust as needed)
    match /{collection}/{document=**} {
      allow write: if request.auth != null;
    }
    
    // For public write access (less secure, use only for testing):
    // match /{collection}/{document=**} {
    //   allow write: if true;
    // }
  }
}
```

### Image Storage - Cloudinary

**Note:** Image storage is handled by Cloudinary, not Firebase Storage. See `CLOUDINARY_SETUP.md` for Cloudinary security configuration.

## Step 7: Test Your Setup

1. Open `admin-login.html` in your browser
2. Login with username: `1` and password: `1`
3. Try creating a news item or event
4. Check your Firestore database to see if data is being saved
5. Check your Storage to see if images are being uploaded

## Data Collections

The following collections will be created automatically in Firestore:
- `news` - News items
- `activities` - Activity items
- `events` - Events with photos and videos
- `serviceTeam` - Service team members
- `clcTeam` - CLC team members
- `kcymTeam` - KCYM team members
- `choirTeam` - Choir team members
- `mathrusangamTeam` - Mathrusangam team members
- `fatherProfile` - Father profile (single document)
- `churchImages` - Church gallery images

## Image Storage

Images are stored in **Cloudinary** (not Firebase Storage) under the following folders:
- `news/` - News item images
- `activities/` - Activity images
- `events/` - Event photos
- `teams/service/` - Service team member images
- `teams/clc/` - CLC team member images
- `teams/kcym/` - KCYM team member images
- `teams/choir/` - Choir team member images
- `teams/mathrusangam/` - Mathrusangam team member images
- `church/` - Church gallery images
- `father/` - Father profile image

See `CLOUDINARY_SETUP.md` for setup instructions.

## Troubleshooting

### "Firebase is not defined" error
- Make sure Firebase SDK scripts are loaded before your custom scripts
- Check that `firebase-config.js` is loaded after Firebase SDK

### Images not uploading
- Check Cloudinary configuration in `js/cloudinary-config.js`
- Verify your Cloudinary upload preset is set to "Unsigned"
- Check browser console for errors
- See `CLOUDINARY_SETUP.md` for troubleshooting

### Data not saving
- Check Firestore rules
- Check browser console for errors
- Verify Firestore is enabled in your project

## Migration from localStorage

If you have existing data in localStorage, you can migrate it by:
1. Opening browser console on admin dashboard
2. Running migration scripts (to be created if needed)

## Notes

- All data is now stored in Firebase, not localStorage
- Images are stored in Firebase Storage, not as base64 in the database
- Deletions will remove data from Firebase and images from Storage
- Real-time updates are available for news items on the index page

