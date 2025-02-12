"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { Bold, Italic, ListOrdered, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { FormLabel, useFormField } from "../ui/form";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { LuInfo } from "react-icons/lu";
import { Typography } from "@/components/ui/typography";

export interface ProseMirrorNode {
  type: string;
  attrs?: Record<string, string | number | boolean>;
  content?: ProseMirrorNode[];
  marks?: { type: string }[];
  text?: string;
}

interface TipTapEditorProps {
  content: ProseMirrorNode | undefined;
  onContentChange: (content: ProseMirrorNode) => void;
}

/*
  @desc TipTapEditor component
*/
export const TipTapEditor = ({
  content,
  onContentChange,
}: TipTapEditorProps) => {
  // get the current season
  const seasonalColor = getSeasonColor();
  // get the error state
  const { error } = useFormField();

  // create the editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        listItem: false,
      }),
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-4",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-4",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: `my-5 border-2 rounded-md border-${seasonalColor}-dark min-h-[400px] p-4 focus:outline-none editor ${
          error && `border-sfred`
        }`,
        role: "textbox",
        "aria-label": "Zubereitungsschritte",
        "aria-describedby": "editor-description",
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
        {/* label */}
        <FormLabel htmlFor="steps" className="font-figtreeRegular">
          <div className="flex items-end">
            Zubereitung
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <LuInfo
                    className="ml-2 cursor-pointer text-sfblack transition-all hover:text-sfred"
                    aria-hidden="true"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p id="editor-description">
                    Beschreibe hier den Zubereitungsvorgang
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </FormLabel>

        {/* toggle group */}
        <div className="flex gap-2">
          <ToggleGroupItem
            value="bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`border-${seasonalColor}-dark active:bg-sf${seasonalColor}-light hover:bg-sf${seasonalColor}-light`}
          >
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`border-${seasonalColor}-dark active:bg-sf${seasonalColor}-light hover:bg-sf${seasonalColor}-light`}
          >
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="bullet-list"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`border-${seasonalColor}-dark active:bg-sf${seasonalColor}-light hover:bg-sf${seasonalColor}-light`}
          >
            <List />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="ordered-list"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`border-${seasonalColor}-dark active:bg-sf${seasonalColor}-light hover:bg-sf${seasonalColor}-light`}
          >
            <ListOrdered />
          </ToggleGroupItem>
        </div>
      </ToggleGroup>

      <Typography variant="body">
        {/* tiptap editor */}
        <EditorContent editor={editor} data-testid="tiptap-editor" />
      </Typography>
    </>
  );
};
