import Header from '../../components/Header'
import img from "/Img-votation.png";
import { Button } from '@heroui/button';



export default function Votation() {
  
  return (
    <div className="flex flex-col min-h-screen relative bg-[#FA925F] ">
    <Header/>

    <div className="flex-col flex-grow flex items-center justify-center text-center font-bold px-6 " >
      <div className=' '>
         <img src={img} alt="Ilustação Tela Inicial Votação" className=" " />
       </div>
     <div className=''>
      <h1 className="text-3xl py-2">Estávamos esperando por você!</h1>
      <p className='text-sm'>Que bom que você veio deixar os seus votos!</p>
     <p className='text-sm pb-2'> Pressione o botão abaixo para iniciar a votação.</p>
     <Button 
     type='submit'
     className='w-full bg-[#2B1E49] text-white '
     >
      Iniciar Votação
     </Button>
     
     </div>
    </div>

    </div>
  )
}
