import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="container lexend">
      <h1 className="text-3xl font-bold">404 Not Found</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <div className="my-6 text-blue-600">
         <Link to={'/'}>Return Home</Link>
      </div>
     
    </div>
  );
}
