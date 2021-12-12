import * as React from "react";

const authContext = React.createContext({
  authed: false,
  token: '',
  username: '',
  login: (user: string, tok: string) => Promise.prototype,
  logout: () => Promise.prototype
});

function useAuth() {
  const [authed, setAuthed] = React.useState(false);
  const [token, setToken] = React.useState('');
  const [username, setUsername] = React.useState('');

  return {
    authed,
    token,
    username,
    login(user: string, tok: string): any {
      return new Promise((res) => {
        setAuthed(true);
        setUsername(user);
        setToken(tok);
        res(0);
      });
    },
    logout(): any {
      return new Promise((res) => {
        setAuthed(false);
        setUsername('');
        setToken('');
        res(0);
      });
    }
  };
}

export function AuthProvider({ children }: any) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
