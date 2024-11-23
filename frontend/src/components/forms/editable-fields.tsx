import { Editable, IconButton } from "@chakra-ui/react";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";

interface EditableFieldProps {
  value: string;
}

export default function EditableField({ value }: EditableFieldProps) {
  return (
    <Editable.Root
      textAlign="start"
      defaultValue={value}
      className="mb-2 w-full rounded border-2 border-sfred font-figtreeRegular text-2xl text-sfblack"
    >
      <Editable.Preview />
      <Editable.Input />
      <Editable.Control>
        <Editable.EditTrigger asChild>
          <IconButton variant="ghost" size="xs">
            <LuPencilLine />
          </IconButton>
        </Editable.EditTrigger>
        <Editable.CancelTrigger asChild>
          <IconButton variant="outline" size="xs">
            <LuX />
          </IconButton>
        </Editable.CancelTrigger>
        <Editable.SubmitTrigger asChild>
          <IconButton variant="outline" size="xs">
            <LuCheck />
          </IconButton>
        </Editable.SubmitTrigger>
      </Editable.Control>
    </Editable.Root>
  );
}
