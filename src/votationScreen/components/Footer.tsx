import sponsors from "/Patrocinadores.png"


export const Footer = () => {
  return (
    <footer className="bg-[#FFEED3] py-4 mt-8">
            <div className="flex justify-center">
              <img src={sponsors} alt="Patrocinadores" className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 h-auto object-contain" />
            </div>
    </footer>
  );
};

export default Footer;