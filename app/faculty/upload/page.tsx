import { Card } from '@/components/ui/Card';
import UploadArea from '@/components/faculty/UploadArea';
import ManualAttendanceForm from '@/components/faculty/ManualAttendanceForm';

export default function UploadPage() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Card
                title="Upload Classroom Image"
                description="Upload an image of the classroom to automatically mark attendance using Computer Vision."
            >
                <UploadArea />
            </Card>

            <Card
                title="Manual Attendance Entry"
                description="Manually mark or override attendance for a specific student."
            >
                <ManualAttendanceForm />
            </Card>
        </div>
    );
}
