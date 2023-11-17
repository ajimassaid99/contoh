import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Chip } from "@material-tailwind/react";
import { Select } from "@mantine/core";

interface SelectOptionsProps extends ComponentPropsWithoutRef<"div"> {
    label: string;
    value: string | number;
    notification?: number;
}

interface SelectsProps {
    data: any;
    label?: string;
    withAsterisk?: boolean;
    required?: boolean;
    className?: string;
    onChange?: (event: any) => void;
}

const SelectItem = forwardRef<HTMLDivElement, SelectOptionsProps>(({ label, notification, ...others }: SelectOptionsProps, ref) => (
    <div ref={ref} {...others} className="flex cursor-pointer items-center justify-between px-4 py-1 uppercase">
        <p className="text-xs font-semibold uppercase text-black">{label}</p>
        {notification ? <Chip value={notification} size="sm" color="blue" className="rounded-full text-xs" /> : <p className="my-3"></p>}
    </div>
));

SelectItem.displayName = "SelectItem";

const Selects = ({ label, data, withAsterisk = true, required = true, className, onChange }: SelectsProps) => {

    return (
        <Select
            className={`${className}`}
            placeholder="Silahkan Pilih"
            label={label}
            onChange={onChange}
            data={data}
            itemComponent={SelectItem}
            withAsterisk={withAsterisk || false}
            required={required || false}
            searchable
            clearable
        />
    );
};

export default Selects;
