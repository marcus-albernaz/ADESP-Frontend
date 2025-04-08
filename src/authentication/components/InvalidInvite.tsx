import { Button } from '@heroui/button';
import emptyMail from '/empty-mail.svg'

export default function InvalidInvite() {
  return (
    <div className="flex flex-col gap-4">
        <div className="flex justify-center">
            <img src={emptyMail}></img>
        </div>
        <h1 className='text-white text-bold text-2xl font-bold text-center font-title'>Há um problema com o seu convite!</h1>
        <p className='text-white text-md text-start font-body'>Ei, detectamos que seu convite não é valido! Caso ele tenha vencido, solicite um novo convite para um Administrador.</p>
        <Button
            color='default'
            radius='none'
            size='md'
            variant='solid'
        >Voltar à Página Inicial</Button>
    </div>
  );
}
