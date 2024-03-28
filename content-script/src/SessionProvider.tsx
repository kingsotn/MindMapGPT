import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SessionType {
    sessionId: string;
    setSessionId: (id: string) => void;
}

const extractSessionIdFromHref = (href: string): string => {
    const url = new URL(href);
    const paths = url.pathname.split('/');
    const index = paths.findIndex((p) => p === 'c');
    return index !== -1 ? paths[index + 1] : "newChat";
};

const SessionContext = createContext<SessionType>({ sessionId: "newChat", setSessionId: () => { } });

export const useSession = () => useContext(SessionContext);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const location = document.location
    console.log("loc", location)
    const [sessionId, setSessionId] = useState<string>(location.href);



    useEffect(() => {
        console.log("new href", location.href)
        const checkSessionId = () => {
            const currentSessionId = extractSessionIdFromHref(location.href);
            if (currentSessionId !== sessionId || currentSessionId == "newChat") {
                setSessionId(currentSessionId);
            }

        };
        // !! Don't change this interval method. it's the only way it works!
        window.addEventListener('hashchange', checkSessionId)
        const intervalId = setInterval(checkSessionId, 1000);
        return () => clearInterval(intervalId);

        // Cleanup the interval when the component is unmounted or the sessionId changes
    }, [sessionId, location.href]); // Dependency on sessionId

    return (
        <SessionContext.Provider value={{ sessionId, setSessionId }}>
            {children}
        </SessionContext.Provider>
    );
};