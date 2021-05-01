const fn = require('./functions')
const path = require('path')

const caminho = path.join(__dirname, '..', 'dados')
const simbolos = [
    '.', '?', '\r', '-', ',', '"', '_', '<i>', '</i>', '[', ']', '(', ')', '♪'
]

fn.lerDiretorio(caminho)
    .then(arquivos => fn.elementosTerminadosCom(arquivos, '.srt'))
    .then(fn.lerArquivos)
    .then(conteudos => conteudos.join(' '))
    .then(conteudos => conteudos.split('\n'))
    .then(linhas => fn.removerSeVazio(linhas))
    .then(linhas => fn.removerSeHouver(linhas, '-->'))
    .then(linhas => fn.removerSeApenasNumeros(linhas))
    .then(linhas => fn.removerSimbolos(linhas, simbolos))
    .then(conteudos => conteudos.join(' '))
    .then(conteudos => conteudos.split(' '))
    .then(linhas => fn.removerSeVazio(linhas))
    .then(linhas => fn.removerSeApenasNumeros(linhas))
    .then(linhas => fn.agruparPalavras(linhas))
    .then(fn.ordenarPorAtributo('qtd'))
    .then(console.log)