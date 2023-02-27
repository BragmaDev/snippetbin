import { Navigate } from "react-router-dom";

// source: https://www.robinwieruch.de/react-router-private-routes/
// redirects the user if their logged in state is not shouldBeLoggedIn
const ProtectedRoute = ({ loggedIn, shouldBeLoggedIn = true, children }) => {
    if (loggedIn != shouldBeLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute