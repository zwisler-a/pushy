import {createContext} from "react";

interface TokenContext {
    token?: string;
    valid: boolean;
}

export const FirebaseToken = createContext<TokenContext>({
    valid: false,
});