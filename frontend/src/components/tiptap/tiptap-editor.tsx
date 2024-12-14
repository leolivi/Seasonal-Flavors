"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Heading1, Heading2, Heading3, Italic } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import ListItem from "@tiptap/extension-list-item";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { FormLabel, useFormField } from "../ui/form";

export interface ProseMirrorNode {
  type: string;
  attrs?: Record<string, string | number | boolean>;
  content?: ProseMirrorNode[];
  marks?: { type: string }[];
  text?: string;
}

interface TipTapEditorProps {
  content: ProseMirrorNode | undefined;
  onContentChange: (content: any) => void;
}

export const TipTapEditor = ({
  content,
  onContentChange,
}: TipTapEditorProps) => {
  const seasonalColor = getSeasonColor();
  const { error } = useFormField();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        listItem: false,
      }),
      ListItem,
    ],
    editorProps: {
      attributes: {
        class: `my-5 border-2 rounded-md border-${seasonalColor} min-h-[400px] p-4 focus:outline-none editor ${
          error && `border-sfred`
        }`,
      },
    },
    content: content,
    onUpdate: ({ editor }) => {
      const jsonContent = editor.getJSON();
      onContentChange(jsonContent as ProseMirrorNode);
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <ToggleGroup
        type="multiple"
        variant="outline"
        className="mt-6 justify-between gap-5"
      >
        <FormLabel htmlFor="steps" className="font-figtreeRegular">
          Zubereitung
        </FormLabel>
        <div className="flex gap-2">
          <ToggleGroupItem
            value="bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="heading1"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="heading2"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="heading3"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 />
          </ToggleGroupItem>
        </div>
      </ToggleGroup>

      <EditorContent editor={editor} />
    </>
  );
};
