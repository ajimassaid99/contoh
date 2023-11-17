import { LiaEyeSolid } from 'react-icons/lia'
import { AiOutlinePlus } from 'react-icons/ai'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { Button, Input } from "@material-tailwind/react";

// Define the TypeScript types for the props
type TableHeaderProps = {
  onSee: () => void;
  onAdd: () => void;
  onSearch: (searchText: string) => void;
};

// Reusable TableHeader component
export default function TableHeader({
  onSee,
  onAdd,
  onSearch,
}: TableHeaderProps) {
  return (
    <section className="flex justify-between items-center my-8">
      <div className="buttons">
        <div className="flex gap-4 items-center">
          <Button
            className="flex gap-2 items-center"
            variant="filled"
            onClick={onSee}
          >
            <LiaEyeSolid width={17} />
            Lihat
          </Button>
          <Button
            className="flex gap-2 items-center"
            variant="filled"
            onClick={onAdd}
          >
            <AiOutlinePlus width={17} />
            Tambah
          </Button>
        </div>
      </div>
      <div className="relative flex w-full gap-2 md:w-max">
        <Input
          type="search"
          label="Cari sesuatu..."
          className="pr-20"
          containerProps={{
            className: "min-w-[288px]",
          }}
          onChange={(e) => onSearch(e.target.value)}
        />
        <HiMagnifyingGlass className="!absolute right-3 top-2 w-5 h-5" />
      </div>
    </section>
  );
}
