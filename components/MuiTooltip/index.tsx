import { Tooltip } from '@mui/material';
import React from 'react';

interface IMuiTooltipProps {
	title: string;
	children: React.ReactNode;
}

const MuiTooltip: React.FC<IMuiTooltipProps> = ({ title, children }) => {
	return (
		<Tooltip title={title} arrow PopperProps={{}}>
			<div>{children}</div>
		</Tooltip>
	);
};

export default MuiTooltip;
