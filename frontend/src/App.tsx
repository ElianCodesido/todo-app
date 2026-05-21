import AuthScreen from "./pages/AuthScreen";
import TodoPage from "./pages/TodoPage";
import { useAuth } from "./hooks/useAuth";
function App() {
  const { user, register, login } = useAuth();

  if (!user) {
    return <AuthScreen register={register} login={login} />;
  }

  return <TodoPage user={user} />;
}
export default App;
