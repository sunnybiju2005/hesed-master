# Switching from Firestore to localStorage

Since you cannot use Firestore, we'll switch all data storage back to localStorage.

## What Will Change

- ✅ **Images**: Still stored in Cloudinary (no change)
- ✅ **Data**: Will use localStorage instead of Firestore
- ⚠️ **Limitation**: Data only stored in browser (won't sync across devices)

## What Needs to be Updated

All functions in `js/admin-dashboard.js` that currently call Firebase functions need to be switched back to localStorage.

## Status

This migration is in progress...

