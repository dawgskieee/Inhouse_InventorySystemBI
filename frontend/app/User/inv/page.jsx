"use client";
import React, { useState, useMemo } from "react";
import * as XLSX from "xlsx";

const COLORS = {
  ink: "#12181F",
  inkSoft: "#1C242E",
  paper: "#F6F7F5",
  card: "#FFFFFF",
  line: "#E3E5E1",
  text: "#1B222C",
  textMute: "#6B7280",
  textFaint: "#9CA3AF",
  signal: "#1F9D6C",
  signalBg: "#E5F5EC",
  amber: "#C7811A",
  amberBg: "#FBF0DD",
  rust: "#B94A3C",
  rustBg: "#FBEAE7",
  accent: "#2F6FED",
};

const seedAssets = [
  { id: "IT01", name: "Jona Francisco", dept: "IT", site: "HO", type: "Laptop", brand: "Lenovo", model: "82SF", cpu: "12th Gen Intel Core i5", storage: "512GB SSD", ram: "8GB", os: "Windows 11", osLicense: "Cracked", office: "MS Office 365", officeLicense: "Licensed", serial: "PF49ZLYR", purchase: "2024-06-22", warranty: "—", supplier: "—", status: "active", history: [{ date: "2024-06-22", note: "Issued to Jona Francisco, IT Dept" }] },
  { id: "IT02", name: "Alvin Guatato", dept: "IT", site: "HO", type: "Desktop", brand: "Asus", model: "All Series", cpu: "11th Gen Intel Core i5", storage: "1TB SSD", ram: "8GB", os: "Windows 11 Pro", osLicense: "Cracked", office: "MS Office Standard 2019", officeLicense: "Cracked", serial: "—", purchase: "—", warranty: "—", supplier: "—", status: "pending", history: [{ date: "—", note: "Previously assigned to Arman Reves (resigned)" }, { date: "—", note: "Transferred to Daniel Benavente" }] },
  { id: "HR01", name: "Elias Gonzaga", dept: "HR", site: "HO", type: "Laptop", brand: "Asus", model: "Vivobook K513EA", cpu: "11th Gen Intel Core i5", storage: "512GB SSD", ram: "8GB", os: "Windows 11", osLicense: "Cracked", office: "MS Office 365", officeLicense: "Licensed", serial: "N1N0CV09V53302F", purchase: "—", warranty: "—", supplier: "—", status: "active", history: [] },
  { id: "HR07", name: "Rochel Escalante", dept: "HR", site: "HO", type: "Desktop", brand: "Asus", model: "System Product", cpu: "8th Gen Intel Core i5", storage: "512GB SSD", ram: "8GB", os: "Windows 11", osLicense: "Cracked", office: "MS Office Standard 2019", officeLicense: "Cracked", serial: "G116500000-0193", purchase: "—", warranty: "—", supplier: "—", status: "pending", history: [{ date: "—", note: "Old assignee: Ma. Cristina Deligero (resigned)" }, { date: "—", note: "Transfer to Kaye Banagbanag, HR Dept" }] },
  { id: "TMG01", name: "Luisa De Guzman", dept: "TMG", site: "HO", type: "Laptop", brand: "Lenovo", model: "IdeaPad 3 15IAH8", cpu: "11th Gen Intel Core i5", storage: "512GB SSD", ram: "16GB", os: "Windows 11 Home", osLicense: "Cracked", office: "MS Office Standard 365", officeLicense: "Licensed", serial: "PF5D09TW", purchase: "2025-05-30", warranty: "1 year", supplier: "Complink", status: "active", history: [] },
  { id: "TMG13", name: "Ronald Diamada Jr", dept: "TMG", site: "HO", type: "Laptop", brand: "Asus", model: "X515JP-EJ385T", cpu: "11th Gen Intel Core i5", storage: "256GB SSD", ram: "8GB", os: "Windows 10", osLicense: "Cracked", office: "MS Office Standard 2019", officeLicense: "Cracked", serial: "MCN0CX0536629C", purchase: "—", warranty: "—", supplier: "—", status: "pending", history: [{ date: "—", note: "Old assignee: Khristian Kyle Tagle (resigned)" }, { date: "—", note: "Transfer to Ronald Diamada Jr, TMG Dept" }] },
  { id: "FIN-AP02", name: "Merasol Placencia", dept: "Finance", site: "HO", type: "Desktop", brand: "Acetech", model: "System Product", cpu: "Intel Core i5", storage: "512GB SSD", ram: "8GB", os: "Windows 11 Home", osLicense: "Cracked", office: "MS Office Standard 2019", officeLicense: "Cracked", serial: "B226480000-018", purchase: "2026-02-16", warranty: "—", supplier: "—", status: "active", history: [{ date: "—", note: "New computer set for Finance; old unit of Shinemae Gammad" }] },
  { id: "AUD01", name: "Archie Juachon", dept: "Audit", site: "HO", type: "Laptop", brand: "Lenovo", model: "IdeaPad Slim 3 15IRH10", cpu: "13th Gen Intel Core i5", storage: "500GB SSD", ram: "16GB", os: "Windows 11 Home", osLicense: "Cracked", office: "M365 Office", officeLicense: "Licensed", serial: "—", purchase: "—", warranty: "—", supplier: "—", status: "pending", history: [{ date: "01/19/2026", note: "Old unit of Adrian Quiambao (resigned), transferred to Archie Juachon" }] },
  { id: "EXE01", name: "Sebie Tan", dept: "Executive", site: "HO", type: "Laptop", brand: "Lenovo", model: "ThinkPad X1 Carbon Gen 13", cpu: "Intel Core Ultra 7", storage: "1TB SSD", ram: "16GB", os: "Windows 11 Home", osLicense: "Licensed", office: "MS Office 365", officeLicense: "Licensed", serial: "PF5GAVNG", purchase: "2025-05-30", warranty: "1 year", supplier: "VSTECS Phils Inc.", status: "active", history: [] },
  { id: "STR-01", name: "Reyes Store Cebu", dept: "Store Ops", site: "Store", type: "Desktop", brand: "Acetech", model: "System Product", cpu: "10th Gen Intel Core i5", storage: "512GB SSD", ram: "8GB", os: "Windows 10", osLicense: "Cracked", office: "MS Office Standard 2019", officeLicense: "Cracked", serial: "K312500000-0310", purchase: "—", warranty: "—", supplier: "—", status: "retired", history: [{ date: "—", note: "Retired from Store Cebu unit" }] },
];

const initialSites = {
  HO: ["Executive", "IT", "HR", "Purchasing", "Audit", "TMG", "Finance"],
  Store: ["Store Ops"],
};

const STATUS_META = {
  active: { label: "Active", color: COLORS.signal, bg: COLORS.signalBg },
  pending: { label: "Pending reassignment", color: COLORS.amber, bg: COLORS.amberBg },
  retired: { label: "Retired", color: COLORS.rust, bg: COLORS.rustBg },
};

const emptyForm = {
  id: "", name: "", dept: "IT", site: "HO", type: "Laptop", brand: "", model: "",
  cpu: "", storage: "", ram: "", os: "", osLicense: "Licensed", office: "", officeLicense: "Licensed",
  serial: "", purchase: "", warranty: "", supplier: "", status: "active", history: [],
};

function Dot({ color }) {
  return <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 999, background: color, marginRight: 8, flexShrink: 0 }} />;
}

function Badge({ status }) {
  const m = STATUS_META[status];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: m.color, background: m.bg, padding: "3px 9px", borderRadius: 999 }}>
      <Dot color={m.color} />{m.label}
    </span>
  );
}

function Tag({ children }) {
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 0.3,
      background: COLORS.paper, border: `1px solid ${COLORS.line}`, borderRadius: 4,
      padding: "3px 7px", color: COLORS.text, fontWeight: 600,
    }}>{children}</span>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "block", marginBottom: 14 }}>
      <span style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.textMute, marginBottom: 5 }}>{label}</span>
      {children}
    </label>
  );
}

const inputStyle = {
  width: "100%", boxSizing: "border-box", fontFamily: "'Inter', sans-serif", fontSize: 14,
  padding: "9px 11px", border: `1px solid ${COLORS.line}`, borderRadius: 7, color: COLORS.text,
  background: "#FFF", outline: "none",
};

export default function ITInventory() {
  const [assets, setAssets] = useState(seedAssets);
  const [sites, setSites] = useState(initialSites);
  const [selectedSite, setSelectedSite] = useState("All");
  const [selectedDept, setSelectedDept] = useState("All");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // { mode: 'add'|'edit', data }
  const [detail, setDetail] = useState(null); // asset being viewed
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [siteModal, setSiteModal] = useState(null); // { type: 'site'|'dept', forSite }
  const [siteInput, setSiteInput] = useState("");

  function addSite(name) {
    const clean = name.trim();
    if (!clean || sites[clean]) return;
    setSites(prev => ({ ...prev, [clean]: [] }));
  }
  function addDept(site, name) {
    const clean = name.trim();
    if (!clean || !site || sites[site]?.includes(clean)) return;
    setSites(prev => ({ ...prev, [site]: [...prev[site], clean] }));
  }
  function exportExcel() {
    const rows = assets.map(a => ({
      "Asset Tag": a.id, "Assigned To": a.name, "Site": a.site, "Department": a.dept,
      "Type": a.type, "Brand": a.brand, "Model": a.model, "Processor": a.cpu,
      "Storage": a.storage, "RAM": a.ram, "Serial Number": a.serial,
      "OS": a.os, "OS License": a.osLicense, "Application": a.office, "App License": a.officeLicense,
      "Purchase Date": a.purchase, "Warranty": a.warranty, "Supplier": a.supplier,
      "Status": STATUS_META[a.status].label,
      "History": a.history.map(h => `${h.date}: ${h.note}`).join(" | "),
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    ws["!cols"] = Object.keys(rows[0] || {}).map(k => ({ wch: Math.max(14, k.length + 2) }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "IT Inventory");
    XLSX.writeFile(wb, `BII_IT_Inventory_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  const filtered = useMemo(() => {
    return assets.filter(a => {
      if (selectedSite !== "All" && a.site !== selectedSite) return false;
      if (selectedDept !== "All" && a.dept !== selectedDept) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        if (![a.name, a.id, a.serial, a.brand, a.model].some(v => (v || "").toLowerCase().includes(q))) return false;
      }
      return true;
    });
  }, [assets, selectedSite, selectedDept, search]);

  const stats = useMemo(() => ({
    total: assets.length,
    active: assets.filter(a => a.status === "active").length,
    pending: assets.filter(a => a.status === "pending").length,
    retired: assets.filter(a => a.status === "retired").length,
  }), [assets]);

  function openAdd() {
    setModal({ mode: "add", data: { ...emptyForm, id: "" } });
  }
  function openEdit(asset) {
    setModal({ mode: "edit", data: { ...asset } });
  }
  function saveModal(e) {
    e.preventDefault();
    const d = modal.data;
    if (!d.id.trim() || !d.name.trim()) return;
    if (modal.mode === "add") {
      setAssets(prev => [...prev, { ...d, history: [{ date: new Date().toISOString().slice(0, 10), note: `Asset created, assigned to ${d.name}` }] }]);
    } else {
      setAssets(prev => prev.map(a => a.id === modal.originalId ? d : a));
    }
    setModal(null);
  }
  function doDelete(id) {
    setAssets(prev => prev.filter(a => a.id !== id));
    setConfirmDelete(null);
    setDetail(null);
  }

  const deptOptions = selectedSite === "All"
    ? Object.values(sites).flat()
    : sites[selectedSite] || [];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: COLORS.paper, color: COLORS.text, minHeight: 600, display: "flex", borderRadius: 12, overflow: "hidden", border: `1px solid ${COLORS.line}`, position: "relative" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');
        .row:hover { background: #FAFAF9; }
        .navitem:hover { background: rgba(255,255,255,0.06); }
        button.primary { background: ${COLORS.ink}; color: #fff; border: none; }
        button.primary:hover { background: #000; }
        button.ghost { background: transparent; border: 1px solid ${COLORS.line}; color: ${COLORS.text}; }
        button.ghost:hover { background: #F0F1EF; }
        button.danger { background: ${COLORS.rustBg}; border: 1px solid ${COLORS.rust}33; color: ${COLORS.rust}; }
        button { cursor: pointer; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; padding: 8px 14px; border-radius: 7px; }
      `}</style>

      {/* Sidebar */}
      <div style={{ width: 220, background: COLORS.ink, color: "#D6DAE0", padding: "20px 14px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 26, padding: "0 6px" }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: COLORS.signal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#08281B" }}>BI</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>BII IT Console</div>
            <div style={{ fontSize: 10.5, color: "#7B8494" }}>Asset registry</div>
          </div>
        </div>

        <div
          onClick={() => { setSelectedSite("All"); setSelectedDept("All"); }}
          className="navitem"
          style={{ fontSize: 12.5, fontWeight: 600, padding: "8px 10px", borderRadius: 6, cursor: "pointer", marginBottom: 4, background: selectedSite === "All" ? "rgba(255,255,255,0.08)" : "transparent", color: selectedSite === "All" ? "#fff" : "#B7BEC9" }}
        >
          All sites <span style={{ float: "right", color: "#7B8494" }}>{assets.length}</span>
        </div>

        {Object.entries(sites).map(([site, depts]) => (
          <div key={site} style={{ marginTop: 12 }}>
            <div
              onClick={() => { setSelectedSite(site); setSelectedDept("All"); }}
              className="navitem"
              style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.6, fontWeight: 700, padding: "6px 10px", borderRadius: 6, cursor: "pointer", color: selectedSite === site ? "#fff" : "#7B8494" }}
            >
              {site} <span style={{ float: "right" }}>{assets.filter(a => a.site === site).length}</span>
            </div>
            {depts.map(dept => (
              <div
                key={dept}
                onClick={() => { setSelectedSite(site); setSelectedDept(dept); }}
                className="navitem"
                style={{
                  fontSize: 12.5, padding: "7px 10px 7px 18px", borderRadius: 6, cursor: "pointer",
                  background: selectedDept === dept && selectedSite === site ? "rgba(255,255,255,0.08)" : "transparent",
                  color: selectedDept === dept && selectedSite === site ? "#fff" : "#9AA2AF",
                }}
              >
                {dept} <span style={{ float: "right", color: "#7B8494" }}>{assets.filter(a => a.site === site && a.dept === dept).length}</span>
              </div>
            ))}
            <div
              onClick={() => { setSiteInput(""); setSiteModal({ type: "dept", forSite: site }); }}
              className="navitem"
              style={{ fontSize: 12, padding: "7px 10px 7px 18px", borderRadius: 6, cursor: "pointer", color: "#6B7480" }}
            >
              + Add department
            </div>
          </div>
        ))}

        <div
          onClick={() => { setSiteInput(""); setSiteModal({ type: "site" }); }}
          className="navitem"
          style={{ fontSize: 12, fontWeight: 600, padding: "8px 10px", borderRadius: 6, cursor: "pointer", marginTop: 16, color: "#9AA2AF", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 14 }}
        >
          + Add site
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "22px 26px", minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 12 }}>
          <input
            placeholder="Search name, asset tag, or serial number"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ ...inputStyle, maxWidth: 340 }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button className="ghost" onClick={exportExcel}>⭳ Export to Excel</button>
            <button className="primary" onClick={openAdd}>+ New asset</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 22 }}>
          {[
            { label: "Total assets", value: stats.total, color: COLORS.text },
            { label: "Active", value: stats.active, color: COLORS.signal },
            { label: "Pending reassignment", value: stats.pending, color: COLORS.amber },
            { label: "Retired", value: stats.retired, color: COLORS.rust },
          ].map(s => (
            <div key={s.label} style={{ background: COLORS.card, border: `1px solid ${COLORS.line}`, borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 12, color: COLORS.textMute, fontWeight: 600, marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.line}`, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "26px 110px 1.3fr 90px 1.1fr 1fr 140px 70px", gap: 8, padding: "10px 16px", fontSize: 11, fontWeight: 700, color: COLORS.textFaint, textTransform: "uppercase", letterSpacing: 0.5, borderBottom: `1px solid ${COLORS.line}` }}>
            <span></span><span>Asset tag</span><span>Assigned to</span><span>Dept</span><span>Device</span><span>OS / license</span><span>Status</span><span></span>
          </div>
          {filtered.length === 0 && (
            <div style={{ padding: "40px 16px", textAlign: "center", color: COLORS.textMute, fontSize: 13 }}>No assets match this view.</div>
          )}
          {filtered.map(a => (
            <div
              key={a.id}
              className="row"
              onClick={() => setDetail(a)}
              style={{ display: "grid", gridTemplateColumns: "26px 110px 1.3fr 90px 1.1fr 1fr 140px 70px", gap: 8, padding: "12px 16px", alignItems: "center", borderBottom: `1px solid ${COLORS.line}`, cursor: "pointer", fontSize: 13 }}
            >
              <Dot color={STATUS_META[a.status].color} />
              <Tag>{a.id}</Tag>
              <div style={{ fontWeight: 600 }}>{a.name}</div>
              <div style={{ color: COLORS.textMute, fontSize: 12.5 }}>{a.dept}</div>
              <div style={{ color: COLORS.textMute, fontSize: 12.5 }}>{a.type} · {a.brand}</div>
              <div style={{ color: COLORS.textMute, fontSize: 12.5 }}>
                {a.os} <span style={{ color: a.osLicense === "Licensed" ? COLORS.signal : COLORS.rust, fontWeight: 600 }}>· {a.osLicense}</span>
              </div>
              <Badge status={a.status} />
              <div style={{ textAlign: "right" }}>
                <button className="ghost" style={{ padding: "5px 9px", fontSize: 12 }} onClick={(e) => { e.stopPropagation(); openEdit(a); }}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit modal */}
      {modal && (
        <Overlay onClose={() => setModal(null)}>
          <form onSubmit={saveModal} style={{ width: 560, maxHeight: "82vh", overflowY: "auto", background: "#fff", borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{modal.mode === "add" ? "Add new asset" : `Edit ${modal.data.id}`}</div>
            <div style={{ fontSize: 12.5, color: COLORS.textMute, marginBottom: 18 }}>{modal.mode === "add" ? "Register a device and assign it to a team member." : "Update device details or reassign this asset."}</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Asset tag">
                <input required disabled={modal.mode === "edit"} style={{ ...inputStyle, fontFamily: "'JetBrains Mono', monospace" }} value={modal.data.id}
                  onChange={e => setModal(m => ({ ...m, data: { ...m.data, id: e.target.value.toUpperCase() } }))} placeholder="e.g. IT16" />
              </Field>
              <Field label="Assigned to">
                <input required style={inputStyle} value={modal.data.name}
                  onChange={e => setModal(m => ({ ...m, data: { ...m.data, name: e.target.value } }))} placeholder="Full name" />
              </Field>

              <Field label="Site">
                <select style={inputStyle} value={modal.data.site}
                  onChange={e => setModal(m => ({ ...m, data: { ...m.data, site: e.target.value, dept: (sites[e.target.value] || [])[0] || "" } }))}>
                  {Object.keys(sites).map(s => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Department">
                {(sites[modal.data.site] || []).length === 0 ? (
                  <div style={{ fontSize: 12.5, color: COLORS.textMute, padding: "9px 0" }}>No departments yet — add one from the sidebar first.</div>
                ) : (
                  <select style={inputStyle} value={modal.data.dept}
                    onChange={e => setModal(m => ({ ...m, data: { ...m.data, dept: e.target.value } }))}>
                    {sites[modal.data.site].map(d => <option key={d}>{d}</option>)}
                  </select>
                )}
              </Field>

              <Field label="Device type">
                <select style={inputStyle} value={modal.data.type}
                  onChange={e => setModal(m => ({ ...m, data: { ...m.data, type: e.target.value } }))}>
                  {["Laptop", "Desktop", "Tablet"].map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Status">
                <select style={inputStyle} value={modal.data.status}
                  onChange={e => setModal(m => ({ ...m, data: { ...m.data, status: e.target.value } }))}>
                  {Object.entries(STATUS_META).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </Field>

              <Field label="Brand"><input style={inputStyle} value={modal.data.brand} onChange={e => setModal(m => ({ ...m, data: { ...m.data, brand: e.target.value } }))} /></Field>
              <Field label="Model"><input style={inputStyle} value={modal.data.model} onChange={e => setModal(m => ({ ...m, data: { ...m.data, model: e.target.value } }))} /></Field>

              <Field label="Processor"><input style={inputStyle} value={modal.data.cpu} onChange={e => setModal(m => ({ ...m, data: { ...m.data, cpu: e.target.value } }))} /></Field>
              <Field label="Storage"><input style={inputStyle} value={modal.data.storage} onChange={e => setModal(m => ({ ...m, data: { ...m.data, storage: e.target.value } }))} /></Field>

              <Field label="Memory (RAM)"><input style={inputStyle} value={modal.data.ram} onChange={e => setModal(m => ({ ...m, data: { ...m.data, ram: e.target.value } }))} /></Field>
              <Field label="Serial number"><input style={{ ...inputStyle, fontFamily: "'JetBrains Mono', monospace" }} value={modal.data.serial} onChange={e => setModal(m => ({ ...m, data: { ...m.data, serial: e.target.value } }))} /></Field>

              <Field label="Operating system"><input style={inputStyle} value={modal.data.os} onChange={e => setModal(m => ({ ...m, data: { ...m.data, os: e.target.value } }))} /></Field>
              <Field label="OS license">
                <select style={inputStyle} value={modal.data.osLicense} onChange={e => setModal(m => ({ ...m, data: { ...m.data, osLicense: e.target.value } }))}>
                  <option>Licensed</option><option>Cracked</option>
                </select>
              </Field>

              <Field label="Office / application"><input style={inputStyle} value={modal.data.office} onChange={e => setModal(m => ({ ...m, data: { ...m.data, office: e.target.value } }))} /></Field>
              <Field label="Office license">
                <select style={inputStyle} value={modal.data.officeLicense} onChange={e => setModal(m => ({ ...m, data: { ...m.data, officeLicense: e.target.value } }))}>
                  <option>Licensed</option><option>Cracked</option>
                </select>
              </Field>

              <Field label="Purchase date"><input type="date" style={inputStyle} value={modal.data.purchase === "—" ? "" : modal.data.purchase} onChange={e => setModal(m => ({ ...m, data: { ...m.data, purchase: e.target.value } }))} /></Field>
              <Field label="Warranty"><input style={inputStyle} value={modal.data.warranty} onChange={e => setModal(m => ({ ...m, data: { ...m.data, warranty: e.target.value } }))} placeholder="e.g. 1 year" /></Field>

              <Field label="Supplier"><input style={inputStyle} value={modal.data.supplier} onChange={e => setModal(m => ({ ...m, data: { ...m.data, supplier: e.target.value } }))} /></Field>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
              <div>
                {modal.mode === "edit" && (
                  <button type="button" className="danger" onClick={() => { setModal(null); setConfirmDelete(modal.data); }}>Delete asset</button>
                )}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" className="ghost" onClick={() => setModal(null)}>Cancel</button>
                <button type="submit" className="primary">{modal.mode === "add" ? "Add asset" : "Save changes"}</button>
              </div>
            </div>
          </form>
        </Overlay>
      )}

      {/* Detail drawer */}
      {detail && !modal && (
        <Overlay onClose={() => setDetail(null)}>
          <div style={{ width: 460, maxHeight: "82vh", overflowY: "auto", background: "#fff", borderRadius: 12, padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 4 }}>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700 }}>{detail.name}</div>
                <div style={{ fontSize: 12.5, color: COLORS.textMute }}>{detail.dept} · {detail.site}</div>
              </div>
              <Tag>{detail.id}</Tag>
            </div>
            <div style={{ margin: "12px 0 18px" }}><Badge status={detail.status} /></div>

            <DetailRow label="Device" value={`${detail.type} · ${detail.brand} ${detail.model}`} />
            <DetailRow label="Processor" value={detail.cpu} />
            <DetailRow label="Storage / RAM" value={`${detail.storage} / ${detail.ram}`} />
            <DetailRow label="Serial number" value={detail.serial} mono />
            <DetailRow label="Operating system" value={`${detail.os} (${detail.osLicense})`} highlight={detail.osLicense === "Cracked"} />
            <DetailRow label="Applications" value={`${detail.office} (${detail.officeLicense})`} highlight={detail.officeLicense === "Cracked"} />
            <DetailRow label="Purchase date" value={detail.purchase} />
            <DetailRow label="Warranty" value={detail.warranty} />
            <DetailRow label="Supplier" value={detail.supplier} />

            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textFaint, textTransform: "uppercase", letterSpacing: 0.5, margin: "18px 0 8px" }}>History</div>
            {detail.history.length === 0 && <div style={{ fontSize: 13, color: COLORS.textMute }}>No history recorded.</div>}
            {detail.history.map((h, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 12.5, marginBottom: 8 }}>
                <span style={{ color: COLORS.textFaint, minWidth: 74 }}>{h.date}</span>
                <span style={{ color: COLORS.text }}>{h.note}</span>
              </div>
            ))}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20 }}>
              <button className="ghost" onClick={() => setDetail(null)}>Close</button>
              <button className="primary" onClick={() => openEdit(detail)}>Edit asset</button>
            </div>
          </div>
        </Overlay>
      )}

      {/* Add site / department */}
      {siteModal && (
        <Overlay onClose={() => setSiteModal(null)}>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (siteModal.type === "site") addSite(siteInput);
              else addDept(siteModal.forSite, siteInput);
              setSiteModal(null);
            }}
            style={{ width: 340, background: "#fff", borderRadius: 12, padding: 22 }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
              {siteModal.type === "site" ? "Add new site" : `Add department to ${siteModal.forSite}`}
            </div>
            <div style={{ fontSize: 12.5, color: COLORS.textMute, marginBottom: 14 }}>
              {siteModal.type === "site" ? "e.g. a new branch or warehouse location." : "e.g. a new team within this site."}
            </div>
            <input autoFocus required style={inputStyle} value={siteInput} onChange={e => setSiteInput(e.target.value)}
              placeholder={siteModal.type === "site" ? "Site name" : "Department name"} />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
              <button type="button" className="ghost" onClick={() => setSiteModal(null)}>Cancel</button>
              <button type="submit" className="primary">Add</button>
            </div>
          </form>
        </Overlay>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <Overlay onClose={() => setConfirmDelete(null)}>
          <div style={{ width: 380, background: "#fff", borderRadius: 12, padding: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Delete {confirmDelete.id}?</div>
            <div style={{ fontSize: 13, color: COLORS.textMute, marginBottom: 18 }}>This removes {confirmDelete.name}'s asset record and history. This can't be undone.</div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button className="ghost" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="danger" onClick={() => doDelete(confirmDelete.id)}>Delete</button>
            </div>
          </div>
        </Overlay>
      )}
    </div>
  );
}

function DetailRow({ label, value, mono, highlight }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #F0F1EF", fontSize: 13 }}>
      <span style={{ color: COLORS.textMute }}>{label}</span>
      <span style={{ fontWeight: 600, fontFamily: mono ? "'JetBrains Mono', monospace" : "inherit", color: highlight ? COLORS.rust : COLORS.text, textAlign: "right" }}>{value || "—"}</span>
    </div>
  );
}

function Overlay({ children, onClose }) {
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(18,24,31,0.5)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 20px", zIndex: 10 }}>
      <div onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );
}
