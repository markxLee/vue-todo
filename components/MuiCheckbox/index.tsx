import React, { useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Checkbox } from '@mui/material';

interface ICheckboxMuiProps {
	value: boolean;
	onChecked: (value: boolean) => void;
}

const MuiCheckbox: React.FC<ICheckboxMuiProps> = ({ value, onChecked }) => {
	const [checked, setChecked] = useState(value);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;
		setChecked(checked);
		onChecked(checked);
	};

	return (
		<Checkbox
			icon={<RadioButtonUncheckedIcon />}
			checkedIcon={<CheckCircleIcon />}
			size="small"
			sx={{
				padding: 0.5,
			}}
			checked={checked}
			onChange={handleChange}
		/>
	);
};

export default MuiCheckbox;
