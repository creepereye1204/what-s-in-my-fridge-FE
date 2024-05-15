const Header = ({ text, left, right }) => {
  return (
    <header>
      <div>{left}</div>
      <div>{text}</div>
      <div>{right}</div>
    </header>
  );
};

export default Header;
