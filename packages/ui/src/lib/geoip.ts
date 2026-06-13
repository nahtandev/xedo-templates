const DETECTED_COUNTRY_KEY = "detectedCountry";

export async function detectCountryFromIP(fallback = "bj"): Promise<string> {
  if (typeof window === "undefined") return fallback;

  const cached = sessionStorage.getItem(DETECTED_COUNTRY_KEY);

  if (cached) return cached;

  try {
    const res = await fetch("https://ipapi.co/country/");
    const code = (await res.text()).trim().toLowerCase();

    if (code.length === 2) {
      sessionStorage.setItem(DETECTED_COUNTRY_KEY, code);

      return code;
    }
  } catch {
    // Silently fall back
  }

  return fallback;
}
