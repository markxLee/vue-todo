export interface IDoItem {
	id: string;
	done?: boolean;
	pin?: boolean;
	pinAt?: Date;
	content: string;
}
