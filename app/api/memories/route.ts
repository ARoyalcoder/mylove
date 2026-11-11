import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { assignBookFields } from "@/lib/love-book/chapterGenerator";
import type { BookMemory } from "@/lib/love-book/bookData";

const dataDir = path.join(process.cwd(), "data");
const dataFilePath = path.join(dataDir, "memories.json");
const uploadsDir = path.join(process.cwd(), "public", "uploads");

// Helper to read memories
function getMemories() {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
      return [];
    }
    const content = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(content || "[]");
  } catch (err) {
    console.error("Error reading memories.json:", err);
    return [];
  }
}

// Helper to write memories
function saveMemories(memories: unknown[]) {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(dataFilePath, JSON.stringify(memories, null, 2));
}

// GET: Return all memories
export async function GET() {
  const memories = getMemories();
  return NextResponse.json({ success: true, memories });
}

// POST: Add a new memory (supports multipart/form-data for file uploads or JSON)
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let title = "";
    let date = "";
    let location = "";
    let type = "photo";
    let description = "";
    let author = "Sakshi ❤️";
    let mediaUrl = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      title = (formData.get("title") as string) || "Untitled Memory";
      date = (formData.get("date") as string) || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      location = (formData.get("location") as string) || "";
      type = (formData.get("type") as string) || "photo";
      description = (formData.get("description") as string) || "";
      author = (formData.get("author") as string) || "Sakshi ❤️";
      mediaUrl = (formData.get("mediaUrl") as string) || "";

      const file = formData.get("file") as File | null;
      if (file && file.size > 0) {
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize file name
        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileName = `${Date.now()}-${cleanName}`;
        const filePath = path.join(uploadsDir, fileName);

        fs.writeFileSync(filePath, buffer);
        mediaUrl = `/uploads/${fileName}`;
      }
    } else {
      const body = await req.json();
      title = body.title || "Untitled Memory";
      date = body.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      location = body.location || "";
      type = body.type || "photo";
      description = body.description || "";
      author = body.author || "Sakshi ❤️";
      mediaUrl = body.mediaUrl || "";
    }

    const rawMemory: BookMemory = {
      id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title,
      date,
      location,
      type: type as BookMemory["type"],
      mediaUrl,
      description,
      author,
      createdAt: new Date().toISOString(),
    };

    const memories: BookMemory[] = getMemories();
    // Assign pageNumber, chapterId, isFavorite
    const newMemory = assignBookFields(memories, rawMemory);
    memories.unshift(newMemory);
    saveMemories(memories);

    return NextResponse.json({ success: true, memory: newMemory }, { status: 201 });
  } catch (err) {
    console.error("Failed to add memory:", err);
    return NextResponse.json(
      { success: false, error: "Failed to save memory" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a memory by id
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    }

    const memories = getMemories();
    const updated = memories.filter((m: { id: string }) => m.id !== id);
    saveMemories(updated);

    return NextResponse.json({ success: true, message: "Memory deleted successfully" });
  } catch (err) {
    console.error("Failed to delete memory:", err);
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}
