import { createContext, useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase"; 

interface Props {
  children: React.ReactNode;
}

interface ContextData {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export const DefaultUserContext = createContext<ContextData>({
  currentUser: null,
  setCurrentUser: () => {},
});

const DefaultUserProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <DefaultUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </DefaultUserContext.Provider>
  );
};

export default DefaultUserProvider;
