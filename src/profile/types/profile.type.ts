import { User } from '@app/user/types/user.type';

export type ProfileType = User & { following: boolean };
