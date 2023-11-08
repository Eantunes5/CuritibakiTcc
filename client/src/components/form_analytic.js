import React, { useState, useEffect, useRef } from 'react';
import './form_analytic.css'
import acceptIcon from '../imgs/check-solid.svg'
import denyIcon from '../imgs/xmark-solid.svg'

const estadoECidade = {
  'Acre': ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá', 'Feijó'],
  'Alagoas': ['Maceió', 'Arapiraca', 'Palmeira dos Índios', 'Rio Largo', 'Penedo'],
  'Amapá': ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque', 'Porto Grande'],
  'Amazonas': ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari'],
  'Bahia': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Itabuna'],
  'Ceará': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral'],
  'Distrito Federal': ['Brasília', 'Ceilândia', 'Taguatinga', 'Samambaia', 'Gama'],
  'Espírito Santo': ['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Cachoeiro de Itapemirim'],
  'Goiás': ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia'],
  'Maranhão': ['São Luís', 'Imperatriz', 'São José de Ribamar', 'Timon', 'Caxias'],
  'Mato Grosso': ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Cáceres', 'Tangará da Serra'],
  'Mato Grosso do Sul': ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã'],
  'Minas Gerais': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim'],
  'Pará': ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Castanhal'],
  'Paraíba': ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux'],
  'Paraná': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel'],
  'Pernambuco': ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Paulista'],
  'Piauí': ['Teresina', 'Parnaíba', 'Picos', 'Piripiri', 'Campo Maior'],
  'Rio de Janeiro': ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói'],
  'Rio Grande do Norte': ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante', 'Macaíba'],
  'Rio Grande do Sul': ['Porto Alegre', 'Caxias do Sul', 'Canoas', 'Pelotas', 'Santa Maria'],
  'Rondônia': ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Vilhena', 'Cacoal'],
  'Roraima': ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'Pacaraima', 'Santa Helena de Uairén'],
  'Santa Catarina': ['Florianópolis', 'Joinville', 'São José', 'Lages', 'Criciúma'],
  'São Paulo': ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André'],
  'Sergipe': ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'Estância'],
  'Tocantins': ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional', 'Paraíso do Tocantins']
};


const estadoOrigemL = Object.keys(estadoECidade);
const cidadeOrigemL = ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá', 'Feijó', 'Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói', 'São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André'];
const estadoCivilL = ['Solteiro', 'Casado', 'Divorciado', 'Viúvo'];
const acomodacaoPrincipalL = ['Hotel', 'Airbnb', 'Pousada', 'Resort', 'Casa de familiares'];
const tempoEstadiaL = ['0-7', '8-15', '16-30', '31-60', '61-90'];
const motivoViagemL = ['Negócios', 'Turismo', 'Educação', 'Saúde', 'Religião', 'Voluntariado'];
const transporteViagemL = ['Avião', 'Carro', 'Trem', 'Ônibus', 'Navio', 'Bicicleta', 'A pé'];


function FormAnalytic(){
    const [isVisible, setIsVisible] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const divRef = useRef();
    const [formData, setFormData] = useState({
      estadoOrigem: '',
      cidadeOrigem: '',
      estadoCivil: '',
      acomodacaoPrincipal: '',
      tempoEstadia: '',
      motivoViagem: '',
      transporteViagem: '',
    });

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 3000); // div aparecerá após 3 segundos
    
        return () => {
          clearTimeout(timer);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
          setIsVisible(false);
          setIsFormVisible(false);
        }
      };
    
    useEffect(() => {
    const timer = setTimeout(() => {
        setIsVisible(true);
    }, 3000); // div aparecerá após 3 segundos

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
    };
    }, []);

    const handleOpenForm = () => {
      setIsFormVisible(true);
    };
  
    const handleCloseForm = () => {
      setIsFormVisible(false);
      setIsVisible(false);
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === 'estadoOrigem') {
        setFormData({
          ...formData,
          [name]: value,
          cidadeOrigem: '', // Reseta a cidade ao mudar o estado
        });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };

    return(
        <div>
      <div className={`overlay ${isVisible ? 'show' : ''}`} />
      <div ref={divRef} className={`content ${isVisible ? 'show' : ''}`}>
        <span class="close_form" onClick={handleCloseForm}>×</span>
        <p class="form_title">Turistando em Curitiba?</p>
        <p class="form_intro_text">Poderia responder um pequeno questionário sobre você?</p>
        {isFormVisible ? (
          <div className="form_container_local">
            <form className='form_infos_analytics'>
              <label>
                <p>Estado de Origem:</p>
                <select name="estadoOrigem" value={formData.estadoOrigem} onChange={handleInputChange}>
                  <option value="">Selecione o estado</option>
                  {estadoOrigemL.map((estado, index) => (
                    <option key={index} value={estado}>{estado}</option>
                  ))}
                </select>
              </label>
              <label>
                <p>Cidade de Origem:</p>
                <select name="cidadeOrigem" value={formData.cidadeOrigem} onChange={handleInputChange}>
                  <option value="">Selecione a cidade</option>
                  {formData.estadoOrigem && estadoECidade[formData.estadoOrigem].map((cidade, index) => (                    <option key={index} value={cidade}>{cidade}</option>
                  ))}
                </select>
              </label>
              <label>
                <p>Estado Civil:</p>
                <select name="estadoCivil" value={formData.estadoCivil} onChange={handleInputChange}>
                  <option value="">Selecione o estado civil</option>
                  {estadoCivilL.map((estadoCivil, index) => (
                    <option key={index} value={estadoCivil}>{estadoCivil}</option>
                  ))}
                </select>
              </label>
              <label>
                <p>Tipo da Acomodação:</p>
                <select name="acomodacaoPrincipal" value={formData.acomodacaoPrincipal} onChange={handleInputChange}>
                  <option value="">Selecione o tipo de acomodação</option>
                  {acomodacaoPrincipalL.map((acomodacao, index) => (
                    <option key={index} value={acomodacao}>{acomodacao}</option>
                  ))}
                </select>
              </label>
              <label>
                <p>Tempo de Estadia: (dias)</p>
                <select name="tempoEstadia" value={formData.tempoEstadia} onChange={handleInputChange}>
                  <option value="">Selecione o tempo de estadia</option>
                  {tempoEstadiaL.map((tempo, index) => (
                    <option key={index} value={tempo}>{tempo}</option>
                  ))}
                </select>
              </label>
              <label>
                <p>Motivo da Viagem:</p>
                <select name="motivoViagem" value={formData.motivoViagem} onChange={handleInputChange}>
                  <option value="">Selecione o motivo da viagem</option>
                  {motivoViagemL.map((motivo, index) => (
                    <option key={index} value={motivo}>{motivo}</option>
                  ))}
                </select>
              </label>
              <label>
                <p>Transporte para chegar na cidade:</p>
                <select name="transporteViagem" value={formData.transporteViagem} onChange={handleInputChange}>
                  <option value="">Selecione o meio de transporte</option>
                  {transporteViagemL.map((transporte, index) => (
                    <option key={index} value={transporte}>{transporte}</option>
                  ))}
                </select>
              </label>
              <div className='container_buttons_form'>
                <button type='submit' class="button_confirm_form_local">Confirmar</button>
              </div>
            </form>
          </div>
        ) : (
          <div className='container_buttons_form'>
            <button onClick={handleOpenForm} id='accept_button' className='button_form'>
              <img src={acceptIcon}></img>
            </button>
            <button onClick={handleCloseForm} id='deny_button' className='button_form'>
              <img src={denyIcon}></img>
            </button>
          </div>
        )}
      </div>
    </div>
    )
}

export default FormAnalytic;