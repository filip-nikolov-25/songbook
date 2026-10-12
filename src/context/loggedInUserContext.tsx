import { createContext, useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { migrateLocalFavorites } from "@/functions/favorites";

interface Props {
  children: React.ReactNode;
}

interface ContextData {
  currentUser: User | null;
  authLoading: boolean;
  setCurrentUser: (user: User | null) => void;
}

export const DefaultUserContext = createContext<ContextData>({
  currentUser: null,
  authLoading: true,
  setCurrentUser: () => {},
});

const DefaultUserProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) migrateLocalFavorites(user.uid);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <DefaultUserContext.Provider
      value={{ currentUser, authLoading, setCurrentUser }}
    >
      {children}
    </DefaultUserContext.Provider>
  );
};

export default DefaultUserProvider;
