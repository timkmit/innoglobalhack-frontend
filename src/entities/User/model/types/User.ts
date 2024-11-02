import { UserRoles } from "../consts/UserRoles";

export interface User {
	id: string;
	username: string;
	avatar?: string;
	roles?: UserRoles[];
	access_token: string;
}

export interface UserSchema {
	authData?: User;

	_inited: boolean;
}
