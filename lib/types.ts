export type Shape = 'Circle' | 'Square' | 'Triangle' | 'Pentagon' | 'Hexagon';

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  section: string;
  shape: Shape;
  color: string; // Hex code for the shape
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Late';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string; // ISO Date string YYYY-MM-DD
  status: AttendanceStatus;
  timestamp: string; // ISO DateTime string
}

export interface ClassSession {
  id: string;
  date: string;
  topic?: string;
}

export interface DashboardStats {
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  attendanceRate: number;
}
