// components/navbar.tsx
import logo from "/Logo_Festival1.png";

export const Header2 = () => {
  return (
    <header className=" py-12 relative">
        <div className="flex justify-center">
          <img src={logo} alt="Logo da Empresa" className="absolute top-[45px] w-[250px] h-auto" />
        </div>
      </header>
  );
};

export default Header2;