function escapeLatex(text = "") {
  return String(text)
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/\$/g, "\\$")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/{/g, "\\{")
    .replace(/}/g, "\\}")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}");
}

function generateLatex(report) {
  const english = escapeLatex(report.englishSummary);
  const japanese = report.japaneseSummary || "";

  return `
\\documentclass[12pt]{article}

\\usepackage{geometry}
\\usepackage{fontspec}
\\usepackage{xeCJK}

\\geometry{margin=1in}

\\setmainfont{Arial}
\\setCJKmainfont{Noto Sans CJK JP}

\\begin{document}

\\begin{center}
{\\LARGE \\textbf{Medical History Report}}
\\end{center}

\\section*{Medical Information}

\\textbf{Title:} ${escapeLatex(report.title)}

\\textbf{Date:} ${escapeLatex(report.date)}

\\textbf{Hospital:} ${escapeLatex(report.hospital)}

\\textbf{Doctor:} ${escapeLatex(report.doctor)}

\\textbf{Diagnosis:} ${escapeLatex(report.diagnosis)}

\\section*{English Medical Summary}

${english}

\\section*{Japanese Medical Summary}

${japanese}

\\end{document}
`;
}

module.exports = {
  generateLatex
};