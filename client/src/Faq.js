import './App.css';
import React from "react"
import SmallHeader from './components/small_header';
import SelectButtons from './components/select_page';
import PontosTitle from './components/pontos_title';
import CardFaq from './components/cards_faq';

function Faq() {

  return (
    <div>
      <SmallHeader/>
      <SelectButtons page='faq'/>
      <div className='div_container_cards_pontos'>
        <PontosTitle text='PERGUNTAS FREQUENTES'/>
        <div className='div_container_cards_emergencia'>
        <CardFaq
          pergunta='ONDE COMPRAR INGRESSOS PARA A LINHA DE TURISMO?'
          resposta='R: As cartelas podem ser adquiridas diretamente nos ônibus (há um cobrador na parte inferior) ou em qualquer ponto de embarque. Também é vendido na Rodoferroviária das 12h30 às 18h30 em dias úteis. O preço é de R$50 (2021). A forma de pagamento da cartela da Linha Turismo é somente em dinheiro.'
          />
        <CardFaq
          pergunta='PARA QUE SERVEM OS QR CODES?'
          resposta='R: A utilização dos QR Codes visam a praticidade para o usuário, pois assim que ele scanear, será levado para o nosso site e poderá obter informações sobre o local!'
          />
        <CardFaq
          pergunta='AS INFORMAÇÕES SÃO CONFIÁVEIS?'
          resposta='R: Sim! Todas estão sendo tiradas de fontes oficiais, sendo atualizadas sempre que necessário.'
          />

          <div className='contato_faq colored_background_opacity'>
            <p className='card_text'>
            COMO FAÇO PARA ENTRAR EM CONTATO COM OS RESPONSÁVEIS DO SITE?
            </p>
            <p className='card_text' style={{fontSize : '20px', lineHeight: '25px', color: '#f0f0f0', textTransform: 'none'}}>
            R: Nos contate através do nosso email: curitibaki_faq@dominio.com
            </p>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Faq