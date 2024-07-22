"use client";

import ButtonProps from "@atoms/buttons/interfaces/button.interface";
import Spinner from "@atoms/spinners/Spinner";

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, outline, icon: Icon, small, loading }) => {
	return (
		<button
			disabled={disabled || loading}
			onClick={onClick}
			className={`flex gap-[0.5rem] items-center justify-center relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${
				outline ? "bg-white border-black text-black" : "bg-rose-500 border-rose-500 text-white"
			}
		 ${small ? "py-1 text-sm font-light border-[1px]" : "py-3 text-md font-semibold border-2"}
		 `}
		>
			{loading && <Spinner color={outline ? "rgb(244 63 94)" : undefined} />}
			{Icon && <Icon size={24} />}
			{label}
		</button>
	);
};

export default Button;
