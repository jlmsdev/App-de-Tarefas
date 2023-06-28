import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FcOvertime } from 'react-icons/fc';
import { MdTask } from 'react-icons/md'
import { AiOutlineCheck } from 'react-icons/ai'
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    deleteDoc,
    doc,
    updateDoc
} from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';

import Header from '../../components/Header';

import './admin.css';


export default function Admin() {

    const [tarefaInput, setTarefaInput] = useState('');
    const [tarefas, setTarefas] = useState([]);
    const [user, setUser] = useState({});
    const [editTarefa, setEditTarefa] = useState({});

    let dataAtual = new Date();
    let dataFormatada = `${dataAtual.toLocaleDateString()} ${dataAtual.toLocaleTimeString()}`;

    useEffect(() => {
        async function loadTarefas() {
            const userDetail = localStorage.getItem('detalheUsuario');
            setUser(JSON.parse(userDetail));

            if(userDetail) {
                const data = JSON.parse(userDetail);
                const tarefaRef = collection(db, 'tarefas');

                const queryBusca = query(tarefaRef, orderBy('created', 'desc'), where('userUid', '==', data?.uid) );

                onSnapshot(queryBusca, (snapshot) => {
                    
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefas: doc.data().tarefa,
                            registroTarefa: doc.data().tarefaRegistrada,
                            userUid: doc.data().userUid
                        })
                    })
                    setTarefas(lista);
                    
                })
            }
            
        }
        loadTarefas();
    }, [])

    async function addTarefa(e) {
        e.preventDefault();

        if(tarefaInput === '') {
            toast.warn('Antes de registrar preencha o campo !');
            return false;
        }

        if(editTarefa?.id) {
            atualizarTarefa();
            return;
        }

        await addDoc( collection(db, 'tarefas'), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid,
            tarefaRegistrada: dataFormatada
        } )
        .then(() => {
            toast.success('Tarefa Registrada !');
            setTarefaInput('');
        })
        .catch((erro) => {
            toast.error(`Ops algo deu errado ${erro}, Tarefa não registrada`);
        })
    }

    async function deletarTarefa(id) {
        const refDoc = doc(db, 'tarefas', id);
        
        await deleteDoc(refDoc)
        .then(() => {
            toast.success(`Tarefa Deletada: ${id}`);
        })
        .catch((erro) => {
            toast.error(`Ops, Algo deu errado ${erro}`);
        })
    }

    function editarTarefa(item) {
        setTarefaInput(item.tarefas);
        setEditTarefa(item);
    }


    async function atualizarTarefa() {
        const docRef = doc(db, 'tarefas', editTarefa?.id);

        await updateDoc(docRef, {
            tarefa: tarefaInput,
            tarefaRegistrada: dataFormatada
        })
        .then(() => {
            setTarefaInput('');
            setEditTarefa({});
            toast.info(`Tarefa Atualizada`);
        })
        .catch((erro) => {
            setTarefaInput('');
            setEditTarefa({});
            toast.error(`Ops, algo deu errado ${erro}`);
        })
    }

    return(
        <div className='adminContainer'>
            <Header />
            <h1>Minhas Tarefas</h1>

            <form className='containerForm form' onSubmit={addTarefa}>

                <textarea
                    placeholder='Digite uma tarefa'
                    value={tarefaInput}
                    onChange={ (e)=> setTarefaInput(e.target.value) }
                />



                {Object.keys(editTarefa).length > 0 ? ( //caso verdadeiro
                    <button type='submit' className='btnSubmit' style={ { backgroundColor: '#6add39' }}>Atualizar Tarefa</button>
                ) : ( //caso falso
                    <button type='submit' className='btnSubmit'>Registrar Tarefa</button>
                )}

            </form>

            {
                tarefas.map((item) => {
                    return(
                        <article key={item.id} className='lista'>
                            <MdTask className='icoTask' size={25}/>

                            <p> {item.tarefas}</p>

                            <time><FcOvertime size={30} className='icoTime'/>{item.registroTarefa}</time>

                            <div className='areaBtn'>
                                <button onClick={ ()=> editarTarefa(item)}>Editar</button>

                                
                                <button className='btnDelete' onClick={ () => deletarTarefa(item.id)}>
                                    Concluir <AiOutlineCheck size={20} />
                                </button>
                            </div>
                        </article>
                    );
                })
            }
        </div>
    );
}



