# How to Find "Signing Mode" in Cloudinary Upload Preset

If you can't see the "Signing mode" option in your upload preset, here's where to find it:

## Method 1: Check the Top of the Preset Settings

1. When editing your upload preset (`stpaulschurch_unsigned`)
2. Look at the **very top** of the configuration page
3. There should be a section called **"Signing"** or **"Signing mode"**
4. It might look like a dropdown or toggle
5. Set it to **"Unsigned"**

## Method 2: Check Different Tabs

The preset configuration might have multiple tabs. Check these:

### Tab 1: "Settings" or "General"
- Look for "Signing mode" here
- Should be near the top

### Tab 2: "Security" 
- This is where signing mode is often located
- Look for "Signing mode" or "Signing"
- Set to "Unsigned"

### Tab 3: "Upload"
- Check this tab as well
- Signing mode might be here

### Tab 4: "Transformations"
- Usually not here, but check if other tabs don't have it

## Method 3: Create a New Preset

If you can't find it in the existing preset:

1. Go to **Settings** → **Upload** → **Upload presets**
2. Click **"Add upload preset"**
3. When creating a new preset, the **"Signing mode"** option should appear
4. Set it to **"Unsigned"** before saving
5. Name it `stpaulschurch_unsigned`
6. Configure other settings as needed
7. **Save** the preset

## Method 4: Check Preset Type

Some Cloudinary accounts have different preset types:

1. Look for a dropdown or selector that says:
   - "Preset type" or
   - "Upload preset type"
2. Make sure it's set to allow unsigned uploads
3. This might enable the "Signing mode" option

## Visual Guide

The "Signing mode" option typically looks like one of these:

**Option A: Dropdown**
```
Signing mode: [Unsigned ▼]
```

**Option B: Toggle/Switch**
```
☐ Signed
☑ Unsigned
```

**Option C: Radio Buttons**
```
○ Signed
● Unsigned  ← Select this one
```

## Why This Matters

- **Signed**: Requires server-side code with API secret (more secure, but needs backend)
- **Unsigned**: Allows client-side uploads directly from browser (what we need)

## If You Still Can't Find It

1. **Check your Cloudinary plan**: Some free accounts might have restrictions
2. **Try creating a new preset**: The option might appear when creating new ones
3. **Contact Cloudinary support**: They can help locate the setting
4. **Alternative**: Use a different preset name and create it fresh

## Quick Test

After setting to "Unsigned", test by:
1. Opening `test-cloudinary.html`
2. Uploading an image
3. If it works, the preset is configured correctly!

