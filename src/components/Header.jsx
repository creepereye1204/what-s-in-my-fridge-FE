import Sidebar from './Sidebar';

const Header = ({ text, nickname }) => {
  return (
    <header className="flex justify-between items-center">
      <div>
        <Sidebar />
      </div>
      <div>{text}</div>
      <div>{nickname}</div>
    </header>
  );
};

export default Header;
