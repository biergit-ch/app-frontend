import React, { useEffect } from "react";
import { useAuth0 } from "../../react-auth0-spa";

const PrivateRoute = ({ component: Component, path, ...rest }: any) => {
    const { isAuthenticated, loginWithRedirect }: any = useAuth0();
    useEffect(() => {
        const fn = async () => {
            if (!isAuthenticated) {
                await loginWithRedirect({
                    appState: { targetUrl: path },
                });
            }
        };
        fn();
    }, [isAuthenticated, loginWithRedirect, path]);

    if (!isAuthenticated) { return null; }

    return (props: any) => <Component {...props} {...rest}/>;
};

export default PrivateRoute;
