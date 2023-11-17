import { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import formattedDate from "@/utils/formatDate";

interface InputDateProps {
    label: string;
    required?: boolean;
    className?: any;
    onValueDate?: any;
    valueDate?: any;
}

const InputDate = ({ label, required = false, className, onValueDate, valueDate }: InputDateProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null | any>(valueDate);

    const handleDateChange = async (dates: Date[] | Date) => {
        if (Array.isArray(dates)) {
            setSelectedDate(dates[0]);
            onValueDate(formattedDate(dates[0]));
        } else {
            setSelectedDate(dates);
            onValueDate(dates);
        }
    };

    return (
        <div className={className}>
            <label className="break-words text-[0.875rem] text-[#212529]">
                {label} {required && <sup className="mb-2 text-sm text-[#fa5252]">*</sup>}
            </label>
            <Flatpickr
                render={(_, ref) => <input type="text" className="rounded-sm border border-[#ced4da]" placeholder="Pilih Tanggal" ref={ref} />}
                onChange={handleDateChange}
                value={selectedDate}
                options={{
                    dateFormat: "YYYY-MM-DD HH:mm:ss",
                    altInput: true,
                    altFormat: "j F, Y",
                }}
            />
        </div>
    );
};

export default InputDate;
