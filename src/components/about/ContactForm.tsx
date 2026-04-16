"use client";

import React from "react";

export function ContactForm() {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-3">Your Name</label>
          <input
            type="text"
            className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:outline-none focus:border-brand-orange transition-colors"
            placeholder="First Last"
          />
        </div>
        <div>
          <label className="block font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-3">Email Address</label>
          <input
            type="email"
            className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:outline-none focus:border-brand-orange transition-colors"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label className="block font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-3">Subject</label>
        <input
          type="text"
          className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:outline-none focus:border-brand-orange transition-colors"
          placeholder="Technical question / Partnership / Build submission"
        />
      </div>
      <div>
        <label className="block font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-3">Message</label>
        <textarea
          rows={6}
          className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:outline-none focus:border-brand-orange transition-colors resize-none"
          placeholder="Tell us about your project, question, or enquiry..."
        />
      </div>
      <button 
        type="submit"
        className="w-full py-5 bg-brand-orange text-white font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all"
      >
        Send Message
      </button>
    </form>
  );
}
