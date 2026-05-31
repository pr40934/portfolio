import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
    user: any;
    session: any;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user] = useState<any>({ id: "mock-user", email: "portfolio@example.com" });
    const [session] = useState<any>({ access_token: "mock-token" });
    const [loading] = useState(false);

    const signInWithGoogle = async () => {
        console.log("Mock Sign In");
    };

    const signOut = async () => {
        console.log("Mock Sign Out");
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
