"use client";

import { SpinnerStyled } from "./spinner.styled";
interface ISpinnerProps {
	color?: string;
}

const Spinner: React.FC<ISpinnerProps> = ({ color }) => {
	return <SpinnerStyled $color={color}></SpinnerStyled>;
};

export default Spinner;
