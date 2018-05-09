export default interface Session {
	get(key: string): any;
	set(key: string, value: any, ...args): any;

	remove(key: string): any;
}