import { ChangeEvent } from "react";
import { Input } from "@material-tailwind/react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

interface SearchProps {
    label?: string;
    onSearch: (value: string) => void;
    containerClassName?: string;
}

const Search = ({ label = "Search...", onSearch, containerClassName }: SearchProps) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    return (
        <div className={`relative flex w-full gap-2 md:w-max ${containerClassName}`}>
            <Input type="search" label={label} className="mr-16 pr-8" onChange={handleInputChange} />
            <HiMiniMagnifyingGlass className="!absolute right-3 top-[0.65rem] h-5 w-5 fill-black dark:fill-white" />
        </div>
    );
};

export default Search;
