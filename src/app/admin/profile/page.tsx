"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  UserCircle, 
  Mail, 
  Shield, 
  Save, 
  Key,
  Calendar,
  Camera
} from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data } = await supabase
          .from('admin_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(data);
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Update logic for profile
    setTimeout(() => setSaving(false), 1000);
  };

  if (loading) return null;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4">
          <UserCircle size={12} /> Identity Node: user.alpha
        </div>
        <h1 className="font-display text-5xl uppercase tracking-tighter text-brand-white">
          My <span className="text-brand-orange">Profile</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Avatar & Basic Info */}
        <div className="xl:col-span-1 space-y-8">
           <div className="blueprint-border p-10 bg-brand-carbon text-center relative overflow-hidden">
              <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-32 h-32 mx-auto rounded-full border-2 border-brand-orange p-1 mb-6 relative group cursor-pointer">
                  <div className="w-full h-full rounded-full bg-brand-obsidian flex items-center justify-center overflow-hidden">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <UserCircle size={64} className="text-brand-grey" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-brand-orange/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={24} className="text-brand-white" />
                  </div>
                </div>
                <h3 className="font-display text-2xl uppercase text-brand-white mb-2">{profile?.full_name || user?.email?.split('@')[0]}</h3>
                <span className="px-3 py-1 bg-brand-orange/10 border border-brand-orange text-brand-orange font-mono text-[9px] uppercase tracking-widest">
                  {profile?.role || 'Super Admin'}
                </span>
              </div>
           </div>

           <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-brand-carbon border border-brand-border">
                <Mail size={16} className="text-brand-grey" />
                <div className="flex flex-col">
                   <span className="font-mono text-[8px] text-brand-grey uppercase">Email Address</span>
                   <span className="font-mono text-[10px] text-brand-white">{user?.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-brand-carbon border border-brand-border">
                <Shield size={16} className="text-brand-grey" />
                <div className="flex flex-col">
                   <span className="font-mono text-[8px] text-brand-grey uppercase">Account Level</span>
                   <span className="font-mono text-[10px] text-brand-white uppercase">{profile?.role || 'Root Access'}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-brand-carbon border border-brand-border">
                <Calendar size={16} className="text-brand-grey" />
                <div className="flex flex-col">
                   <span className="font-mono text-[8px] text-brand-grey uppercase">Identity Verified</span>
                   <span className="font-mono text-[10px] text-brand-white underline">{new Date(user?.created_at).toLocaleDateString()}</span>
                </div>
              </div>
           </div>
        </div>

        {/* Edit Form */}
        <div className="xl:col-span-2 space-y-8">
           <form onSubmit={handleUpdate} className="blueprint-border p-8 bg-brand-carbon">
              <h2 className="font-display text-2xl uppercase mb-8 border-b border-brand-border pb-4">Credentials & Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Display Name</label>
                  <input 
                    type="text" 
                    defaultValue={profile?.full_name}
                    className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:border-brand-orange outline-none"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Identity Slug</label>
                  <input 
                    type="text" 
                    readOnly
                    value={user?.id?.substring(0, 12) + "..."}
                    className="w-full bg-brand-obsidian/50 border border-brand-border p-4 font-mono text-xs text-brand-grey outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-8 text-right">
                <button 
                  type="submit" 
                  disabled={saving}
                  className="px-8 py-4 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all inline-flex items-center gap-2"
                >
                  {saving ? "Processing..." : <><Save size={14} /> Commit Changes</>}
                </button>
              </div>

              <div className="pt-8 border-t border-brand-border">
                <h3 className="flex items-center gap-3 font-display text-lg uppercase tracking-tighter text-brand-white mb-6">
                  <Key size={18} className="text-brand-orange" /> Authentication Security
                </h3>
                <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                   <p className="font-sans text-xs text-brand-grey max-w-sm">
                     For your security, password resets and primary credential changes are handled via encrypted email authentication.
                   </p>
                   <button 
                    type="button"
                    className="px-6 py-3 border border-brand-border font-mono text-[9px] uppercase tracking-widest hover:border-brand-orange transition-colors"
                   >
                     Trigger Password Reset Flow
                   </button>
                </div>
              </div>
           </form>
        </div>
      </div>
    </div>
  );
}
