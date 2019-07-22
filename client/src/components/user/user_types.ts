
interface UserSessionType {
  id: string;
  name: string;
  email: string;
  admin: boolean;
}

export interface UserData {
  session?: UserSessionType;
  sessionId?: string;
}
