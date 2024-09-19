import { useEffect, useState } from "react";
import axios from "axios";

export const ListarAlunosComIraAlta = () => {
  const [alunos, setAlunos] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchAlunosComIraAlta = async () => {
      try {
        const response = await axios.get('http://localhost:3333/alunos');
        const alunosFiltrados = response.data.filter(aluno => aluno.ira >= 7);
        setAlunos(alunosFiltrados);
      } catch (error) {
        setFeedback("Erro ao carregar a lista de alunos com IRA alto.");
      }
    };

    fetchAlunosComIraAlta();
  }, []);

  const renderizarAlunos = () => {
    return alunos.map((aluno) => {
      const { id, nome, curso, ira } = aluno;
      return (
        <tr key={id}>
          <th scope="row">{id}</th>
          <td>{nome}</td>
          <td>{curso}</td>
          <td>{ira}</td>
        </tr>
      );
    });
  };

  return (
    <div className="page-content">
      <h1>Alunos com IRA Maior ou Igual a 7</h1>

      {feedback && <div className="alert alert-info">{feedback}</div>}

      <div className="table-content">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Curso</th>
              <th scope="col">IRA</th>
            </tr>
          </thead>
          <tbody>
            {renderizarAlunos()}
          </tbody>
        </table>
      </div>
    </div>
  );
};
