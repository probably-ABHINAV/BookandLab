"use client";

import { useState } from "react";
import { changeUserRoleAction, toggleUserStatusAction } from "@/lib/actions/admin";
import { Shield, ShieldAlert, GraduationCap, Users, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function UserManagementClient({ currentUserId, initialUsers }: { currentUserId: string, initialUsers: any[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRoleChange = async (userId: string, newRole: "STUDENT" | "MENTOR" | "ADMIN") => {
    if (loadingId) return;
    setLoadingId(userId);
    setError("");

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("newRole", newRole);
      
      const res = await changeUserRoleAction(formData);
      if (res.success) {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Failed to update role");
    } finally {
      setLoadingId(null);
    }
  };

  const handleStatusToggle = async (userId: string, currentStatus: boolean) => {
    if (loadingId) return;
    setLoadingId(userId);
    setError("");

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("isActive", (!currentStatus).toString());
      
      const res = await toggleUserStatusAction(formData);
      if (res.success) {
        setUsers(users.map(u => u.id === userId ? { ...u, isActive: !currentStatus } : u));
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Failed to update status");
    } finally {
      setLoadingId(null);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "ADMIN": return <ShieldAlert className="w-5 h-5 text-rose-500" />;
      case "MENTOR": return <Users className="w-5 h-5 text-emerald-500" />;
      default: return <GraduationCap className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-xs">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Current Role</th>
                <th className="px-6 py-4">System Status</th>
                <th className="px-6 py-4">Governance Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => {
                const isSelf = u.id === currentUserId;
                const isLoading = loadingId === u.id;

                return (
                  <tr key={u.id} className={`hover:bg-slate-50 transition-colors ${!u.isActive ? 'opacity-50' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 flex items-center gap-2">
                        {u.name} {isSelf && <span className="ml-1 text-[10px] uppercase bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">You</span>}
                      </div>
                      <div className="text-slate-500 mt-1">{u.email}</div>
                      <div className="text-xs text-slate-400 mt-1">{u.assignedMetadata}</div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(u.role)}
                        <span className="font-medium text-slate-700">{u.role}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${u.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-300'}`}>
                        {u.isActive ? 'Active' : 'Suspended'}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <select
                          className="text-sm border-slate-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50"
                          value={u.role}
                          disabled={isLoading || isSelf}
                          onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                        >
                          <option value="STUDENT">Make Student</option>
                          <option value="MENTOR">Make Mentor</option>
                          <option value="ADMIN">Make Admin</option>
                        </select>
                        
                        <button
                          onClick={() => handleStatusToggle(u.id, u.isActive)}
                          disabled={isLoading || isSelf}
                          className={`text-sm font-medium px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-50 flex items-center justify-center min-w-[90px] ${
                            u.isActive 
                              ? 'border-rose-200 text-rose-600 hover:bg-rose-50' 
                              : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                          }`}
                        >
                          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (u.isActive ? 'Suspend' : 'Activate')}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    No users found in this institution.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
