import logo from "/Logo_Festival1.png";

export const Header = () => {
  return (
    <header className="py-5 mb-3">
        <div className="flex ">
          <img src={logo} alt="Logo da Empresa" className="absolute top-[30px] w-[180px] h-auto " />
        </div>
      </header>
  );
};

export default Header;