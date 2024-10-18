import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
