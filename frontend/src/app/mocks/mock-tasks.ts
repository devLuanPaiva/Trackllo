import { ITask } from '../models';

export const mockTasks: ITask[] = [
  {
    id: 'task-1',
    title: 'Criar layout',
    description: 'Criar layout do dashboard',
    userId: 'user-1',
    columnId: 'column-todo',
  },
  {
    id: 'task-2',
    title: 'Revisar código',
    description: 'Fazer code review do PR #42',
    image: 'https://via.placeholder.com/150',
    userId: 'user-2',
    columnId: 'column-in-progress',
  },
  {
    id: 'task-3',
    title: 'Deploy',
    description: 'Deploy na Vercel',
    userId: 'user-1',
    columnId: 'column-done',
  },
];
