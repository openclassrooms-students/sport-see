import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <main>
        <section className="not-found">
          <h1>404</h1>
          <p>
            <span>Oups! La page que</span> vous demandez n'existe pas.
          </p>
          <Link className="link" to="/">
            Retourner sur la page d’accueil
          </Link>
        </section>
      </main>
    </>
  );
};

export default NotFound;
