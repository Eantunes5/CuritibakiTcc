import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Local() {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [sobre, setSobre] = useState('');
  const [horarios, setHorarios] = useState('');
  const [ingressos, setIngressos] = useState('');
  const [endereco, setEndereco] = useState('');
  const [foto, setFoto] = useState('');
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [nota, setNota] = useState('');
  const [comentario, setComentario] = useState('');
  // eslint-disable-next-line
  const [nomeUsuario, setNomeUsuario] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        // Obtém o ID do usuário do localStorage
        const userId = localStorage.getItem('userId');
  
        // Verifica se há um usuário logado
        if (!userId) {
          console.error('Usuário não logado');
          return;
        }
  
        // Faça uma solicitação GET para buscar o nome do usuário com base no userId
        const response = await axios.get(`http://localhost:3001/user/${userId}`);
        const data = response.data;
  
        setNomeUsuario(data.nome); // Armazene o nome do usuário no estado
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchUsuario();
  }, []);
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/locals/${id}`);
        const data = response.data;

        setNome(data.nome);
        setTipo(data.tipo);
        setSobre(data.sobre);
        setHorarios(data.horarios);
        setIngressos(data.ingressos);
        setEndereco(data.endereco);
        setFoto(data.foto);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/rating/${id}`);
        const avaliacoesData = response.data;
  
        // Função para buscar as informações do usuário
        const fetchUsuario = async (userId) => {
          const response = await axios.get(`http://localhost:3001/user/${userId}`);
          return response.data;
        };
  
        // Array de promessas para buscar as informações dos usuários
        const fetchUsuarioPromises = avaliacoesData.map((avaliacao) => {
          return fetchUsuario(avaliacao.Users_id);
        });
  
        // Realiza múltiplas requisições ao mesmo tempo
        const usuariosData = await Promise.all(fetchUsuarioPromises);
  
        // Adiciona as informações do usuário em cada avaliação
        const avaliacoesComUsuario = avaliacoesData.map((avaliacao, index) => {
          return {
            ...avaliacao,
            usuario: usuariosData[index]
          };
        });
  
        setAvaliacoes(avaliacoesComUsuario);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchAvaliacoes();
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();

    // Obtém o ID do usuário do localStorage
    const userId = localStorage.getItem('userId');

    // Verifica se há um usuário logado
    if (!userId) {
        console.log('ID do usuário:', userId);
      console.error('Usuário não logado');
      return;
    }

    // Cria o objeto de avaliação com os dados necessários
    const novaAvaliacao = {
      nota: nota,
      comentario: comentario,
      tipo: 'tipo da avaliação', // Defina o tipo da avaliação conforme necessário
      Locals_id: id,
      Users_id: userId,
    };

    enviarAvaliacao(novaAvaliacao);

    setNota('');
    setComentario('');
  }

  function enviarAvaliacao(novaAvaliacao) {
    // Obtém o token de autenticação do localStorage
    const token = localStorage.getItem('token');
  
    // Verifica se o token está disponível
    if (!token) {
      console.error('Token de autenticação não encontrado');
      return;
    }
  
    // Configura o cabeçalho com o token de autenticação
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    // Envia a requisição com o cabeçalho de autenticação
    axios
      .post('http://localhost:3001/rating', novaAvaliacao, { headers })
      .then((response) => {
        console.log('Avaliação enviada:', response.data);
        // Atualize o estado de avaliações se necessário
      })
      .catch((error) => {
        console.error('Erro ao enviar avaliação:', error);
      });
  }

  const isLoggedIn = !!localStorage.getItem('token'); // Verificar se o usuário está logado

  return (
    <div>
      <h1>{nome}</h1>
      <p>Tipo: {tipo}</p>
      <p>Sobre: {sobre}</p>
      <p>Horários: {horarios}</p>
      <p>Ingressos: {ingressos}</p>
      <p>Endereço: {endereco}</p>
      <img src={foto} alt="Foto do local" />

      {isLoggedIn && (
        <div>
          <h2>Fazer uma avaliação</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Nota:
              <input
                type="number"
                value={nota}
                onChange={(event) => setNota(event.target.value)}
              />
            </label>
            <br />
            <label>
              Comentário:
              <textarea
                value={comentario}
                onChange={(event) => setComentario(event.target.value)}
              />
            </label>
            <br />
            <button type="submit">Enviar Avaliação</button>
          </form>
        </div>
      )}

      {/* Renderizar as avaliações */}
      <h2>Avaliações</h2>
      <ul>
        {avaliacoes.map((avaliacao) => (
          <li key={avaliacao._id}>
            <p>Usuário: {avaliacao.usuario.nome}</p>
            <p>Nota: {avaliacao.nota}</p>
            <p>Comentário: {avaliacao.comentario}</p>
            <p>Tipo: {avaliacao.tipo}</p>
            <p>ID do Local: {avaliacao.Locals_id}</p>
            <p>ID do Usuário: {avaliacao.Users_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Local;