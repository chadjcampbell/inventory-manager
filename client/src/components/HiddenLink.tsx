import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { ReactNode } from "react";

type HiddenLinkProps = {
  children: ReactNode;
};

const ShowOnLogin = ({ children }: HiddenLinkProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};

const ShowOnLogout = ({ children }: HiddenLinkProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};

export { ShowOnLogin, ShowOnLogout };
