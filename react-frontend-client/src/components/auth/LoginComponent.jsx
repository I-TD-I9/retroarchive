import { useLocation } from 'react-router-dom';

function LoginPage() {
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  const BACKEND_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/api\/?$/, '');

  const googleLoginUrl = BACKEND_URL + '/auth/google?returnTo=' + from;

  return (
    <div>
      <h2>Login</h2>
      <p>You must log in to continue.</p>

      <a href={googleLoginUrl}>
        Login with Google
      </a>
    </div>
  );
}

export default LoginPage;
