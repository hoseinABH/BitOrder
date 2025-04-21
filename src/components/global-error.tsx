// Common components
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { buttonVariants } from './ui/button';
// Constants
import * as Routes from '@/constants/routes';
// Types
import type { HTMLAttributes } from 'react';

function ErrorContainer({ children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center space-y-3"
      {...rest}
    >
      {children}
    </div>
  );
}
export function GlobalError() {
  const error = useRouteError();
  console.error(error);
  if (isRouteErrorResponse(error)) {
    return (
      <ErrorContainer>
        <h1 className="text-6xl font-bold">Oops!</h1>
        <h2 className="font-sans text-3xl font-bold">{error.status}</h2>
        <p className="text-xl">{error.statusText}</p>
        {error.data && <p className="text-xl">{error.data}</p>}
        <Link to={Routes.CoinList} className={buttonVariants()}>
          Back To Market
        </Link>
      </ErrorContainer>
    );
  } else {
    return (
      <ErrorContainer>
        <h1 className="text-6xl font-bold">Oops!</h1>
      </ErrorContainer>
    );
  }
}
