import { IBoard } from "../models";

export const BOARD_DATA: IBoard = {
  id: "board-1",
  userId: "user-123",
  columns: [
    {
      id: "column-1",
      title: "Todo",
      tasks: [
        {
          id: "task-1",
          title: "Implementar API",
          description: "Criar os endpoints para gerenciamento de usuários.",
          image: "https://getbots.com.br/wp-content/uploads/2022/09/o-que-e-api-2-min.jpg",
          userId: "user-123",
        },
        {
          id: "task-4",
          title: "Definir arquitetura",
          description: "Escolher tecnologias e estruturar o projeto.",
          userId: "user-123",
        },
        {
          id: "task-5",
          title: "Criar documentação",
          description: "Escrever documentação inicial do projeto.",
          userId: "user-123",
        }
      ],
    },
    {
      id: "column-2",
      title: "In Progress",
      tasks: [
        {
          id: "task-2",
          title: "Criar UI",
          description: "Desenvolver a interface para o dashboard.",
          userId: "user-123",
        },
        {
          id: "task-6",
          title: "Integração com banco de dados",
          description: "Configurar conexão e definir queries.",
          userId: "user-123",
        },
        {
          id: "task-7",
          title: "Autenticação de usuários",
          description: "Implementar login e cadastro.",
          userId: "user-123",
        },
        {
          id: "task-8",
          title: "Criar testes automatizados",
          description: "Desenvolver testes unitários para API.",
          userId: "user-123",
        }
      ],
    },
    {
      id: "column-3",
      title: "Done",
      tasks: [
        {
          id: "task-3",
          title: "Configurar banco de dados",
          description: "Definir schema e realizar migrações.",
          userId: "user-123",
        },
        {
          id: "task-9",
          title: "Configurar CI/CD",
          description: "Automatizar deploys no GitHub Actions.",
          userId: "user-123",
        },
        {
          id: "task-10",
          title: "Finalizar wireframes",
          description: "Criar os protótipos da aplicação.",
          userId: "user-123",
        },
        {
          id: "task-11",
          title: "Otimizar performance",
          description: "Melhorar tempo de resposta da API.",
          userId: "user-123",
        },
        {
          id: "task-12",
          title: "Realizar testes de segurança",
          description: "Garantir proteção contra vulnerabilidades.",
          userId: "user-123",
        },
        {
          id: "task-13",
          title: "Publicação do MVP",
          description: "Disponibilizar versão inicial para testes.",
          userId: "user-123",
        },
        {
          id: "task-14",
          title: "Feedback dos usuários",
          description: "Coletar e analisar sugestões.",
          userId: "user-123",
        }
      ],
    },
  ],
};
