//componente utilizado para descrever na tela de votação qual o estabelecimento e qual o prato em que o jurado está votando
interface Descrition{
  owner: string; 
  desc: string;
  className?:string;
}

export const Descrition: React.FC<Descrition> = ({owner,desc, className}) => {
    return (
      <div className={`${className} w-auto px-2 bg-[#7828C8] rounded-full shadow-xl/30`}>
        <p className=" "> {desc} • {owner}</p>
      </div>
    );
  };
  
  export default Descrition;