const STORAGE_KEY = "japanMedicalHistory";

export const getMedicalHistory = () => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
};

export const saveMedicalHistory = (reports) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
};

export const addMedicalReport = (report) => {
  const reports = getMedicalHistory();

  const newReport = {
    id: Date.now(),
    ...report,
    createdAt: new Date().toISOString()
  };

  const updatedReports = [newReport, ...reports];

  saveMedicalHistory(updatedReports);

  return updatedReports;
};

export const deleteMedicalReport = (id) => {
  const reports = getMedicalHistory();

  const updatedReports = reports.filter(
    (report) => report.id !== id
  );

  saveMedicalHistory(updatedReports);

  return updatedReports;
};