import "../css/crud.css"
import { useState } from "react"
import axios from "axios"

export const Criar = () => {
    const [nome, setNome] = useState("")
    const [curso, setCurso] = useState("")
    const [titulacao, setTitulacao] = useState("MESTRADO")
    const [ai, setAi] = useState({ es: false, lc: false, mc: false }) // ai = área de interesse
    const [universidade, setUniversidade] = useState({ ufc: false, ifce: false })
    const [feedback, setFeedback] = useState("") 

    const handleRadio = (event) => {
        const reset = { ufc: false, ifce: false }
        setUniversidade({
            ...reset,
            [event.target.value]: event.target.checked
        })
    }

    const handleCheckbox = (event) => {
        setAi({
            ...ai,
            [event.target.name]: event.target.checked
        })
    }

    const handleInputNome = (event) => {
        setNome(event.target.value)
    }

    const handleInputCurso = (event) => {
        setCurso(event.target.value)
    }

    const handleSelect = (event) => {
        setTitulacao(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const novoProfessor = { nome, curso, titulacao, ai, universidade }

        try {
            const response = await axios.post('http://localhost:3333/professores', novoProfessor)
            console.log(response)
            
            setFeedback("Professor cadastrado com sucesso!") 
            limparCampos()
        } catch (error) {
            setFeedback("Erro ao cadastrar o professor. Tente novamente.")
        }
    }

    const limparCampos = () => {
        setNome("")
        setCurso("")
        setTitulacao("MESTRADO")
        setAi({ es: false, lc: false, mc: false })
        setUniversidade({ ufc: false, ifce: false })
    }

    return (
        <div className="page-content">
            <h1>Criar Professor</h1>
            <form className="form-content" onSubmit={handleSubmit}>
                
                {feedback && <div className="alert alert-info">{feedback}</div>}

                <div className="mb-3">
                    <label className="form-label" htmlFor="inputNome">Nome</label>
                    <input
                        className="form-control"
                        type="text"
                        name="nome" 
                        id="inputNome"
                        value={nome}
                        onChange={handleInputNome}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="inputCurso">Curso</label>
                    <input
                        className="form-control"
                        type="text"
                        name="curso"
                        id="inputCurso"
                        value={curso}
                        onChange={handleInputCurso} 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="selectTitulacao">Titulação</label> 
                    <select
                        className="form-select"
                        value={titulacao}
                        id="selectTitulacao"
                        onChange={handleSelect}
                    >
                        <option value="GRADUACAO">GRADUAÇÃO</option>
                        <option value="MESTRADO">MESTRADO</option>
                        <option value="DOUTORADO">DOUTORADO</option>
                    </select>
                </div>

                <div>
                    <label className="form-label">Áreas de Interesse</label> 
                    <fieldset className="scheduler-border">
                        <div className="form-check">
                            <input 
                                id="idES"
                                type="checkbox"
                                className="form-check-input"
                                checked={ai.es}
                                onChange={handleCheckbox}
                                name="es"
                            />
                            <label 
                                htmlFor="idES"
                                className="form-check-label"
                            >
                                Engenharia de Software
                            </label>
                        </div>
                        <div className="form-check">
                            <input 
                                id="idLC"
                                type="checkbox"
                                className="form-check-input"
                                checked={ai.lc}
                                onChange={handleCheckbox}
                                name="lc"
                            />
                            <label 
                                htmlFor="idLC"
                                className="form-check-label"
                            >
                                Lógica Computacional
                            </label>
                        </div>
                        <div className="form-check">
                            <input 
                                id="idMC"
                                type="checkbox"
                                className="form-check-input"
                                checked={ai.mc}
                                onChange={handleCheckbox}
                                name="mc"
                            />
                            <label 
                                htmlFor="idMC"
                                className="form-check-label"
                            >
                                Matemática Computacional
                            </label>
                        </div>
                    </fieldset>
                </div>

                <div>
                    <label className="form-label">Universidade de Origem</label> 
                    <fieldset className="scheduler-border">
                        <div className="form-check">
                            <input
                                id="idUFC"
                                className="form-check-input" 
                                type="radio"
                                name="universidade"
                                checked={universidade.ufc}
                                value="ufc"
                                onChange={handleRadio}
                            />
                            <label 
                                htmlFor="idUFC"
                                className="form-check-label"
                            >
                                Universidade Federal do Ceará
                            </label>
                        </div>
                        
                        <div className="form-check">
                            <input 
                                id="idIFCE"
                                className="form-check-input"
                                type="radio"
                                name="universidade"
                                checked={universidade.ifce}
                                value="ifce"
                                onChange={handleRadio}
                            />
                            <label 
                                htmlFor="idIFCE"
                                className="form-check-label"
                            >
                                Instituto Federal do Ceará
                            </label>
                        </div>
                    </fieldset>
                </div>

                <div className="div-button-submit">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{marginLeft:0}}
                    >
                        Submeter
                    </button>
                </div>

            </form>
        </div>
    )
}