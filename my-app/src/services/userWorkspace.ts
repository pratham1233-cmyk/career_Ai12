import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import {
  CVAnalysisResult,
  JobApplication,
  LeetCodeData,
  PlatformNotification,
  SkillScore,
  StudentProfile,
} from '../types/career';
import { db } from './firebase';

export interface UserWorkspace {
  studentProfile: StudentProfile;
  skills: SkillScore[];
  leetcodeData: LeetCodeData;
  cvAnalysis: CVAnalysisResult;
  interviewReadiness: number;
  applications: JobApplication[];
  notifications: PlatformNotification[];
}

interface StoredUserWorkspace extends UserWorkspace {
  schemaVersion: 1;
}

const workspaceDocument = (userId: string) => doc(db, 'users', userId);

export const loadUserWorkspace = async (userId: string): Promise<UserWorkspace | null> => {
  const workspaceSnapshot = await getDoc(workspaceDocument(userId));

  if (!workspaceSnapshot.exists()) {
    return null;
  }

  const storedWorkspace = workspaceSnapshot.data() as Partial<StoredUserWorkspace>;
  if (storedWorkspace.schemaVersion !== 1) {
    throw new Error('The saved workspace has an unsupported or invalid schema version.');
  }

  return {
    studentProfile: storedWorkspace.studentProfile as StudentProfile,
    skills: storedWorkspace.skills as SkillScore[],
    leetcodeData: storedWorkspace.leetcodeData as LeetCodeData,
    cvAnalysis: storedWorkspace.cvAnalysis as CVAnalysisResult,
    interviewReadiness: storedWorkspace.interviewReadiness as number,
    applications: storedWorkspace.applications as JobApplication[],
    notifications: storedWorkspace.notifications as PlatformNotification[],
  };
};

export const saveUserWorkspace = async (
  userId: string,
  workspace: UserWorkspace
): Promise<void> => {
  await setDoc(
    workspaceDocument(userId),
    {
      ...workspace,
      schemaVersion: 1,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};
