# Cloudinary Setup Instructions

This application uses Cloudinary for image storage instead of Firebase Storage. Cloudinary offers a generous free tier with 25GB storage and 25GB bandwidth per month.

## Step 1: Create a Cloudinary Account

1. Go to [Cloudinary.com](https://cloudinary.com/)
2. Click "Sign Up for Free"
3. Complete the registration process
4. Verify your email address

## Step 2: Get Your Cloudinary Credentials

1. After logging in, you'll see your **Dashboard**
2. Note down your **Cloud Name** (visible at the top of the dashboard)
3. Go to **Settings** → **Security** (or click on your account name → Settings)
4. Find your **API Key** and **API Secret**
5. Copy these values (you'll need them in the next step)

## Step 3: Create an Upload Preset

1. In your Cloudinary dashboard, go to **Settings** → **Upload**
2. Scroll down to **Upload presets**
3. Click **Add upload preset** (or edit existing `stpaulschurch_unsigned`)
4. **IMPORTANT**: Look for **"Signing mode"** or **"Signing"** section at the top of the preset settings
   - This is usually in the main preset configuration area or in a **"Security"** tab
   - Set it to **Unsigned** (this is CRITICAL for client-side uploads)
5. Configure other settings:
   - **Preset name**: `stpaulschurch_unsigned`
   - **Asset folder**: `stpaulschurch` (you already have this set)
   - **Generated public ID**: "Auto-generate an unguessable public ID value" (your current setting is fine)
   - **Generated display name**: "Use the filename" (your current setting is fine)
   - **Access mode**: Should be **Public** (check in Security or Settings tab)
6. **Scroll through all tabs** to find "Signing mode":
   - Check **"Settings"** tab
   - Check **"Security"** tab  
   - Check **"Upload"** tab
   - It might be at the very top of the preset configuration
7. Once you find and set **Signing mode** to **Unsigned**, click **Save**

## Step 4: Update Cloudinary Configuration

1. Open `js/cloudinary-config.js`
2. Replace the placeholder values with your actual credentials:

```javascript
const cloudinaryConfig = {
    cloudName: "your-cloud-name",        // From dashboard
    apiKey: "your-api-key",              // From Settings → Security
    apiSecret: "your-api-secret",        // From Settings → Security (not needed for unsigned uploads)
    uploadPreset: "your-upload-preset"   // The preset name you created
};
```

**Example (Your Configuration):**
```javascript
const cloudinaryConfig = {
    cloudName: "dwzajmb65",
    apiKey: "YOUR_API_KEY",  // Get from Cloudinary Dashboard → Settings → Security
    apiSecret: "YOUR_API_SECRET",  // Get from Cloudinary Dashboard → Settings → Security
    uploadPreset: "stpaulschurch_unsigned"
};
```

**Note:** For unsigned uploads (which is what we're using), you only need:
- ✅ Cloud Name: `dwzajmb65` (already set)
- ✅ Upload Preset: `stpaulschurch_unsigned` (already set)
- ⚠️ API Key: Still needed (get from dashboard)
- ⚠️ API Secret: Optional for unsigned uploads, but recommended to have

## Step 5: Test Your Setup

1. Open `admin-login.html` in your browser
2. Login with username: `1` and password: `1`
3. Go to "News & Activities" section
4. Try creating a news item with an image
5. Check your Cloudinary Media Library to see if the image was uploaded

## Image Organization

Images are automatically organized in Cloudinary by folder:
- `news/` - News item images
- `activities/` - Activity images
- `events/` - Event photos
- `teams/` - Team member profile images
  - `teams/service/` - Service team
  - `teams/clc/` - CLC team
  - `teams/kcym/` - KCYM team
  - `teams/choir/` - Choir team
  - `teams/mathrusangam/` - Mathrusangam team
- `church/` - Church gallery images
- `father/` - Father profile image

## Image Transformations

Cloudinary automatically applies optimizations:
- **Auto format**: Serves WebP when supported, falls back to original
- **Auto quality**: Optimizes quality based on image content
- **Auto width/height**: Responsive sizing

You can customize transformations in `js/cloudinary-service.js` if needed.

## Free Tier Limits

Cloudinary Free Tier includes:
- ✅ 25GB storage
- ✅ 25GB bandwidth/month
- ✅ 25GB monthly net viewing bandwidth
- ✅ Unlimited transformations
- ✅ Image optimization
- ✅ CDN delivery

This is typically more than enough for a church website.

## Image Deletion

**Important Note:** Image deletion from Cloudinary requires server-side implementation because it needs your API Secret for security.

Currently, when you delete items in the admin dashboard:
- The data is removed from Firestore ✅
- The image URL reference is removed ✅
- The actual image in Cloudinary remains (for now) ⚠️

### To Enable Image Deletion:

**Option 1: Manual Cleanup**
- Periodically check your Cloudinary Media Library
- Delete unused images manually

**Option 2: Server-Side Deletion (Recommended)**
- Create a server endpoint (Node.js, PHP, etc.)
- Use Cloudinary Admin API to delete images
- Call this endpoint when deleting items

**Option 3: Cloudinary Auto-Cleanup**
- Set up Cloudinary's auto-cleanup feature
- Configure rules to delete old/unused images

## Troubleshooting

### "Upload preset not found" error
- Check that your upload preset name matches exactly
- Ensure the preset is set to "Unsigned"
- Verify the preset is saved in Cloudinary dashboard

### Images not uploading
- Check browser console for errors
- Verify your Cloud Name and Upload Preset are correct
- Ensure your upload preset allows unsigned uploads
- Check Cloudinary dashboard for upload errors

### Images not displaying
- Check that images are uploaded to Cloudinary Media Library
- Verify the image URLs in Firestore
- Check browser console for CORS or loading errors

### CORS errors
- Cloudinary handles CORS automatically
- If you see CORS errors, check your Cloudinary settings
- Ensure "Access mode" is set to "Public" in your upload preset

## Security Best Practices

1. **Use Unsigned Upload Presets**: This is what we're using - safe for client-side uploads
2. **Set Folder Structure**: Organize images in folders for better management
3. **Limit Upload Sizes**: Consider adding size limits in your upload preset
4. **Use Transformations**: Cloudinary automatically optimizes images
5. **Monitor Usage**: Check your Cloudinary dashboard regularly for usage

## Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Upload Presets Guide](https://cloudinary.com/documentation/upload_presets)
- [Image Transformations](https://cloudinary.com/documentation/image_transformations)
- [Cloudinary Console](https://console.cloudinary.com/)

