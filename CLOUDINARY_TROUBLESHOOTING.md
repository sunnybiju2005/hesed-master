# Cloudinary Upload Troubleshooting Guide

If images are not uploading to Cloudinary, follow these steps:

## Step 1: Check Browser Console

1. Open your admin dashboard
2. Press **F12** to open Developer Tools
3. Go to the **Console** tab
4. Try uploading an image
5. Look for any error messages (they'll be in red)

## Step 2: Verify Upload Preset Configuration

Your upload preset `stpaulschurch_unsigned` must be configured correctly:

1. Go to [Cloudinary Dashboard](https://console.cloudinary.com/)
2. Navigate to **Settings** → **Upload**
3. Scroll down to **Upload presets**
4. Find `stpaulschurch_unsigned`
5. Click to edit it
6. Verify these settings:
   - ✅ **Signing mode**: Must be **Unsigned**
   - ✅ **Folder**: Can be empty or set to a folder name
   - ✅ **Access mode**: Should be **Public**
   - ✅ **Use filename**: Can be enabled
   - ✅ **Unique filename**: Should be enabled

## Step 3: Common Error Messages and Solutions

### Error: "Upload preset not found"
**Solution:**
- Check that the preset name exactly matches: `stpaulschurch_unsigned`
- Ensure the preset is saved in Cloudinary dashboard
- Try creating a new preset with the same name

### Error: "Invalid API Key" or "Unauthorized"
**Solution:**
- This shouldn't happen with unsigned uploads
- Verify your cloud name is correct: `dwzajmb65`
- Check that the upload preset is set to "Unsigned"

### Error: "CORS" or "Network Error"
**Solution:**
- Cloudinary handles CORS automatically
- Check your browser's network tab to see the actual request
- Verify you're not blocking Cloudinary domains

### Error: "File too large"
**Solution:**
- Free tier has a 10MB limit per file
- Compress your images before uploading
- Or upgrade your Cloudinary plan

## Step 4: Test with the Test Page

1. Open `test-cloudinary.html` in your browser
2. Select an image
3. Click "Upload Image"
4. Check the console for detailed error messages
5. The page will show you exactly what went wrong

## Step 5: Manual Verification

Check if your Cloudinary account is active:

1. Go to [Cloudinary Dashboard](https://console.cloudinary.com/)
2. Check your account status
3. Verify you haven't exceeded free tier limits:
   - 25GB storage
   - 25GB bandwidth/month

## Step 6: Check Network Tab

1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Try uploading an image
4. Look for a request to `api.cloudinary.com`
5. Click on it to see:
   - Request details
   - Response status
   - Response body (error message if any)

## Step 7: Verify Configuration File

Check `js/cloudinary-config.js`:

```javascript
const cloudinaryConfig = {
    cloudName: "dwzajmb65",  // ✅ Should match your Cloudinary cloud name
    uploadPreset: "stpaulschurch_unsigned"  // ✅ Should match your preset name exactly
};
```

## Step 8: Common Issues

### Issue: Upload succeeds but image doesn't appear
- Check the Media Library in Cloudinary dashboard
- Images might be in a folder (check the folder dropdown)
- Refresh the Media Library page

### Issue: Upload fails silently
- Check browser console for errors
- Check Network tab for failed requests
- Verify upload preset is "Unsigned"

### Issue: "Configuration not loaded" error
- Ensure `cloudinary-config.js` is loaded before `cloudinary-service.js`
- Check script order in HTML file
- Verify the file paths are correct

## Step 9: Get Help

If none of the above works:

1. **Check Cloudinary Status**: [status.cloudinary.com](https://status.cloudinary.com/)
2. **Cloudinary Support**: [support.cloudinary.com](https://support.cloudinary.com/)
3. **Share Error Details**: 
   - Copy the exact error message from console
   - Take a screenshot of the Network tab
   - Share your Cloudinary preset configuration (without sensitive data)

## Quick Test

Run this in your browser console (on the admin dashboard page):

```javascript
// Test Cloudinary configuration
console.log('Cloud Name:', cloudinaryConfig.cloudName);
console.log('Upload Preset:', cloudinaryConfig.uploadPreset);
console.log('Upload URL:', cloudinaryUploadUrl);

// Test with a simple file
const testFile = new File(['test'], 'test.txt', {type: 'text/plain'});
uploadImageToCloudinary(testFile, 'test').then(url => {
    console.log('Success!', url);
}).catch(err => {
    console.error('Error:', err);
});
```

This will help identify if the issue is with:
- Configuration loading
- Upload preset
- Network/CORS
- File handling

