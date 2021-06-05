import { createContext } from "react";

const AuthContext = createContext({
	auth: undefined,
	login: () => null,
	logut: () => null,
	setReloadUser: () => null,
});

export default AuthContext;
