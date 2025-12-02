# Debug Cloudinary Upload Issue

Your preset is correctly configured as **Unsigned**. Let's debug why uploads aren't working.

## Step 1: Open Browser Console

1. Open your admin dashboard
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Clear the console (click the 🚫 icon)

## Step 2: Try Uploading an Image

1. Go to News & Activities section
2. Fill in title and text
3. Select an image
4. Click "Save News"

## Step 3: Check Console Output

You should see logs like:
```
=== CLOUDINARY UPLOAD START ===
Configuration: {cloudName: "dwzajmb65", uploadPreset: "stpaulschurch_unsigned", ...}
File Details: {fileName: "...", fileSize: "...", fileType: "..."}
Folder: news
Uploading to Cloudinary: ...
Cloudinary response status: 200
Cloudinary upload successful! {url: "https://res.cloudinary.com/...", ...}
```

## Step 4: Check for Errors

Look for any **red error messages**. Common errors:

### Error: "Cloudinary configuration not loaded"
**Fix:** Check that `cloudinary-config.js` is loaded before `cloudinary-service.js`

### Error: "Upload preset not found"
**Fix:** 
- Verify preset name is exactly: `stpaulschurch_unsigned`
- Check Cloudinary dashboard that the preset exists

### Error: "400 Bad Request" or "Invalid upload preset"
**Fix:**
- The preset might not be saved properly
- Try clicking on the preset in Cloudinary and clicking "Save" again

### Error: "Network Error" or "CORS"
**Fix:**
- Check your internet connection
- Try a different browser
- Check if any browser extensions are blocking requests

## Step 5: Check Network Tab

1. In Developer Tools, go to **Network** tab
2. Try uploading again
3. Look for a request to `api.cloudinary.com`
4. Click on it to see:
   - **Status**: Should be 200 (success) or show error code
   - **Response**: Should show JSON with image URL or error message

## Step 6: Test with Test Page

1. Open `test-cloudinary.html` in your browser
2. Select an image
3. Click "Upload Image"
4. Check what error message appears (if any)

## Step 7: Verify in Cloudinary

After attempting upload:

1. Go to Cloudinary Dashboard
2. Click **Media Library**
3. Check if images appear in:
   - `stpaulschurch` folder (if no subfolder specified)
   - `stpaulschurch/news` folder (if "news" folder was specified)
4. Try refreshing the page

## Common Issues & Solutions

### Issue: Upload succeeds but image doesn't appear
- **Solution**: Check the correct folder in Media Library
- Images might be in `stpaulschurch/news` instead of root

### Issue: "Configuration not loaded" error
- **Solution**: Check script order in HTML:
  1. `cloudinary-config.js` (first)
  2. `cloudinary-service.js` (second)
  3. `firebase-service.js` (third)

### Issue: Silent failure (no errors, no upload)
- **Solution**: 
  - Check Network tab for failed requests
  - Check if JavaScript errors are preventing execution
  - Verify all scripts are loading (check Network tab for 404 errors)

## Quick Diagnostic Code

Paste this in browser console (on admin dashboard page) to test:

```javascript
// Test 1: Check if config is loaded
console.log('Config loaded?', typeof cloudinaryConfig !== 'undefined');
if (typeof cloudinaryConfig !== 'undefined') {
    console.log('Cloud Name:', cloudinaryConfig.cloudName);
    console.log('Upload Preset:', cloudinaryConfig.uploadPreset);
    console.log('Upload URL:', cloudinaryUploadUrl);
}

// Test 2: Check if upload function exists
console.log('Upload function exists?', typeof uploadImageToCloudinary !== 'undefined');

// Test 3: Try a simple upload (if you have a file input)
// This will help identify the exact error
```

## What to Share for Help

If still not working, share:
1. **Console error messages** (copy/paste)
2. **Network tab response** (screenshot or copy response)
3. **Browser name and version**
4. **Any JavaScript errors** from console

