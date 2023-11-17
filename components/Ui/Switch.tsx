import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";

interface SwitchProps {
    label: string;
    options: { label: string; value: number }[];
    selectedOption: string | any;
    setSelectedOption: (value: string | any) => void;
    required?: boolean;
    className?: any;
}

const Switch = ({ label, options, selectedOption, setSelectedOption, required = true, className }: SwitchProps) => {
    const handleChange = (value: any) => {
        setSelectedOption(value);
    };

    return (
        <div className={className}>
            {required ? (
                <label htmlFor={label} className="mb-2 font-bold text-black">
                    {label} <sup className="text-danger">*</sup>
                </label>
            ) : (
                <label htmlFor={label} className="mb-2 font-bold text-black">
                    {label}
                </label>
            )}
            <div className="w-64">
                <Tabs value={selectedOption}>
                    <TabsHeader>
                        {options?.map(({ label, value }) => (
                            <Tab key={value} value={value} onClick={() => handleChange(value)}>
                                <p className="text-sm font-semibold uppercase text-black">{label}</p>
                            </Tab>
                        ))}
                    </TabsHeader>
                </Tabs>
            </div>
        </div>
    );
};

export default Switch;
