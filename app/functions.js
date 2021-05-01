const fs = require('fs')
const path = require('path')

function lerDiretorio(caminho) {
    return new Promise((resolve, reject) => {
        try {
            let arquivos = fs.readdirSync(caminho)
            arquivos = arquivos.map(arquivo => path.join(caminho, arquivo))
            resolve(arquivos)
        }
        catch (e) {
            reject(e)
        }
    })
}

function lerArquivo(caminho){
    return new Promise((resolve, reject) => {
        try{
            const conteudo = fs.readFileSync(caminho, { encoding: 'utf-8' })
            resolve(conteudo.toString())
        }
        catch(e) {
            reject(e)
        }
    })
}

function lerArquivos(caminhos){
    return Promise.all(caminhos.map(caminho => lerArquivo(caminho)))
}

function elementosTerminadosCom(array, padrao){
    return array.filter(el => el.endsWith(padrao))
}

function removerSeVazio(array){
    return array.filter(el => el.trim())
}

function removerSeHouver(array, padrao){
    return array.filter(el => !el.includes(padrao))
}

function removerSeApenasNumeros(array){
    return array.filter(el => {
        const num = parseInt(el.trim())
        return num !== num
    })
}

function removerSimbolos(array, simbolos){
    return array.map(el => {
        return simbolos.reduce((acc, simbolo) => {
            return acc.split(simbolo).join('')
        }, el)
        // let novoTexto = el
        // simbolos.forEach(simbolo => {
        //     novoTexto = novoTexto.split(simbolo).join('')
        // })
        // return novoTexto
    })
}

function agruparPalavras(palavras){
    return Object.values(palavras.reduce((agrupamento, palavra) => {
        const p = palavra.toLowerCase()
        const qtd = agrupamento[p] ? agrupamento[p].qtd + 1 : 1
        agrupamento[p] = {elemento: p, qtd}
        return agrupamento
    }, {}))
}

function ordenarPorAtributo(attr){
    return function(array){
        const desc = (o1, o2) => o2[attr] - o1[attr]
        return array.sort(desc)
    }
}

module.exports = {
    lerDiretorio,
    lerArquivo,
    lerArquivos,
    elementosTerminadosCom,
    removerSeVazio,
    removerSeHouver,
    removerSeApenasNumeros,
    removerSimbolos,
    agruparPalavras,
    ordenarPorAtributo
}