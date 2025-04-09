import logo from "/Logo_Festival1.png";

export const Header = () => {
  return (
    <header className="py-12 bg-[#FA925F]">
        <div className="flex ">
          <img src={logo} alt="Logo da Empresa" className="absolute top-[45px] w-[150px] h-auto " />
        </div>
      </header>
  );
};

export default Header;