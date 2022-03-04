let seuVotoPara = document.querySelector(".c-1-1 span")
let cargo = document.querySelector(".c-1-2 span")
let numeros = document.querySelector(".c-1-3")
let candidatoinfo = document.querySelector(".c-1-4")
let help = document.querySelector(".c-2")
let photos = document.querySelector(".c-1-right")


let etapaatual = 0
let votonum = ""
let votobranco = false
let votosDoDia = []


function iniciodaetapa(){
    let etapa = etapas[etapaatual]
    seuVotoPara.style.display = "none"
    cargo.innerHTML = etapa.etapa
    votobranco = false
    votonum = ""
    let numeroshtml = ""
    for(let i = 0; i< etapa.numeros;i++){
        if(i === 0){
            numeroshtml += `<div class="numero piscando"></div>`
        }else{
            numeroshtml += `<div class="numero"></div>`
        }
    }
    numeros.innerHTML = numeroshtml
    candidatoinfo.innerHTML = ""
    help.style.display = "none"
    photos.innerHTML = ""
}

function atualizarinterface(){
    let etapa = etapas[etapaatual]
    let procurecandidato = etapa.candidatos.filter(function(item){
        if(item.numero === votonum){
            return true
        }else{
            return false
        }
    })

    if(procurecandidato.length > 0){
        for(let i in procurecandidato){
            let candidato = procurecandidato[0]
            seuVotoPara.style.display = "block"
            let candidatoshtml = ""
            if(candidato.vice !== undefined){
                candidatoshtml += `Vice-Prefeito: ${candidato.vice}<br/>`
            }
            candidatoinfo.innerHTML = `Nome: ${candidato.nome}<br/>${candidatoshtml}Partido: ${candidato.partido}`
            help.style.display = "block"
            let fotoshtml = ""
            for(let i in candidato.foto){
                if(candidato.foto[i].small == true){
                    fotoshtml += `<div class="foto-candidato small"><img src="image/${candidato.foto[i].url}"/>${candidato.foto[i].cargo}</div>`
                } else{
                    fotoshtml += `<div class="foto-candidato"><img src="image/${candidato.foto[i].url}"/>${candidato.foto[i].cargo}</div>`
                }
            }
            photos.innerHTML = fotoshtml
        }
    } else{
        seuVotoPara.style.display = "block"
        help.style.display = "block"
        candidatoinfo.innerHTML = `<div class="aviso-grande piscando">VOTO NULO</div>`
    }
}




function digitar(num){
    let numeroselecionado = document.querySelector(".numero.piscando")

    if(numeroselecionado !== null){
        numeroselecionado.innerHTML = num
        votonum = `${votonum}${num}`

        numeroselecionado.classList.remove("piscando")
        if(numeroselecionado.nextElementSibling !== null){
            numeroselecionado.nextElementSibling.classList.add("piscando")
        } else{
            atualizarinterface()
        }
    }
}

function branco(){
    votobranco = true
    seuVotoPara.style.display = "block"
    help.style.display = "block"
    candidatoinfo.innerHTML = `<div class="aviso-grande piscando">VOTO EM BRANCO</div>`
    photos.innerHTML = ""
    numeros.innerHTML = ""
    votonum = ""
}

function corrige(){
    iniciodaetapa()
}

function confirma(){
    let etapa = etapas[etapaatual]
    let votoConfirmado = false
    if(votobranco == true){
        votoConfirmado = true
        votosDoDia.push({
            cargo: etapa.etapa,
            voto:"Branco"
        })
    } else if(votonum.length == etapa.numeros){
        votoConfirmado = true
        votosDoDia.push({
            cargo: etapa.etapa,
            voto: votonum
        })
    }
    if(votoConfirmado){
        etapaatual++
        if(etapas[etapaatual] !== undefined){
            iniciodaetapa()
        } else{
            document.querySelector(".tela-de-candidato").innerHTML = `<div class="aviso-gigante piscando">FIM!!</div>`
        }
    }   
    console.log(votosDoDia)
}

iniciodaetapa()