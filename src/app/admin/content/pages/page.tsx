"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { PAGE_SEEDS, seedPageContent } from "@/lib/cms/seedPageContent";
import {
  FileText, Image as ImageIcon, Save, RefreshCw, ExternalLink,
  ChevronRight, CheckCircle2, AlertCircle, Upload, X, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

// ---- PAGE TREE DEFINITION ----
const PAGE_TREE = [
  {
    label: "CORE", pages: [
      { name: "Homepage", key: "home", url: "/" },
      { name: "Build Planner", key: "planner", url: "/planner" },
      { name: "Van Design Studio", key: "van-design-studio", url: "/van-design-studio" },
    ]
  },
  {
    label: "SYSTEMS", pages: [
      { name: "Electrical & Solar", key: "systems/electrical-solar", url: "/systems/electrical-solar" },
      { name: "Insulation", key: "systems/insulation", url: "/systems/insulation" },
      { name: "Heating", key: "systems/heating", url: "/systems/heating" },
      { name: "Water", key: "systems/water", url: "/systems/water" },
    ]
  },
  {
    label: "VEHICLES", pages: [
      { name: "Mercedes-Benz Sprinter", key: "vehicles/mercedes-sprinter", url: "/vehicles/mercedes-sprinter" },
      { name: "Ford Transit", key: "vehicles/ford-transit", url: "/vehicles/ford-transit" },
      { name: "VW Crafter", key: "vehicles/vw-crafter", url: "/vehicles/vw-crafter" },
      { name: "Fiat Ducato", key: "vehicles/fiat-ducato", url: "/vehicles/fiat-ducato" },
      { name: "Iveco Daily", key: "vehicles/iveco-daily", url: "/vehicles/iveco-daily" },
      { name: "MAN TGE", key: "vehicles/man-tge", url: "/vehicles/man-tge" },
    ]
  },
  {
    label: "STORE", pages: [
      { name: "Store Homepage", key: "store", url: "/store" },
    ]
  },
  {
    label: "BLOG", pages: [
      { name: "Blog Index", key: "blog", url: "/blog" },
    ]
  },
];

// ---- FIELD TYPE DEFINITIONS PER PAGE ----
const FIELD_SCHEMA: Record<string, { section: string; label: string; fields: { key: string; label: string; type: string }[] }[]> = {
  home: [
    { section: "hero", label: "Hero Section", fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Subheading", type: "textarea" },
      { key: "cta_label", label: "CTA Label", type: "text" },
      { key: "cta_href", label: "CTA URL", type: "url" },
      { key: "image_url", label: "Hero Image", type: "image" },
    ]},
    { section: "intro", label: "Why We Exist", fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "body", label: "Body Text", type: "textarea" },
    ]},
    { section: "showcase", label: "Community Showcase", fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Subheading", type: "text" },
    ]},
    { section: "gear", label: "Featured Gear", fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Subheading", type: "text" },
    ]},
    { section: "planner_cta", label: "Planner CTA Block", fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "body", label: "Body Text", type: "textarea" },
      { key: "cta_label", label: "CTA Label", type: "text" },
      { key: "cta_href", label: "CTA URL", type: "url" },
    ]},
  ],
  planner: [
    { section: "hero", label: "Hero Section", fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Subheading", type: "textarea" },
    ]},
    { section: "intro", label: "Introduction", fields: [
      { key: "body", label: "Body Text", type: "textarea" },
    ]},
  ],
  "van-design-studio": [
    { section: "hero", label: "Hero Section", fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Subheading", type: "textarea" },
    ]},
    { section: "intro", label: "Introduction", fields: [
      { key: "body", label: "Body Text", type: "textarea" },
    ]},
  ],
  store: [
    { section: "hero", label: "Hero Section", fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Subheading", type: "textarea" },
      { key: "image_url", label: "Hero Image", type: "image" },
    ]},
    { section: "intro", label: "Introduction", fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "body", label: "Body Text", type: "textarea" },
    ]},
    { section: "featured", label: "Featured Section", fields: [
      { key: "heading", label: "Heading", type: "text" },
    ]},
  ],
  blog: [
    { section: "hero", label: "Hero Section", fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Subheading", type: "textarea" },
      { key: "image_url", label: "Hero Image", type: "image" },
    ]},
    { section: "intro", label: "Introduction", fields: [
      { key: "body", label: "Body Text", type: "textarea" },
    ]},
  ],
};

// Generate shared schema for systems/vehicles
["systems/electrical-solar","systems/insulation","systems/heating","systems/water"].forEach(key => {
  FIELD_SCHEMA[key] = [
    { section: "hero", label: "Hero Section", fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Subheading", type: "textarea" },
      { key: "image_url", label: "Hero Image", type: "image" },
    ]},
    { section: "cta", label: "CTA Block", fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "cta_label", label: "CTA Label", type: "text" },
      { key: "cta_href", label: "CTA URL", type: "url" },
    ]},
  ];
});

["vehicles/mercedes-sprinter","vehicles/ford-transit","vehicles/vw-crafter",
 "vehicles/fiat-ducato","vehicles/iveco-daily","vehicles/man-tge"].forEach(key => {
  FIELD_SCHEMA[key] = [
    { section: "hero", label: "Hero Section", fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Subheading", type: "textarea" },
      { key: "image_url", label: "Hero Image", type: "image" },
    ]},
    { section: "intro", label: "Introduction", fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "body", label: "Body Text", type: "textarea" },
    ]},
    { section: "verdict", label: "The Verdict", fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "body", label: "Body Text", type: "textarea" },
    ]},
    { section: "cta", label: "Bottom CTA", fields: [
      { key: "cta_label", label: "CTA Label", type: "text" },
      { key: "cta_href", label: "CTA URL", type: "url" },
    ]},
  ];
});

// ---- TYPES ----
type FieldValues = Record<string, Record<string, string>>;
type DirtyState = Record<string, boolean>;
type SaveStatus = Record<string, 'idle' | 'saving' | 'saved' | 'error'>;

// ---- MAIN COMPONENT ----
export default function ContentPagesAdmin() {
  const [selectedPage, setSelectedPage] = useState(PAGE_TREE[0].pages[0]);
  const [fieldValues, setFieldValues] = useState<FieldValues>({});
  const [dirty, setDirty] = useState<DirtyState>({});
  const [saveStatus, setSaveStatus] = useState<SaveStatus>({});
  const [loading, setLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<{ time: string; by: string } | null>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [globalSaving, setGlobalSaving] = useState(false);

  const schema = FIELD_SCHEMA[selectedPage.key] || [];

  // ---- LOAD CONTENT ----
  const loadContent = useCallback(async (pageKey: string) => {
    setLoading(true);
    setDirty({});
    setSaveStatus({});

    const { data } = await supabase
      .from('page_content')
      .select('section_key, field_key, value, updated_at, updated_by')
      .eq('page_key', pageKey)
      .order('updated_at', { ascending: false });

    if (data && data.length > 0) {
      const values: FieldValues = {};
      data.forEach(row => {
        if (!values[row.section_key]) values[row.section_key] = {};
        values[row.section_key][row.field_key] = row.value ?? '';
      });
      setFieldValues(values);
      const newest = data[0];
      if (newest.updated_by !== 'system:seed') {
        setLastSaved({ time: newest.updated_at, by: newest.updated_by || 'admin' });
      } else {
        setLastSaved(null);
      }
    } else {
      // Auto-seed defaults
      const seeds = PAGE_SEEDS[pageKey];
      if (seeds) {
        const seedValues: FieldValues = {};
        seeds.forEach(s => {
          if (!seedValues[s.sectionKey]) seedValues[s.sectionKey] = {};
          seedValues[s.sectionKey][s.fieldKey] = s.value;
        });
        setFieldValues(seedValues);
        // Persist seed rows to database in the background so that the site is populated
        seedPageContent(pageKey, seeds).catch(err => {
          console.error("Auto-seeding page failed:", err);
        });
      } else {
        setFieldValues({});
      }
      setLastSaved(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadContent(selectedPage.key); }, [selectedPage.key, loadContent]);

  // Cmd/Ctrl+S shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSaveAll();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  // ---- FIELD CHANGE ----
  const handleFieldChange = (section: string, field: string, value: string) => {
    setFieldValues(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
    setDirty(prev => ({ ...prev, [section]: true }));
  };

  // ---- SAVE SECTION ----
  const handleSaveSection = async (sectionKey: string, sectionSchema: { key: string; type: string }[]) => {
    setSaveStatus(prev => ({ ...prev, [sectionKey]: 'saving' }));

    const fields = sectionSchema.map(f => ({
      fieldKey: f.key,
      fieldType: f.type,
      value: fieldValues[sectionKey]?.[f.key] ?? '',
    }));

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageKey: selectedPage.key, sectionKey, fields }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setSaveStatus(prev => ({ ...prev, [sectionKey]: 'saved' }));
      setDirty(prev => ({ ...prev, [sectionKey]: false }));
      setLastSaved({ time: new Date().toISOString(), by: 'admin' });
      setTimeout(() => setSaveStatus(prev => ({ ...prev, [sectionKey]: 'idle' })), 2000);
    } catch {
      setSaveStatus(prev => ({ ...prev, [sectionKey]: 'error' }));
    }
  };

  // ---- SAVE ALL ----
  const handleSaveAll = async () => {
    setGlobalSaving(true);
    for (const section of schema) {
      await handleSaveSection(section.section, section.fields);
    }
    setGlobalSaving(false);
  };

  // ---- RESET SECTION ----
  const handleResetSection = async (sectionKey: string) => {
    if (!confirm(`Reset "${sectionKey}" to original defaults? This cannot be undone.`)) return;
    await fetch('/api/admin/content', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageKey: selectedPage.key, sectionKey }),
    });
    // Restore seed defaults locally
    const seeds = PAGE_SEEDS[selectedPage.key]?.filter(s => s.sectionKey === sectionKey) ?? [];
    const restored: Record<string, string> = {};
    seeds.forEach(s => { restored[s.fieldKey] = s.value; });
    setFieldValues(prev => ({ ...prev, [sectionKey]: restored }));
    setDirty(prev => ({ ...prev, [sectionKey]: false }));
  };

  // ---- IMAGE UPLOAD ----
  const handleImageUpload = async (sectionKey: string, fieldKey: string, file: File) => {
    const id = `${sectionKey}-${fieldKey}`;
    setUploadingField(id);
    setUploadProgress(0);

    const ext = file.name.split('.').pop();
    const path = `${selectedPage.key}/${sectionKey}-${fieldKey}-${Date.now()}.${ext}`;

    const { data, error } = await supabase.storage
      .from('page-media')
      .upload(path, file, { upsert: true });

    setUploadProgress(100);

    if (!error && data) {
      const { data: urlData } = supabase.storage.from('page-media').getPublicUrl(path);
      handleFieldChange(sectionKey, fieldKey, urlData.publicUrl);
    }
    setUploadingField(null);
    setUploadProgress(0);
  };

  // ---- RENDER FIELD ----
  const renderField = (sectionKey: string, field: { key: string; label: string; type: string }) => {
    const value = fieldValues[sectionKey]?.[field.key] ?? '';
    const uploadId = `${sectionKey}-${field.key}`;
    const isUploading = uploadingField === uploadId;

    const inputCls = "w-full border border-slate-200 bg-slate-50/50 p-3 text-sm focus:border-brand-orange focus:bg-white outline-none transition-all rounded-lg";

    if (field.type === 'textarea') {
      return (
        <textarea
          rows={4}
          value={value}
          onChange={e => handleFieldChange(sectionKey, field.key, e.target.value)}
          className={inputCls + " resize-y"}
        />
      );
    }

    if (field.type === 'url') {
      return (
        <div className="flex gap-2">
          <input type="url" value={value} onChange={e => handleFieldChange(sectionKey, field.key, e.target.value)} className={inputCls + " flex-1"} placeholder="https://" />
          {value && <a href={value} target="_blank" rel="noreferrer" className="flex items-center px-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-400 hover:text-brand-orange"><ExternalLink size={14} /></a>}
        </div>
      );
    }

    if (field.type === 'image') {
      return (
        <div className="space-y-3">
          {value && <img src={value} alt="preview" className="h-28 w-auto rounded-lg border border-slate-200 object-cover" />}
          <div className="flex gap-3 flex-wrap">
            <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-mono uppercase tracking-widest hover:bg-brand-orange transition-colors rounded-lg">
              <Upload size={12} />
              {isUploading ? `Uploading ${uploadProgress}%...` : 'Upload Image'}
              <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(sectionKey, field.key, f); }} />
            </label>
            <input type="text" value={value} onChange={e => handleFieldChange(sectionKey, field.key, e.target.value)}
              placeholder="Or paste URL directly" className="flex-1 min-w-[200px] border border-slate-200 bg-slate-50/50 p-2 text-xs focus:border-brand-orange outline-none rounded-lg" />
          </div>
          {isUploading && <div className="h-1 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-brand-orange transition-all" style={{ width: `${uploadProgress}%` }} /></div>}
        </div>
      );
    }

    if (field.type === 'boolean') {
      return (
        <label className="flex items-center gap-3 cursor-pointer">
          <div onClick={() => handleFieldChange(sectionKey, field.key, value === 'true' ? 'false' : 'true')}
            className={cn("relative w-11 h-6 rounded-full transition-colors", value === 'true' ? 'bg-brand-orange' : 'bg-slate-200')}>
            <div className={cn("absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform", value === 'true' ? 'translate-x-5' : 'translate-x-0.5')} />
          </div>
          <span className="text-sm text-slate-600">{value === 'true' ? 'Enabled' : 'Disabled'}</span>
        </label>
      );
    }

    return (
      <input type="text" value={value} onChange={e => handleFieldChange(sectionKey, field.key, e.target.value)} className={inputCls} />
    );
  };

  // ---- RENDER ----
  const hasDirty = Object.values(dirty).some(Boolean);

  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden bg-white border border-slate-200 rounded-2xl mx-8 mb-8 shadow-sm">
      {/* LEFT TREE */}
      <aside className="w-60 shrink-0 bg-slate-50/50 border-r border-slate-200 overflow-y-auto flex flex-col">
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-brand-orange" /><span className="font-display text-sm uppercase tracking-widest">Pages</span></div>
        </div>
        <nav className="flex-1 py-4 space-y-1">
          {PAGE_TREE.map(group => (
            <div key={group.label}>
              <p className="px-5 py-2 font-mono text-[8px] text-slate-400 uppercase tracking-[0.2em] font-bold">{group.label}</p>
              {group.pages.map(page => (
                <button key={page.key} onClick={() => setSelectedPage(page)}
                  className={cn("w-full text-left px-5 py-2.5 text-xs font-medium transition-colors flex items-center justify-between",
                    selectedPage.key === page.key ? "bg-brand-orange/10 text-brand-orange font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900")}>
                  <span>{page.name}</span>
                  {selectedPage.key === page.key && <ChevronRight size={10} />}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* RIGHT EDITOR */}
      <div className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl uppercase tracking-tight text-slate-900">{selectedPage.name} — Content Editor</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {lastSaved
                ? `Last saved: ${new Date(lastSaved.time).toLocaleString()} by ${lastSaved.by}`
                : <span className="italic text-amber-500">Using default content — no edits saved yet</span>}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a href={selectedPage.url} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-xs text-slate-500 hover:text-brand-orange font-mono uppercase tracking-widest border-b border-slate-200 pb-0.5 hover:border-brand-orange transition-colors">
              <ExternalLink size={12} /> Preview Page
            </a>
            <button onClick={handleSaveAll} disabled={!hasDirty || globalSaving}
              className={cn("flex items-center gap-2 px-5 py-2.5 font-mono text-xs uppercase tracking-widest transition-all",
                hasDirty && !globalSaving ? "bg-brand-orange text-white hover:bg-slate-900" : "bg-slate-100 text-slate-400 cursor-not-allowed")}>
              {globalSaving ? <><Loader2 size={12} className="animate-spin" /> Saving...</> : <><Save size={12} /> Save All Changes</>}
            </button>
          </div>
        </div>

        {/* Sections */}
        <div className="p-8 space-y-8 max-w-4xl">
          {loading ? (
            <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-brand-orange" /></div>
          ) : schema.length === 0 ? (
            <div className="text-center py-24 text-slate-400 font-mono text-xs uppercase tracking-widest">No content schema defined for this page yet.</div>
          ) : (
            schema.map(section => {
              const status = saveStatus[section.section] || 'idle';
              const isDirty = dirty[section.section] || false;
              return (
                <div key={section.section} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                  {/* Card header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      {isDirty && <div className="w-2 h-2 rounded-full bg-amber-400" title="Unsaved changes" />}
                      <h2 className="font-mono text-[10px] uppercase tracking-widest text-slate-700 font-bold">{section.label}</h2>
                    </div>
                    <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">{section.section}</span>
                  </div>

                  {/* Fields */}
                  <div className="p-6 space-y-6">
                    {section.fields.map(field => (
                      <div key={field.key}>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-slate-400 mb-2 font-bold">{field.label}</label>
                        {renderField(section.section, field)}
                      </div>
                    ))}
                  </div>

                  {/* Card footer */}
                  <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/30">
                    <button onClick={() => handleResetSection(section.section)}
                      className="text-[10px] font-mono text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest">
                      Reset to defaults
                    </button>
                    <div className="flex items-center gap-3">
                      {status === 'error' && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> Save failed</span>}
                      {status === 'saved' && <span className="text-xs text-emerald-600 flex items-center gap-1"><CheckCircle2 size={12} /> Saved</span>}
                      <button onClick={() => handleSaveSection(section.section, section.fields)} disabled={status === 'saving'}
                        className={cn("px-5 py-2 font-mono text-[10px] uppercase tracking-widest transition-all",
                          isDirty ? "bg-brand-orange text-white hover:bg-slate-900" : "bg-slate-100 text-slate-400",
                          status === 'saving' && "opacity-50")}>
                        {status === 'saving' ? 'Saving...' : 'Save Section'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
