export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  assignedToUserId: string;
  assignedByUserId: string;
  title: string;
  description: string;
  completed: boolean;
  priority: TodoPriority;
  createdAt: string;
  deadline: string | null;
}