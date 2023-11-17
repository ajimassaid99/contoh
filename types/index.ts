import { ComponentPropsWithoutRef } from "react";

export interface SelectProps {
    label: string;
    options: any;
    withAsterisk?: boolean;
}
export interface SelectOptionsProps extends ComponentPropsWithoutRef<"div"> {
    label: string;
    value: string | number;
    notification?: number;
}
