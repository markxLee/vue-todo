import React from 'react';

interface IButtonIconProps {
	onChange?: () => void;
	children: React.ReactNode;
}

const ButtonIcon: React.FC<IButtonIconProps> = ({ onChange, children }) => {
	return (
		<button
			className="block"
			type="button"
			onClick={() => {
				onChange?.();
			}}
		>
			{children}
		</button>
	);
};

export default ButtonIcon;
