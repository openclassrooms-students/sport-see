const Header = ({ firstName }: { firstName?: string  }) => {
  return (
    <header className="mb-20">
      <h1 className="text-black text-5xl font-medium mb-11">
        Bonjour <span className="text-primary">{firstName}</span>
      </h1>
      <p className="text-black text-lg font-normal">
        Félicitations ! Vous avez explosé vos objectifs hier 👏
      </p>
    </header>
  );
};

export default Header;
