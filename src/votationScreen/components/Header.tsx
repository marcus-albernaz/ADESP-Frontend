import logo from "/Logo_Festival1.png";

export const Header = () => {
  return (
    <header className="py-6 mb-4">
        <div className="flex ">
          <img src={logo} alt="Logo da Empresa" className="absolute top-[30px] w-[150px] h-auto " />
        </div>
      </header>
  );
};

export default Header;