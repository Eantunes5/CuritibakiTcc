import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SmallHeader from './components/small_header';
import infoIcon from './imgs/circle-info-solid.svg'
import timeIcon from './imgs/clock-solid.svg';
import ticketIcon from './imgs/ticket-solid.svg';
import mapIcon from './imgs/map-solid.svg';
import starIcon from './imgs/star-solid.svg';
import emptyStarIcon from './imgs/star-regular.svg';
import userIcon from './imgs/user-solid.svg'

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
  const [iframe, setIframe] = useState('');

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
        const url = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${url}/user/${userId}`);
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
        const url = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${url}/locals/${id}`);
        const data = response.data;

        setNome(data.nome);
        setTipo(data.tipo);
        setSobre(data.sobre);
        setHorarios(data.horarios);
        setIngressos(data.ingressos);
        setEndereco(data.endereco);
        setFoto(data.foto);
        setIframe(data.iframe)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const url = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${url}/rating/${id}`);
        const avaliacoesData = response.data;
  
        // Função para buscar as informações do usuário
        const fetchUsuario = async (userId) => {
          const url = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${url}/user/${userId}`);
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
      alert('Você precisa estar logado para fazer uma avaliação!');
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
    const url = process.env.REACT_APP_API_URL;
    axios
      .post(`${url}/rating`, novaAvaliacao, { headers })
      .then((response) => {
        alert('Obrigado pela avaliação!')
        // Atualize o estado de avaliações se necessário
      })
      .catch((error) => {
        alert('Ocorreu um erro ao enviar sua avaliação. Por favor tenta novamente!')
      });
  }

  const isLoggedIn = !!localStorage.getItem('token'); // Verificar se o usuário está logado

  return (
    <div>
      <SmallHeader/>
      <div className='local_img'>
        <img src={foto} alt=''/>
      </div>
      <div className='div_name_container'>
        <div className='div_name_local'>
          <p className='ponto_name'>{nome}</p>
        </div>
      </div>
      <div className='infos_pontos_container'>
        <div className='card_ponto'>
          <p className='ponto_name'>
            <img className='icons_infos' src={infoIcon} alt=''/>
            SOBRE O LOCAL
          </p>
          <p className='ponto_infos_text'>
            {sobre}
          </p>
        </div>
        <div className='card_ponto'>
          <p className='ponto_name'>
            <img className='icons_infos' src={timeIcon} alt=''/>
            HORÁRIOS
          </p>
          <p className='ponto_infos_text'>
            {horarios}
          </p>
        </div>
        <div className='card_ponto'>
          <p className='ponto_name'>
            <img className='icons_infos' src={ticketIcon} alt=''/>
            INGRESSOS
          </p>
          <p className='ponto_infos_text'>
            {ingressos}
          </p>
        </div>
        <div className='card_ponto'>
          <p className='ponto_name'>
            <img className='icons_infos' src={mapIcon} alt=''/>
            COMO CHEGAR
          </p>
          <p className='ponto_infos_text'>
            {endereco}
            <br></br>
            <iframe src={iframe} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </p>
        </div>
      </div>
      <div className='container_comments'>
        <p className='card_text'>
          <img className='icons_infos' src={starIcon} alt=''/>
          AVALIAÇÕES
          <img className='icons_infos' src={starIcon} alt=''/>
        </p>
        <div className='container_card_comment'>
        {avaliacoes.map((avaliacao) => (
          <div className='card_comment'>
            <p className='card_text'>
            <img className='icons_infos' src={userIcon} alt=''  style={{marginBottom: '-5px', width: '30px'}}/>
            {avaliacao.usuario.nome}
            </p>
            <p className='card_text ' style={{fontSize : '20px', lineHeight: '25px', color: '#f0f0f0', textTransform: 'none', marginLeft: '10px'}}>
              {avaliacao.comentario}
            </p>
            { avaliacao.nota == '1' && (
                <p className='card_text' style={{lineHeight: '25px', marginRight: '10px', textAlign: 'end'}}>
                  <img className='icons_avaliacao' src={starIcon} alt=''/>
                  <img className='icons_avaliacao' src={emptyStarIcon} alt=''/>
                  <img className='icons_avaliacao' src={emptyStarIcon} alt=''/>
                  <img className='icons_avaliacao' src={emptyStarIcon} alt=''/>
                  <img className='icons_avaliacao' src={emptyStarIcon} alt=''/>
                </p>
              ) ||
              avaliacao.nota == '2' && (
                <p className='card_text' style={{lineHeight: '25px', marginRight: '10px', textAlign: 'end'}}>
                  <img className='icons_avaliacao' src={starIcon} alt=''/>
                  <img className='icons_avaliacao' src={starIcon} alt=''/>
                  <img className='icons_avaliacao' src={emptyStarIcon} alt=''/>
                  <img className='icons_avaliacao' src={emptyStarIcon} alt=''/>
                  <img className='icons_avaliacao' src={emptyStarIcon} alt=''/>
                </p>
              ) ||
              avaliacao.nota == '3' && (
                <p className='card_text' style={{lineHeight: '25px', marginRight: '10px', textAlign: 'end'}}>
                  <img className='icons_avaliacao' src={starIcon} alt=''/>
                  <img className='icons_avaliacao' src={starIcon} alt=''/>
                  <img className='icons_avaliacao' src={starIcon} alt=''/>
                  <img className='icons_avaliacao' src={emptyStarIcon} alt=''/>
                  <img className='icons_avaliacao' src={emptyStarIcon} alt=''/>
                </p>
              ) ||
              avaliacao.nota == '4' && (
                <p className='card_text' style={{lineHeight: '25px', marginRight: '10px', textAlign: 'end'}}>
                  <img className='icons_avaliacao' src={starIcon} alt=''/>
                  <img className='icons_avaliacao' src={starIcon} alt=''/>
                  <img className='icons_avaliacao' src={starIcon} alt=''/>
                  <img className='icons_avaliacao' src={starIcon} alt=''/>
                  <img className='icons_avaliacao' src={emptyStarIcon} alt=''/>
                </p>
              ) ||
              avaliacao.nota == '5' && (
                <p className='card_text' style={{lineHeight: '25px', marginRight: '10px', textAlign: 'end'}}>
                  <img className='icons_avaliacao' src={starIcon} alt=''/>
                  <img className='icons_avaliacao' src={starIcon} alt=''/>
                  <img className='icons_avaliacao' src={starIcon} alt=''/>
                  <img className='icons_avaliacao' src={starIcon} alt=''/>
                  <img className='icons_avaliacao' src={starIcon} alt=''/>
                </p>
              )
            }
          </div>

          // <li key={avaliacao._id}>
          //   <p>Usuário: {avaliacao.usuario.nome}</p>
          //   <p>Nota: {avaliacao.nota}</p>
          //   <p>Comentário: {avaliacao.comentario}</p>
          //   <p>Tipo: {avaliacao.tipo}</p>
          //   <p>ID do Local: {avaliacao.Locals_id}</p>
          //   <p>ID do Usuário: {avaliacao.Users_id}</p>
          // </li>
          ))}
          

            {/* COLOCA UMA VALIDAÇÃO PRA SUMIR COM ESSE SETOR, DPS EU ARRUMO OQ VAI APARECER E OQ N VAI */}


          <div className='contato_faq colored_background_opacity'>
          <p className='card_text'>
          JÁ VISITOU ESTE LOCAL? FAÇA UMA AVALIAÇÃO!
          </p>
          <form onSubmit={handleSubmit}>
            <label>
              <p className='card_text ' style={{fontSize : '20px', lineHeight: '25px', color: '#f0f0f0', textTransform: 'none', marginLeft: '10px', textAlign: 'left'}}>
                Comentário:
              </p>
              <textarea
                value={comentario}
                onChange={(event) => setComentario(event.target.value)}
              />
            </label>
            <br/>
            <label>
              <p className='card_text ' style={{fontSize : '20px', lineHeight: '25px', color: '#f0f0f0', textTransform: 'none', marginLeft: '10px', textAlign: 'left'}}>
                Nota:
                <input
                id='input_nota'
                type="number"
                value={nota}
                onChange={(event) => setNota(event.target.value)}
                min={1}
                max={5}
              />
              <button type="submit" className='enviar_avaliacao btn_submit'>Enviar Avaliação</button>
              </p>
            </label>
            
          </form>
        </div>
        </div>   
      </div>

    </div>
  );
}

export default Local;