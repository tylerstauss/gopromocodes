import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// In-memory storage for migration status
let migrationStatus = {
  inProgress: false,
  lastRun: null as Date | null,
  logs: [] as string[],
  error: null as string | null,
  success: false
};

export async function GET() {
  try {
    // Verify the user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !(session.user as any).isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin privileges required.' },
        { status: 403 }
      );
    }

    return NextResponse.json(migrationStatus);
  } catch (error: any) {
    console.error('Error getting migration status:', error);
    return NextResponse.json(
      { error: 'Failed to get migration status', details: error.message },
      { status: 500 }
    );
  }
}

// Helper function to add log entries
export function addMigrationLog(log: string) {
  migrationStatus.logs.push(`[${new Date().toISOString()}] ${log}`);
  // Keep only the last 500 log entries
  if (migrationStatus.logs.length > 500) {
    migrationStatus.logs = migrationStatus.logs.slice(-500);
  }
}

// Export for use in other files
export { migrationStatus }; 