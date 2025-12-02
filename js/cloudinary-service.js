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
 * Uses Cloudinary Admin API to delete images
 * @param {string} imageUrl - The Cloudinary image URL
 * @returns {Promise<void>}
 */
async function deleteImageFromCloudinary(imageUrl) {
    try {
        // Check if it's a Cloudinary URL
        if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
            console.warn('Not a Cloudinary URL, skipping deletion:', imageUrl);
            return;
        }

        // Extract public_id from Cloudinary URL
        // Cloudinary URLs format: 
        // https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{folder}/{public_id}.{format}
        // Example: https://res.cloudinary.com/dwzajmb65/image/upload/v1764671363/teams/qtcyowcgjlklaz5tny02.png
        // public_id should be: teams/qtcyowcgjlklaz5tny02
        
        let publicId = '';
        
        try {
            const urlParts = imageUrl.split('/upload/');
            if (urlParts.length >= 2) {
                const pathAfterUpload = urlParts[1];
                
                // Remove version prefix (v1234567890/) if present
                let pathWithoutVersion = pathAfterUpload.replace(/^v\d+\//, '');
                
                // Remove any transformation parameters (w_100,h_100,c_fill, etc.)
                // Transformations are usually before the filename
                const pathSegments = pathWithoutVersion.split('/');
                
                // Find the last segment that looks like a filename (has extension)
                let filenameIndex = -1;
                for (let i = pathSegments.length - 1; i >= 0; i--) {
                    if (pathSegments[i].includes('.')) {
                        filenameIndex = i;
                        break;
                    }
                }
                
                if (filenameIndex >= 0) {
                    // Remove file extension from filename
                    const filename = pathSegments[filenameIndex].replace(/\.[^/.]+$/, '');
                    
                    // Reconstruct public_id with folder path
                    if (filenameIndex > 0) {
                        const folders = pathSegments.slice(0, filenameIndex).join('/');
                        publicId = folders + '/' + filename;
                    } else {
                        publicId = filename;
                    }
                } else {
                    // Fallback: remove extension from last segment
                    const lastSegment = pathSegments[pathSegments.length - 1];
                    publicId = lastSegment.replace(/\.[^/.]+$/, '');
                    if (pathSegments.length > 1) {
                        const folders = pathSegments.slice(0, -1).join('/');
                        publicId = folders + '/' + publicId;
                    }
                }
            }
        } catch (e) {
            console.warn('Could not extract public_id from URL:', imageUrl, e);
            return;
        }

        if (!publicId) {
            console.warn('Could not extract public_id from URL:', imageUrl);
            return;
        }
        
        console.log('Extracted public_id:', publicId, 'from URL:', imageUrl);

        console.log('Deleting image from Cloudinary:', {
            url: imageUrl,
            publicId: publicId
        });

        // Generate signature for Cloudinary Admin API
        // We need: timestamp, signature (SHA1 of: public_id + timestamp + api_secret)
        const timestamp = Math.round(new Date().getTime() / 1000);
        const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${cloudinaryConfig.apiSecret}`;
        
        // Generate SHA1 hash (simple implementation)
        const signature = await generateSHA1(stringToSign);

        // Call Cloudinary destroy API
        const destroyUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/destroy`;
        const formData = new FormData();
        formData.append('public_id', publicId);
        formData.append('timestamp', timestamp.toString());
        formData.append('api_key', cloudinaryConfig.apiKey);
        formData.append('signature', signature);

        const response = await fetch(destroyUrl, {
            method: 'POST',
            body: formData
        });

        const responseText = await response.text();
        
        if (!response.ok) {
            console.error('Cloudinary deletion failed:', {
                status: response.status,
                statusText: response.statusText,
                response: responseText
            });
            throw new Error(`Cloudinary deletion failed: ${response.status}`);
        }

        const result = JSON.parse(responseText);
        if (result.result === 'ok') {
            console.log('Image successfully deleted from Cloudinary:', publicId);
        } else {
            console.warn('Cloudinary deletion response:', result);
        }
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        // Don't throw - deletion failure shouldn't break the app
        // But log it so user knows
        throw error; // Actually, let's throw so the caller knows it failed
    }
}

/**
 * Generate SHA1 hash (for Cloudinary signature)
 * @param {string} message - String to hash
 * @returns {Promise<string>} - SHA1 hash
 */
async function generateSHA1(message) {
    // Convert string to ArrayBuffer
    const msgBuffer = new TextEncoder().encode(message);
    
    // Hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
    
    // Convert ArrayBuffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
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

