import { createHash } from "crypto";

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const missing = [
    ...(!cloudName ? ["CLOUDINARY_CLOUD_NAME"] : []),
    ...(!apiKey ? ["CLOUDINARY_API_KEY"] : []),
    ...(!apiSecret ? ["CLOUDINARY_API_SECRET"] : []),
  ];

  if (missing.length > 0) {
    throw new Error(`Missing Cloudinary environment variable(s): ${missing.join(", ")}`);
  }

  return { cloudName: cloudName!, apiKey: apiKey!, apiSecret: apiSecret! };
}

function signParams(params: Record<string, string>, apiSecret: string): string {
  // Cloudinary signature: SHA1(sorted_params_string + api_secret)
  // api_key, file, resource_type must NOT be included in the params to sign
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha1")
    .update(sorted + apiSecret)
    .digest("hex");
}

/**
 * Extract the Cloudinary public_id from a Cloudinary URL.
 * Returns null if the URL is not a Cloudinary URL or cannot be parsed.
 *
 * Example:
 *   https://res.cloudinary.com/cxk3ycmj/image/upload/v1234567890/jolosutro/blog/abc123.jpg
 *   → jolosutro/blog/abc123
 */
export function extractCloudinaryPublicId(url: string): string | null {
  if (!url || !url.includes("res.cloudinary.com")) return null;

  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split("/image/upload/");
    if (pathParts.length < 2) return null;

    let afterUpload = pathParts[1];
    // Strip optional version segment like v1234567890/
    afterUpload = afterUpload.replace(/^v\d+\//, "");
    // Strip file extension
    const lastDot = afterUpload.lastIndexOf(".");
    if (lastDot !== -1) {
      afterUpload = afterUpload.slice(0, lastDot);
    }

    return afterUpload || null;
  } catch {
    return null;
  }
}

/**
 * Upload a base64-encoded image to Cloudinary.
 * Returns the secure URL and public_id of the uploaded image.
 */
export async function uploadToCloudinary(
  base64Data: string,
  folder: string,
): Promise<{ url: string; publicId: string }> {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();

  const timestamp = String(Math.floor(Date.now() / 1000));
  // Only include params that Cloudinary expects in the signature (no api_key, no file)
  const signature = signParams({ folder, timestamp }, apiSecret);

  const formData = new FormData();
  formData.append("file", `data:image/jpeg;base64,${base64Data}`);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("folder", folder);
  formData.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Cloudinary upload failed: ${errorText}`);
  }

  const result = (await response.json()) as {
    secure_url: string;
    public_id: string;
  };

  return { url: result.secure_url, publicId: result.public_id };
}

/**
 * Delete an image from Cloudinary by its public_id.
 * Best-effort: logs errors but does not throw, so DB operations are not blocked.
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();

    const timestamp = String(Math.floor(Date.now() / 1000));
    const signature = signParams({ public_id: publicId, timestamp }, apiSecret);

    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error(`[Cloudinary] Failed to delete "${publicId}": HTTP ${response.status}`);
    }
  } catch (err) {
    console.error(`[Cloudinary] Error deleting "${publicId}":`, err);
  }
}
