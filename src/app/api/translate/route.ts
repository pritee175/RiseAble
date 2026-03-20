import { NextRequest, NextResponse } from "next/server";

// MyMemory Translation API - Free, no API key needed
// Supports: en, hi, ta, te, bn, mr, gu, kn, ml and 50+ languages

export async function POST(req: NextRequest) {
  try {
    const { text, sourceLang, targetLang } = await req.json();

    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json(
        { error: "text, sourceLang, and targetLang are required" },
        { status: 400 }
      );
    }

    // If source and target are the same, return as-is
    if (sourceLang === targetLang) {
      return NextResponse.json({ translatedText: text, source: "passthrough" });
    }

    // MyMemory API language codes
    const langCodes: Record<string, string> = {
      en: "en",
      hi: "hi",
      ta: "ta",
      te: "te",
      bn: "bn",
      mr: "mr",
      gu: "gu",
      kn: "kn",
      ml: "ml",
    };

    const src = langCodes[sourceLang] || sourceLang;
    const tgt = langCodes[targetLang] || targetLang;
    const langPair = `${src}|${tgt}`;

    // Call MyMemory Translation API
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(langPair)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });

    if (!response.ok) {
      console.error("MyMemory API error:", response.status);
      return NextResponse.json({ translatedText: text, source: "error-fallback" });
    }

    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return NextResponse.json({
        translatedText: data.responseData.translatedText,
        confidence: data.responseData.match,
        source: "mymemory",
      });
    }

    // Fallback if translation failed
    return NextResponse.json({ translatedText: text, source: "error-fallback" });

  } catch (error) {
    console.error("Translation API error:", error);
    return NextResponse.json(
      { translatedText: "", error: "Translation failed" },
      { status: 500 }
    );
  }
}
