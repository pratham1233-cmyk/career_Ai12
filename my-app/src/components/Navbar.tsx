import React, { useState } from 'react';
import { UserRole, PlatformNotification } from '../types/career';
import {
  Compass,
  Bell,
  Briefcase,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Lock,
} from 'lucide-react';
import { User } from 'firebase/auth';

interface NavbarProps {
  activeRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  user: User | null;
  onGoogleSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  notifications: PlatformNotification[];
  onMarkNotificationRead: (id: string) => void;
  isRecruiterUnlocked?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeRole,
  onSelectRole,
  activeTab,
  onSelectTab,
  user,
  onGoogleSignIn,
  onSignOut,
  notifications,
  onMarkNotificationRead,
  isRecruiterUnlocked = false,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await onGoogleSignIn();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSigningIn(false);
    }
  };

  const studentNavItems = [
    { id: 'command-center', label: 'Command Center' },
    { id: 'practice', label: 'Coding Practice' },
    { id: 'interview-prep', label: 'Interview Prep' },
    { id: 'courses', label: 'Courses' },
    { id: 'cv-analysis', label: 'CV Analysis' },
    { id: 'trends', label: 'Industry Trends' },
    { id: 'jobs', label: 'Jobs & Matching' },
    { id: 'applications', label: 'Application Tracker' },
  ];

  const recruiterNavItems = [
    { id: 'recruiter-dashboard', label: 'Talent Pipeline' },
  ];

  const currentNavItems = activeRole === 'student' ? studentNavItems : recruiterNavItems;

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200">
      {/* Top Header Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Classic Logo */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() =>
                onSelectTab(
                  activeRole === 'student' ? 'command-center' : 'recruiter-dashboard'
                )
              }
              className="flex items-center space-x-3 text-left group"
            >
              <div className="w-9 h-9 rounded-md bg-slate-900 text-white flex items-center justify-center font-serif text-lg font-bold shadow-sm">
                C
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold tracking-tight text-slate-900 font-serif">
                    CareerAI
                  </span>
                  <span className="text-[10px] tracking-wide font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 uppercase">
                    Pro
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Career Intelligence & Technical Verification
                </p>
              </div>
            </button>
          </div>

          {/* Role Switcher Center - Student & Recruiter with Password Lock Indicator */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-md border border-slate-200 text-xs">
            <button
              onClick={() => {
                onSelectRole('student');
                onSelectTab('command-center');
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-medium transition ${
                activeRole === 'student'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Student / Seeker</span>
            </button>

            <button
              onClick={() => onSelectRole('recruiter')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-medium transition ${
                activeRole === 'recruiter'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Recruiter</span>
              {!isRecruiterUnlocked && (
                <Lock className="w-3 h-3 text-slate-400 ml-0.5" />
              )}
            </button>
          </div>

          {/* Action Tools & Auth */}
          <div className="flex items-center space-x-2.5">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-600 ring-2 ring-white" />
                )}
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-lg shadow-lg p-4 z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-semibold text-slate-900">Notifications</span>
                    <span className="text-[11px] text-slate-500">{unreadCount} unread</span>
                  </div>
                  <div className="mt-3 space-y-2 max-h-72 overflow-y-auto pr-1">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => onMarkNotificationRead(notif.id)}
                        className={`p-3 rounded-md text-xs cursor-pointer transition border ${
                          notif.read
                            ? 'bg-slate-50 border-slate-100 text-slate-500'
                            : 'bg-blue-50/50 border-blue-100 text-slate-800'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <p className="font-semibold text-slate-900">{notif.title}</p>
                          <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
                        </div>
                        <p className="mt-1 text-slate-600 leading-relaxed">{notif.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Google Authentication & Workspace status */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-slate-100 border border-slate-200 transition text-left"
                >
                  <img
                    src={user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={user.displayName || 'User'}
                    className="w-6 h-6 rounded object-cover"
                  />
                  <div className="text-xs leading-none">
                    <p className="font-medium text-slate-900 truncate max-w-[150px]">
                      Hi, {user.displayName || 'there'}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg p-3 z-50">
                    <div className="pb-3 border-b border-slate-100 text-xs">
                      <p className="font-semibold text-slate-900">{user.displayName || 'User'}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          onSignOut();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center space-x-2 px-2.5 py-1.5 rounded text-xs text-rose-600 hover:bg-rose-50 transition"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition disabled:opacity-50"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>{isSigningIn ? 'Connecting...' : 'Sign in'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Subnav Navigation - Classic Underline / Border Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto border-t border-slate-200 no-scrollbar">
          {currentNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex-1 min-w-max lg:min-w-0 text-center whitespace-nowrap px-3.5 py-2.5 text-xs font-medium border-b-2 transition ${
                activeTab === item.id
                  ? 'border-slate-900 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
