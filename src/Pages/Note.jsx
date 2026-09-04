import React, { useState } from "react";
import {
  FileText,
  UploadCloud,
  Search,
  Plus,
  ExternalLink,
  X,
  BookOpen,
  Hash,
  Calendar,
  FileDown,
} from "lucide-react";

/* ==========================================================================
   MOCK DATA
   ========================================================================== */
const initialNotes = [
  {
    id: 1,
    title: "Graph Theory Algorithms",
    description:
      "Detailed walkthrough of Dijkstra's, A*, and Bellman-Ford algorithms with code snippets and time complexity analysis.",
    subject: "Data Structures",
    topic: "Algorithms",
    date: "Dec 10, 2024",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // Dummy PDF for demo
  },
  {
    id: 2,
    title: "Thermodynamics Laws",
    description:
      "Summary of the 4 laws of thermodynamics, entropy calculations, and real-world engine efficiency examples.",
    subject: "Physics",
    topic: "Thermal Dynamics",
    date: "Dec 12, 2024",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 3,
    title: "React Hooks Cheat Sheet",
    description:
      "Personal notes on useEffect lifecycle, custom hooks creation, and state management optimization.",
    subject: "Web Development",
    topic: "React",
    date: "Dec 18, 2024",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

const subjectsList = [
  "All",
  "Data Structures",
  "Physics",
  "Web Development",
  "Mathematics",
];

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */
export const NotesPage = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [activeSubject, setActiveSubject] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Filter logic
  const filteredNotes = notes.filter((note) => {
    const matchesSubject =
      activeSubject === "All" || note.subject === activeSubject;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    // Outer scrollable container with custom scrollbars
    <div
      className="
      flex-1 h-full bg-[#1A1D2D] text-white font-sans p-8 overflow-y-auto
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-slate-700/50
      [&::-webkit-scrollbar-thumb]:rounded-full
      hover:[&::-webkit-scrollbar-thumb]:bg-[#6C5DD3]/50
      transition-colors
    "
    >
      <div className="w-full max-w-7xl mx-auto pb-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Study Vault</h1>
            <p className="text-slate-400 text-sm">
              Organize, describe, and access your PDF notes instantly.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search notes or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-[#25283B] border border-white/5 rounded-xl text-sm text-white focus:outline-none focus:border-[#6C5DD3] transition-colors w-64"
              />
            </div>

            {/* Upload Button */}
            <button
              onClick={() => setIsUploadOpen(!isUploadOpen)}
              className="px-5 py-2.5 bg-[#6C5DD3] rounded-xl font-semibold flex items-center gap-2 hover:bg-[#5a4db8] transition-colors shadow-[0_0_20px_rgba(108,93,211,0.3)]"
            >
              {isUploadOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {isUploadOpen ? "Close" : "New Note"}
            </button>
          </div>
        </div>

        {/* Upload Form Panel (Conditionally Rendered) */}
        {isUploadOpen && (
          <div className="bg-[#25283B] rounded-2xl p-6 border border-[#6C5DD3]/30 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-[#6C5DD3]" /> Upload New Note
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Drag & Drop Zone (Visual only for prototype) */}
              <div className="lg:col-span-1 border-2 border-dashed border-slate-600 rounded-xl bg-[#1A1D2D] hover:border-[#6C5DD3] transition-colors flex flex-col items-center justify-center p-8 cursor-pointer group">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#6C5DD3]/20 transition-colors">
                  <FileDown className="w-6 h-6 text-slate-400 group-hover:text-[#6C5DD3]" />
                </div>
                <p className="text-sm font-semibold text-white mb-1">
                  Click to upload PDF
                </p>
                <p className="text-xs text-slate-500">Max file size 10MB</p>
              </div>

              {/* Form Inputs */}
              <div className="lg:col-span-2 space-y-4">
                <input
                  type="text"
                  placeholder="Note Title (e.g., Chapter 4 Summary)"
                  className="w-full px-4 py-3 bg-[#1A1D2D] border border-white/5 rounded-xl text-sm text-white focus:outline-none focus:border-[#6C5DD3] transition-colors"
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Subject (e.g., Physics)"
                    className="w-1/2 px-4 py-3 bg-[#1A1D2D] border border-white/5 rounded-xl text-sm text-white focus:outline-none focus:border-[#6C5DD3] transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Topic (e.g., Thermodynamics)"
                    className="w-1/2 px-4 py-3 bg-[#1A1D2D] border border-white/5 rounded-xl text-sm text-white focus:outline-none focus:border-[#6C5DD3] transition-colors"
                  />
                </div>
                <textarea
                  placeholder="Briefly describe the contents of these notes..."
                  rows="3"
                  className="w-full px-4 py-3 bg-[#1A1D2D] border border-white/5 rounded-xl text-sm text-white focus:outline-none focus:border-[#6C5DD3] transition-colors resize-none"
                ></textarea>
                <div className="flex justify-end">
                  <button className="px-6 py-2.5 bg-[#6C5DD3] text-white rounded-xl text-sm font-semibold hover:bg-[#5a4db8] transition-colors">
                    Save Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subject Filters */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-4 [&::-webkit-scrollbar]:hidden">
          {subjectsList.map((subject) => (
            <button
              key={subject}
              onClick={() => setActiveSubject(subject)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                ${
                  activeSubject === subject
                    ? "bg-white/10 text-white border border-white/10"
                    : "bg-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                }
              `}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              // Clicking anywhere on this card opens the PDF in a new tab
              <a
                href={note.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                key={note.id}
                className="group bg-[#25283B] rounded-2xl p-6 border border-white/5 hover:border-[#6C5DD3]/50 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(108,93,211,0.15)] transition-all cursor-pointer flex flex-col h-[280px]"
              >
                {/* Header: Tags & External Link Icon */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2 flex-wrap">
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-md border border-blue-500/20">
                      <BookOpen className="w-3 h-3" /> {note.subject}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-[#FF75C3]/10 text-[#FF75C3] px-2.5 py-1 rounded-md border border-[#FF75C3]/20">
                      <Hash className="w-3 h-3" /> {note.topic}
                    </span>
                  </div>
                  {/* Subtle external link icon that highlights on hover */}
                  <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-[#6C5DD3] transition-colors shrink-0 ml-2" />
                </div>

                {/* Body: Title & Description */}
                <div className="mb-auto">
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-[#6C5DD3] transition-colors">
                    {note.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {note.description}
                  </p>
                </div>

                {/* Footer: Date & File Type */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {note.date}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-slate-300">
                    <FileText className="w-3.5 h-3.5 text-red-400" /> PDF
                    Document
                  </span>
                </div>
              </a>
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500">
              <Search className="w-12 h-12 mb-4 opacity-20" />
              <p>No notes found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
