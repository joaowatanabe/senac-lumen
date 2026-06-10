// Tipos compartilhados entre client e server

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  category?: string | null;
  icon?: string | null;
  userId: string;
  createdAt: string;
  activities?: Activity[];
}

export interface Activity {
  id: string;
  title: string;
  dueDate: string | null;
  status: "pending" | "completed";
  type?: string | null;
  priority?: string;
  subjectId: string;
  userId: string;
  subject?: Subject;
  createdAt: string;
}

export interface PlannerBlock {
  id: string;
  dayOfWeek: number; // 0 = Domingo, 6 = Sábado
  durationMinutes: number;
  subjectId: string;
  userId: string;
  subject?: Subject;
}

export interface PomodoroSession {
  id: string;
  durationMinutes: number;
  completedAt: string;
  subjectId: string;
  userId: string;
  subject?: Subject;
}

// Tipos para autenticação
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  intervalDays: number;
  easeFactor: number;
  repetitions: number;
  nextReview: string;
  subjectId: string;
  userId: string;
  createdAt: string;
  subject?: Subject;
}
