import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const SYSTEM_PROMPT = `You are RiseAble AI Assistant — a helpful, empathetic, and knowledgeable chatbot built for specially-abled individuals (persons with disabilities) in India.

Your role:
- Help users find accessible skill-development courses (Web Development, Data Entry, AI Basics, Creative Crafts, Communication, Freelancing, Digital Literacy, Office Skills, Mobile App Development)
- Help users find disability-friendly job opportunities (50+ listings with remote/WFH options, flexible hours, and accessibility features)
- Explain Indian government schemes for PwDs: ADIP (assistive devices), UDID card, NHFDC loans, National Trust schemes, Scholarships, Skill training under RPWD Act 2016, Sugamya Bharat Abhiyan
- Explain the platform's accessibility features: voice navigation, screen reader support, sign language avatar, high contrast mode, dyslexia-friendly fonts, text resizing, keyboard navigation
- Be encouraging, patient, and use simple clear language
- If asked in Hindi or other Indian languages, respond in the same language
- Keep responses concise (2-4 sentences) unless the user asks for details
- Always be supportive and empowering — focus on abilities, not limitations

Platform info:
- Website: RiseAble (riseable-one.vercel.app)
- Features: 9+ courses, 50+ jobs, 8 govt schemes, AI chatbot, 3D ISL avatar, voice navigation, WCAG 2.1+
- All courses have video, audio, captions, transcripts, and sign language support
- Jobs are curated for accessibility: screen reader compatible workplaces, flexible hours, WFH options`;

export async function POST(req: NextRequest) {
  try {
    const { message, language, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // If no API key, fall back to rule-based responses
    if (!OPENAI_API_KEY) {
      const response = getFallbackResponse(message, language || "en");
      return NextResponse.json({ response, source: "fallback" });
    }

    // Build message history for ChatGPT
    const messages: any[] = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    // Add conversation history (last 10 messages)
    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-10);
      for (const msg of recentHistory) {
        messages.push({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        });
      }
    }

    // Add language instruction if not English
    let userMessage = message;
    if (language && language !== "en") {
      const langNames: Record<string, string> = {
        hi: "Hindi", ta: "Tamil", te: "Telugu", bn: "Bengali",
        mr: "Marathi", gu: "Gujarati", kn: "Kannada", ml: "Malayalam",
      };
      const langName = langNames[language] || language;
      userMessage = `[User is communicating in ${langName}. Please respond in ${langName}.]\n\n${message}`;
    }

    messages.push({ role: "user", content: userMessage });

    // Call OpenAI API
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json().catch(() => ({}));
      console.error("OpenAI API error:", errorData);
      // Fall back to rule-based
      const response = getFallbackResponse(message, language || "en");
      return NextResponse.json({ response, source: "fallback" });
    }

    const data = await openaiResponse.json();
    const botReply = data.choices?.[0]?.message?.content?.trim();

    if (!botReply) {
      const response = getFallbackResponse(message, language || "en");
      return NextResponse.json({ response, source: "fallback" });
    }

    return NextResponse.json({ response: botReply, source: "chatgpt" });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error", response: "I'm sorry, something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// Fallback rule-based responses when API key is not available
function getFallbackResponse(input: string, lang: string): string {
  const lower = input.toLowerCase();

  if (lang === "hi") {
    if (lower.includes("course") || lower.includes("कोर्स") || lower.includes("सीख"))
      return "हम वेब डेवलपमेंट, डेटा एंट्री, AI बेसिक्स, क्राफ्ट स्किल्स और बहुत कुछ सिखाते हैं। सभी कोर्स कैप्शन और ऑडियो के साथ उपलब्ध हैं। कोर्स पेज पर जाने के लिए मेनू में 'Courses' पर क्लिक करें।";
    if (lower.includes("job") || lower.includes("नौकरी") || lower.includes("काम"))
      return "हमारे पास 50+ एक्सेसिबल जॉब लिस्टिंग हैं — वर्क फ्रॉम होम, डिसेबिलिटी फ्रेंडली कंपनियां। Jobs पेज पर जाएं।";
    if (lower.includes("scheme") || lower.includes("योजना") || lower.includes("सरकार"))
      return "छात्रवृत्ति, ADIP योजना, UDID कार्ड, NHFDC लोन और बहुत कुछ उपलब्ध है। Schemes पेज पर विस्तार से जानें।";
    if (lower.includes("hello") || lower.includes("hi") || lower.includes("नमस्ते"))
      return "नमस्ते! मैं RiseAble AI असिस्टेंट हूं। मैं आपकी कोर्स खोजने, नौकरी ढूंढने या सरकारी योजनाएं समझने में मदद कर सकता हूं।";
    return "कृपया कोर्स, जॉब, या सरकारी योजनाओं के बारे में पूछें। मैं आपकी मदद करने के लिए यहां हूं!";
  }

  if (lower.includes("course") || lower.includes("learn") || lower.includes("skill") || lower.includes("study"))
    return "We offer courses in Web Development, Data Entry, AI Basics, Craft Skills, Communication, Freelancing, and more! All include video with captions, audio, and transcripts. Visit the Courses page!";
  if (lower.includes("job") || lower.includes("work") || lower.includes("employ") || lower.includes("career"))
    return "We have 50+ job listings from disability-friendly employers with WFH options and flexible hours. Check the Jobs page!";
  if (lower.includes("scheme") || lower.includes("government") || lower.includes("benefit") || lower.includes("scholarship"))
    return "India offers many schemes for PwDs: scholarships, ADIP, UDID card, NHFDC loans, skill training, and job reservation. Visit our Schemes page!";
  if (lower.includes("accessibility") || lower.includes("screen reader") || lower.includes("voice"))
    return "RiseAble is fully accessible! We support screen readers, voice navigation, high contrast, adjustable text, dyslexia fonts, and keyboard nav. Use the settings button to customize.";
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey"))
    return "Hello! I'm the RiseAble AI Assistant. I can help you find courses, search for jobs, or understand government schemes. What would you like to know?";
  if (lower.includes("thank"))
    return "You're welcome! I'm always here to help. Feel free to ask anything about courses, jobs, or government schemes.";
  return "I'd be happy to help! You can ask me about:\n• Courses — what skills to learn\n• Jobs — finding accessible employment\n• Government Schemes — benefits available for you\n\nWhat would you like to know?";
}
