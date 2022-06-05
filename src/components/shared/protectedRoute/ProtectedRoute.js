export default function ProtectedRoute({ loggedIn, timeout, children }) {
    if (!loggedIn) {
        timeout();
    }
    else {
        return children;
    }
}
