import React, { useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { TODO_ITEMS_KEY } from 'common/constant/localStorageKey';
import { getLocalStorage } from 'common/functions/getLocalStorage';
import useFirstMount from 'common/hooks/useFirstMount';

import InputTask from 'components/InputTask';

import TodoItem from './TodoItem';
import { IDoItem } from './types';

const HomePage = () => {
	const [allItems, setAllItems] = useState<IDoItem[]>([]);

	const { isFirstMount } = useFirstMount();
	const listItemsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setAllItems(getLocalStorage(TODO_ITEMS_KEY) || []);
	}, []);

	useEffect(() => {
		if (isFirstMount) return;

		localStorage?.setItem(TODO_ITEMS_KEY, JSON.stringify(allItems));
	}, [allItems]);

	const allItemMemo = useMemo(() => {
		const pinItems: IDoItem[] = [];
		const notPinItems: IDoItem[] = [];

		allItems.forEach((item) => {
			if (item.pin) {
				pinItems.push(item);
			} else {
				notPinItems.push(item);
			}
		});

		pinItems.sort((a, b) => {
			if (!a.pinAt || !b.pinAt) return 1;
			return a.pinAt?.getTime?.() - b.pinAt?.getTime?.();
		});

		return [notPinItems, pinItems];
	}, [allItems]);

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

	const handlePin = (id: string, value: boolean) => {
		const newItems = allItems.map((item) => {
			if (item.id !== id) return item;
			return {
				...item,
				pin: value,
				pinAt: new Date(),
			};
		});
		setAllItems(newItems);
	};

	const handleDone = (id: string) => {
		const newItems = allItems.map((item) => {
			if (item.id !== id) return item;
			return {
				...item,
				done: true,
			};
		});
		setAllItems(newItems);
	};

	const handleDelete = (id: string) => {
		const newItems = [...allItems].filter((item) => item.id !== id);
		setAllItems(newItems);
	};

	const renderItems = (items: IDoItem[]) => {
		return items?.map((item: IDoItem) => {
			return (
				<TodoItem
					key={item.id}
					id={item.id}
					isDone={!!item.done}
					isPined={!!item.pin}
					content={item.content}
					onChangePin={handlePin}
					onChangeDone={handleDone}
					onChangeDelete={handleDelete}
				/>
			);
		});
	};

	const [notPinItems, pinItems] = allItemMemo;
	console.log(pinItems);

	return (
		<div className="w-screen h-screen bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center p-4">
			<div className="w-full max-w-sm bg-white shadow shadow-gray-700 rounded p-2">
				<div className="flex flex-col pt-1 gap-4 min-h-500 max-h-80vh">
					<div className="flex-none">
						<InputTask onCreate={handleCreate} />
					</div>

					<div className="flex-auto scroller space-y-1" ref={listItemsRef}>
						{renderItems(pinItems)}
						{renderItems(notPinItems)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
