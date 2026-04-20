"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  Plus, 
  Trash2, 
  Edit,
  ArrowLeft,
  Truck,
  Globe,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SuppliersManagerPage() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  async function fetchSuppliers() {
    const { data } = await supabase
      .from('suppliers')
      .select('*')
      .order('name');
      
    if (!data || data.length === 0) {
      await autoSeed();
    } else {
      setSuppliers(data || []);
      setLoading(false);
    }
  }

  const autoSeed = async () => {
    setLoading(true);
    const presetSuppliers = [
      { name: 'Energy Solutions', website: 'https://energy-solutions.co.uk', status: 'active_trade', categories: ['electrical', 'solar'], description: 'Victron full range — inverters, chargers, MPPT, batteries, monitors. First call for Victron. Technical support team.' },
      { name: 'Callidus Trade', website: 'https://callidus.shop', status: 'active_trade', categories: ['electrical', 'solar'], description: 'Victron full range, solar panels, batteries. Devon-based. 01626 563563' },
      { name: 'Energy Monkey', website: 'https://energymonkey.co.uk', status: 'active_trade', categories: ['electrical', 'solar', 'batteries'], description: 'Victron specialist, off-grid systems, LiFePO4. Gloucestershire. 01452 699300. Family-run, excellent technical support.' },
      { name: 'Midsummer Energy', website: 'https://midsummerenergy.co.uk', status: 'active_trade', categories: ['electrical', 'solar'], description: 'Victron, solar panels, charge controllers, mounting. Cambridge-based. Strong on solar panels.' },
      { name: 'Fogstar', website: 'https://fogstar.co.uk', status: 'potential', categories: ['electrical', 'batteries'], description: 'LiFePO4 batteries (Drift range) — UK\'s leading van battery brand. Hugely popular in UK self-build community.' },
      { name: 'Renogy UK', website: 'https://renogy.co.uk', status: 'potential', categories: ['electrical', 'solar'], description: 'Solar panels, charge controllers, batteries, inverters. Budget-friendly Victron alternative.' },
      { name: '12 Volt Planet', website: 'https://12voltplanet.co.uk', status: 'active_trade', categories: ['electrical', 'components'], description: '12V components — fuse boxes, switches, cable, terminals, connectors. Essential for all the small components.' },
      { name: 'Bimble Solar', website: 'https://bimblesolar.com', status: 'active_trade', categories: ['electrical', 'solar'], description: 'Solar panels, MPPT controllers, cables, connectors, mounting kits. UK-based solar specialist.' },
      { name: 'Alpha Batteries', website: 'https://alpha-batteries.co.uk', status: 'active_trade', categories: ['electrical', 'batteries', 'kits'], description: 'Victron kits, leisure batteries, chargers, solar kits. Stock complete Victron off-grid conversion kits.' },
      { name: 'Butler Technik', website: 'https://butlertechnik.com', status: 'active_trade', categories: ['electrical', 'kits'], description: 'Victron power upgrade kits, batteries, inverters. Specialise in pre-configured Victron kits.' },
      { name: 'Jacksons Leisure', website: 'https://jacksonsleisure.com', status: 'active_trade', categories: ['heating', 'water', 'leisure'], description: 'Truma (Combi, VarioHeat), Propex, Webasto. Stock complete Truma Combi kits with all ducting.' },
      { name: 'PB Auto Electrics', website: 'https://pbautoelectrics.co.uk', status: 'active_trade', categories: ['heating', 'electrical'], description: 'Webasto, Eberspächer, Truma — heaters, parts, service kits. Specialist in vehicle heating.' },
      { name: 'Webasto UK', website: 'https://webasto-comfort.com/en-gb', status: 'potential', categories: ['heating', 'climate'], description: 'Webasto diesel heaters (Air Top range), water heaters. Contact UK office directly for trade account.' },
      { name: 'Eberspächer UK', website: 'https://eberspacher.com', status: 'potential', categories: ['heating', 'climate'], description: 'Eberspächer diesel heaters (Airtronic range), water heaters. Contact UK sales team.' },
      { name: 'Propex', website: 'https://propexheatsource.co.uk', status: 'potential', categories: ['heating', 'gas'], description: 'Propex HS2000, HS2211 — LPG blown-air heaters. UK manufacturer — contact direct. Popular budget-friendly LPG heater.' },
      { name: 'Nomadic Leisure', website: 'https://nomadicleisure.co.uk', status: 'active_trade', categories: ['heating', 'kits'], description: 'Truma complete kits, Webasto, ducting, controllers. Good pre-packaged Truma installation kits.' },
      { name: 'CAK Tanks', website: 'https://caktanks.co.uk', status: 'active_trade', categories: ['water', 'plumbing', 'tanks'], description: 'Water tanks (custom + off-the-shelf), SMEV sinks, pumps, taps, plumbing fittings. Specialist in tanks.' },
      { name: 'Whale Pumps', website: 'https://whalepumps.com', status: 'potential', categories: ['water', 'plumbing'], description: 'Water pumps (Ultraflow, Gulper), taps, shower fittings, water systems. Premium pump brand.' },
      { name: 'John Guest / Speedfit', website: 'https://johnguest.com', status: 'potential', categories: ['plumbing', 'fittings'], description: 'Push-fit plumbing fittings, pipe, valves. The standard for campervan plumbing.' },
      { name: 'Leisurelines', website: 'https://leisurelines.co.uk', status: 'active_trade', categories: ['water', 'plumbing', 'tanks'], description: 'Water tanks, pumps, taps, waste systems, shower trays. Good range of purpose-built campervan tanks.' },
      { name: 'Dodo Mat', website: 'https://dodomat.com', status: 'potential', categories: ['insulation', 'deadening'], description: 'DEADN Hex/Pro butyl sound deadening, Thermo Liner, Thermo Fleece, floor insulation. THE UK brand for van sound deadening.' },
      { name: 'Sound Deadening Shop', website: 'https://deadening.co.uk', status: 'potential', categories: ['insulation', 'deadening'], description: 'Dodo Mat products, pre-made van kits, Silent Coat. Retail + bulk pricing.' },
      { name: 'Kilmat', website: 'https://kilmat.com', status: 'potential', categories: ['insulation', 'deadening'], description: 'Budget butyl sound deadening mats (80 mil). Budget alternative to Dodo.' },
      { name: 'Celotex / Kingspan', website: 'https://celotex.co.uk', status: 'potential', categories: ['insulation'], description: 'PIR rigid insulation board (25mm, 50mm, 75mm). The gold standard rigid insulation.' },
      { name: '3M Thinsulate', website: 'https://3m.co.uk', status: 'potential', categories: ['insulation'], description: 'Thinsulate SM600L automotive insulation. Flexible, excellent for ceilings and curved surfaces.' },
      { name: 'Grassroutes Leisure', website: 'https://grassroutesleisure.co.uk', status: 'active_trade', categories: ['furniture', 'materials', 'ply'], description: 'Vöhringer lightweight ply, furniture materials. UK\'s main Vöhringer distributor. Used by professional converters.' },
      { name: 'Premier Forest (Superva)', website: 'https://premierforest.co.uk', status: 'active_trade', categories: ['furniture', 'materials', 'ply', 'cnc'], description: 'Superva lightweight laminated ply panels. CNC cutting + edge banding service. Used by pro converters.' },
      { name: 'Panel Company', website: 'https://panelcompany.co.uk', status: 'active_trade', categories: ['furniture', 'cladding', 'pvcp'], description: 'PVC wall panels, waterproof cladding, wood-effect panels. Good for wet room/shower areas.' },
      { name: 'Wickes / Homebase', website: 'https://wickes.co.uk', status: 'active_trade', categories: ['furniture', 'cladding', 'timber'], description: 'Tongue & groove spruce cladding, birch ply, general timber. Budget option for wall cladding.' },
      { name: 'Robbins Timber', website: 'https://robbinstimber.co.uk', status: 'active_trade', categories: ['furniture', 'materials', 'timber'], description: 'Birch plywood (all grades), marine ply, hardwoods, veneers. Bristol-based.' },
      { name: 'Wholesale Van Accessories', website: 'https://wholesalevanaccessories.co.uk', status: 'active_trade', categories: ['windows', 'hardware'], description: 'Conversion windows (trade supply), bonded windows, rubber seal windows. Supply windows to biggest UK converters.' },
      { name: 'Kiravans', website: 'https://kiravans.co.uk', status: 'active_trade', categories: ['windows', 'hardware', 'accessories'], description: 'Barn door windows, tailgate windows, bonded glass, privacy glass. Innovators — designed original T5/T6 barn door window.' },
      { name: 'Dometic UK', website: 'https://dometic.com/en-gb', status: 'potential', categories: ['windows', 'ventilation', 'climate'], description: 'Dometic S4 sliding windows, Seitz rooflights. The premium window choice.' },
      { name: 'MaxxAir', website: 'https://maxxair.com', status: 'potential', categories: ['ventilation'], description: 'MaxxFan Deluxe roof vent fans. The #1 roof vent for conversions.' },
      { name: 'Fiamma', website: 'https://fiamma.com', status: 'potential', categories: ['ventilation', 'externals'], description: 'Roof vents, turbo vents, hatches. Budget roof vent options alongside MaxxAir.' },
      { name: 'Elite Wheels', website: 'https://elitewheels.co.uk', status: 'potential', categories: ['wheels', 'tyres', 'externals'], description: 'Alloy wheels + AT tyre packages for Ducato/Boxer/Relay, Sprinter, Crafter. Specialist in van wheels.' },
      { name: '4×4 Tyres', website: 'https://4x4tyres.co.uk', status: 'potential', categories: ['tyres', 'externals'], description: 'BFGoodrich KO2, KO3, Falken Wildpeak AT3W, all-terrain tyres. UK\'s leading BFG/AT tyre supplier.' },
      { name: '3SDM', website: 'https://3sdm.co.uk', status: 'potential', categories: ['wheels', 'externals'], description: 'Custom alloy wheels — UK manufactured, spin-forged. 0.66HD model rated for campervan weights.' },
      { name: 'Transporter HQ', website: 'https://transporterhq.co.uk', status: 'active_trade', categories: ['wheels', 'externals', 'styling'], description: 'VW T5/T6 alloy wheels, styling, bumpers, lights, accessories. VW Transporter specialist.' },
      { name: 'Thule', website: 'https://thule.com', status: 'potential', categories: ['externals', 'racks'], description: 'Roof racks, bike carriers, awnings, steps. Premium exterior accessories.' },
      { name: 'ATOM LED', website: 'https://atomled.co.uk', status: 'potential', categories: ['lighting', 'electrical'], description: '12V COB LED strip (motorhome-specific range). UK stock. 5-year warranty.' },
      { name: 'LED Lighthouse', website: 'https://led-lighthouse.co.uk', status: 'potential', categories: ['lighting', 'electrical'], description: '12V LED strip, RGB strip for awnings, voltage regulators. Good for exterior/awning LED strip.' },
      { name: 'UK LED Lights', website: 'https://ukledlights.co.uk', status: 'potential', categories: ['lighting', 'electrical'], description: '12V campervan LED strip, dimmers. Good budget range with campervan-specific collection.' },
      { name: 'Litewave', website: 'https://litewave.co.uk', status: 'potential', categories: ['lighting', 'electrical'], description: '12V LED van lighting modules, bars, ultra-bright work lighting. More commercial focus.' },
      { name: 'EcoFlow', website: 'https://ecoflow.com/uk', status: 'potential', categories: ['tech', 'power'], description: 'Portable power stations (River, Delta), portable solar panels. Popular for supplementary power.' },
      { name: 'Jackery', website: 'https://jackery.com/uk', status: 'potential', categories: ['tech', 'power'], description: 'Portable power stations, solar generators. Competitor to EcoFlow.' },
      { name: 'Thetford', website: 'https://thetfordmarine.com', status: 'potential', categories: ['plumbing', 'sanitation'], description: 'Cassette toilets (C200, C400), toilet chemicals. The toilet brand for motorhomes.' },
      { name: 'Nature\'s Head', website: 'https://natureshead.net', status: 'potential', categories: ['plumbing', 'sanitation', 'eco'], description: 'Composting toilets. The premium composting toilet. Growing in popularity.' },
      { name: 'Phaesun / BougeRV', website: 'https://bougerv.co.uk', status: 'potential', categories: ['tech', 'cooling'], description: '12V portable fridges, portable AC, accessories. Budget alternative to Dometic fridges.' },
      { name: 'Ring Automotive', website: 'https://ringautomotive.com', status: 'active_trade', categories: ['tech', 'electrical'], description: '12V inverters, compressors, battery chargers, work lights. Available through motor factors.' },
      { name: 'UK Leisure Parts', website: 'https://ukleisureparts.co.uk', status: 'active_trade', categories: ['general', 'wholesale'], description: 'Reimo (roofs, furniture), Dometic, Fiamma, Truma, Thetford, Thule. 350+ trade customers.' },
      { name: 'Van Conversion Shop', website: 'https://vanconversionshop.co.uk', status: 'active_trade', categories: ['general', 'kits'], description: 'Wide range — electrical, plumbing, heating, insulation, furniture, windows.' },
      { name: 'Seaside Campers', website: 'https://seasidecampers.co.uk', status: 'active_trade', categories: ['general', 'bundles'], description: 'Dodo insulation kits, Dometic, electrical, plumbing bundles.' },
      { name: 'Magnum Motorhomes', website: 'https://magnummotorhomes.co.uk', status: 'potential', categories: ['general', 'leisure'], description: 'Huge warehouse — everything from windows to toilets to awnings. Visit showroom recommended.' },
      { name: 'Miriad Quest Leisure (MQL)', website: 'https://mql.co.uk', status: 'active_trade', categories: ['wholesale', 'trade-only'], description: 'Trade-ONLY. 40+ years. All major brands. Catalogues available.' },
      { name: 'LKQ Nova Leisure', website: 'https://novaleisure.com', status: 'active_trade', categories: ['wholesale'], description: 'Major UK leisure distributor. Credit + cash trade accounts.' },
      { name: 'Leisure Spares', website: 'https://leisurespares.co.uk', status: 'potential', categories: ['wholesale', 'spares'], description: 'Genuine spare parts for Dometic, Truma, Thetford, Seitz, SMEV. Mail order.' }
    ];

    for (let s of presetSuppliers) {
      const { data } = await supabase.from('suppliers').select('id').eq('name', s.name).single();
      if (!data) {
        await supabase.from('suppliers').insert([s]);
      }
    }
    
    // Fetch newly seeded data
    const { data: newData } = await supabase.from('suppliers').select('*').order('name');
    setSuppliers(newData || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this supplier? Products linked to this supplier will lose their mapping.")) return;
    await supabase.from('suppliers').delete().eq('id', id);
    fetchSuppliers();
  };

  const handleSeed = async () => {
    await autoSeed();
  };

  return (
    <div className="p-8 pb-32 min-h-screen bg-brand-obsidian text-brand-white">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <Link href="/admin/store" className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4 hover:text-brand-white transition-colors">
            <ArrowLeft size={12} /> Back to Store Manager
          </Link>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-brand-white flex items-center gap-4">
            <Truck className="w-10 h-10 text-brand-orange" />
            Supplier <span className="text-brand-orange">Network</span>
          </h1>
          <p className="font-mono text-xs text-brand-grey uppercase tracking-widest mt-4 max-w-2xl">
            Manage your supply chain, wholesale trade accounts, and product distributions.
          </p>
        </div>
        
        <div className="flex gap-4">
          <button onClick={handleSeed} className="px-8 py-4 border border-brand-border text-brand-grey font-mono text-[10px] uppercase tracking-widest hover:border-brand-orange hover:text-brand-orange transition-all">
            Sync Registry Defaults
          </button>
          <Link href="/admin/store/suppliers/new" className="px-8 py-4 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
             <Plus size={14} /> Add Supplier
          </Link>
        </div>
      </div>

      <div className="blueprint-border bg-brand-carbon overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="bg-brand-obsidian/50 border-b border-brand-border/50 font-mono text-[10px] text-brand-grey uppercase tracking-widest">
                  <th className="p-6">Supplier & Identity</th>
                  <th className="p-6">Account Type</th>
                  <th className="p-6">Brand Portfolio</th>
                  <th className="p-6">System Focus</th>
                  <th className="p-6 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/50">
                {loading ? (
                  <tr><td colSpan={5} className="p-12 text-center text-brand-grey font-mono text-[10px] uppercase tracking-widest">Loading network nodes...</td></tr>
                ) : suppliers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-brand-grey font-mono text-[10px] uppercase tracking-widest">
                      No suppliers mapped. Run the registry sync migration and add suppliers.
                    </td>
                  </tr>
                ) : (
                  suppliers.map(s => (
                    <tr key={s.id} className="group hover:bg-brand-obsidian/50 transition-colors">
                      <td className="p-6">
                        <span className="block font-display text-xl uppercase tracking-wider group-hover:text-brand-orange transition-colors">{s.name}</span>
                        {s.website && (
                          <a href={s.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-sans text-[10px] text-brand-grey hover:text-brand-orange mt-1 transition-colors">
                            <Globe size={10} /> {s.website.replace('https://', '').replace('http://', '').split('/')[0]} <ExternalLink size={10} />
                          </a>
                        )}
                      </td>
                      <td className="p-6 text-[10px] text-brand-grey">
                        <div className="flex flex-col gap-2">
                          <span className={cn(
                            "px-3 py-1 font-mono text-[9px] uppercase tracking-widest w-fit border",
                            s.status === 'active_trade' ? "bg-green-500/10 text-green-500 border-green-500/30" :
                            s.status === 'applied' ? "bg-brand-orange/10 text-brand-orange border-brand-orange/30" :
                            s.status === 'on_hold' ? "bg-red-500/10 text-red-500 border-red-500/30" :
                            "bg-brand-grey/10 text-brand-grey border-brand-grey/30"
                          )}>
                            {s.status === 'active_trade' ? 'Account Active' : 
                             s.status === 'applied' ? 'Pending Approval' :
                             s.status === 'on_hold' ? 'Account On Hold' : 'Open Sourcing'}
                          </span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-wrap gap-1 max-w-[250px]">
                          {(s.brands_handled || []).length === 0 ? (
                            <span className="font-mono text-[8px] text-brand-grey uppercase italic">No portfolio data</span>
                          ) : (
                            s.brands_handled.map((brand: string) => (
                              <span key={brand} className="font-mono text-[8px] text-brand-white/50 uppercase tracking-widest bg-brand-obsidian/40 px-2 py-0.5 border border-brand-border/20">
                                {brand}
                              </span>
                            ))
                          )}
                        </div>
                      </td>
                        <td className="p-6">
                           <div className="flex flex-wrap gap-2">
                              {(s.categories || []).map((cat: string) => (
                                 <span key={cat} className="font-mono text-[8px] text-brand-orange uppercase tracking-widest bg-brand-orange/5 px-2 py-1 border border-brand-orange/20">
                                    {cat}
                                 </span>
                              ))}
                           </div>
                        </td>
                        <td className="p-6 text-right">
                           <div className="flex justify-end gap-3 text-brand-grey">
                              <Link href={`/admin/store/suppliers/${s.id}`} className="hover:text-brand-orange transition-colors flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest">
                                Profile <Edit size={14} />
                              </Link>
                              <button onClick={() => handleDelete(s.id)} className="hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                           </div>
                        </td>
                     </tr>
                  ))
                )}
            </tbody>
         </table>
      </div>
    </div>
  );
}
