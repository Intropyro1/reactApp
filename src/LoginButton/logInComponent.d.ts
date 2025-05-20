import React from "react";
interface LogInComponentProps {
    isLoggedIn: boolean;
    handleLogin: () => void;
    handleLogout: () => void;
}
export declare const LogInComponent: React.FC<LogInComponentProps>;
export default LogInComponent;
