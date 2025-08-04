import { createContext, ReactNode, useEffect, useState } from "react";
import { Profile } from "../components/models/User";
import { getProfile } from "../components/services/AccountService";

interface UserContextProps {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (error) {
        console.error("Error al obtener perfil de usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };