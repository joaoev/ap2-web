import "../css/crud.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const ListarAlunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [mostrarCores, setMostrarCores] = useState(false);
  const [mediaIra, setMediaIra] = useState(0);

  const fetchAlunos = async () => {
    try {
      const response = await axios.get('http://localhost:3333/alunos');
      const alunosData = response.data;
      setAlunos(alunosData);

      // Calcular a média do IRA
      const iraTotal = alunosData.reduce((acc, aluno) => acc + parseFloat(aluno.ira), 0);
      setMediaIra(iraTotal / alunosData.length);
    } catch (error) {
      setFeedback("Erro ao carregar a lista de alunos.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Deseja excluir o aluno com id = ${id}?`)) {
      try {
        await axios.delete(`http://localhost:3333/alunos/${id}`);
        setFeedback("Aluno excluído com sucesso!");
        fetchAlunos();
      } catch (error) {
        setFeedback("Erro ao excluir o aluno. Tente novamente.");
      }
    }
  };

  const toggleCores = () => {
    setMostrarCores(!mostrarCores);
  };

  const renderizarAlunos = () => {
    return alunos.map((aluno) => {
      const { id, nome, curso, ira } = aluno;
      const iraNum = parseFloat(ira);
      let rowClass = "";

      if (mostrarCores) {
        if (iraNum < 7) {
          rowClass = "row-red";
        } else if (iraNum >= 7) {
          rowClass = "row-blue";
        }
      }

      return (
        <tr key={id} className={rowClass}>
          <td>{id}</td>
          <td>{nome}</td>
          <td>{curso}</td>
          <td>{ira}</td>
          <td>
            <div className="button-content">
              <Link to={`/aluno/editar/${id}`} className="btn btn-primary">
                Editar
              </Link>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(id)}
              >
                Apagar
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  return (
    <div className="page-content">
      <h1>Listar Alunos</h1>

      {feedback && <div className="alert alert-info">{feedback}</div>}

      
      <div className="table-content">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Curso</th>
              <th>IRA</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {renderizarAlunos()}
          </tbody>
          <tfoot>
            <tr className="highlight-row">
              <td colSpan="3">Média do IRA:</td>
              <td>{mediaIra.toFixed(2)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <button
        className="toggle-colors-btn"
        onClick={toggleCores}
      >
        {mostrarCores ? "Restaurar Cores" : "Colorir Linhas"}
      </button>

    </div>
    
  );
};
