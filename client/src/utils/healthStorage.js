import { defaultHealthProfile } from "../data/healthData";

export const getHealthProfile = () => {
  try {
    const savedProfile = localStorage.getItem("japanHealthProfile");

    if (savedProfile) {
      return JSON.parse(savedProfile);
    }

    return defaultHealthProfile;
  } catch {
    return defaultHealthProfile;
  }
};

export const saveHealthProfile = (profile) => {
  localStorage.setItem(
    "japanHealthProfile",
    JSON.stringify(profile)
  );
};