import { Auth } from "../components/Auth/Auth";

interface Props {
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
}
function AuthScreen({ register, login }: Props) {
  return <Auth register={register} login={login} />;
}
export default AuthScreen;
