export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
    username?: string;
    email?: string;
    introduction?: string;
    createdAt?: string;
    id?: string;
    role: RoleType;
}
