import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "./Home";

import { Criar } from "./professor/Criar";
import { Listar } from "./professor/Listar";
import { Editar } from "./professor/Editar";

import { CriarAluno} from "./aluno/CriarAluno";
import { ListarAlunos } from "./aluno/ListarAluno";
import { EditarAluno } from "./aluno/EditarAluno";
import { ListarAlunosPorCurso } from "./aluno/ListarAlunoPorCurso";
import { ListarAlunosComIraAlta } from "./aluno/ListarAlunosComIraAlta";

const router = createBrowserRouter(
    [
        {
            path:"/",
            element: <Home />,
            children: [
                {
                    path:"professor/listar",
                    element:<Listar />
                },
                {
                    path:"professor/criar",
                    element:<Criar />
                },
                {
                    path:"professor/editar/:id",
                    element:<Editar />
                },
                {
                    path:"aluno/listar",
                    element:<ListarAlunos />
                },
                {
                    path:"aluno/criar",
                    element:<CriarAluno />
                },
                {
                    path:"aluno/editar/:id",
                    element:<EditarAluno />
                }
                ,{
                    path: "aluno/cursos",
                    element: <ListarAlunosPorCurso />
                },
                {
                    path: "aluno/ira",
                    element: <ListarAlunosComIraAlta/>
                }
            ]
        }
    ]

)

export const Main = () => {
    return (
            <RouterProvider router={router}/>
        
    )
}