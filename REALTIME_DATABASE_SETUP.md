# Firebase Realtime Database Setup

## ✅ Migration Complete!

All data storage has been switched from Firestore to **Firebase Realtime Database** (free tier).

## What Changed

1. **Database**: Now using Realtime Database instead of Firestore
2. **Images**: Still using Cloudinary (no change)
3. **SDK**: Updated to use `firebase-database-compat.js` instead of `firebase-firestore-compat.js`

## Setup Steps

### Step 1: Enable Realtime Database in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **stpaulschurch-ea5cf**
3. Go to **Realtime Database** (not Firestore)
4. Click **Create Database**
5. Choose a location (e.g., `us-central1`)
6. Start in **test mode** (for now)

### Step 2: Update Security Rules

Go to **Realtime Database** → **Rules** tab and set:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**Note**: This allows all reads and writes. For production, you can restrict this later.

### Step 3: Get Database URL

1. In Realtime Database, you'll see a URL like:
   `https://stpaulschurch-ea5cf-default-rtdb.firebaseio.com/`
2. This is already set in `js/firebase-config.js` as `databaseURL`

## How It Works

### Data Structure

Data is stored in Realtime Database like this:

```
/
├── news/
│   ├── -Nxxxxx1/
│   │   ├── title: "..."
│   │   ├── text: "..."
│   │   ├── image: "..."
│   │   └── createdAt: 1234567890
│   └── -Nxxxxx2/...
├── activities/
├── events/
├── serviceTeam/
├── clcTeam/
├── kcymTeam/
├── choirTeam/
├── mathrusangamTeam/
├── fatherProfile/
│   └── current/
└── churchImages/
```

### Free Tier Limits

- **Storage**: 1 GB
- **Bandwidth**: 10 GB/month
- **Simultaneous connections**: 100

For a church website, this is more than enough!

## What's Working

✅ All CRUD operations (Create, Read, Update, Delete)  
✅ News items  
✅ Activities  
✅ Events  
✅ All team members (Service, CLC, KCYM, Choir, Mathrusangam)  
✅ Father profile  
✅ Church images  
✅ Image uploads to Cloudinary  
✅ Image deletion from Cloudinary  

## Testing

1. Open `admin-login.html`
2. Login with username: `1` and password: `1`
3. Try creating a news item or team member
4. Check Firebase Console → Realtime Database to see the data
5. Check Cloudinary Media Library to see uploaded images

## Troubleshooting

### "Permission denied" error
- Check Realtime Database security rules (should allow read/write for testing)

### Data not appearing
- Check browser console for errors
- Verify Realtime Database is enabled in Firebase Console
- Check that `databaseURL` is correct in `js/firebase-config.js`

### Images not uploading
- Cloudinary is separate - check Cloudinary configuration
- See `CLOUDINARY_SETUP.md` for Cloudinary troubleshooting

## Summary

- ✅ **Database**: Firebase Realtime Database (free tier)
- ✅ **Images**: Cloudinary (free tier)
- ✅ **No Firestore**: Completely removed
- ✅ **No localStorage**: All data in cloud

Everything is set up and ready to use!

