// Cloudinary Service Module - Handles image uploads

/**
 * Upload image to Cloudinary
 * @param {File} file - The image file to upload
 * @param {string} folder - Optional folder path in Cloudinary (e.g., 'news', 'events', 'teams')
 * @returns {Promise<string>} - Returns the image URL
 */
async function uploadImageToCloudinary(file, folder = '') {
    try {
        // Check if Cloudinary config is loaded
        if (!cloudinaryConfig || !cloudinaryConfig.uploadPreset) {
            throw new Error('Cloudinary configuration not loaded. Please check cloudinary-config.js');
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinaryConfig.uploadPreset);
        
        // Add folder if specified
        // Note: Your preset has asset folder "stpaulschurch" already set
        // If we add "news" folder, final path will be: stpaulschurch/news
        if (folder) {
            formData.append('folder', folder);
            console.log('Adding folder to upload:', folder);
        } else {
            console.log('No folder specified - will use preset default folder: stpaulschurch');
        }
        
        // Note: Your preset already has asset folder "stpaulschurch" set
        // If we specify a folder like "news", it will be: stpaulschurch/news
        const finalFolder = folder ? folder : '';
        
        console.log('=== CLOUDINARY UPLOAD START ===');
        console.log('Configuration:', {
            cloudName: cloudinaryConfig.cloudName,
            uploadPreset: cloudinaryConfig.uploadPreset,
            uploadUrl: cloudinaryUploadUrl
        });
        console.log('File Details:', {
            fileName: file.name,
            fileSize: file.size + ' bytes',
            fileType: file.type
        });
        console.log('Folder:', finalFolder || 'root (will use preset default: stpaulschurch)');
        console.log('FormData being sent...');
        
        const response = await fetch(cloudinaryUploadUrl, {
            method: 'POST',
            body: formData
        });
        
        const responseText = await response.text();
        console.log('Cloudinary response status:', response.status);
        console.log('Cloudinary response:', responseText);
        
        if (!response.ok) {
            console.error('Cloudinary upload failed:', {
                status: response.status,
                statusText: response.statusText,
                response: responseText
            });
            
            // Try to parse error message
            let errorMessage = `Cloudinary upload failed: ${response.status} ${response.statusText}`;
            try {
                const errorData = JSON.parse(responseText);
                if (errorData.error && errorData.error.message) {
                    errorMessage = `Cloudinary Error: ${errorData.error.message}`;
                }
            } catch (e) {
                // If not JSON, use the text as is
                if (responseText) {
                    errorMessage += ` - ${responseText}`;
                }
            }
            
            throw new Error(errorMessage);
        }
        
        const data = JSON.parse(responseText);
        console.log('Cloudinary upload successful!', {
            url: data.secure_url,
            public_id: data.public_id,
            format: data.format,
            width: data.width,
            height: data.height
        });
        return data.secure_url; // Returns the secure HTTPS URL
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw error;
    }
}

/**
 * Upload base64 image to Cloudinary
 * @param {string} dataUrl - Base64 data URL
 * @param {string} folder - Optional folder path in Cloudinary
 * @returns {Promise<string>} - Returns the image URL
 */
async function uploadBase64ImageToCloudinary(dataUrl, folder = '') {
    try {
        // Check if Cloudinary config is loaded
        if (!cloudinaryConfig || !cloudinaryConfig.uploadPreset) {
            throw new Error('Cloudinary configuration not loaded. Please check cloudinary-config.js');
        }

        const formData = new FormData();
        formData.append('file', dataUrl);
        formData.append('upload_preset', cloudinaryConfig.uploadPreset);
        
        if (folder) {
            formData.append('folder', folder);
        }
        
        console.log('Uploading base64 image to Cloudinary:', {
            cloudName: cloudinaryConfig.cloudName,
            uploadPreset: cloudinaryConfig.uploadPreset,
            folder: folder || 'root'
        });
        
        const response = await fetch(cloudinaryUploadUrl, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Cloudinary upload failed:', response.status, errorText);
            throw new Error(`Cloudinary upload failed: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Cloudinary upload successful:', data.secure_url);
        return data.secure_url;
    } catch (error) {
        console.error('Error uploading base64 image to Cloudinary:', error);
        throw error;
    }
}

/**
 * Delete image from Cloudinary
 * Note: This requires server-side implementation or Cloudinary Admin API
 * For client-side, we'll just return success (actual deletion should be done server-side)
 * @param {string} imageUrl - The Cloudinary image URL
 * @returns {Promise<void>}
 */
async function deleteImageFromCloudinary(imageUrl) {
    try {
        // Extract public_id from Cloudinary URL
        // Cloudinary URLs format: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}.{format}
        const urlParts = imageUrl.split('/upload/');
        if (urlParts.length < 2) {
            console.warn('Invalid Cloudinary URL:', imageUrl);
            return;
        }
        
        const pathAfterUpload = urlParts[1];
        // Remove any transformations and get the public_id
        const parts = pathAfterUpload.split('/');
        const publicIdWithExt = parts[parts.length - 1];
        const publicId = publicIdWithExt.split('.')[0];
        
        // Note: Actual deletion requires server-side API call with API secret
        // For now, we'll just log it. You can implement server-side deletion later
        console.log('Image deletion requested for:', publicId);
        console.warn('Note: Image deletion from Cloudinary requires server-side implementation');
        
        // If you have a server endpoint for deletion, call it here:
        // await fetch('/api/delete-cloudinary-image', {
        //     method: 'POST',
        //     body: JSON.stringify({ publicId }),
        //     headers: { 'Content-Type': 'application/json' }
        // });
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        // Don't throw - deletion failure shouldn't break the app
    }
}

/**
 * Get optimized image URL with transformations
 * @param {string} imageUrl - Original Cloudinary URL
 * @param {object} options - Transformation options (width, height, quality, etc.)
 * @returns {string} - Transformed image URL
 */
function getCloudinaryImageUrl(imageUrl, options = {}) {
    if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
        return imageUrl; // Return original if not a Cloudinary URL
    }
    
    const { width, height, quality = 'auto', format = 'auto' } = options;
    const transformations = [];
    
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (quality) transformations.push(`q_${quality}`);
    if (format) transformations.push(`f_${format}`);
    
    if (transformations.length === 0) {
        return imageUrl;
    }
    
    // Insert transformations into the URL
    const transformString = transformations.join(',');
    return imageUrl.replace('/upload/', `/upload/${transformString}/`);
}

