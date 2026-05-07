"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  FileEdit, 
  MessageSquare, 
  Clock, 
  User, 
  CheckCircle2,
  Trash2,
  Send,
  Loader2,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LeadActivityProps {
  leadId: string;
}

export function LeadActivityLogger({ leadId }: LeadActivityProps) {
  const [activities, setActivities] = useState<any[]>([]);
  const [newNote, setNewNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivity() {
      setLoading(true);
      const { data } = await supabase
        .from('lead_activity')
        .select('*')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: false });
      
      setActivities(data || []);
      setLoading(false);
    }
    fetchActivity();
  }, [leadId]);

  const addNote = async () => {
    if (!newNote.trim()) return;
    setSaving(true);
    
    const { data, error } = await supabase
      .from('lead_activity')
      .insert([{
        lead_id: leadId,
        activity_type: 'note',
        content: newNote,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (!error && data) {
      setActivities([data, ...activities]);
      setNewNote("");
    }
    setSaving(false);
  };

  return (
    <div className="space-y-8">
      {/* New Activity Input */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-brand-orange/20 transition-all">
         <textarea 
           value={newNote}
           onChange={(e) => setNewNote(e.target.value)}
           placeholder="Log a call, email summary or project note..."
           className="w-full bg-transparent border-none outline-none p-4 text-sm text-slate-700 focus:ring-0 min-h-[100px] resize-none"
         />
         <div className="flex justify-between items-center px-4 py-3 bg-slate-50 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Internal Update</span>
            <button 
              onClick={addNote}
              disabled={saving || !newNote.trim()}
              className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-brand-orange transition-all flex items-center gap-2 disabled:opacity-30"
            >
               {saving ? <Loader2 size={12} className="animate-spin" /> : <Plus size={14} />} 
               {saving ? "Syncing..." : "Add Note"}
            </button>
         </div>
      </div>

      {/* Activity Timeline */}
      <div className="relative space-y-8 pl-8">
         {/* Vertical line */}
         <div className="absolute left-3.5 top-0 bottom-0 w-px bg-slate-100" />
         
         {loading ? (
            <div className="py-12 text-center text-slate-300">
               <Loader2 size={24} className="animate-spin mx-auto" />
            </div>
         ) : activities.length === 0 ? (
            <div className="py-12 text-center">
               <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">No Activity Logged</p>
            </div>
         ) : (
           activities.map((act) => (
             <div key={act.id} className="relative group animate-in slide-in-from-left-2 duration-300">
                {/* Timeline Dot */}
                <div className="absolute -left-[1.85rem] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-slate-200 group-hover:border-brand-orange transition-colors z-10" />
                
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm group-hover:border-slate-300 transition-all">
                   <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-orange">
                         {act.activity_type === 'note' ? <FileEdit size={12} /> : <MessageSquare size={12} />} 
                         {act.activity_type}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase">
                         <Clock size={10} />
                         {new Date(act.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      </div>
                   </div>
                   <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{act.content}</p>
                </div>
             </div>
           ))
         )}
      </div>
    </div>
  );
}
