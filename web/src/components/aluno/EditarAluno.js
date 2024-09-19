import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const EditarAluno = () => {
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [ira, setIra] = useState(0);
  const [feedback, setFeedback] = useState(""); // Para exibir mensagens de feedback

  const { id } = useParams(); // {id:1}
  const navigate = useNavigate();

  // Função para buscar o aluno a ser editado
  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/alunos/${id}`);
        const aluno = response.data;
        setNome(aluno.nome);
        setCurso(aluno.curso);
        setIra(aluno.ira);
      } catch (error) {
        setFeedback("Erro ao carregar os dados do aluno.");
      }
    };

    fetchAluno();
  }, [id]);

  const handleInputNome = (event) => {
    setNome(event.target.value);
  };

  const handleSelectCurso = (event) => {
    setCurso(event.target.value);
  };

  const handleInputIra = (event) => {
    setIra(event.target.value);
  };

  // Função para submeter a edição do aluno
  const handleSubmit = async (event) => {
    event.preventDefault();
    const iraNumerico = parseFloat(ira);
    const iraFormatado = Math.min(Math.max(iraNumerico, 0), 10).toFixed(2);
    const alunoEditado = { nome, curso, ira: parseFloat(iraFormatado) };

    try {
      await axios.put(`http://localhost:3333/alunos/${id}`, alunoEditado);
      setFeedback("Aluno atualizado com sucesso!"); // Mensagem de sucesso
      setTimeout(() => navigate("/aluno/listar"), 2000); // Redireciona para a lista após 2 segundos
    } catch (error) {
      setFeedback("Erro ao atualizar o aluno. Tente novamente."); // Mensagem de erro
    }
  };

  return (
    <div className="page-content">
      <h1>Editar Aluno</h1>

      {/* Exibe a mensagem de feedback se houver */}
      {feedback && <div className="alert alert-info">{feedback}</div>}

      <form className="form-content" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="inputNome">Nome</label>
          <input
            className="form-control"
            type="text"
            name="nome"
            id="inputNome"
            onChange={handleInputNome}
            value={nome}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="selectCurso">Curso</label>
          <select
            className="form-select"
            name="curso"
            id="selectCurso"
            onChange={handleSelectCurso}
            value={curso}
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
            type="number"
            step="0.01"
            name="ira"
            id="inputIra"
            onChange={handleInputIra}
            value={ira}
            min="0"
            max="10"
          />
        </div>

        <div className="div-button-submit">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginLeft: 0 }}
          >
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
};
