import React, { useState } from 'react';
import { LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Avatar } from './Avatar';

export const ProfileMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-lg p-1.5 hover:bg-slate-800 transition-colors text-left"
      >
        <Avatar name={user.full_name} size="sm" />
        <div className="hidden md:flex flex-col">
          <span className="text-xs font-semibold text-slate-200">{user.full_name}</span>
          <span className="text-[10px] text-slate-400 font-medium">{user.role}</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-800 bg-slate-900 p-1.5 shadow-xl z-50">
          <div className="px-3 py-2 border-b border-slate-800">
            <p className="text-xs font-semibold text-slate-100">{user.full_name}</p>
            <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
          </div>
          <div className="py-1">
            <button
              onClick={() => { navigate('/profile'); setIsOpen(false); }}
              className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>Profile Settings</span>
            </button>
            <button
              onClick={() => { navigate('/settings'); setIsOpen(false); }}
              className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Preferences</span>
            </button>
          </div>
          <div className="border-t border-slate-800 pt-1">
            <button
              onClick={() => { logout(); navigate('/login'); }}
              className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
