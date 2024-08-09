import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { getUser } from '../../services/slices/authorizationSlice';

interface TProtectedProps {
  unAuth?: boolean;
  element: React.ReactElement;
}

export const ProtectedRouteElement = ({
  unAuth = false,
  element
}: TProtectedProps): JSX.Element => {
  const location = useLocation();
  const user = useSelector(getUser);

  if (!unAuth && !user)
    return <Navigate to='/login' state={{ from: location }} />;

  if (unAuth && user) {
    const { from } = location.state || { pathname: '/' };
    return <Navigate to={from} />;
  }

  return element;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ element }: { element: JSX.Element }) => (
  <ProtectedRouteElement unAuth element={element} />
);
