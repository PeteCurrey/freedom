"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Shield, 
  ShieldCheck, 
  Mail,
  Search,
  MoreVertical,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await supabase
        .from('admin_profiles')
        .select('*')
        .order('role', { ascending: false });
      setUsers(data || []);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4">
            <Users size={12} /> System Node: users.admin
          </div>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-brand-white">
            User <span className="text-brand-orange">Management</span>
          </h1>
        </div>
        
        <button className="px-8 py-4 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
           <UserPlus size={14} /> Invite New Admin
        </button>
      </div>

      <div className="blueprint-border bg-brand-carbon overflow-hidden">
        <table className="w-full text-left">
           <thead>
              <tr className="bg-brand-obsidian border-b border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey">
                 <th className="p-6">Administrator</th>
                 <th className="p-6">Email / Connection</th>
                 <th className="p-6">Access Role</th>
                 <th className="p-6">Last Activity</th>
                 <th className="p-6 text-right">Control</th>
              </tr>
           </thead>
           <tbody className="font-sans text-xs">
              {users.map((user) => (
                <tr key={user.id} className="border-b border-brand-border/50 hover:bg-brand-obsidian transition-colors group">
                   <td className="p-6">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-grey group-hover:border-brand-orange group-hover:text-brand-orange transition-all">
                            <Users size={18} />
                         </div>
                         <div>
                            <span className="block font-display text-sm uppercase text-brand-white">{user.full_name || "New Admin"}</span>
                            <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest">Employee Tier 1</span>
                         </div>
                      </div>
                   </td>
                   <td className="p-6">
                      <div className="flex items-center gap-2 text-brand-white">
                        <Mail size={12} className="text-brand-orange" />
                        <span className="font-medium">{user.email}</span>
                      </div>
                   </td>
                   <td className="p-6">
                      <div className="flex items-center gap-2">
                        {user.role === 'super_admin' ? (
                          <ShieldCheck size={14} className="text-brand-orange" />
                        ) : (
                          <Shield size={14} className="text-brand-grey" />
                        )}
                        <span className={cn(
                          "font-mono text-[9px] uppercase tracking-widest",
                          user.role === 'super_admin' ? "text-brand-orange font-bold" : "text-brand-grey"
                        )}>{user.role || 'Admin'}</span>
                      </div>
                   </td>
                   <td className="p-6">
                      <span className="font-mono text-[9px] text-brand-grey uppercase">Active {new Date(user.created_at).toLocaleDateString()}</span>
                   </td>
                   <td className="p-6 text-right">
                      <div className="flex justify-end gap-4 text-brand-grey opacity-0 group-hover:opacity-100 transition-opacity">
                         {user.email !== 'pete@avorria.com' && (
                           <>
                             <button className="hover:text-brand-orange transition-colors"><MoreVertical size={16} /></button>
                             <button className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                           </>
                         )}
                         {user.email === 'pete@avorria.com' && (
                           <CheckCircle2 size={16} className="text-green-500" />
                         )}
                      </div>
                   </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr className="border-b border-brand-border/50">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-obsidian border border-brand-orange flex items-center justify-center text-brand-orange">
                          <Users size={18} />
                        </div>
                        <div>
                          <span className="block font-display text-sm uppercase text-brand-white">Pete Currey</span>
                          <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest">Super Admin</span>
                        </div>
                    </div>
                  </td>
                  <td className="p-6"><span className="font-medium text-brand-white">pete@avorria.com</span></td>
                  <td className="p-6 text-brand-orange font-mono text-[9px] uppercase tracking-widest font-bold">SUPER_ADMIN</td>
                  <td className="p-6 text-brand-grey font-mono text-[9px] uppercase">ACTIVE SYSTEM ROOT</td>
                  <td className="p-6 text-right"><CheckCircle2 className="text-green-500 inline" size={16} /></td>
                </tr>
              )}
           </tbody>
        </table>
      </div>
    </div>
  );
}
