import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SessionType {
    sessionId: string | null;
    setSessionId: (id: string | null) => void;
}

const extractSessionIdFromPath = (): string | null => {
    // Assuming the sessionId is part of the URL as previously described
    const paths = window.location.pathname.split('/');
    const index = paths.findIndex((p) => p === 'c');
    return index !== -1 ? paths[index + 1] : null;
};

const SessionContext = createContext<SessionType>({ sessionId: null, setSessionId: () => { } });

export const useSession = () => useContext(SessionContext);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sessionId, setSessionId] = useState<string | null>(extractSessionIdFromPath());

    useEffect(() => {
        const checkSessionId = () => {
            const currentSessionId = extractSessionIdFromPath();
            if (currentSessionId !== sessionId) {
                setSessionId(currentSessionId);
            }
        };

        const intervalId = setInterval(checkSessionId, 100);

        // Cleanup the interval when the component is unmounted or the sessionId changes
        return () => clearInterval(intervalId);
    }, [sessionId]); // Dependency on sessionId

    return (
        <SessionContext.Provider value={{ sessionId, setSessionId }}>
            {children}
        </SessionContext.Provider>
    );
};
