const API_BASE = "https://shortlyst.onrender.com";

export async function uploadJob(formData) {
  const res = await fetch(`${API_BASE}/api/jobs`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("JD upload failed");
  return res.json();
}

export async function analyzeResumes(formData) {
  const res = await fetch(`${API_BASE}/api/analyze`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Resume analysis failed");
  return res.json();
}

export async function exportResults() {
  const res = await fetch(`${API_BASE}/api/export`);
  if (!res.ok) throw new Error("Export failed");
  return res.blob();
}

export async function updateDecision(index, decision) {
  const res = await fetch(`${API_BASE}/api/decision/${index}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ decision }),
  });
  if (!res.ok) throw new Error("Decision update failed");
}
