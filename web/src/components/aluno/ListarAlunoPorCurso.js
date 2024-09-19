import { useEffect, useState } from "react";
import axios from "axios";

export const ListarAlunosPorCurso = () => {
  const [alunosPorCurso, setAlunosPorCurso] = useState({});
  const [feedback, setFeedback] = useState("");

  const fetchAlunosPorCurso = async () => {
    try {
      const response = await axios.get('http://localhost:3333/alunos');
      const alunos = response.data;
      const agrupados = alunos.reduce((acc, aluno) => {
        const { curso, nome, ira } = aluno;
        if (!acc[curso]) acc[curso] = [];
        acc[curso].push({ nome, ira });
        return acc;
      }, {});

      setAlunosPorCurso(agrupados);
    } catch (error) {
      setFeedback("Erro ao carregar a lista de alunos.");
    }
  };

  useEffect(() => {
    fetchAlunosPorCurso();
  }, []);

  return (
    <div className="page-content">
      <h1>Alunos por Curso</h1>
      {feedback && <div className="alert alert-info">{feedback}</div>}
      <div className="table-content">
        {Object.keys(alunosPorCurso).map((curso) => (
          <div key={curso} className="curso-section">
            <h2>{curso}</h2>
            <ul>
              {alunosPorCurso[curso].map((aluno, index) => (
                <li key={index}>
                  {aluno.nome} IRA: {aluno.ira}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
