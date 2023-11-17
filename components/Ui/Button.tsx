interface ButtonProps {
    children: string;
    onClick?: (value?: any) => void;
    type?: "button" | "submit" | "reset";
    className?: any;
}

const Button = ({ children, type, className, onClick }: ButtonProps) => {
    return (
        <button type={type} onClick={onClick} className={`max-w-fit rounded-lg py-2.5 px-6 font-bold ${className === "bg-white" ? "border border-gray-500 text-black" : "text-white"} ${className}`}>
            {children}
        </button>
    );
};

export default Button;
