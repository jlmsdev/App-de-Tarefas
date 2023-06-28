import { useState, useEffect } from 'react';
import { HiLogout } from 'react-icons/hi';
import { BiUser } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { auth } from '../../services/firebaseConnection';
import { signOut } from 'firebase/auth';

import './header.css'


export default function Header() {
    const [usuarioLogado, setUsuarioLogado] = useState({});

    useEffect(() => {
        const detalheUsuario = JSON.parse(localStorage.getItem('detalheUsuario')) || [];
        setUsuarioLogado(detalheUsuario)
    }, [])

    async function deslogarUsuario() {
        await signOut(auth)
        .then(() => {
            localStorage.setItem('detalheUsuario', JSON.stringify({}))
            toast.success('Você Saiu');
        })
        .catch((erro) => {
            toast.error(`Ops Algo deu errado ${erro}`);
        })
    }

    return(
        <header className="containerHeader">
            <div className='infoUsuario'>

                <span className='nomeUsuario'>
                    <BiUser className='icoUsuario' size={20}/> {usuarioLogado.email}
                </span>
                <span>
                    <button onClick={deslogarUsuario} className='btnDeslogar'><HiLogout className='icoDeslogar' size={20}/> Sair</button>
                </span>

            </div>
        </header>
    )
}