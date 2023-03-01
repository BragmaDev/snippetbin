import { Navigate } from "react-router-dom";

// source: https://www.robinwieruch.de/react-router-private-routes/
// redirects the user if their login state is not shouldBeLoggedIn
const ProtectedRoute = ({ user, shouldBeLoggedIn = true, children }) => {
    // if the user object is not null, the user is logged in
    if ((user != null) !== shouldBeLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute