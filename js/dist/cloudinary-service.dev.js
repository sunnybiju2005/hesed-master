"use strict";

// Cloudinary Service Module - Handles image uploads

/**
 * Upload image to Cloudinary
 * @param {File} file - The image file to upload
 * @param {string} folder - Optional folder path in Cloudinary (e.g., 'news', 'events', 'teams')
 * @returns {Promise<string>} - Returns the image URL
 */
function uploadImageToCloudinary(file) {
  var folder,
      formData,
      finalFolder,
      response,
      responseText,
      errorMessage,
      errorData,
      data,
      _args = arguments;
  return regeneratorRuntime.async(function uploadImageToCloudinary$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          folder = _args.length > 1 && _args[1] !== undefined ? _args[1] : '';
          _context.prev = 1;

          if (!(!cloudinaryConfig || !cloudinaryConfig.uploadPreset)) {
            _context.next = 4;
            break;
          }

          throw new Error('Cloudinary configuration not loaded. Please check cloudinary-config.js');

        case 4:
          formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', cloudinaryConfig.uploadPreset); // Add folder if specified
          // Note: Your preset has asset folder "stpaulschurch" already set
          // If we add "news" folder, final path will be: stpaulschurch/news

          if (folder) {
            formData.append('folder', folder);
            console.log('Adding folder to upload:', folder);
          } else {
            console.log('No folder specified - will use preset default folder: stpaulschurch');
          } // Note: Your preset already has asset folder "stpaulschurch" set
          // If we specify a folder like "news", it will be: stpaulschurch/news


          finalFolder = folder ? folder : '';
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
          _context.next = 16;
          return regeneratorRuntime.awrap(fetch(cloudinaryUploadUrl, {
            method: 'POST',
            body: formData
          }));

        case 16:
          response = _context.sent;
          _context.next = 19;
          return regeneratorRuntime.awrap(response.text());

        case 19:
          responseText = _context.sent;
          console.log('Cloudinary response status:', response.status);
          console.log('Cloudinary response:', responseText);

          if (response.ok) {
            _context.next = 27;
            break;
          }

          console.error('Cloudinary upload failed:', {
            status: response.status,
            statusText: response.statusText,
            response: responseText
          }); // Try to parse error message

          errorMessage = "Cloudinary upload failed: ".concat(response.status, " ").concat(response.statusText);

          try {
            errorData = JSON.parse(responseText);

            if (errorData.error && errorData.error.message) {
              errorMessage = "Cloudinary Error: ".concat(errorData.error.message);
            }
          } catch (e) {
            // If not JSON, use the text as is
            if (responseText) {
              errorMessage += " - ".concat(responseText);
            }
          }

          throw new Error(errorMessage);

        case 27:
          data = JSON.parse(responseText);
          console.log('Cloudinary upload successful!', {
            url: data.secure_url,
            public_id: data.public_id,
            format: data.format,
            width: data.width,
            height: data.height
          });
          return _context.abrupt("return", data.secure_url);

        case 32:
          _context.prev = 32;
          _context.t0 = _context["catch"](1);
          console.error('Error uploading image to Cloudinary:', _context.t0);
          throw _context.t0;

        case 36:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 32]]);
}
/**
 * Upload base64 image to Cloudinary
 * @param {string} dataUrl - Base64 data URL
 * @param {string} folder - Optional folder path in Cloudinary
 * @returns {Promise<string>} - Returns the image URL
 */


function uploadBase64ImageToCloudinary(dataUrl) {
  var folder,
      formData,
      response,
      errorText,
      data,
      _args2 = arguments;
  return regeneratorRuntime.async(function uploadBase64ImageToCloudinary$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          folder = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : '';
          _context2.prev = 1;

          if (!(!cloudinaryConfig || !cloudinaryConfig.uploadPreset)) {
            _context2.next = 4;
            break;
          }

          throw new Error('Cloudinary configuration not loaded. Please check cloudinary-config.js');

        case 4:
          formData = new FormData();
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
          _context2.next = 11;
          return regeneratorRuntime.awrap(fetch(cloudinaryUploadUrl, {
            method: 'POST',
            body: formData
          }));

        case 11:
          response = _context2.sent;

          if (response.ok) {
            _context2.next = 18;
            break;
          }

          _context2.next = 15;
          return regeneratorRuntime.awrap(response.text());

        case 15:
          errorText = _context2.sent;
          console.error('Cloudinary upload failed:', response.status, errorText);
          throw new Error("Cloudinary upload failed: ".concat(response.status, " ").concat(response.statusText));

        case 18:
          _context2.next = 20;
          return regeneratorRuntime.awrap(response.json());

        case 20:
          data = _context2.sent;
          console.log('Cloudinary upload successful:', data.secure_url);
          return _context2.abrupt("return", data.secure_url);

        case 25:
          _context2.prev = 25;
          _context2.t0 = _context2["catch"](1);
          console.error('Error uploading base64 image to Cloudinary:', _context2.t0);
          throw _context2.t0;

        case 29:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 25]]);
}
/**
 * Delete image from Cloudinary
 * Note: This requires server-side implementation or Cloudinary Admin API
 * For client-side, we'll just return success (actual deletion should be done server-side)
 * @param {string} imageUrl - The Cloudinary image URL
 * @returns {Promise<void>}
 */


function deleteImageFromCloudinary(imageUrl) {
  var urlParts, pathAfterUpload, parts, publicIdWithExt, publicId;
  return regeneratorRuntime.async(function deleteImageFromCloudinary$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // Extract public_id from Cloudinary URL
          // Cloudinary URLs format: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}.{format}
          urlParts = imageUrl.split('/upload/');

          if (!(urlParts.length < 2)) {
            _context3.next = 5;
            break;
          }

          console.warn('Invalid Cloudinary URL:', imageUrl);
          return _context3.abrupt("return");

        case 5:
          pathAfterUpload = urlParts[1]; // Remove any transformations and get the public_id

          parts = pathAfterUpload.split('/');
          publicIdWithExt = parts[parts.length - 1];
          publicId = publicIdWithExt.split('.')[0]; // Note: Actual deletion requires server-side API call with API secret
          // For now, we'll just log it. You can implement server-side deletion later

          console.log('Image deletion requested for:', publicId);
          console.warn('Note: Image deletion from Cloudinary requires server-side implementation'); // If you have a server endpoint for deletion, call it here:
          // await fetch('/api/delete-cloudinary-image', {
          //     method: 'POST',
          //     body: JSON.stringify({ publicId }),
          //     headers: { 'Content-Type': 'application/json' }
          // });

          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          console.error('Error deleting image from Cloudinary:', _context3.t0); // Don't throw - deletion failure shouldn't break the app

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
}
/**
 * Get optimized image URL with transformations
 * @param {string} imageUrl - Original Cloudinary URL
 * @param {object} options - Transformation options (width, height, quality, etc.)
 * @returns {string} - Transformed image URL
 */


function getCloudinaryImageUrl(imageUrl) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
    return imageUrl; // Return original if not a Cloudinary URL
  }

  var width = options.width,
      height = options.height,
      _options$quality = options.quality,
      quality = _options$quality === void 0 ? 'auto' : _options$quality,
      _options$format = options.format,
      format = _options$format === void 0 ? 'auto' : _options$format;
  var transformations = [];
  if (width) transformations.push("w_".concat(width));
  if (height) transformations.push("h_".concat(height));
  if (quality) transformations.push("q_".concat(quality));
  if (format) transformations.push("f_".concat(format));

  if (transformations.length === 0) {
    return imageUrl;
  } // Insert transformations into the URL


  var transformString = transformations.join(',');
  return imageUrl.replace('/upload/', "/upload/".concat(transformString, "/"));
}