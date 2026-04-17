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
  Send
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

  if (loading) return null;

  return (
    <div className="space-y-8">
      {/* New Activity Input */}
      <div className="blueprint-border p-4 bg-brand-obsidian">
         <textarea 
           value={newNote}
           onChange={(e) => setNewNote(e.target.value)}
           placeholder="Log tactical update or expert build note..."
           className="w-full bg-transparent border-none outline-none font-mono text-[10px] text-brand-white focus:ring-0 min-h-[80px]"
         />
         <div className="flex justify-between items-center mt-4 pt-4 border-t border-brand-border">
            <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest italic">Drafting Chronological Note</span>
            <button 
              onClick={addNote}
              disabled={saving || !newNote.trim()}
              className="px-6 py-2 bg-brand-orange text-white font-mono text-[9px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2"
            >
               {saving ? "Syncing..." : <><Send size={12} /> Sync Log</>}
            </button>
         </div>
      </div>

      {/* Activity Timeline */}
      <div className="relative space-y-6 pl-8">
         {/* Vertical line */}
         <div className="absolute left-3 top-2 bottom-2 w-px bg-brand-border" />
         
         {activities.map((act) => (
           <div key={act.id} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[2.35rem] top-1 w-2.5 h-2.5 rounded-full bg-brand-orange border-2 border-brand-carbon z-10" />
              
              <div className="blueprint-border p-5 bg-brand-obsidian group-hover:border-brand-grey transition-all">
                 <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-widest text-brand-orange">
                       <FileEdit size={10} /> {act.activity_type}
                    </div>
                    <span className="font-mono text-[8px] text-brand-grey uppercase">{new Date(act.created_at).toLocaleString()}</span>
                 </div>
                 <p className="font-sans text-xs text-brand-grey leading-relaxed">{act.content}</p>
              </div>
           </div>
         ))}

         {activities.length === 0 && (
           <div className="py-12 text-center">
              <span className="font-mono text-[8px] text-brand-grey uppercase tracking-[0.3em]">No operational history detected.</span>
           </div>
         )}
      </div>
    </div>
  );
}
