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
import deleteIcon from './imgs/xmark-solid.svg'

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
  const [comentarioPaiId, setComentarioPaiId] = useState(''); 

  // eslint-disable-next-line
  const [nomeUsuario, setNomeUsuario] = useState('');
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
  const [reply, setReply] = useState({});
  const [replyTo, setReplyTo] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
    
        // Faça uma solicitação GET para buscar o nome do usuário e o status de administrador
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
  
  const handleDeleteComment = async (commentId) => {
    try {
      // Realize uma solicitação para excluir o comentário com base no commentId
      const url = `${process.env.REACT_APP_API_URL}/rating/${commentId}`;
      console.log(url);
      await axios.delete(url);
  
      // Atualize a lista de avaliações, removendo o comentário excluído
      setAvaliacoes(avaliacoes.filter((avaliacao) => avaliacao.id !== commentId));
  
      // Exiba uma mensagem de sucesso ou faça qualquer outra ação necessária
      console.log('Comentário excluído com sucesso!');
      console.log(commentId);
    } catch (error) {
      console.error('Erro ao excluir comentário:', error);
    }
  }; 

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
  
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Você precisa estar logado para fazer uma avaliação!');
      return;
    }
  
    const novaAvaliacao = {
      nota: nota,
      comentario: comentario,
      tipo: 'tipo da avaliação',
      Locals_id: id,
      Users_id: userId,
      Comentario_Pai_Id: comentarioPaiId, // Adicione o ID da avaliação pai
    };
  
    enviarAvaliacao(novaAvaliacao);
  
    setNota('');
    setComentario('');
    setComentarioPaiId(''); // Limpe o ID da avaliação pai após o envio
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

  function filterReplies(avaliacoes) {
    return avaliacoes.filter(avaliacao => avaliacao.comentario_pai_id !== '');
  }
  const respostas = filterReplies(avaliacoes);

  const openForm = (avaliacaoId) => {
    setReplyTo(avaliacaoId);
  };
  

  const closeForm = () => {
    setReplyTo(null);
  };
  

  const handleReplyChange = (avaliacaoId, event) => {
    setReply((prevState) => ({
      ...prevState,
      [avaliacaoId]: event.target.value
    }));
  };

  const handleSubmitReply = (avaliacaoId, event) => {
    event.preventDefault();

      const userId = localStorage.getItem('userId');
        if (!userId) {
          alert('Você precisa estar logado para fazer uma avaliação!');
         return;
        }
    
      const novaAvaliacao = {
        nota: '1',
        comentario: reply[avaliacaoId],
        tipo: 'resposta',
        Locals_id: id,
        Users_id: userId,
        Comentario_Pai_id: avaliacaoId, // Adicione o ID da avaliação pai
      };
        console.log(novaAvaliacao);
        enviarAvaliacao(novaAvaliacao);
      
        setNota('');
        closeForm(); // Fechar o formulário após enviar a resposta
  };
  
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
        {avaliacoes
        .filter((avaliacao) => avaliacao.Comentario_Pai_id === "")
        .map((avaliacao) => (
          <div className='card_comment'>
            <p className='card_text' id='card_text_av'>
            <div>
              <img className='icons_infos' src={userIcon} alt=''  style={{marginBottom: '-5px', width: '30px'}}/>
              {avaliacao.usuario.nome}
            </div>

            {isAdmin || avaliacao.usuario._id === localStorage.getItem('userId') ? (
              <button id='button_delete_av' title='Deletar' onClick={() => handleDeleteComment(avaliacao._id)}>
                <img className='delete_icon' src={deleteIcon} alt=''/>
              </button>
            ) : null}
            </p>
            <p className='card_text' style={{fontSize : '20px', lineHeight: '25px', color: '#f0f0f0', textTransform: 'none', marginLeft: '10px'}}>
              {avaliacao.comentario}
            </p>
          <div>
          </div>
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

            <div>
            {respostas
            .filter((resposta) => resposta.Comentario_Pai_Id === avaliacao.id)
            .map(resposta => (
              <div key={resposta._id} className="card_resposta">
                <div style={{display: 'flex'}}>
                  <img className='icons_resposta' src={userIcon} alt=''  style={{marginBottom: '-5px', width: '30px'}}/>
                  <div className='text_resposta_nome'> {avaliacao.usuario.nome} </div>
                </div>
                <p className='text_resposta'>{resposta.comentario}</p>
              </div>
            ))}
            </div>

            <br></br>
            <div style={{width: '100%', border: '1px solid #a3a3a3'}}></div>
            <br></br>
            <div style={{width: '100%'}}>
              {replyTo === avaliacao._id ? (
                <form onSubmit={(event) => handleSubmitReply(avaliacao._id, event)}>
                  <textarea
                    value={reply[avaliacao._id]}
                    onChange={(event) => handleReplyChange(avaliacao._id, event)}
                    placeholder="Escreva sua resposta"
                  />
                  <button className='button_responder_av' type="submit">Enviar</button>
                  <button className='button_responder_av' onClick={closeForm}>Cancelar</button>
                </form>
              ) : (
                <button className='button_responder_av' onClick={() => openForm(avaliacao._id)}>Responder</button>
              )}
            </div>
            
          </div>
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
              <div style={{width: '100%', boxSizing: 'border-box',}}>
                <textarea
                  value={comentario}
                  onChange={(event) => setComentario(event.target.value)}
                  required
                  placeholder='Escreva seu comentário...'
                />
              </div>
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
                required
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