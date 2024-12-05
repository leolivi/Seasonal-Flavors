interface CheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export default function Checkbox({
  id,
  checked,
  onCheckedChange,
}: CheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="h-6 w-6 appearance-none rounded-sm border-2 border-sfblack bg-sfwhite accent-sfgreen checked:appearance-auto checked:border-0 checked:bg-sfgreen"
      />
      <label
        htmlFor={id}
        className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      ></label>
    </div>
  );
}
