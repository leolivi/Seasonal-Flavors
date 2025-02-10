"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import ListItem from "@tiptap/extension-list-item";
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
        <div className="flex gap-2">
          <ToggleGroupItem
            value="bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`border-${seasonalColor}-dark selection:bg-sf${seasonalColor}-light hover:bg-sf${seasonalColor}-light`}
          >
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`border-${seasonalColor}-dark selection:bg-sf${seasonalColor}-light hover:bg-sf${seasonalColor}-light`}
          >
            <Italic />
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
