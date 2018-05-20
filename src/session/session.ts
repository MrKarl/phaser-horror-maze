export default interface Session {
	get(table: string, key: string): any;
	set(table: string, key: string, value: any, ...args): any;

	remove(table: string, key: string): any;
}