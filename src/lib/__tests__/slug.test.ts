import { describe, it, expect } from "vitest";
import { validateSlug } from "../slug";

describe("validateSlug", () => {
  it("returns null for a simple valid slug", () => {
    expect(validateSlug("pantai-jolosutro")).toBeNull();
  });

  it("returns null for a slug with numbers", () => {
    expect(validateSlug("artikel-2024")).toBeNull();
  });

  it("returns null for a single-word lowercase slug", () => {
    expect(validateSlug("abc")).toBeNull();
  });

  it("returns error when slug is empty string", () => {
    expect(validateSlug("")).not.toBeNull();
  });

  it("returns error when slug is only whitespace", () => {
    expect(validateSlug("   ")).not.toBeNull();
  });

  it("returns error when slug contains uppercase letters", () => {
    expect(validateSlug("Pantai-Jolosutro")).not.toBeNull();
  });

  it("returns error when slug contains spaces", () => {
    expect(validateSlug("pantai jolosutro")).not.toBeNull();
  });

  it("returns error when slug contains underscore", () => {
    expect(validateSlug("pantai_jolosutro")).not.toBeNull();
  });

  it("returns error when slug contains dot", () => {
    expect(validateSlug("pantai.jolosutro")).not.toBeNull();
  });

  it("returns error when slug starts with a hyphen", () => {
    expect(validateSlug("-pantai")).not.toBeNull();
  });

  it("returns error when slug ends with a hyphen", () => {
    expect(validateSlug("pantai-")).not.toBeNull();
  });

  it("returns error when slug contains consecutive hyphens", () => {
    expect(validateSlug("pantai--jolosutro")).not.toBeNull();
  });

  it("returns error when slug exceeds 200 characters", () => {
    expect(validateSlug("a".repeat(201))).not.toBeNull();
  });

  it("returns null for slug exactly 200 characters", () => {
    expect(validateSlug("a".repeat(200))).toBeNull();
  });

  it("error message for empty slug mentions 'kosong'", () => {
    const error = validateSlug("");
    expect(error).toContain("kosong");
  });

  it("error message for invalid chars mentions 'huruf kecil'", () => {
    const error = validateSlug("PANTAI");
    expect(error).toContain("huruf kecil");
  });
});
