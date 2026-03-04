"use client";

import { useEffect, useState } from "react";
import { ChatSettings } from "@/types/chat";
import { Bold } from "lucide-react";





export default function AdminSettings() {
  const [form, setForm] = useState<ChatSettings | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data: ChatSettings) => setForm(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "chatIconSize" ? Number(value) : value,
    });
  }

  
  const validateForm = () => {
    if (!form) return false;
    const newErrors: string[] = [];

    if (!form.chatIcon) newErrors.push("Chat Icon URL is required.");
    if (!form.headerTextColor) newErrors.push("Header Text Color is required.");
    if (!form.headerBg) newErrors.push("Header Background is required.");
    if (!form.windowBg) newErrors.push("Window Background is required.");
    if (!form.borderColor) newErrors.push("Border Color is required.");
    if (form.chatIconSize < 30 || form.chatIconSize > 100)
      newErrors.push("Icon Size must be between 30 and 100.");
      const borderRadius = Number(form.borderRadius);
  if (borderRadius < 0 || borderRadius > 50)
    newErrors.push("Border Radius must be between 0 and 50.");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async () => {
     setSuccess(null);
    if (!form) return;
    if (!validateForm()) return

    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

     setErrors([]);
      setSuccess("Settings updated successfully ✅");
  };

  if (!form) return <p>Loading...</p>;

  
 return (
  <div style={{ display: "flex", gap: 40, padding: 20,justifyContent: "center", fontFamily: "Arial, sans-serif" }}>
  {/* Settings Form */}
  <div style={{ flex: 1 }}>
     <div
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr", // same as label-input
        gap: 20,
         width: 350, 
      }}
    >
    <h2 style={{  gridColumn: "1 / -1",
        display: "flex",
        justifyContent: "center",
        marginTop: 20,
        fontWeight:700}}>Chatbot UI Settings:</h2>
   
      {[
        
        { label: "Chat Icon URL", type: "text", name: "chatIcon" },
        { label: "Header Text Color", type: "color", name: "headerTextColor" },
        { label: "Header Background", type: "color", name: "headerBg" },
        { label: "Window Background", type: "color", name: "windowBg" },
        { label: "Border Color", type: "color", name: "borderColor" },
        { label: "Shadow", type: "text", name: "shadow" },
        { label: "Icon Size", type: "range", name: "chatIconSize", min: 30, max: 100 },
        { label: "Border Radius", type: "range", name: "borderRadius", min: 0, max: 50 },
      ].map((field) => (
         <>
          <span style={{ fontWeight: 500 }}>{field.label}:</span>
          <input
            type={field.type}
            name={field.name}
            value={form[field.name as keyof ChatSettings]}
            min={field.min}
            max={field.max}
            onChange={handleChange}
            style={{
              padding: field.type === "text" ? "6px 10px" : 0,
              border: "1px solid #ccc",
              borderRadius: 6,
              width:
                field.type === "range" || field.type === "color"
                  ? 100 // smaller width for range and color
                  : 200, // width for text inputs
              height: field.type === "color" ? 30 : "auto",
              cursor: field.type === "color" ? "pointer" : "auto",
            }}
          />
        </>
      ))}
   
      <div style={{ gridColumn: "1 / -1",
        display: "flex",
        justifyContent: "center",
        marginTop: 20, }}>
    <button
      style={{
        marginTop: 25,
        padding: "10px 25px",
        cursor: "pointer",
        borderRadius: 6,
        border: "none",
        backgroundColor: "#007bff",
        color: "#fff",
        fontWeight: 600,
      }}
      onClick={handleSubmit}
    >
      Save Changes
    </button>
    
  </div>
   {/* Display errors */}
            {errors.length > 0 && (
              <div style={{ width: 350,  marginTop: 15, color: "red", textAlign: "center" }}>
                {errors.map((err, i) => (
                  <div key={i}>{err}</div>
                ))}
              </div>
            )}

            {/* Display success message */}
            {success && (
              <div style={{ width: 350,  marginTop: 15, color: "green", textAlign: "center" }}>
                {success}
              </div>
            )}
</div>
</div>
</div>

);

}
