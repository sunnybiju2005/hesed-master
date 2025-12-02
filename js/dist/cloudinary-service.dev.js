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
 * Uses Cloudinary Admin API to delete images
 * @param {string} imageUrl - The Cloudinary image URL
 * @returns {Promise<void>}
 */


function deleteImageFromCloudinary(imageUrl) {
  var publicId, urlParts, pathAfterUpload, pathWithoutVersion, pathSegments, filenameIndex, i, filename, folders, lastSegment, _folders, timestamp, stringToSign, signature, destroyUrl, formData, response, responseText, result;

  return regeneratorRuntime.async(function deleteImageFromCloudinary$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;

          if (!(!imageUrl || !imageUrl.includes('cloudinary.com'))) {
            _context3.next = 4;
            break;
          }

          console.warn('Not a Cloudinary URL, skipping deletion:', imageUrl);
          return _context3.abrupt("return");

        case 4:
          // Extract public_id from Cloudinary URL
          // Cloudinary URLs format: 
          // https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{folder}/{public_id}.{format}
          // Example: https://res.cloudinary.com/dwzajmb65/image/upload/v1764671363/teams/qtcyowcgjlklaz5tny02.png
          // public_id should be: teams/qtcyowcgjlklaz5tny02
          publicId = '';
          _context3.prev = 5;
          urlParts = imageUrl.split('/upload/');

          if (!(urlParts.length >= 2)) {
            _context3.next = 21;
            break;
          }

          pathAfterUpload = urlParts[1]; // Remove version prefix (v1234567890/) if present

          pathWithoutVersion = pathAfterUpload.replace(/^v\d+\//, ''); // Remove any transformation parameters (w_100,h_100,c_fill, etc.)
          // Transformations are usually before the filename

          pathSegments = pathWithoutVersion.split('/'); // Find the last segment that looks like a filename (has extension)

          filenameIndex = -1;
          i = pathSegments.length - 1;

        case 13:
          if (!(i >= 0)) {
            _context3.next = 20;
            break;
          }

          if (!pathSegments[i].includes('.')) {
            _context3.next = 17;
            break;
          }

          filenameIndex = i;
          return _context3.abrupt("break", 20);

        case 17:
          i--;
          _context3.next = 13;
          break;

        case 20:
          if (filenameIndex >= 0) {
            // Remove file extension from filename
            filename = pathSegments[filenameIndex].replace(/\.[^/.]+$/, ''); // Reconstruct public_id with folder path

            if (filenameIndex > 0) {
              folders = pathSegments.slice(0, filenameIndex).join('/');
              publicId = folders + '/' + filename;
            } else {
              publicId = filename;
            }
          } else {
            // Fallback: remove extension from last segment
            lastSegment = pathSegments[pathSegments.length - 1];
            publicId = lastSegment.replace(/\.[^/.]+$/, '');

            if (pathSegments.length > 1) {
              _folders = pathSegments.slice(0, -1).join('/');
              publicId = _folders + '/' + publicId;
            }
          }

        case 21:
          _context3.next = 27;
          break;

        case 23:
          _context3.prev = 23;
          _context3.t0 = _context3["catch"](5);
          console.warn('Could not extract public_id from URL:', imageUrl, _context3.t0);
          return _context3.abrupt("return");

        case 27:
          if (publicId) {
            _context3.next = 30;
            break;
          }

          console.warn('Could not extract public_id from URL:', imageUrl);
          return _context3.abrupt("return");

        case 30:
          console.log('Extracted public_id:', publicId, 'from URL:', imageUrl);
          console.log('Deleting image from Cloudinary:', {
            url: imageUrl,
            publicId: publicId
          }); // Generate signature for Cloudinary Admin API
          // We need: timestamp, signature (SHA1 of: public_id + timestamp + api_secret)

          timestamp = Math.round(new Date().getTime() / 1000);
          stringToSign = "public_id=".concat(publicId, "&timestamp=").concat(timestamp).concat(cloudinaryConfig.apiSecret); // Generate SHA1 hash (simple implementation)

          _context3.next = 36;
          return regeneratorRuntime.awrap(generateSHA1(stringToSign));

        case 36:
          signature = _context3.sent;
          // Call Cloudinary destroy API
          destroyUrl = "https://api.cloudinary.com/v1_1/".concat(cloudinaryConfig.cloudName, "/image/destroy");
          formData = new FormData();
          formData.append('public_id', publicId);
          formData.append('timestamp', timestamp.toString());
          formData.append('api_key', cloudinaryConfig.apiKey);
          formData.append('signature', signature);
          _context3.next = 45;
          return regeneratorRuntime.awrap(fetch(destroyUrl, {
            method: 'POST',
            body: formData
          }));

        case 45:
          response = _context3.sent;
          _context3.next = 48;
          return regeneratorRuntime.awrap(response.text());

        case 48:
          responseText = _context3.sent;

          if (response.ok) {
            _context3.next = 52;
            break;
          }

          console.error('Cloudinary deletion failed:', {
            status: response.status,
            statusText: response.statusText,
            response: responseText
          });
          throw new Error("Cloudinary deletion failed: ".concat(response.status));

        case 52:
          result = JSON.parse(responseText);

          if (result.result === 'ok') {
            console.log('Image successfully deleted from Cloudinary:', publicId);
          } else {
            console.warn('Cloudinary deletion response:', result);
          }

          _context3.next = 60;
          break;

        case 56:
          _context3.prev = 56;
          _context3.t1 = _context3["catch"](0);
          console.error('Error deleting image from Cloudinary:', _context3.t1); // Don't throw - deletion failure shouldn't break the app
          // But log it so user knows

          throw _context3.t1;

        case 60:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 56], [5, 23]]);
}
/**
 * Generate SHA1 hash (for Cloudinary signature)
 * @param {string} message - String to hash
 * @returns {Promise<string>} - SHA1 hash
 */


function generateSHA1(message) {
  var msgBuffer, hashBuffer, hashArray, hashHex;
  return regeneratorRuntime.async(function generateSHA1$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          // Convert string to ArrayBuffer
          msgBuffer = new TextEncoder().encode(message); // Hash the message

          _context4.next = 3;
          return regeneratorRuntime.awrap(crypto.subtle.digest('SHA-1', msgBuffer));

        case 3:
          hashBuffer = _context4.sent;
          // Convert ArrayBuffer to hex string
          hashArray = Array.from(new Uint8Array(hashBuffer));
          hashHex = hashArray.map(function (b) {
            return b.toString(16).padStart(2, '0');
          }).join('');
          return _context4.abrupt("return", hashHex);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
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