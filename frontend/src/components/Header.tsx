interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <>
      <h1 className='nav-item'>{title}</h1>
    </>
  );
};

export default Header;
