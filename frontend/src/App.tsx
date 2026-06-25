import TodoPage from "./pages/TodoPage";
import { useAuth } from "./hooks/useAuth";
import { Auth } from "./components/Auth/Auth";
const App = () => {
  const { user, loading, error, register, login, logout } = useAuth();

  if (!user) {
    return (
      <Auth register={register} login={login} loading={loading} error={error} />
    );
  }
  return <TodoPage logout={logout} />;
};
export default App;
