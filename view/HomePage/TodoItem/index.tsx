import React, { useState } from 'react';

import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DeleteIcon from '@mui/icons-material/Delete';
import GradeIcon from '@mui/icons-material/Grade';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

import MuiTooltip from 'components/MuiTooltip';

interface TodoItemProps {
	isDone: boolean;
	isPined: boolean;
	content: string;
	id: string;
	onChangePin: (id: string, value: boolean) => void;
	onChangeDone: (id: string) => void;
	onChangeDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
	id,
	isDone,
	isPined,
	content,
	onChangePin,
	onChangeDone,
	onChangeDelete,
}) => {
	const [showMenu, setShowMenu] = useState(false);

	const menuList = [
		{
			toolTitle: 'Done!',
			onChange: () => {
				onChangeDone(id);
			},
			icon: (
				<AssignmentTurnedInIcon
					className={`text-gray-400 hover:text-green-400`}
					sx={{ width: 16, height: 16 }}
				/>
			),
			hide: isDone,
		},
		{
			toolTitle: isPined ? 'Unpin' : 'Pin',
			onChange: () => {
				onChangePin(id, !isPined);
			},
			icon: (
				<GradeIcon
					className={`${
						isPined ? 'text-yellow-300' : 'text-gray-400 hover:text-yellow-200'
					}`}
					sx={{ width: 16, height: 16 }}
				/>
			),
			hide: isDone,
		},
		{
			toolTitle: 'Delete',
			onChange: () => {
				onChangeDelete(id);
			},
			icon: (
				<DeleteIcon
					className="text-gray-400 hover:text-red-700"
					sx={{ width: 16, height: 16 }}
				/>
			),
			hide: false,
		},
	];

	return (
		<div
			className={`flex items-center gap-1.5 py-2 px-1.5 rounded bg-gray-50 relative ${
				isDone ? ' bg-gray-400' : 'hover:bg-gray-200'
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
					{menuList.map(
						(menu) =>
							!menu.hide && (
								<MuiTooltip title={menu.toolTitle} key={menu.toolTitle}>
									<button
										type="button"
										onClick={menu.onChange}
										className="block leading-none"
									>
										{menu.icon}
									</button>
								</MuiTooltip>
							),
					)}
				</div>
			) : null}
		</div>
	);
};

export default TodoItem;
