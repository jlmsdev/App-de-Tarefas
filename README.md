# Lista de Tarefas com Autenticação Firebase e Firestore

Este é um projeto de lista de tarefas que utiliza a autenticação do Firebase da Google e o banco de dados Firestore para armazenar as tarefas. Cada usuário tem sua própria lista de tarefas e pode adicionar, editar e excluir tarefas. O projeto foi desenvolvido em React.js.

## Funcionalidades

- Adicionar tarefas: Os usuários podem digitar uma tarefa no campo de entrada e registrá-la na lista.
- Editar tarefas: Os usuários podem editar o conteúdo de uma tarefa existente.
- Excluir tarefas: Os usuários podem marcar uma tarefa como concluída e removê-la da lista.

## Tecnologias utilizadas

- React.js: Uma biblioteca JavaScript para criar interfaces de usuário.
- Firebase: Um conjunto de ferramentas da Google para o desenvolvimento de aplicativos web e móveis.
- Firestore: Um banco de dados NoSQL hospedado na nuvem pelo Firebase.

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter as seguintes dependências instaladas:

- Node.js: [Instalação do Node.js](https://nodejs.org)
- Firebase: [Configuração do Firebase](https://firebase.google.com/docs/web/setup)

## Instalação

Siga as etapas abaixo para executar o projeto localmente:

1. Clone o repositório do GitHub:

```bash
git clone <URL DO REPOSITÓRIO>
```

2. Navegue até o diretório do projeto:

```bash
cd <NOME DO DIRETÓRIO>
```

3. Instale as dependências do projeto:

```bash
npm install
```

4. Configure as informações de autenticação do Firebase:

No arquivo `firebaseConnection.js` localizado na pasta `services`, substitua as configurações do Firebase pelas suas próprias credenciais e informações do projeto.

5. Execute o projeto:

```bash
npm start
```

O projeto será executado localmente em `http://localhost:3000`.

## Estrutura do código

A seguir, é apresentado um trecho do código da página `admin.jsx`, que implementa as funcionalidades principais do projeto:

```javascript
// Importações dos pacotes e componentes necessários
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
    // Estado para armazenar a entrada de tarefa do usuário
    const [tarefaInput, setTarefaInput] = useState('');

    // Estado para armazenar a lista de tarefas
    const [tarefas, setTarefas] = useState([]);

    // Estado para armazenar os detalhes do usuário autenticado
    const [user, setUser] = useState({});

    // Estado para armazenar a tarefa que está sendo editada
    const [editTarefa, setEditTarefa] = useState({});

    // ...

    // Função para adicionar uma nova tarefa
    async function addTarefa(e) {
        // ...
    }

    // Função para excluir uma tarefa
    async function deletarTarefa(id) {
        // ...
    }

    // Função para editar uma tarefa
    function editarTarefa(item) {
        // ...
    }

    // Função para atualizar uma tarefa
    async function atualizarTarefa() {
        // ...
    }

    // ...

    return (
        <div className='adminContainer'>
            {/* Componente Header */}
            <Header />
            <h1>Minhas Tarefas</h1>

            {/* Formulário para adicionar/editar tarefas */}
            <form className='containerForm form' onSubmit={addTarefa}>
                {/* Campo de entrada de tarefa */}
                <textarea
                    placeholder='Digite uma tarefa'
                    value={tarefaInput}
                    onChange={(e) => setTarefaInput(e.target.value)}
                />

                {/* Botão de envio do formulário */}
                {Object.keys(editTarefa).length > 0 ? (
                    <button type='submit' className='btnSubmit' style={{ backgroundColor: '#6add39' }}>
                        Atualizar Tarefa
                    </button>
                ) : (
                    <button type='submit' className='btnSubmit'>
                        Registrar Tarefa
                    </button>
                )}
            </form>

            {/* Lista de tarefas */}
            {tarefas.map((item) => {
                return (
                    <article key={item.id} className='lista'>
                        {/* Ícone de tarefa */}
                        <MdTask className='icoTask' size={25} />

                        {/* Conteúdo da tarefa */}
                        <p>{item.tarefas}</p>

                        {/* Data de registro da tarefa */}
                        <time>
                            <FcOvertime size={30} className='icoTime' />
                            {item.registroTarefa}
                        </time>

                        {/* Botões de edição e exclusão da tarefa */}
                        <div className='areaBtn'>
                            <button onClick={() => editarTarefa(item)}>Editar</button>

                            <button className='btnDelete' onClick={() => deletarTarefa(item.id)}>
                                Concluir <AiOutlineCheck size={20} />
                            </button>
                        </div>
                    </article>
                );
            })}
        </div>
    );
}
```

Este é apenas um trecho do código, mas você pode encontrar o projeto completo no repositório do GitHub. Certifique-se de configurar corretamente as informações de autenticação do Firebase e instalar as dependências necessárias antes de executar o projeto.