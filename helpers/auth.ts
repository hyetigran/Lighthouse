import jwtDecode, { JwtPayload } from 'jwt-decode';

const Auth = {
    isAuthenticated(token: string) {
        if (!token) return false;
        const decoded = jwtDecode<JwtPayload>(token);

        if (!decoded
            || !decoded.iat
            || !decoded.sub
            || !decoded.exp) return false;
        return decoded.exp > Date.now() / 1000;
    },
};

export default Auth;