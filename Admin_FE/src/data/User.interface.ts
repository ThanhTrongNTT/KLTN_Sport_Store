import { Image } from "./Image.interface";

export interface User {
    id?: string;
    userName?: string;
    email?: string;
    password?: string;
    activeFlag?: boolean;
    removalFlag?: boolean;
    userProfile?: UserProfile;
}

export interface UserProfile {
    id?: string;
    name?: string;
    avatar?: Image;
    removalFlag?: boolean;
}
