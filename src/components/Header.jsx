import Sidebar from './Sidebar';

const Header = ({ text, right }) => {
  return (
    <header>
      <div>
        <Sidebar />
      </div>
      <div>{text}</div>
      <div>{right}</div>
    </header>
  );
};

export default Header;
