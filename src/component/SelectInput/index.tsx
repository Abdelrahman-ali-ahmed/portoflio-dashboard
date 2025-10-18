
interface SelectInputProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SelectInput({
  options,
  value,
  onChange,
}: SelectInputProps) {
  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)} // optional
       className="border rounded-md p-2 bg-black text-white dark:bg-white dark:text-black dark:font-black"

      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
