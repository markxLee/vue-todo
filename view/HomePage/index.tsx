import InputTask from '@components/InputTask';
import React, { useId, useState } from 'react';
import TodoItem from './TodoItem';
import { IDoItem } from './types';

const HomePage = () => {
	const [allItems, setAllItems] = useState<IDoItem[]>([]);
	const [pinItems, setPinItems] = useState<IDoItem[]>([]);

	const handleCreate = (value = '') => {
		const newItem: IDoItem = {
			id: String(Date.now()),
			content: value,
		};
		setAllItems((oldState) => [...oldState, newItem]);
	};

	const handleItemPin = (selectIndex: number, value: boolean) => {
		if (value) {
			const newItems = [...allItems];
			newItems[selectIndex] = { ...newItems[selectIndex], pin: value };
			setAllItems(newItems);
			setPinItems((oldItems) => [...oldItems, newItems[selectIndex]]);
		} else {
			const newPinItems = [...pinItems];
			const [selectItem] = newPinItems.splice(selectIndex, 1);
			const newItems = allItems.map((item) =>
				item.id === selectItem.id ? { ...selectItem, pin: false } : item,
			);
			setAllItems(newItems);
			setPinItems(newPinItems);
		}
	};

	const handleItemDone = (selectIndex: number) => {
		const newItems = [...allItems];
		newItems[selectIndex] = { ...newItems[selectIndex], done: true };
		setAllItems(newItems);
	};

	return (
		<div className="w-screen h-screen bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center p-4">
			<div className="w-full max-w-sm min-h-500 bg-white shadow shadow-gray-700 rounded p-2">
				<div className="pt-1">
					<InputTask onCreate={handleCreate} />
				</div>

				<div className="mt-8 space-y-1">
					{pinItems?.map((item, index) => {
						return (
							<TodoItem
								key={item.id}
								id={item.id}
								index={index}
								isDone={!!item.done}
								isPined={!!item.pin}
								content={item.content}
								onChangePin={handleItemPin}
								onChangeDone={handleItemDone}
							/>
						);
					})}
					{allItems?.map((item, index) => {
						if (item.pin) return null;
						return (
							<TodoItem
								key={item.id}
								id={item.id}
								index={index}
								isDone={!!item.done}
								isPined={!!item.pin}
								content={item.content}
								onChangePin={handleItemPin}
								onChangeDone={handleItemDone}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
