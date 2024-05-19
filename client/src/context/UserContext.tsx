import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

import Loader from "../components/Loader";

interface lesson {
  date: string;
  listening: number;
  reading: number;
  speaking: number;
  writing: number;
}

interface User {
  email: string;
  id: string;
  name: string;
  lessons: lesson[];
}

export const UserContext = createContext<User | undefined>(undefined);

type UserContextProviderType = {
  children: React.ReactNode;
};

export function UserContextProvider({ children }: UserContextProviderType) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        setLoading(false);
      });
    }
  }, []);

  if (loading) {
    return (
      <div className="LoadText">
        Loading data...
        <Loader></Loader>
      </div>
    );
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const user = useContext(UserContext);

  if (user === undefined) {
    throw new Error("user is not defined");
  }

  return user;
}
