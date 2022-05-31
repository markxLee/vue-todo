import React, { ChangeEvent, startTransition, useState } from 'react';
import Input from '@mui/material/Input';
import { InputAdornment } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import ButtonIcon from '@components/ButtonIcon';

interface InputTaskProps {
	onCreate: (value: string) => void;
}

const InputTask: React.FunctionComponent<InputTaskProps> = ({ onCreate }) => {
	const [value, setValue] = useState('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		startTransition(() => {
			setValue(value);
		});
	};

	const callbackCreate = () => {
		if (value !== '') {
			onCreate(value);
			setValue('');
		}
	};

	return (
		<Input
			value={value}
			onChange={handleChange}
			size="medium"
			fullWidth
			disableUnderline
			margin="none"
			className="bg-gray-100 rounded hover:bg-gray-200 p-1.5 pl-2"
			endAdornment={
				<InputAdornment position="end">
					<ButtonIcon onChange={callbackCreate}>
						<AddCircleOutlineIcon className="hover:text-primary rounded-full hover:bg-gray-100" />
					</ButtonIcon>
				</InputAdornment>
			}
			inputProps={{
				sx: {
					py: 1,
					px: 0,
				},
			}}
		/>
	);
};

export default InputTask;
