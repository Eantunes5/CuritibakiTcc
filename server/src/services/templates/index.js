import fs from 'fs'

const conteudoTemplateConfirmarEmail = fs.readFileSync('src/services/templates/confirmarEmail.html', 'utf-8')


export{
    conteudoTemplateConfirmarEmail
}