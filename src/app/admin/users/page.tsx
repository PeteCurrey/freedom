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
  CheckCircle2,
  X,
  Loader2,
  UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ full_name: '', email: '', role: 'admin' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('admin_profiles')
      .select('*')
      .order('role', { ascending: false });
    setUsers(data || []);
    setLoading(false);
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from('admin_profiles')
      .insert([newAdmin]);
    
    if (!error) {
       fetchUsers();
       setShowAddModal(false);
       setNewAdmin({ full_name: '', email: '', role: 'admin' });
    } else {
       alert("Tactical Error: " + error.message);
    }
    setSaving(false);
  };

  const toggleRole = async (id: string, currentRole: string) => {
    const newRole = currentRole === 'super_admin' ? 'admin' : 'super_admin';
    const { error } = await supabase
      .from('admin_profiles')
      .update({ role: newRole })
      .eq('id', id);
    
    if (!error) {
       setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    }
  };

  const deleteAdmin = async (id: string) => {
    if (!window.confirm("Confirm termination of admin access?")) return;
    const { error } = await supabase
      .from('admin_profiles')
      .delete()
      .eq('id', id);
    
    if (!error) {
       setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="p-8 pb-32">
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
        
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-8 py-4 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2"
        >
           <UserPlus size={14} /> Invite New Admin
        </button>
      </div>

      <div className="blueprint-border bg-brand-carbon overflow-hidden">
        <table className="w-full text-left">
           <thead>
              <tr className="bg-brand-obsidian border-b border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey">
                 <th className="p-6">Administrator</th>
                 <th className="p-6">Email / Connection</th>
                 <th className="p-6 text-center">Access Role</th>
                 <th className="p-6">Last Activity</th>
                 <th className="p-6 text-right">Control</th>
              </tr>
           </thead>
           <tbody className="font-sans text-xs">
              {loading ? (
                <tr><td colSpan={5} className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-brand-orange" /></td></tr>
              ) : users.map((user) => (
                <tr key={user.id} className="border-b border-brand-border/50 hover:bg-brand-obsidian transition-colors group">
                   <td className="p-6">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-grey group-hover:border-brand-orange group-hover:text-brand-orange transition-all overflow-hidden">
                            {user.avatar_url ? <img src={user.avatar_url} className="w-full h-full object-cover" /> : <Users size={18} />}
                         </div>
                         <div>
                            <span className="block font-display text-sm uppercase text-brand-white">{user.full_name || "New Admin"}</span>
                            <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest">
                               {user.role === 'super_admin' ? 'Level 5 Access' : 'Level 2 Access'}
                            </span>
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
                      <button 
                        onClick={() => toggleRole(user.id, user.role)}
                        className="flex items-center gap-2 mx-auto px-3 py-1 border border-brand-border hover:border-brand-orange transition-all group/role"
                      >
                        {user.role === 'super_admin' ? (
                          <ShieldCheck size={14} className="text-brand-orange" />
                        ) : (
                          <Shield size={14} className="text-brand-grey group-hover/role:text-brand-orange" />
                        )}
                        <span className={cn(
                          "font-mono text-[9px] uppercase tracking-widest transition-colors",
                          user.role === 'super_admin' ? "text-brand-orange font-bold" : "text-brand-grey group-hover/role:text-brand-orange"
                        )}>{user.role || 'Admin'}</span>
                      </button>
                   </td>
                   <td className="p-6">
                      <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest flex items-center gap-2">
                         <UserCheck size={12} className="text-emerald-500" />
                         Active {new Date(user.created_at).toLocaleDateString()}
                      </span>
                   </td>
                   <td className="p-6 text-right">
                      <div className="flex justify-end gap-4 text-brand-grey opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => deleteAdmin(user.id)} className="hover:text-red-500 transition-colors">
                           <Trash2 size={16} />
                         </button>
                      </div>
                   </td>
                </tr>
              ))}
              {users.length === 0 && !loading && (
                <tr><td colSpan={5} className="p-12 text-center font-mono text-[10px] text-brand-grey uppercase">No administrative nodes detected.</td></tr>
              )}
           </tbody>
        </table>
      </div>

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-brand-obsidian/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
           <div className="relative w-full max-w-md bg-brand-carbon border border-brand-border p-8 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="font-display text-2xl uppercase tracking-tighter">Add <span className="text-brand-orange">Admin Node</span></h2>
                 <button onClick={() => setShowAddModal(false)} className="text-brand-grey hover:text-white transition-colors"><X size={24} /></button>
              </div>

              <form onSubmit={handleAddAdmin} className="space-y-6">
                 <div className="space-y-2">
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={newAdmin.full_name}
                      onChange={(e) => setNewAdmin({ ...newAdmin, full_name: e.target.value })}
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-[12px] text-brand-white outline-none focus:border-brand-orange"
                      placeholder="e.g. John Doe"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={newAdmin.email}
                      onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-[12px] text-brand-white outline-none focus:border-brand-orange"
                      placeholder="e.g. john@amplios.co.uk"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Access Role</label>
                    <select 
                      value={newAdmin.role}
                      onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-[10px] uppercase text-brand-white outline-none focus:border-brand-orange appearance-none"
                    >
                       <option value="admin">Administrator (Level 2)</option>
                       <option value="super_admin">Super Admin (Level 5)</option>
                    </select>
                 </div>

                 <button 
                   type="submit"
                   disabled={saving}
                   className="w-full py-4 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-brand-orange transition-all mt-4"
                 >
                   {saving ? "Provisioning..." : "Provision Access"}
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
