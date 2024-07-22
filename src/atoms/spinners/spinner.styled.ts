import styled from "styled-components";

export const SpinnerStyled = styled.div<{
	$color?: string;
}>`
	width: 1.2rem;
	height: 1.2rem;
	border: ${props => (props.$color ? `3px solid ${props.$color}` : "3px solid #fff")};
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	position: relative;
	animation: pulse 1s linear infinite;

	&:after {
		content: "";
		position: absolute;
		width: 1.2rem;
		height: 1.2rem;
		border: ${props => (props.$color ? `3px solid ${props.$color}` : "3px solid #fff")};
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		animation: scaleUp 1s linear infinite;
	}

	@keyframes scaleUp {
		0% {
			transform: translate(-50%, -50%) scale(0);
		}
		60%,
		100% {
			transform: translate(-50%, -50%) scale(1);
		}
	}
	@keyframes pulse {
		0%,
		60%,
		100% {
			transform: scale(1);
		}
		80% {
			transform: scale(1.2);
		}
	}
`;
