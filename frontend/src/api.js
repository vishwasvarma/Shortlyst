const API_BASE = "https://shortlyst.onrender.com";

export async function uploadJob(formData) {
  const res = await fetch(`${API_BASE}/api/jobs`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

export async function analyzeResumes(formData) {
  const res = await fetch(`${API_BASE}/api/analyze`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

export async function exportResults() {
  const res = await fetch(`${API_BASE}/api/export`);
  return res.blob();
}

export async function updateDecision(index, decision) {
  const res = await fetch(`${API_BASE}/api/decision/${index}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ decision }),
  });
  return res.json();
}
