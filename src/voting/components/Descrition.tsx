//componente utilizado para descrever na tela de votação qual o estabelecimento e qual o prato em que o jurado está votando
interface Descrition{
  owner: string; 
  desc: string;
  className?:string;
}

export const Descrition: React.FC<Descrition> = ({owner,desc, className}) => {
    return (
      <div className={`${className} rounded-full shadow-xl`}>
        <p className=" "> {desc} • {owner}</p>
      </div>
    );
  };
  
  export default Descrition;