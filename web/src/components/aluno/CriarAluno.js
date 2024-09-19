import "../css/crud.css";
import { useState } from "react";
import axios from "axios";

export const CriarAluno = () => {
    const [nome, setNome] = useState("");
    const [curso, setCurso] = useState("");
    const [ira, setIra] = useState(0);
   
    const [feedback, setFeedback] = useState(""); 

    const handleInputNome = (event) => {
        setNome(event.target.value);
    };

    const handleSelectCurso = (event) => {
        setCurso(event.target.value);
    };

    const handleInputIra = (event) => {
        setIra(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const iraNumerico = parseFloat(ira);
        const iraFormatado = isNaN(iraNumerico) ? 0 : Math.min(Math.max(iraNumerico, 0), 10).toFixed(2);

        const novoAluno = { nome, curso, ira: parseFloat(iraFormatado) };

        try {
            const response = await axios.post('http://localhost:3333/alunos', novoAluno);
            console.log(response.data);
            
            setFeedback("Aluno cadastrado com sucesso!"); 
            limparCampos();
        } catch (error) {
            setFeedback("Erro ao cadastrar o Aluno. Tente novamente.");
        }
    };

    const limparCampos = () => {
        setNome("");
        setCurso("");
        setIra(0);
    };

    return (
        <div className="page-content">
            <h1>Criar Aluno</h1>
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
                    <label className="form-label" htmlFor="selectCurso">Curso</label>
                    <select
                        className="form-select"
                        name="curso"
                        id="selectCurso"
                        value={curso}
                        onChange={handleSelectCurso}
                    >
                        <option value="">Selecione um curso</option>
                        <option value="CC">CC</option>
                        <option value="DD">DD</option>
                        <option value="ES">ES</option>
                        <option value="SI">SI</option>
                        <option value="EC">EC</option>
                        <option value="RD">RD</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="inputIra">IRA</label>
                    <input
                        className="form-control"
                        type="text"
                        name="ira"
                        id="inputIra"
                        value={ira}
                        onChange={handleInputIra} 
                    />
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
    );
};
