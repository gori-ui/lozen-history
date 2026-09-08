import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { BookOpen, ChevronLeft, ChevronRight, Clock3, Compass, ExternalLink, Filter, MapPinned, Menu, Search, X } from 'lucide-react';
import { periods, sites, type Confidence, type Period, type Site, type SiteType } from './data';

const center:[number,number] = [42.617, 23.515];
const icon = (color:string) => L.divIcon({className:'pin-wrap',html:`<span style="--pin:${color}" class="pin"></span>`,iconSize:[22,28],iconAnchor:[11,28]});
const colors:Record<Confidence,string> = {'Доказано':'#2f766f','Вероятно':'#c77c52','Предание':'#8c8a77'};
const yearLabel = (year:number) => year < 0 ? `${Math.abs(year)} пр. Хр.` : year === 2026 ? 'днес' : `${year} г.`;
function FlyTo({site}:{site:Site|null}) { const map=useMap(); if(site) map.flyTo([site.lat,site.lng],site.area?13:15,{duration:.7}); return null; }

export default function App(){
 const [period,setPeriod]=useState<Period>('Праистория'); const [year,setYear]=useState(-5000); const [active,setActive]=useState<Site|null>(null); const [query,setQuery]=useState(''); const [type,setType]=useState<SiteType|'Всички'>('Всички'); const [story,setStory]=useState(false); const [menu,setMenu]=useState(false);
 const visible=useMemo(()=>sites.filter(s=>periods.findIndex(p=>p.label===s.period)<=periods.findIndex(p=>p.label===period) && (type==='Всички'||s.type===type) && `${s.title} ${s.description}`.toLowerCase().includes(query.toLowerCase())),[period,type,query]);
 useEffect(()=>{ if(active && !visible.some(site=>site.id===active.id)) setActive(visible[0] ?? null); },[visible,active]);
 const storyIndex=Math.max(0,sites.findIndex(s=>s.period===period)); const storySite=sites[storyIndex]||sites[0];
 const selectPeriod=(p:Period)=>{setPeriod(p); const found=sites.find(s=>s.period===p); if(found)setActive(found)};
 return <div className="app-shell">
  <header className="topbar"><div className="brand"><span className="brand-mark">Л</span><div><strong>Лозен</strong><small>през времето</small></div></div><div className="topbar-meta"><span>София · 42°37′ N</span><button className="icon-button menu-button" onClick={()=>setMenu(!menu)} aria-label="Меню"><Menu size={19}/></button></div></header>
  <main className="workspace">
   <aside className={`sidebar ${menu?'is-open':''}`}>
    <div className="intro"><p className="eyebrow">Дигитален исторически атлас</p><h1>Едно място.<br/><em>Много времена.</em></h1><p className="lede">Разходка през следите, храмовете и паметта на Лозен — от халколита до днес.</p></div>
    <div className="search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Търси обект или период…" aria-label="Търси обект или период"/>{query&&<button onClick={()=>setQuery('')} aria-label="Изчисти"><X size={14}/></button>}</div>
    <div className="side-section"><div className="section-label"><span>Периоди</span><span className="count">{visible.length} обекта</span></div>{periods.map(p=><button key={p.label} className={`period-row ${period===p.label?'selected':''}`} onClick={()=>selectPeriod(p.label)}><span className="period-dot" style={{background:p.color}}/><span>{p.label}</span><small>{p.start<0?`${Math.abs(p.start)} пр.Хр.`:p.start} — {p.end===2026?'днес':p.end}</small></button>)}</div>
    <div className="side-section filters"><div className="section-label"><span><Filter size={13}/> Тип обект</span></div><select value={type} onChange={e=>setType(e.target.value as SiteType|'Всички')} aria-label="Филтрирай по тип"><option>Всички</option><option>Археология</option><option>Християнско наследство</option><option>Селище</option><option>Път и вода</option></select></div>
    <button className={`story-button ${story?'active':''}`} onClick={()=>setStory(!story)}><BookOpen size={17}/><span>{story?'Изход от историята':'Влез в историята'}</span><ChevronRight size={16}/></button>
    <footer className="sidebar-footer"><span><span className="legend-dot proven"/> доказано</span><span><span className="legend-dot probable"/> вероятно</span><span><span className="legend-dot oral"/> предание</span></footer>
   </aside>
   <section className="map-stage" aria-label="Интерактивна историческа карта">
    <div className="map-caption"><span className="live-dot"/> <span>Лозен · исторически пластове</span><span className="caption-rule"/><span>10 обекта</span></div>
    <MapContainer center={center} zoom={13} zoomControl={false} className="map"><TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>{visible.map(s=>s.area?<Circle key={s.id} center={[s.lat,s.lng]} radius={s.area*110} pathOptions={{color:colors[s.confidence],fillColor:colors[s.confidence],fillOpacity:.16,weight:1.5,dashArray:'5 5'}} eventHandlers={{click:()=>setActive(s)}}/>:<Marker key={s.id} position={[s.lat,s.lng]} icon={icon(colors[s.confidence])} eventHandlers={{click:()=>setActive(s)}}><Popup>{s.title}</Popup></Marker>)}<Polyline positions={[[42.6219,23.5108],[42.6034,23.5153]]} pathOptions={{color:'#c49b55',weight:2,dashArray:'5 8',opacity:.7}}/><FlyTo site={active}/></MapContainer>
    <div className="map-controls"><button onClick={()=>setActive(null)} aria-label="Центрирай карта"><Compass size={18}/></button><span/><button onClick={()=>document.querySelector('.map')?.scrollIntoView()} aria-label="Карта"><MapPinned size={18}/></button></div>
    {story&&<div className="story-card"><div className="story-kicker"><Clock3 size={14}/> Историята на място</div><h2>{storySite.title}</h2><p>{storySite.description}</p><button onClick={()=>setActive(storySite)}>Отвори обекта <ChevronRight size={15}/></button><div className="story-nav"><button onClick={()=>{const i=Math.max(0,storyIndex-1);selectPeriod(sites[i].period)}} aria-label="Предишен"><ChevronLeft size={17}/></button><span>{storyIndex+1} / {sites.length}</span><button onClick={()=>{const i=Math.min(sites.length-1,storyIndex+1);selectPeriod(sites[i].period)}} aria-label="Следващ"><ChevronRight size={17}/></button></div></div>}
    <div className="timeline"><div className="timeline-label"><span>Път през времето</span><strong>{yearLabel(year)}</strong></div><input type="range" min="-5000" max="2026" step="1" value={year} onChange={e=>{const y=Number(e.target.value);setYear(y);const p=periods.reduce((acc,x)=>y>=x.start?x:acc,periods[0]);setPeriod(p.label)}} aria-label="Година"/><div className="ticks"><span>5000 пр.Хр.</span><span>0</span><span>1000</span><span>1500</span><span>1900</span><span>днес</span></div></div>
   </section>
   {active&&<aside className="detail-drawer"><button className="close-drawer" onClick={()=>setActive(null)} aria-label="Затвори"><X size={18}/></button><div className="detail-header" style={{'--accent':colors[active.confidence]} as React.CSSProperties}><span className="detail-type">{active.type}</span><div className="detail-icon">{active.type==='Археология'?'◈':active.type==='Християнско наследство'?'✦':'⌁'}</div></div><div className="detail-body"><span className="confidence" style={{color:colors[active.confidence]}}><i/> {active.confidence}</span><h2>{active.title}</h2><p className="detail-years">{active.years}</p><p>{active.description}</p><div className="location"><MapPinned size={15}/><span>{active.area?'Приблизителна зона':'Локализация по източник'}<small>{active.lat.toFixed(4)}° N · {active.lng.toFixed(4)}° E</small></span></div><div className="sources"><h3>Източници</h3>{active.sources.map(src=><a href={src.url} target="_blank" rel="noreferrer" key={src.label}>{src.label}<ExternalLink size={13}/></a>)}</div></div></aside>}
  </main>
 </div>
}
