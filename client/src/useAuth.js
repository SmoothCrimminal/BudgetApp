import * as React from "react";

const authContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState(false);
  const [token, setToken] = React.useState('');
  const [username, setUsername] = React.useState('');

  return {
    authed,
    token,
    username,
    login(user, tok) {
      return new Promise((res) => {
        setAuthed(true);
        setUsername(user);
        setToken(tok);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        setUsername('');
        setToken('');
        res();
      });
    }
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
