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