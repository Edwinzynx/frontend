import { Student, AttendanceRecord, DashboardStats } from './types';

// Mock Data
const STUDENTS: Student[] = [
    { id: '1', name: 'Alice Johnson', rollNumber: 'CS101', section: 'A', shape: 'Circle', color: '#3b82f6' },
    { id: '2', name: 'Bob Smith', rollNumber: 'CS102', section: 'A', shape: 'Square', color: '#ef4444' },
    { id: '3', name: 'Charlie Brown', rollNumber: 'CS103', section: 'A', shape: 'Triangle', color: '#10b981' },
    { id: '4', name: 'Diana Prince', rollNumber: 'CS104', section: 'B', shape: 'Pentagon', color: '#f59e0b' },
    { id: '5', name: 'Evan Wright', rollNumber: 'CS105', section: 'B', shape: 'Hexagon', color: '#8b5cf6' },
];

const ATTENDANCE_RECORDS: AttendanceRecord[] = [];

// Initialize some dummy attendance for the past week
const today = new Date();
for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    STUDENTS.forEach(student => {
        // Random attendance
        if (Math.random() > 0.2) {
            ATTENDANCE_RECORDS.push({
                id: `${student.id}-${dateStr}`,
                studentId: student.id,
                date: dateStr,
                status: 'Present',
                timestamp: date.toISOString(),
            });
        } else {
            ATTENDANCE_RECORDS.push({
                id: `${student.id}-${dateStr}`,
                studentId: student.id,
                date: dateStr,
                status: 'Absent',
                timestamp: date.toISOString(),
            });
        }
    });
}

export const db = {
    getStudents: async (): Promise<Student[]> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100));
        return [...STUDENTS];
    },

    getStudentById: async (id: string): Promise<Student | undefined> => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return STUDENTS.find(s => s.id === id);
    },

    getAttendance: async (date: string): Promise<AttendanceRecord[]> => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return ATTENDANCE_RECORDS.filter(r => r.date === date);
    },

    getStudentAttendance: async (studentId: string): Promise<AttendanceRecord[]> => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return ATTENDANCE_RECORDS.filter(r => r.studentId === studentId);
    },

    markAttendance: async (studentId: string, date: string, status: 'Present' | 'Absent' | 'Late'): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const existingIndex = ATTENDANCE_RECORDS.findIndex(r => r.studentId === studentId && r.date === date);
        if (existingIndex >= 0) {
            ATTENDANCE_RECORDS[existingIndex].status = status;
            ATTENDANCE_RECORDS[existingIndex].timestamp = new Date().toISOString();
        } else {
            ATTENDANCE_RECORDS.push({
                id: `${studentId}-${date}`,
                studentId,
                date,
                status,
                timestamp: new Date().toISOString(),
            });
        }
    },

    getDashboardStats: async (date: string): Promise<DashboardStats> => {
        await new Promise(resolve => setTimeout(resolve, 100));
        // Calculate stats
        const totalStudents = STUDENTS.length;
        const presentCount = ATTENDANCE_RECORDS.filter(r => r.date === date && r.status === 'Present').length;
        const absentCount = totalStudents - presentCount; // Ensure they sum up to total
        const attendanceRate = totalStudents > 0 ? (presentCount / totalStudents) * 100 : 0;

        return {
            totalStudents,
            presentCount,
            absentCount,
            attendanceRate,
        };
    },

    getStudentStats: async (studentId: string) => {
        await new Promise(resolve => setTimeout(resolve, 50));
        const records = ATTENDANCE_RECORDS.filter(r => r.studentId === studentId);
        const totalSessions = 5; // Mock total sessions
        return {
            records,
            totalSessions
        };
    }
};
