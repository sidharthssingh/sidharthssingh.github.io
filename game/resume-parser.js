// Resume parser - extracts text, skills, and title from uploaded PDF resumes

const PDF_JS_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs";
const PDF_WORKER_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs";

const SKILL_KEYWORDS = [
  "python",
  "javascript",
  "typescript",
  "java",
  "c++",
  "go",
  "rust",
  "ruby",
  "sql",
  "nosql",
  "html",
  "css",
  "react",
  "angular",
  "vue",
  "node.js",
  "django",
  "flask",
  "spring",
  "aws",
  "gcp",
  "azure",
  "docker",
  "kubernetes",
  "terraform",
  "git",
  "ci/cd",
  "product management",
  "agile",
  "scrum",
  "jira",
  "figma",
  "tableau",
  "power bi",
  "a/b testing",
  "data analysis",
  "machine learning",
  "deep learning",
  "ai",
  "ml",
  "llm",
  "nlp",
  "computer vision",
  "data engineering",
  "etl",
  "spark",
  "kafka",
  "postgresql",
  "mongodb",
  "redis",
  "elasticsearch",
];

const TITLE_PATTERNS = [
  /senior\s+product\s+manager/i,
  /principal\s+product\s+manager/i,
  /group\s+product\s+manager/i,
  /director\s+of\s+product/i,
  /vp\s+of\s+product/i,
  /head\s+of\s+product/i,
  /technical\s+product\s+manager/i,
  /associate\s+product\s+manager/i,
  /product\s+manager/i,
  /product\s+owner/i,
  /program\s+manager/i,
  /project\s+manager/i,
  /staff\s+software\s+engineer/i,
  /senior\s+software\s+engineer/i,
  /principal\s+engineer/i,
  /software\s+engineer/i,
  /frontend\s+engineer/i,
  /backend\s+engineer/i,
  /full[\s-]stack\s+(developer|engineer)/i,
  /data\s+scientist/i,
  /data\s+analyst/i,
  /data\s+engineer/i,
  /machine\s+learning\s+engineer/i,
  /ml\s+engineer/i,
  /ai\s+engineer/i,
  /devops\s+engineer/i,
  /site\s+reliability\s+engineer/i,
  /ux\s+designer/i,
  /ui\/ux\s+designer/i,
  /product\s+designer/i,
  /engineering\s+manager/i,
  /technical\s+lead/i,
  /tech\s+lead/i,
  /solutions\s+architect/i,
  /cloud\s+architect/i,
  /business\s+analyst/i,
];

let pdfjsLib = null;

async function loadPdfJs() {
  if (pdfjsLib) return pdfjsLib;
  pdfjsLib = await import(PDF_JS_URL);
  pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_URL;
  return pdfjsLib;
}

function extractName(fullText) {
  const lines = fullText.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
  if (lines.length === 0) return "Adventurer";
  const firstLine = lines[0];
  if (firstLine.length < 40 && !/\d/.test(firstLine)) {
    return firstLine;
  }
  return "Adventurer";
}

function extractSkills(fullText) {
  const lowerText = fullText.toLowerCase();
  return SKILL_KEYWORDS.filter((skill) => {
    // Use word boundary matching for short keywords to avoid false positives
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "i");
    return regex.test(lowerText);
  });
}

function extractTitle(fullText) {
  for (const pattern of TITLE_PATTERNS) {
    const match = fullText.match(pattern);
    if (match) {
      // Title-case the matched title
      return match[0]
        .split(/\s+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
    }
  }
  return "Adventurer";
}

export async function parseResumePDF(file) {
  const pdfjs = await loadPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    fullText += pageText + "\n";
  }

  const skills = extractSkills(fullText);
  const title = extractTitle(fullText);
  const name = extractName(fullText);

  return { fullText, skills, title, name };
}
