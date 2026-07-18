/**
 * Validates a blog post slug.
 * Returns an error message string if invalid, or null if valid.
 * Rules mirror the server-side postSchema regex in admin.functions.ts.
 */
export function validateSlug(slug: string): string | null {
  const trimmed = slug.trim();

  if (!trimmed) return "Slug tidak boleh kosong.";
  if (trimmed.length > 200) return "Slug maksimal 200 karakter.";
  if (!/^[a-z0-9-]+$/.test(trimmed))
    return "Slug hanya boleh huruf kecil, angka, dan tanda hubung (-).";
  if (trimmed.startsWith("-") || trimmed.endsWith("-"))
    return "Slug tidak boleh diawali atau diakhiri tanda hubung.";
  if (/--/.test(trimmed))
    return "Slug tidak boleh mengandung tanda hubung berurutan.";

  return null;
}
