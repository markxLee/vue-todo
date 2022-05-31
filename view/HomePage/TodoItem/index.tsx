import React, { useState } from 'react';
import GradeIcon from '@mui/icons-material/Grade';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import MuiTooltip from '@components/MuiTooltip';

interface TodoItemProps {
	isDone: boolean;
	isPined: boolean;
	content: string;
	id: string;
	index: number;
	onChangePin: (index: number, value: boolean) => void;
	onChangeDone: (index: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
	id,
	index,
	isDone,
	isPined,
	content,
	onChangePin,
	onChangeDone,
}) => {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div
			className={`flex items-center gap-1.5 py-2 px-1.5 rounded bg-gray-50 hover:bg-gray-200 relative ${
				isDone ? 'pointer-events-none bg-gray-400 opacity-60' : ''
			}`}
			onMouseEnter={() => {
				setShowMenu(true);
			}}
			onMouseLeave={() => {
				setShowMenu(false);
			}}
		>
			{isPined ? (
				<div className="flex-none">
					<LabelImportantIcon className="text-red-400 leading-none" />
				</div>
			) : null}
			<div className="flex-auto text-sm break-all">
				{isDone ? <del>{content}</del> : content}
			</div>
			{showMenu ? (
				<div className="absolute right-0 top-0 z-10 p-0.5 flex gap-1 items-center bg-gray-50 rounded">
					<MuiTooltip title="Done!">
						<button
							type="button"
							onClick={() => {
								onChangeDone?.(index);
							}}
							className="block leading-none"
						>
							<AssignmentTurnedInIcon
								className={`text-gray-400 hover:text-green-400`}
								sx={{ width: 16, height: 16 }}
							/>
						</button>
					</MuiTooltip>
					<MuiTooltip title={isPined ? 'Unpin' : 'Pin'}>
						<button
							type="button"
							onClick={() => {
								onChangePin?.(index, !isPined);
							}}
							className="block leading-none"
						>
							<GradeIcon
								className={`${
									isPined
										? 'text-yellow-300'
										: 'text-gray-400 hover:text-yellow-200'
								}`}
								sx={{ width: 16, height: 16 }}
							/>
						</button>
					</MuiTooltip>
				</div>
			) : null}
		</div>
	);
};

export default TodoItem;
