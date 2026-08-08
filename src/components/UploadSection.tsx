"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Loader2, Plus, X, ArrowRight, Camera, Check } from "lucide-react";
import { detectFace, FaceCropResult } from "@/lib/faceDetection";
import { getRandomBuilderTitle } from "@/lib/builderTitles";

export interface UserData {
  name: string;
  role: string;
  teamName: string;
  tags: string[];
  mood: string;
  title: string;
  builderId: string;
  cropResult: FaceCropResult;
}

interface UploadSectionProps {
  onUploadComplete?: (data: UserData) => void;
}

const PRESET_TAGS = [
  "AI", "Web", "Full Stack", "Frontend", "Backend",
  "ML", "GenAI", "DevOps", "Cloud", "Open Source",
  "Blockchain", "Cybersecurity", "Flutter", "React",
  "Next.js", "Python", "Java", "UI/UX"
];

const PRESET_MOODS = [
  { id: "shipping", label: "Shipping", icon: "⚡" },
  { id: "grinding", label: "Grinding", icon: "🔥" },
  { id: "building", label: "Building", icon: "🚀" },
  { id: "locked-in", label: "Locked In", icon: "🧠" },
  { id: "debugging", label: "Debugging", icon: "☕" },
  { id: "chill", label: "Chill", icon: "🌴" },
  { id: "flow", label: "Flow State", icon: "🌊" },
  { id: "vibing", label: "Vibing", icon: "🎉" },
  { id: "sleep", label: "Sleep Deprived", icon: "😴" },
  { id: "ai", label: "AI Mode", icon: "🤖" },
];

export function UploadSection({ onUploadComplete }: UploadSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [name, setName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [role, setRole] = useState("");

  const [tags, setTags] = useState<string[]>([]);
  const [customTagInput, setCustomTagInput] = useState("");
  const [isAddingCustomTag, setIsAddingCustomTag] = useState(false);

  const [mood, setMood] = useState("");

  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  // Validation
  const isFormValid = file !== null && name.trim() !== "" && teamName.trim() !== "" && role.trim() !== "";

  const toggleTag = (tag: string) => {
    setTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleAddCustomTag = () => {
    if (customTagInput.trim() && !tags.includes(customTagInput.trim())) {
      setTags(prev => [...prev, customTagInput.trim()]);
    }
    setCustomTagInput("");
    setIsAddingCustomTag(false);
  };

  const handleSubmit = () => {
    setAttemptedSubmit(true);
    if (!isFormValid || !file) return;

    // Using the same approach as onDrop to handle the processing logic for file
    processFileAndSubmit(file);
  };

  const processFileAndSubmit = async (selectedFile: File) => {
    setIsProcessing(true);
    try {
      let selected = selectedFile;
      if (selected.type === "image/heic" || selected.name.toLowerCase().endsWith(".heic")) {
        const heic2any = (await import("heic2any")).default;
        const converted = await heic2any({ blob: selected, toType: "image/jpeg" });
        selected = new File(
          [Array.isArray(converted) ? converted[0] : converted],
          selected.name.replace(/\.heic$/i, ".jpg"),
          { type: "image/jpeg" }
        );
      }

      const imageUrl = URL.createObjectURL(selected);
      const cropResult = await detectFace(imageUrl);

      if (cropResult && onUploadComplete) {
        const builderId = Math.floor(1000 + Math.random() * 9000).toString();
        onUploadComplete({
          name: name.trim(),
          teamName: teamName.trim(),
          role: role.trim(),
          tags,
          mood,
          title: getRandomBuilderTitle(),
          builderId,
          cropResult
        });
      } else {
        setIsProcessing(false);
        setFile(null);
        alert("Failed to process image. Please try another one.");
      }
    } catch (error) {
      console.error(error);
      alert("Error processing image.");
      setIsProcessing(false);
      setFile(null);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selected = acceptedFiles[0];
    if (selected) setFile(selected);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/heic": [".heic"],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-[500px] mx-auto relative group">
      <div className="absolute inset-0 bg-primary/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative flex flex-col p-6 sm:p-8 rounded-[2rem] border border-primary bg-black/60 backdrop-blur-md shadow-2xl">
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6 stroke-secondary/80"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12c3-1 6-1 9 0s6 1 9 0" /></svg>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary"><path d="M12 2C8 2 5.5 5.5 5.5 5.5l2.5 1.5c0 0 2-3 4-3s4 3 4 3l2.5-1.5C18.5 5.5 16 2 12 2zM6 8c-1.5 1-3 3-3 3l2.5 1.5S7 10.5 8 9.5L6 8zm12 0l-2 1.5c1 1 2.5 3 2.5 3l2.5-1.5C21 11 19.5 9 18 8zM11 10v12h2V10h-2z" /></svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6 stroke-secondary/80"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12c3-1 6-1 9 0s6 1 9 0" /></svg>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <h3 className="text-xl font-medium mb-2 text-foreground">Generating Pass</h3>
              <p className="text-sm text-muted-foreground text-center">Processing AI framing...</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-8"
            >
              {/* PHOTO SECTION */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-primary tracking-widest uppercase">Photo *</label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    {...getRootProps()}
                    className={`
                      flex items-center justify-center gap-2 py-3 rounded-lg border transition-all cursor-pointer
                      ${isDragActive ? "border-primary bg-primary/10 text-primary" : "border-muted-foreground/30 hover:border-primary/50 text-foreground bg-transparent"}
                      ${attemptedSubmit && !file ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]" : ""}
                    `}
                  >
                    <input {...getInputProps()} />
                    <UploadCloud className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">{file ? "Change photo" : "Upload photo"}</span>
                  </div>

                  <button className="flex items-center justify-center gap-2 py-3 rounded-lg border border-muted-foreground/30 text-foreground bg-transparent hover:border-primary/50 transition-all">
                    <Camera className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">Take photo</span>
                  </button>
                </div>
                {file && <span className="text-xs text-primary/80 truncate">Selected: {file.name}</span>}
                {attemptedSubmit && !file && <span className="text-[11px] text-red-500 mt-1">• Please upload your photo.</span>}
              </div>

              {/* NAME SECTION */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-primary tracking-widest uppercase">Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="YOUR FULL NAME"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={`w-full bg-transparent border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all
                      ${attemptedSubmit && !name.trim() ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]" : "border-muted-foreground/30"}
                    `}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-secondary"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                </div>
                {attemptedSubmit && !name.trim() && <span className="text-[11px] text-red-500">• Full Name is required.</span>}
              </div>

              {/* TEAM SECTION */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-primary tracking-widest uppercase">Team Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="YOUR TEAM NAME"
                    value={teamName}
                    onChange={e => setTeamName(e.target.value)}
                    className={`w-full bg-transparent border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all
                      ${attemptedSubmit && !teamName.trim() ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]" : "border-muted-foreground/30"}
                    `}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-accent"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                </div>
                {attemptedSubmit && !teamName.trim() && <span className="text-[11px] text-red-500">• Team Name is required.</span>}
              </div>

              {/* DESIGNATION SECTION */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-primary tracking-widest uppercase">Designation / Stack *</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="YOUR DESIGNATION"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className={`w-full bg-transparent border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all
                      ${attemptedSubmit && !role.trim() ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]" : "border-muted-foreground/30"}
                    `}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-secondary"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                  </div>
                </div>
                {attemptedSubmit && !role.trim() && <span className="text-[11px] text-red-500">• Enter your designation or stack.</span>}
              </div>

              {/* TAGS SECTION (REDESIGNED) */}
              <div className="flex flex-col gap-4">
                <label className="text-[10px] font-bold text-primary tracking-widest uppercase">Tags <span className="text-muted-foreground font-normal">(Optional)</span></label>
                <div className="flex flex-wrap gap-2.5">
                  {PRESET_TAGS.map(tag => {
                    const isActive = tags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`h-[38px] px-4 rounded-full border transition-all flex items-center justify-center gap-1.5 ${
                          isActive
                            ? "border-[#FFD31A] bg-[#FFD31A] text-black font-bold shadow-[0_0_15px_rgba(255,211,26,0.4)]"
                            : "border-white/20 bg-transparent text-white/70 hover:border-[#00D6B4] hover:text-white hover:shadow-[0_0_15px_rgba(0,214,180,0.3)]"
                        }`}
                      >
                        {isActive && <Check className="w-3.5 h-3.5" />}
                        <span className="text-[11px] tracking-wide">{tag}</span>
                      </button>
                    );
                  })}

                  {tags.filter(t => !PRESET_TAGS.includes(t)).map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className="h-[38px] px-4 rounded-full border border-[#FFD31A] bg-[#FFD31A] text-black font-bold shadow-[0_0_15px_rgba(255,211,26,0.4)] transition-all flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span className="text-[11px] tracking-wide">{tag}</span>
                      <X className="w-3.5 h-3.5 ml-1 opacity-60 hover:opacity-100" />
                    </button>
                  ))}

                  {isAddingCustomTag ? (
                    <div className="flex items-center">
                      <input
                        autoFocus
                        type="text"
                        value={customTagInput}
                        onChange={e => setCustomTagInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAddCustomTag()}
                        onBlur={handleAddCustomTag}
                        className="h-[38px] px-4 rounded-full border border-[#00D6B4] bg-black/40 text-white text-[11px] focus:outline-none w-28 shadow-[0_0_15px_rgba(0,214,180,0.2)]"
                        placeholder="Tag name..."
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsAddingCustomTag(true)}
                      className="h-[38px] px-4 rounded-full border border-dashed border-white/30 text-white/60 hover:border-[#00D6B4] hover:text-white transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-3 h-3" /> 
                      <span className="text-[11px] tracking-wide">Custom Tag</span>
                    </button>
                  )}
                </div>
              </div>

              {/* MOOD SECTION (REDESIGNED) */}
              <div className="flex flex-col gap-4">
                <label className="text-[10px] font-bold text-primary tracking-widest uppercase">Builder Mood <span className="text-muted-foreground font-normal">(Optional)</span></label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PRESET_MOODS.map(m => {
                    const isActive = mood === m.id;
                    return (
                      <motion.button
                        key={m.id}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMood(isActive ? "" : m.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                          isActive
                            ? "border-[#FFD31A] bg-[#050807] text-[#FFD31A] shadow-[inset_0_0_20px_rgba(0,214,180,0.15),0_10px_20px_-10px_rgba(255,211,26,0.3)] -translate-y-1"
                            : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:shadow-[0_10px_20px_-10px_rgba(255,255,255,0.1)]"
                        }`}
                      >
                        <span className="text-2xl mb-2">{m.icon}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? "text-[#FFD31A]" : "text-white/50"}`}>
                          {m.label}
                        </span>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-4">
                <button
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all duration-300
                    ${isFormValid
                      ? "bg-gradient-to-r from-primary to-[#FF9D00] text-black shadow-[0_0_20px_rgba(255,210,26,0.4)] cursor-pointer hover:-translate-y-1"
                      : "bg-white/5 border border-white/10 text-white/40 cursor-not-allowed opacity-40"}
                  `}
                  onClick={handleSubmit}
                  disabled={!isFormValid || isProcessing}
                >
                  <span>Generate Builder Pass</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
