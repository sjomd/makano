import { createContext, useEffect, useMemo, useRef, useState } from "react";

import { supabase } from "../services/supabase";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentUserId = useRef(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      const newUserId = newSession?.user?.id ?? null;

      setSession(newSession);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const user = session?.user ?? null;

  const value = useMemo(
    () => ({ user, session, isLoading }),
    [user, session, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
