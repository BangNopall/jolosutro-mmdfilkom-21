import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RichTextEditor } from "../ui/RichTextEditor";

// Mock document.elementFromPoint which is missing in jsdom
if (typeof document !== "undefined") {
  document.elementFromPoint = vi.fn();
}

describe("RichTextEditor", () => {
  it("renders editor container", () => {
    const { container } = render(<RichTextEditor value="" onChange={vi.fn()} />);
    expect(container.querySelector(".ProseMirror")).toBeInTheDocument();
  });

  it("renders toolbar buttons", () => {
    render(<RichTextEditor value="" onChange={vi.fn()} />);
    expect(screen.getByTitle("Bold")).toBeInTheDocument();
    expect(screen.getByTitle("Italic")).toBeInTheDocument();
    expect(screen.getByTitle("Underline")).toBeInTheDocument();
    expect(screen.getByTitle("Heading 1")).toBeInTheDocument();
    expect(screen.getByTitle("Heading 2")).toBeInTheDocument();
    expect(screen.getByTitle("Heading 3")).toBeInTheDocument();
    expect(screen.getByTitle("Bullet List")).toBeInTheDocument();
    expect(screen.getByTitle("Numbered List")).toBeInTheDocument();
    expect(screen.getByTitle("Blockquote")).toBeInTheDocument();
    expect(screen.getByTitle("Link")).toBeInTheDocument();
  });

  it("renders initial HTML value", () => {
    render(
      <RichTextEditor value="<p>Initial content</p>" onChange={vi.fn()} />,
    );
    expect(screen.getByText("Initial content")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    const { container } = render(<RichTextEditor value="" onChange={vi.fn()} disabled />);
    const editor = container.querySelector(".ProseMirror") as HTMLElement;
    expect(editor).toHaveAttribute("contenteditable", "false");
  });
});
