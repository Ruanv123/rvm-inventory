import { DatePickerWithRange } from "@/components/ui/date-range-picker";

export default function Home() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Home</h1>
      </div>
      <div className="flex justify-end">
        <DatePickerWithRange />
      </div>
    </>
  );
}
