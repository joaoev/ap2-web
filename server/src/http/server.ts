import express from 'express';
import { prisma } from '../db/index';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas para Professores
app.get('/professores', async (req, res) => {
    try {
      const professores = await prisma.professor.findMany();
      res.json(professores);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar professores' });
    }
  });
  
  app.get('/professores/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const professor = await prisma.professor.findUnique({ where: { id } });
      if (professor) {
        res.json(professor);
      } else {
        res.status(404).json({ error: 'Professor não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o professor' });
    }
  });
  
  app.post('/professores', async (req, res) => {
    const { nome, curso, titulacao, ai, universidade } = req.body;
    try {
      const novoProfessor = await prisma.professor.create({
        data: { nome, curso, titulacao, ai, universidade }
      });
      res.status(201).json(novoProfessor);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar professor' });
    }
  });
  
  app.put('/professores/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, curso, titulacao, ai, universidade } = req.body;
    try {
      const professorAtualizado = await prisma.professor.update({
        where: { id },
        data: { nome, curso, titulacao, ai, universidade }
      });
      res.json(professorAtualizado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar professor' });
    }
  });
  
  app.delete('/professores/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.professor.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar professor' });
    }
  });
  
  // Rotas para Alunos
  
  app.get('/alunos', async (req, res) => {
    try {
      const alunos = await prisma.aluno.findMany();
      res.json(alunos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar alunos' });
    }
  });
  
  app.get('/alunos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const aluno = await prisma.aluno.findUnique({ where: { id } });
      if (aluno) {
        res.json(aluno);
      } else {
        res.status(404).json({ error: 'Aluno não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o aluno' });
    }
  });
  
  app.post('/alunos', async (req, res) => {
    const { nome, curso, ira } = req.body;
    try {
      const novoAluno = await prisma.aluno.create({
        data: { nome, curso, ira }
      });
      res.status(201).json(novoAluno);
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Erro ao criar aluno' });
    }
  });
  
  app.put('/alunos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, curso, ira } = req.body;
  
    try {
  
      const iraNumerico = parseFloat(ira);
      
      
      if (isNaN(iraNumerico) || iraNumerico < 0 || iraNumerico > 10) {
        return res.status(400).json({ error: 'O valor do IRA deve ser um número entre 0 e 10' });
      }
  
      const alunoAtualizado = await prisma.aluno.update({
        where: {
          id: id,
        },
        data: {
          nome,
          curso,
          ira: iraNumerico, 
        },
      });
  
      res.json(alunoAtualizado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar aluno' });
    }
  });
  
  app.delete('/alunos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.aluno.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar aluno' });
    }
  });
  
  const PORT = process.env.API_PORT || 3333;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });