"use client";

import { useState, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Image as ImageIcon, Video, FileText, Heart, Sparkles, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

interface AddMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMemoryAdded: (memory: any) => void;
}

export default function AddMemoryModal({ isOpen, onClose, onMemoryAdded }: AddMemoryModalProps) {
  const [memoryType, setMemoryType] = useState<"photo" | "video" | "text">("photo");
  const [author, setAuthor] = useState<string>("Sakshi ❤️");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  );
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [externalUrl, setExternalUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setErrorMsg("");
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg("Please give this memory a sweet title ❤️");
      return;
    }
    if (memoryType !== "text" && !selectedFile && !externalUrl.trim()) {
      setErrorMsg(`Please select a ${memoryType} file or provide a link.`);
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      let finalMemory: any = null;

      // 1. Try sending via FormData to server API
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("date", date.trim());
      formData.append("location", location.trim());
      formData.append("type", memoryType);
      formData.append("description", description.trim());
      formData.append("author", author);

      if (selectedFile) {
        formData.append("file", selectedFile);
      } else if (externalUrl.trim()) {
        formData.append("mediaUrl", externalUrl.trim());
      }

      const res = await fetch("/api/memories", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        finalMemory = data.memory;
      } else {
        // Fallback for client-side persistence if serverless file-writing is constrained
        const localUrl = previewUrl || externalUrl || "";
        finalMemory = {
          id: `local-mem-${Date.now()}`,
          title: title.trim(),
          date: date.trim(),
          location: location.trim(),
          type: memoryType,
          mediaUrl: localUrl,
          description: description.trim(),
          author,
          createdAt: new Date().toISOString(),
        };
      }

      // Also sync to localStorage as secondary backup
      try {
        const cached = localStorage.getItem("our_universe_memories");
        const list = cached ? JSON.parse(cached) : [];
        list.unshift(finalMemory);
        localStorage.setItem("our_universe_memories", JSON.stringify(list));
      } catch (err) {
        console.warn("LocalStorage sync skipped:", err);
      }

      // Confetti celebration
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#A91E45", "#E95B7A", "#FFB7C5", "#D8B66A"],
      });

      onMemoryAdded(finalMemory);

      // Reset and close
      handleClearFile();
      setTitle("");
      setDescription("");
      setLocation("");
      setExternalUrl("");
      onClose();
    } catch (err) {
      console.error("Error creating memory:", err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-full max-w-2xl bg-gradient-to-b from-[#1b050e] via-[#120208] to-[#070104] rounded-3xl p-6 sm:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-rose-soft/25 z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-rose-soft/15">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-soft/20 flex items-center justify-center border border-rose-soft/30 text-rose-soft">
                  <Sparkles className="w-5 h-5 text-gold-soft" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-cream font-light tracking-wide">
                    What should we remember today? ❤️
                  </h3>
                  <p className="text-xs text-blush/80 font-sans tracking-wide">
                    A picture, a little clip, or just something you wanted to say
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full glass border border-rose-soft/20 flex items-center justify-center text-zinc-400 hover:text-cream transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {/* Author Selection */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-400 font-sans mb-2">
                  Who is writing this memory?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAuthor("Sakshi ❤️")}
                    className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      author === "Sakshi ❤️"
                        ? "bg-gradient-to-r from-rose to-rose-soft text-white border border-blush shadow-[0_0_20px_rgba(233,91,122,0.4)]"
                        : "glass text-zinc-400 hover:text-zinc-200 border border-white/5"
                    }`}
                  >
                    <Heart className="w-4 h-4 fill-current text-white" />
                    Sakshi (Wife)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthor("Aditya 💙")}
                    className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      author === "Aditya 💙"
                        ? "bg-gradient-to-r from-burgundy to-rose text-white border border-rose-soft/50 shadow-[0_0_20px_rgba(169,30,69,0.4)]"
                        : "glass text-zinc-400 hover:text-zinc-200 border border-white/5"
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-gold-soft" />
                    Aditya (Husband)
                  </button>
                </div>
              </div>

              {/* Memory Type Tabs */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-400 font-sans mb-2">
                  Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMemoryType("photo");
                      handleClearFile();
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      memoryType === "photo"
                        ? "bg-rose-soft/25 text-rose-soft border border-rose-soft/60"
                        : "glass text-zinc-400 hover:text-zinc-200 border border-white/5"
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    Picture 📸
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMemoryType("video");
                      handleClearFile();
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      memoryType === "video"
                        ? "bg-rose-soft/25 text-rose-soft border border-rose-soft/60"
                        : "glass text-zinc-400 hover:text-zinc-200 border border-white/5"
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    Video 🎥
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMemoryType("text");
                      handleClearFile();
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      memoryType === "text"
                        ? "bg-rose-soft/25 text-rose-soft border border-rose-soft/60"
                        : "glass text-zinc-400 hover:text-zinc-200 border border-white/5"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    Heart Note 💌
                  </button>
                </div>
              </div>

              {/* Media Upload (for Photo or Video) */}
              {memoryType !== "text" && (
                <div>
                  <label className="block text-xs uppercase tracking-widest text-zinc-400 font-sans mb-2">
                    {memoryType === "photo" ? "Upload Picture" : "Upload Video Clip"}
                  </label>

                  {!previewUrl ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-rose-soft/25 hover:border-rose-soft/60 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer bg-black/30 hover:bg-rose-soft/5 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-full bg-rose-soft/15 flex items-center justify-center text-rose-soft group-hover:scale-110 transition-transform">
                        <Upload className="w-5 h-5 text-gold-soft" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-zinc-200 font-medium font-sans">
                          Click or drag to choose {memoryType === "photo" ? "a photo" : "a video"}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1 font-sans">
                          {memoryType === "photo"
                            ? "PNG, JPG, WEBP, or GIF up to 25MB"
                            : "MP4, WebM, or MOV up to 100MB"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden border border-rose-soft/30 bg-black/60 p-2">
                      {memoryType === "photo" ? (
                        <img
                          src={previewUrl}
                          alt="Memory preview"
                          className="w-full h-52 object-cover rounded-xl"
                        />
                      ) : (
                        <video
                          src={previewUrl}
                          controls
                          className="w-full h-52 object-contain rounded-xl bg-black"
                        />
                      )}
                      <button
                        type="button"
                        onClick={handleClearFile}
                        className="absolute top-4 right-4 bg-black/80 hover:bg-rose-dark text-white p-1.5 rounded-full transition-colors cursor-pointer"
                        title="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={memoryType === "photo" ? "image/*" : "video/*"}
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {/* Or Link Input */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-sans">or web link:</span>
                    <input
                      type="url"
                      placeholder={`https://example.com/our-${memoryType}.${memoryType === "photo" ? "jpg" : "mp4"}`}
                      value={externalUrl}
                      onChange={(e) => setExternalUrl(e.target.value)}
                      className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-rose-soft/60"
                    />
                  </div>
                </div>
              )}

              {/* Memory Title */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-400 font-sans mb-2">
                  Memory Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., That rainy evening, Our spontaneous drive, A quiet evening at home..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full glass bg-black/30 border border-rose-soft/20 rounded-xl px-4 py-2.5 text-sm text-cream placeholder:text-zinc-600 focus:outline-none focus:border-rose-soft/60 focus:ring-1 focus:ring-rose-soft/40"
                />
              </div>

              {/* Date & Location Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-zinc-400 font-sans mb-2">
                    <Calendar className="w-3.5 h-3.5 text-gold-soft" />
                    Date / Occasion
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g., Today, October 14, 2026"
                    className="w-full glass bg-black/30 border border-rose-soft/20 rounded-xl px-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-rose-soft/50"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-zinc-400 font-sans mb-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-soft" />
                    Location / Mood (Optional)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Faridabad, Rooftop, Cozy Corner"
                    className="w-full glass bg-black/30 border border-rose-soft/20 rounded-xl px-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-rose-soft/50"
                  />
                </div>
              </div>

              {/* Description / Story */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-400 font-sans mb-2">
                  What was in your heart?
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Today I noticed... or write whatever you felt in that moment 💖"
                  className="w-full glass bg-black/30 border border-rose-soft/20 rounded-xl p-4 text-sm text-zinc-200 placeholder:text-zinc-600 leading-relaxed focus:outline-none focus:border-rose-soft/60 focus:ring-1 focus:ring-rose-soft/40"
                />
              </div>

              {/* Error Message */}
              {errorMsg && (
                <p className="text-xs text-rose-soft font-medium text-center">{errorMsg}</p>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-burgundy via-rose to-rose-soft border border-rose-soft/40 text-cream font-medium text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(169,30,69,0.5)] hover:shadow-[0_15px_40px_rgba(233,91,122,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2.5"
                >
                  {isSubmitting ? (
                    <span>Saving to Our Universe...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-gold-soft" />
                      <span>Save to Our Little Universe ✨</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
