import React, { ChangeEvent, startTransition, useState } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { InputAdornment } from '@mui/material';
import Input from '@mui/material/Input';

import ButtonIcon from 'components/ButtonIcon';

interface InputTaskProps {
	onCreate: (value: string) => void;
}

const InputTask: React.FunctionComponent<InputTaskProps> = ({ onCreate }) => {
	const [value, setValue] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		startTransition(() => {
			setValue(value);
		});
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') {
			callbackCreate();
		}
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
			onKeyDown={handleKeyDown}
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
