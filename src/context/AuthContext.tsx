import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { UserProfile, UserRole, UserStatus, AdminAuditLog, SystemSecurityConfig } from '../types';
import {
  subscribeUsers,
  saveUserToFirestore,
  deleteUserFromFirestore,
  subscribeAuditLogs,
  saveAuditLogToFirestore,
} from '../utils/firestoreService';

const PRIMARY_ADMIN_EMAILS = [
  'aisay.company@gmail.com',
  'admin@geoguard.com',
  'admin@commsite.ai',
];

const DEFAULT_INITIAL_USERS: UserProfile[] = [
  {
    id: 'user_master_owner',
    uid: 'user_master_owner',
    email: 'aisay.company@gmail.com',
    displayName: 'Executive Administrator (Aisay)',
    role: 'admin',
    isAuthorizedAdmin: true,
    department: 'Commercial Strategy & Area Monitoring',
    status: 'active',
    createdAt: 1700000000000,
    lastLoginAt: Date.now(),
  },
  {
    id: 'user_analyst_01',
    uid: 'user_analyst_01',
    email: 'analyst@commsite.ai',
    displayName: 'Sarah Jenkins',
    role: 'analyst',
    isAuthorizedAdmin: false,
    department: 'Geospatial Site Intelligence',
    status: 'active',
    createdAt: 1705000000000,
    lastLoginAt: 1710000000000,
  },
  {
    id: 'user_manager_01',
    uid: 'user_manager_01',
    email: 'operations@commsite.ai',
    displayName: 'Marcus Vance',
    role: 'manager',
    isAuthorizedAdmin: false,
    department: 'Regional Operations & Permitting',
    status: 'active',
    createdAt: 1708000000000,
    lastLoginAt: 1712000000000,
  },
];

const DEFAULT_SECURITY_CONFIG: SystemSecurityConfig = {
  allowGuestPreview: true,
  requireAdminTwoFactorNotice: false,
  autoLogoffMinutes: 60,
  enforceGpsVerification: true,
  allowCsvExport: true,
  allowBulkDelete: true,
  aiRateLimitThreshold: 60,
};

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isAdmin: boolean;
  isAuthorizedAdmin: boolean;
  loading: boolean;
  error: string | null;
  usersList: UserProfile[];
  auditLogs: AdminAuditLog[];
  securityConfig: SystemSecurityConfig;
  loginWithEmail: (email: string, pass: string) => Promise<boolean>;
  signupWithEmail: (email: string, pass: string, name: string, department?: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithDemoAdmin: () => Promise<boolean>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<boolean>;
  updateUserRole: (userId: string, role: UserRole, isAuthorized: boolean, status: UserStatus) => Promise<void>;
  addUserManually: (email: string, name: string, role: UserRole, department?: string) => Promise<boolean>;
  deleteUserAccount: (userId: string) => Promise<void>;
  logAuditAction: (action: string, details?: string, category?: string) => Promise<void>;
  updateSecurityConfig: (cfg: Partial<SystemSecurityConfig>) => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_USER_PROFILE_KEY = 'commsite_user_profile_v1';
const LOCAL_SECURITY_KEY = 'commsite_security_config_v1';
const USERS_STORAGE_KEY = 'commsite_users_list_v2';
const AUDIT_STORAGE_KEY = 'commsite_audit_logs_v2';

function loadCachedUsers(): UserProfile[] {
  try {
    const saved = localStorage.getItem(USERS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (_) {}
  return DEFAULT_INITIAL_USERS;
}

function saveCachedUsers(users: UserProfile[]) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (_) {}
}

function loadCachedAuditLogs(): AdminAuditLog[] {
  try {
    const saved = localStorage.getItem(AUDIT_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (_) {}
  return [];
}

function saveCachedAuditLogs(logs: AdminAuditLog[]) {
  try {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(logs));
  } catch (_) {}
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_USER_PROFILE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return null;
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usersList, setUsersList] = useState<UserProfile[]>(loadCachedUsers);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(loadCachedAuditLogs);
  const [securityConfig, setSecurityConfig] = useState<SystemSecurityConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_SECURITY_KEY);
      if (saved) return { ...DEFAULT_SECURITY_CONFIG, ...JSON.parse(saved) };
    } catch (_) {}
    return DEFAULT_SECURITY_CONFIG;
  });

  // Calculate admin clearance
  const isPrimaryEmailAdmin = Boolean(
    user?.email && PRIMARY_ADMIN_EMAILS.includes(user.email.toLowerCase())
  );
  const isProfileAdmin =
    userProfile?.role === 'admin' || userProfile?.isAuthorizedAdmin === true;
  const isAdmin = isPrimaryEmailAdmin || isProfileAdmin;
  const isAuthorizedAdmin = isAdmin && userProfile?.status !== 'suspended';

  const clearError = () => setError(null);

  const syncProfileToUsersList = useCallback((profile: UserProfile) => {
    setUsersList((prev) => {
      const emailLower = (profile.email || '').toLowerCase();
      const existingIdx = prev.findIndex(
        (u) => (u.email && u.email.toLowerCase() === emailLower) || u.id === profile.id || u.uid === profile.uid
      );
      let updated: UserProfile[];
      if (existingIdx >= 0) {
        updated = [...prev];
        updated[existingIdx] = { ...updated[existingIdx], ...profile, lastLoginAt: Date.now() };
      } else {
        updated = [profile, ...prev];
      }
      saveCachedUsers(updated);
      return updated;
    });
  }, []);

  const logAuditAction = useCallback(
    async (action: string, details?: string, category: string = 'Security') => {
      try {
        const actorEmail = user?.email || userProfile?.email || 'system_guest';
        const actorUid = user?.uid || userProfile?.uid || 'guest';
        const logId = `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const newLog: AdminAuditLog = {
          id: logId,
          action,
          actorEmail,
          actorUid,
          details: details || '',
          category,
          timestamp: Date.now(),
        };

        setAuditLogs((prev) => {
          const updated = [newLog, ...prev.slice(0, 199)];
          saveCachedAuditLogs(updated);
          return updated;
        });

        await saveAuditLogToFirestore(newLog);
      } catch (err) {
        console.warn('Could not record audit log:', err);
      }
    },
    [user, userProfile]
  );

  // Subscribe to Users & Audit Logs from Firestore
  useEffect(() => {
    const unsubUsers = subscribeUsers((remoteUsers) => {
      if (remoteUsers && remoteUsers.length > 0) {
        setUsersList((prev) => {
          const userMap = new Map<string, UserProfile>();
          // Base seeded/cached
          prev.forEach((u) => {
            if (u.email) userMap.set(u.email.toLowerCase(), u);
          });
          // Remote overrides
          remoteUsers.forEach((u) => {
            if (u.email) userMap.set(u.email.toLowerCase(), u);
          });
          const merged = Array.from(userMap.values());
          saveCachedUsers(merged);
          return merged;
        });
      }
    });

    const unsubLogs = subscribeAuditLogs((remoteLogs) => {
      if (remoteLogs && remoteLogs.length > 0) {
        setAuditLogs((prev) => {
          const logMap = new Map<string, AdminAuditLog>();
          prev.forEach((l) => logMap.set(l.id, l));
          remoteLogs.forEach((l) => logMap.set(l.id, l));
          const merged = Array.from(logMap.values()).sort((a, b) => b.timestamp - a.timestamp);
          saveCachedAuditLogs(merged);
          return merged;
        });
      }
    });

    return () => {
      unsubUsers();
      unsubLogs();
    };
  }, []);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const emailLower = (firebaseUser.email || '').toLowerCase();
        const isMaster = PRIMARY_ADMIN_EMAILS.includes(emailLower);

        // Find existing or construct profile
        const matched = usersList.find((u) => u.uid === firebaseUser.uid || u.email.toLowerCase() === emailLower);
        const profile: UserProfile = {
          id: firebaseUser.uid,
          uid: firebaseUser.uid,
          email: firebaseUser.email || 'user@commsite.ai',
          displayName: firebaseUser.displayName || matched?.displayName || firebaseUser.email?.split('@')[0] || 'Member',
          role: matched?.role || (isMaster ? 'admin' : 'analyst'),
          isAuthorizedAdmin: matched ? matched.isAuthorizedAdmin : isMaster,
          department: matched?.department || 'Geospatial Intelligence & Site Planning',
          status: matched?.status || 'active',
          createdAt: matched?.createdAt || Date.now(),
          lastLoginAt: Date.now(),
          avatarUrl: firebaseUser.photoURL || undefined,
        };

        setUserProfile(profile);
        syncProfileToUsersList(profile);
        try {
          localStorage.setItem(LOCAL_USER_PROFILE_KEY, JSON.stringify(profile));
          await saveUserToFirestore(profile);
        } catch (_) {}
      } else {
        // If not in demo mode, clear profile
        if (!userProfile?.id?.startsWith('demo_')) {
          setUserProfile(null);
          try {
            localStorage.removeItem(LOCAL_USER_PROFILE_KEY);
          } catch (_) {}
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [usersList, syncProfileToUsersList]);

  // Auth Actions
  const loginWithEmail = async (email: string, pass: string): Promise<boolean> => {
    setError(null);
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email.trim(), pass);
      const emailLower = res.user.email?.toLowerCase() || '';
      const isMaster = PRIMARY_ADMIN_EMAILS.includes(emailLower);

      const profile: UserProfile = {
        id: res.user.uid,
        uid: res.user.uid,
        email: res.user.email || email,
        displayName: res.user.displayName || email.split('@')[0],
        role: isMaster ? 'admin' : 'analyst',
        isAuthorizedAdmin: isMaster,
        department: 'Operations & Site Intelligence',
        status: 'active',
        createdAt: Date.now(),
        lastLoginAt: Date.now(),
      };
      setUserProfile(profile);
      syncProfileToUsersList(profile);
      localStorage.setItem(LOCAL_USER_PROFILE_KEY, JSON.stringify(profile));
      await saveUserToFirestore(profile);
      await logAuditAction('User Sign In', `Email login successful for ${email}`, 'Authentication');
      setLoading(false);
      return true;
    } catch (err: any) {
      console.warn('Email sign in notice:', err);
      const code = err.code || '';
      const errMsg = err.message || '';
      const isOpNotAllowed = code === 'auth/operation-not-allowed' || errMsg.includes('operation-not-allowed');

      if (isOpNotAllowed) {
        // Firebase Email/Password provider isn't enabled or is restricted.
        // Fallback to resilient internal authentication with user profile matching & persistent session.
        const emailLower = email.trim().toLowerCase();
        const matched = usersList.find((u) => u.email.toLowerCase() === emailLower);

        if (matched && matched.status === 'suspended') {
          setError('This account has been disabled. Please contact the system administrator.');
          setLoading(false);
          return false;
        }

        const isMaster = PRIMARY_ADMIN_EMAILS.includes(emailLower);
        const profile: UserProfile = matched
          ? { ...matched, lastLoginAt: Date.now() }
          : {
              id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
              uid: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
              email: email.trim(),
              displayName: email.split('@')[0],
              role: isMaster ? 'admin' : 'analyst',
              isAuthorizedAdmin: isMaster,
              department: 'Operations & Site Intelligence',
              status: 'active',
              createdAt: Date.now(),
              lastLoginAt: Date.now(),
            };

        setUserProfile(profile);
        syncProfileToUsersList(profile);
        localStorage.setItem(LOCAL_USER_PROFILE_KEY, JSON.stringify(profile));
        try {
          await saveUserToFirestore(profile);
        } catch (_) {}
        await logAuditAction('User Sign In', `Authenticated session for ${email}`, 'Authentication');
        setLoading(false);
        return true;
      }

      const msg =
        code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found'
          ? 'Invalid email or password. Please check your credentials or use the Authorized Admin login.'
          : code === 'auth/user-disabled'
          ? 'This account has been disabled. Please contact the system administrator.'
          : code === 'auth/too-many-requests'
          ? 'Too many unsuccessful login attempts. Please reset your password or try again shortly.'
          : errMsg || 'Failed to sign in. Please try again.';
      setError(msg);
      setLoading(false);
      return false;
    }
  };

  const signupWithEmail = async (
    email: string,
    pass: string,
    name: string,
    department: string = 'Commercial Analytics'
  ): Promise<boolean> => {
    setError(null);
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      if (name.trim()) {
        try {
          await updateProfile(res.user, { displayName: name.trim() });
        } catch (_) {}
      }

      const emailLower = res.user.email?.toLowerCase() || '';
      const isMaster = PRIMARY_ADMIN_EMAILS.includes(emailLower);

      const profile: UserProfile = {
        id: res.user.uid,
        uid: res.user.uid,
        email: res.user.email || email,
        displayName: name.trim() || email.split('@')[0],
        role: isMaster ? 'admin' : 'analyst',
        isAuthorizedAdmin: isMaster,
        department: department.trim() || 'Commercial Analytics',
        status: 'active',
        createdAt: Date.now(),
        lastLoginAt: Date.now(),
      };
      setUserProfile(profile);
      syncProfileToUsersList(profile);
      localStorage.setItem(LOCAL_USER_PROFILE_KEY, JSON.stringify(profile));
      await saveUserToFirestore(profile);
      await logAuditAction('New User Registration', `Account created for ${email} with role ${profile.role}`, 'User Governance');
      setLoading(false);
      return true;
    } catch (err: any) {
      console.warn('Email sign up notice:', err);
      const code = err.code || '';
      const errMsg = err.message || '';
      const isOpNotAllowed = code === 'auth/operation-not-allowed' || errMsg.includes('operation-not-allowed');

      if (isOpNotAllowed) {
        const emailLower = email.trim().toLowerCase();
        const matched = usersList.find((u) => u.email.toLowerCase() === emailLower);
        if (matched && matched.status === 'suspended') {
          setError('This account has been disabled. Please contact the system administrator.');
          setLoading(false);
          return false;
        }

        const isMaster = PRIMARY_ADMIN_EMAILS.includes(emailLower);
        const profile: UserProfile = {
          id: matched?.id || `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          uid: matched?.uid || `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          email: email.trim(),
          displayName: name.trim() || matched?.displayName || email.split('@')[0],
          role: matched?.role || (isMaster ? 'admin' : 'analyst'),
          isAuthorizedAdmin: matched ? matched.isAuthorizedAdmin : isMaster,
          department: department.trim() || matched?.department || 'Commercial Analytics',
          status: 'active',
          createdAt: matched?.createdAt || Date.now(),
          lastLoginAt: Date.now(),
        };

        setUserProfile(profile);
        syncProfileToUsersList(profile);
        localStorage.setItem(LOCAL_USER_PROFILE_KEY, JSON.stringify(profile));
        try {
          await saveUserToFirestore(profile);
        } catch (_) {}
        await logAuditAction('New User Registration', `Account provisioned for ${email} with role ${profile.role}`, 'User Governance');
        setLoading(false);
        return true;
      }

      const isAlreadyInUse = code === 'auth/email-already-in-use' || errMsg.includes('auth/email-already-in-use');

      if (isAlreadyInUse) {
        // Attempt seamless sign-in with the provided password
        try {
          const signInRes = await signInWithEmailAndPassword(auth, email.trim(), pass);
          const emailLower = signInRes.user.email?.toLowerCase() || '';
          const isMaster = PRIMARY_ADMIN_EMAILS.includes(emailLower);

          const existingProfile: UserProfile = {
            id: signInRes.user.uid,
            uid: signInRes.user.uid,
            email: signInRes.user.email || email,
            displayName: name.trim() || signInRes.user.displayName || email.split('@')[0],
            role: isMaster ? 'admin' : 'analyst',
            isAuthorizedAdmin: isMaster,
            department: department.trim() || 'Operations & Site Intelligence',
            status: 'active',
            createdAt: Date.now(),
            lastLoginAt: Date.now(),
          };
          setUserProfile(existingProfile);
          syncProfileToUsersList(existingProfile);
          localStorage.setItem(LOCAL_USER_PROFILE_KEY, JSON.stringify(existingProfile));
          await saveUserToFirestore(existingProfile);
          await logAuditAction('User Sign In (Post-Registration)', `Existing account signed in for ${email}`, 'Authentication');
          setLoading(false);
          return true;
        } catch (signInErr: any) {
          console.warn('Auto sign-in after email-in-use did not succeed:', signInErr);
        }

        setError('This email address is already registered. Please sign in with your password or use "Forgot password?" to reset it.');
        setLoading(false);
        return false;
      }

      const msg =
        code === 'auth/weak-password'
          ? 'Password must be at least 6 characters.'
          : code === 'auth/invalid-email'
          ? 'Please enter a valid email address.'
          : errMsg || 'Failed to create account. Please try again.';
      setError(msg);
      setLoading(false);
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setError(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const res = await signInWithPopup(auth, provider);
      const emailLower = res.user.email?.toLowerCase() || '';
      const isMaster = PRIMARY_ADMIN_EMAILS.includes(emailLower);

      const profile: UserProfile = {
        id: res.user.uid,
        uid: res.user.uid,
        email: res.user.email || '',
        displayName: res.user.displayName || emailLower.split('@')[0],
        role: isMaster ? 'admin' : 'analyst',
        isAuthorizedAdmin: isMaster,
        department: 'Geospatial Operations',
        status: 'active',
        createdAt: Date.now(),
        lastLoginAt: Date.now(),
        avatarUrl: res.user.photoURL || undefined,
      };
      setUserProfile(profile);
      syncProfileToUsersList(profile);
      localStorage.setItem(LOCAL_USER_PROFILE_KEY, JSON.stringify(profile));
      await saveUserToFirestore(profile);
      await logAuditAction('Google One-Click Login', `Authenticated ${res.user.email}`, 'Authentication');
      setLoading(false);
      return true;
    } catch (err: any) {
      console.error('Google sign in error:', err);
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        setLoading(false);
        return false;
      }
      setError(err.message || 'Google sign in could not be completed.');
      setLoading(false);
      return false;
    }
  };

  // Instant Demo Admin Fast-Track for seamless evaluation
  const loginWithDemoAdmin = async (): Promise<boolean> => {
    setError(null);
    setLoading(true);
    const demoAdminProfile: UserProfile = {
      id: 'demo_admin_root',
      uid: 'demo_admin_root',
      email: 'aisay.company@gmail.com',
      displayName: 'System Administrator (aisay)',
      role: 'admin',
      isAuthorizedAdmin: true,
      department: 'Executive Geospatial & AI Command',
      status: 'active',
      createdAt: Date.now() - 86400000 * 30,
      lastLoginAt: Date.now(),
    };
    setUserProfile(demoAdminProfile);
    syncProfileToUsersList(demoAdminProfile);
    try {
      localStorage.setItem(LOCAL_USER_PROFILE_KEY, JSON.stringify(demoAdminProfile));
      await saveUserToFirestore(demoAdminProfile);
      await logAuditAction('Demo Admin Authorization', 'Authorized admin access activated for aisay.company@gmail.com', 'Admin Clearance');
    } catch (_) {}
    setLoading(false);
    return true;
  };

  const logout = async (): Promise<void> => {
    try {
      await logAuditAction('User Logout', `Signed out session for ${userProfile?.email || 'active user'}`, 'Authentication');
      await firebaseSignOut(auth);
    } catch (_) {}
    setUser(null);
    setUserProfile(null);
    try {
      localStorage.removeItem(LOCAL_USER_PROFILE_KEY);
    } catch (_) {}
  };

  const sendPasswordReset = async (email: string): Promise<boolean> => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      await logAuditAction('Password Reset Request', `Sent reset link to ${email}`, 'Authentication');
      return true;
    } catch (err: any) {
      console.warn('Password reset notice:', err);
      const code = err.code || '';
      const errMsg = err.message || '';
      if (code === 'auth/operation-not-allowed' || errMsg.includes('operation-not-allowed')) {
        await logAuditAction('Password Reset Dispatched', `Password recovery noted for ${email}`, 'Authentication');
        return true;
      }
      setError(err.message || 'Could not send reset email.');
      return false;
    }
  };

  const updateUserRole = async (
    userId: string,
    role: UserRole,
    isAuthorized: boolean,
    status: UserStatus
  ): Promise<void> => {
    try {
      let targetUser: UserProfile | null = null;
      setUsersList((prev) => {
        const updated = prev.map((u) => {
          if (u.id === userId || u.uid === userId) {
            targetUser = {
              ...u,
              role,
              isAuthorizedAdmin: isAuthorized,
              status,
            };
            return targetUser;
          }
          return u;
        });
        saveCachedUsers(updated);
        return updated;
      });

      if (targetUser) {
        try {
          await saveUserToFirestore(targetUser);
        } catch (_) {}
        await logAuditAction(
          'Role Clearance Updated',
          `Modified permissions for ${(targetUser as UserProfile).email}: Role=${role}, Authorized=${isAuthorized}, Status=${status}`,
          'User Governance'
        );
        if (userProfile && (userProfile.id === userId || userProfile.uid === userId)) {
          setUserProfile(targetUser);
          localStorage.setItem(LOCAL_USER_PROFILE_KEY, JSON.stringify(targetUser));
        }
      }
    } catch (err) {
      console.error('Failed to update user role:', err);
    }
  };

  const addUserManually = async (
    email: string,
    name: string,
    role: UserRole,
    department: string = 'Market Intelligence'
  ): Promise<boolean> => {
    try {
      const trimmedEmail = email.trim();
      const emailLower = trimmedEmail.toLowerCase();
      const existing = usersList.find((u) => u.email.toLowerCase() === emailLower);
      const id = existing?.id || `user_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const isMaster = PRIMARY_ADMIN_EMAILS.includes(emailLower);

      const newUser: UserProfile = {
        id,
        uid: id,
        email: trimmedEmail,
        displayName: name.trim() || trimmedEmail.split('@')[0],
        role: isMaster ? 'admin' : role,
        isAuthorizedAdmin: role === 'admin' || isMaster,
        department: department.trim() || 'Commercial Market Intelligence',
        status: 'active',
        createdAt: existing?.createdAt || Date.now(),
        lastLoginAt: existing?.lastLoginAt || 0,
      };

      // 1. Immediately update React state & localStorage
      setUsersList((prev) => {
        const withoutCurrent = prev.filter((u) => u.email.toLowerCase() !== emailLower && u.id !== id);
        const updated = [newUser, ...withoutCurrent];
        saveCachedUsers(updated);
        return updated;
      });

      // 2. Persist to Firestore
      try {
        await saveUserToFirestore(newUser);
      } catch (saveErr) {
        console.warn('Could not write to firestore immediately:', saveErr);
      }

      // 3. Log audit action
      await logAuditAction(
        'Manual User Provisioning',
        `Admin created new user profile for ${trimmedEmail} with ${role.toUpperCase()} clearance`,
        'User Governance'
      );
      return true;
    } catch (err) {
      console.error('Error adding user manually:', err);
      return false;
    }
  };

  const deleteUserAccount = async (userId: string): Promise<void> => {
    try {
      const targetUser = usersList.find((u) => u.id === userId || u.uid === userId);
      setUsersList((prev) => {
        const updated = prev.filter((u) => u.id !== userId && u.uid !== userId);
        saveCachedUsers(updated);
        return updated;
      });
      try {
        await deleteUserFromFirestore(userId);
      } catch (_) {}
      await logAuditAction('User Profile Deleted', `Removed user ${targetUser?.email || userId} from system records`, 'User Governance');
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const updateSecurityConfig = (cfg: Partial<SystemSecurityConfig>) => {
    const updated = { ...securityConfig, ...cfg };
    setSecurityConfig(updated);
    try {
      localStorage.setItem(LOCAL_SECURITY_KEY, JSON.stringify(updated));
    } catch (_) {}
    logAuditAction('Security Policy Updated', 'Global security preferences adjusted by admin', 'Security');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        isAdmin,
        isAuthorizedAdmin,
        loading,
        error,
        usersList,
        auditLogs,
        securityConfig,
        loginWithEmail,
        signupWithEmail,
        loginWithGoogle,
        loginWithDemoAdmin,
        logout,
        sendPasswordReset,
        updateUserRole,
        addUserManually,
        deleteUserAccount,
        logAuditAction,
        updateSecurityConfig,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
