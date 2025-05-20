import { jsx as _jsx } from "react/jsx-runtime";
export var LogInComponent = function (_a) {
    var isLoggedIn = _a.isLoggedIn, handleLogin = _a.handleLogin, handleLogout = _a.handleLogout;
    return (_jsx("div", { className: "loginSection", children: !isLoggedIn ? (_jsx("button", { type: "button", className: "btn btn-outline-primary", onClick: handleLogin, children: "Login to Spotify" })) : (_jsx("button", { type: "button", className: "btn btn-outline-success", onClick: handleLogout, children: "Logout" })) }));
};
export default LogInComponent;
