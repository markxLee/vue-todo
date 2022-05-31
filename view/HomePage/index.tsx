import React, { useEffect, useRef, useState } from 'react';

import {
	TODO_ITEMS_KEY,
	TODO_PIN_ITEMS_KEY,
} from '@common/constant/localStorageKey';
import { getLocalStorage } from '@common/functions/getLocalStorage';
import useFirstMount from '@common/hooks/useFirstMount';
import { flushSync } from 'react-dom';

import InputTask from '@components/InputTask';

import TodoItem from './TodoItem';
import { IDoItem } from './types';

const HomePage = () => {
	const [allItems, setAllItems] = useState<IDoItem[]>([]);
	const [pinItems, setPinItems] = useState<IDoItem[]>([]);
	const listItemsRef = useRef<HTMLDivElement>(null);

	const { isFirstMount } = useFirstMount();

	useEffect(() => {
		if (!isFirstMount) {
			localStorage.setItem(TODO_ITEMS_KEY, JSON.stringify(allItems));
			localStorage.setItem(TODO_PIN_ITEMS_KEY, JSON.stringify(pinItems));
		} else {
			setAllItems(getLocalStorage(TODO_ITEMS_KEY) || []);
			setPinItems(getLocalStorage(TODO_PIN_ITEMS_KEY) || []);
		}
	}, [allItems, pinItems]);

	const scrollBottomList = () => {
		const listItemsElement = listItemsRef.current!;
		listItemsElement.scrollTop = listItemsElement?.scrollHeight;
	};

	const handleCreate = (value = '') => {
		const newItem: IDoItem = {
			id: String(Date.now()),
			content: value,
		};
		flushSync(() => {
			setAllItems((oldState: IDoItem[]) => [...oldState, newItem]);
		});
		scrollBottomList();
	};

	const handleItemPin = (selectIndex: number, value: boolean) => {
		let newItems = [...allItems];
		const newPinItems = [...pinItems];

		if (value) {
			newItems[selectIndex] = { ...newItems[selectIndex], pin: value };
			newPinItems.push(newItems[selectIndex]);
		} else {
			const [selectItem] = newPinItems.splice(selectIndex, 1);
			newItems = allItems.map((item: IDoItem) =>
				item.id === selectItem.id ? { ...selectItem, pin: false } : item,
			);
		}
		setAllItems(newItems);
		setPinItems(newPinItems);
	};

	const handleItemDone = (selectIndex: number) => {
		const newItems = [...allItems];
		newItems[selectIndex] = { ...newItems[selectIndex], done: true };
		setAllItems(newItems);
	};

	return (
		<div className="w-screen h-screen bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center p-4">
			<div className="w-full max-w-sm bg-white shadow shadow-gray-700 rounded p-2">
				<div className="flex flex-col pt-1 gap-4 min-h-500 max-h-80vh">
					<div className="flex-none">
						<InputTask onCreate={handleCreate} />
					</div>

					<div className="flex-auto scroller space-y-1" ref={listItemsRef}>
						{pinItems?.map((item: IDoItem, index: number) => {
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
						{allItems?.map((item: IDoItem, index: number) => {
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
		</div>
	);
};

export default HomePage;
