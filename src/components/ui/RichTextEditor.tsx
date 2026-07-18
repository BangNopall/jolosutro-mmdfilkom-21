import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
} from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function RichTextEditor({ value, onChange, disabled = false }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
    ],
    content: value,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none min-h-[300px] p-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-b-xl border-x border-b border-input bg-background font-mono text-sm",
      },
    },
  });

  // Sync external value changes to editor (e.g. when editing a different post)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  // Sync disabled state
  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [disabled, editor]);

  if (!editor) {
    return null;
  }

  const toggleLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  };

  return (
    <div className="w-full rounded-xl flex flex-col">
      <div className="flex flex-wrap items-center gap-1 border border-input bg-accent/40 p-1.5 rounded-t-xl">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={disabled}
          className={`p-2 rounded-lg hover:bg-background ${
            editor.isActive("bold") ? "bg-background shadow-sm text-primary" : "text-muted-foreground"
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={disabled}
          className={`p-2 rounded-lg hover:bg-background ${
            editor.isActive("italic") ? "bg-background shadow-sm text-primary" : "text-muted-foreground"
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={disabled}
          className={`p-2 rounded-lg hover:bg-background ${
            editor.isActive("underline") ? "bg-background shadow-sm text-primary" : "text-muted-foreground"
          }`}
          title="Underline"
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          disabled={disabled}
          className={`p-2 rounded-lg hover:bg-background ${
            editor.isActive("heading", { level: 1 }) ? "bg-background shadow-sm text-primary" : "text-muted-foreground"
          }`}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          disabled={disabled}
          className={`p-2 rounded-lg hover:bg-background ${
            editor.isActive("heading", { level: 2 }) ? "bg-background shadow-sm text-primary" : "text-muted-foreground"
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          disabled={disabled}
          className={`p-2 rounded-lg hover:bg-background ${
            editor.isActive("heading", { level: 3 }) ? "bg-background shadow-sm text-primary" : "text-muted-foreground"
          }`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={disabled}
          className={`p-2 rounded-lg hover:bg-background ${
            editor.isActive("bulletList") ? "bg-background shadow-sm text-primary" : "text-muted-foreground"
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={disabled}
          className={`p-2 rounded-lg hover:bg-background ${
            editor.isActive("orderedList") ? "bg-background shadow-sm text-primary" : "text-muted-foreground"
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={disabled}
          className={`p-2 rounded-lg hover:bg-background ${
            editor.isActive("blockquote") ? "bg-background shadow-sm text-primary" : "text-muted-foreground"
          }`}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        <button
          type="button"
          onClick={toggleLink}
          disabled={disabled}
          className={`p-2 rounded-lg hover:bg-background ${
            editor.isActive("link") ? "bg-background shadow-sm text-primary" : "text-muted-foreground"
          }`}
          title="Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
