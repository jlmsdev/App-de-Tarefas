import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { auth } from '../../services/firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Footer from "../../components/Footer";


export default function Cadastro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function cadastrarUsuario(e) {
        e.preventDefault();

        if(email === '' || password === '') {
            toast.warn(`E-mail e senha não podem ser vazios!`);
            return false;
        }

        await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            toast.success(`Cadastrado com sucesso`)
            navigate('/admin', {replace: true})
        })
        .catch((error) => {
            toast.error(`Ops, Algo deu errado. ${error}`)
        })

    }

    return(
        <div className="containerHome">
            <h1>Dois passos do seu cadastro !</h1>
            <span>Apenas e-mail e senha para usar a plataforma !</span>
            
            <form className="containerForm" onSubmit={cadastrarUsuario}>
                <input type="text"
                    placeholder="Digite um e-mail válido"
                    value={email}
                    onChange={ (e)=> setEmail(e.target.value) }
                />

                <input type="password"
                    placeholder="Crie uma senha"
                    value={password}
                    onChange={ (e)=> setPassword(e.target.value) }
                />

                <button type="submit">
                    Cadastrar
                </button>
            </form>

            <Link to='/' className="linkCadastro">
                Possui uma Conta? - Clique aqui e Faça Login
            </Link>

            <Footer />
        </div>
    );
}