import { IconType } from "react-icons";

export default interface ButtonProps {
	label: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	loading?: boolean;
	outline?: boolean;
	small?: boolean;
	icon?: IconType;
}
