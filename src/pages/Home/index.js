import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth';

import Footer from "../../components/Footer";



import './home.css';

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function logarApp(e) {
        e.preventDefault();

        if(email === '' || password === '') {
            toast.warn(`E-mail e senha não podem ser vazios!`);
            return false;
        }


        await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigate('/admin', { replace: true})

            toast.success('Bem Vindo de Volta.')
        })
        .catch((error) => {
            toast.error('Ops, Algo deu errado');
        })
    }


    return(
        <div className="containerHome">
            <h1>Agenda de Tarefas</h1>
            <span>Agende suas tarefas de Forma Simples e facil</span>
            
            <form className="containerForm" onSubmit={logarApp}>
                <input type="text"
                    placeholder="Digite seu E-mail"
                    value={email}
                    onChange={ (e)=> setEmail(e.target.value) }
                />

                <input type="password"
                    placeholder="**********"
                    value={password}
                    onChange={ (e)=> setPassword(e.target.value) }
                />

                <button type="submit">
                    Fazer Login
                </button>
            </form>

            <Link to='/cadastro' className="linkCadastro">
                Não possui uma conta? - Cadastre-se
            </Link>


            <Footer />
        </div>
    );
}