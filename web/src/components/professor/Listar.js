import "../css/crud.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import axios from "axios";

export const Listar = () => {
  const [professores, setProfessores] = useState([]);
  const [feedback, setFeedback] = useState(""); 


  const fetchProfessores = async () => {
    try {
      const response = await axios.get('http://localhost:3333/professores');
      setProfessores(response.data); 
    } catch (error) {
      setFeedback("Erro ao carregar a lista de professores.");
    }
  };


  const handleDelete = async (id) => {
    if (window.confirm(`Deseja excluir o professor com id = ${id}?`)) {
      try {
        await axios.delete(`http://localhost:3333/professores/${id}`);
        setFeedback("Professor excluído com sucesso!"); 
        fetchProfessores(); 
      } catch (error) {
        setFeedback("Erro ao excluir o professor. Tente novamente."); 
      }
    }
  };

  const renderizarProfessores = () => {
    const vetorResultado = professores.map((professor) => {

      const { id, nome, curso, titulacao, universidade, ai } = professor;
  

      const universidadesSelecionadas = Object.keys(universidade)
        .filter((key) => universidade[key])
        .map((key) => (key === "ufc" ? "Universidade Federal do Ceará" : "Instituto Federal do Ceará"));
  
    
      const areasDeInteresseSelecionadas = Object.keys(ai)
        .filter((key) => ai[key])
        .map((key) => {
          if (key === "es") return "Engenharia de Software";
          if (key === "lc") return "Lógica Computacional";
          if (key === "mc") return "Matemática Computacional";
          return "";
        });
  
      return (
        <tr key={id}>
          <th scope="row">{id}</th>
          <td>{nome}</td>
          <td>{curso}</td>
          <td>{titulacao}</td>
          <td>{universidadesSelecionadas.join(", ")}</td> 
          <td>{areasDeInteresseSelecionadas.join(", ")}</td> 
          <td>
            <div className="button-content">
              <Link to={`/professor/editar/${id}`} className="btn btn-primary">
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
    return vetorResultado;
  };

  useEffect(() => {
    fetchProfessores();
  }, []);

  return (
    <div className="page-content">
      <h1>Listar Professores</h1>


      {feedback && <div className="alert alert-info">{feedback}</div>}

      <div className="table-content">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Curso</th>
              <th scope="col">Titulação</th>
              <th scope="col">Universidade</th>
              <th scope="col">Áreas de Interesse</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {renderizarProfessores()}
          </tbody>
        </table>
      </div>
    </div>
  );
};
