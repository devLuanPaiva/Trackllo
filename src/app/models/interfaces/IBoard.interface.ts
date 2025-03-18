export interface ITask {
  id: string;
  title: string;
  description: string;
  image?: string;
  userId: string;
}

export interface IColumn {
  id: string;
  title: 'Todo' | 'In Progress' | 'Done';
  tasks: ITask[];
}

export interface IBoard {
  id: string;
  userId: string;
  columns: IColumn[];
}
