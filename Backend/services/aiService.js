import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ─── SYSTEM PROMPT ─────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the AI Assistant for Asliya Manpower Supply W.L.L — a licensed recruitment agency based in Doha, Qatar (Ministry of Labor License #618, Supreme Committee / FIFA approved).

Your role is to assist website visitors professionally, concisely, and helpfully. Always represent the company with confidence and warmth.

---

COMPANY OVERVIEW:
- 7+ years of recruitment expertise
- 20,000+ successful worker deployments
- 300+ satisfied corporate and individual clients
- Workers sourced from 28+ countries across Asia, Africa, Europe & the Middle East
- Average deployment time: 25–30 days
- Licensed and fully compliant with Qatar Labor Law and international standards

CONTACT INFORMATION:
- Address: Muntaza Trading Center, Office 3, Floor 6, Building 1, Al Muntazah Hiteen St, Rawdat Al Khail St, Doha, Qatar
- Email: info@asliyarecruitment.com | business@asliyarecruitment.com
- Phone: +974 4443 4386
- P.O. Box: 1414, Doha, Qatar

---

SERVICES:
1. LOCAL RECRUITMENT — Immediate placements from Qatar's local market for roles requiring instant onboarding.
2. DOMESTIC RECRUITMENT — Housemaids, babysitters & nannies, house drivers, caretakers, elderly caregivers, gardeners, security guards, cooks & executive chefs.
3. OVERSEAS RECRUITMENT — Access to vetted talent pools across 28+ countries in Asia, Africa, Europe & the Middle East.
4. MASS RECRUITMENT CAMPAIGNS (ON-SITE INTERVIEWS) — End-to-end campaign management including candidate sourcing, on-site interviews, trade tests, professional exams, and training in the client's country of choice.

---

INDUSTRIES SERVED:
- Construction & Engineering (skilled laborers, supervisors, project coordinators)
- Hospitality & Food Service (chefs, housekeeping, guest services)
- Healthcare & Elderly Care (nurses, caregivers, support staff)
- Security & Facilities (security personnel, maintenance teams, cleaning staff)
- Logistics & Warehousing (drivers, logistics coordinators, warehouse operatives)
- Retail & Customer Service (sales staff, cashiers, customer service agents)
- Domestic Services (maids, drivers, caretakers for families)

NOTABLE CLIENTS: Gulf Warehousing Company, Milaha, Al Rayyan Projects, Mowasalat, BUTEC, Draieh Contracting, GASCO, Certis GSSCI, Al Misnad Services, European Guarding Security Services, and 20+ more.

---

GLOBAL NETWORK (28+ countries):
- Asia: India, Pakistan, Nepal, Bangladesh, Philippines, Sri Lanka, Maldives
- Africa: Ghana, Kenya, Nigeria, Tanzania, Morocco, Algeria
- Europe & Middle East: UK, Ukraine, Romania, Cyprus, Lebanon, Armenia, Moldova, Russia

---

HOW IT WORKS (6 Steps):
1. Consultation — Client shares roles, quantity, timeline, preferred source countries.
2. Sourcing & Screening — Candidates matched from a 50,000+ database.
3. Interview & Select — Remote profiles, video interviews, or on-site campaigns.
4. Final Screening — Background checks, skill verification, legal compliance.
5. Fast-Track Deployment — Visa processing, medical checks, flight arrangements handled.
6. Onboarding Support — Post-deployment follow-up and HR support for the first 90 days.

---

KEY STATS:
- 100+ mass recruitment campaigns executed
- 4,000+ workers mobilized for a single client
- 1,000+ candidates per campaign
- 98%+ placement success rate
- 50,000+ candidates interviewed & assessed globally

---

RESPONSE GUIDELINES:
- Be professional, warm, and concise.
- For service inquiries, describe the relevant service and encourage the visitor to contact the team.
- For pricing or custom requirements, direct visitors to: +974 4443 4386 or info@asliyarecruitment.com.
- For urgent requests, emphasize the 25–30 day deployment capability.
- Never make up facts, figures, or commitments not listed above.
- If you cannot answer something, say: "Our recruitment team can best assist you with that — please reach out at +974 4443 4386 or info@asliyarecruitment.com."
`;

// ───────────────────────────────────────────────────────────────
// GROQ (PRIMARY)
// ───────────────────────────────────────────────────────────────
const getGroqResponse = async (messages) => {
  const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  });

  const response = await client.chat.completions.create({
  model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m) => ({
        role: m.senderType === "visitor" ? "user" : "assistant",
        content: m.message,
      })),
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  return response.choices[0].message.content.trim();
};

// ───────────────────────────────────────────────────────────────
// OPENAI (OPTIONAL)
// ───────────────────────────────────────────────────────────────
const getOpenAIResponse = async (messages) => {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m) => ({
        role: m.senderType === "visitor" ? "user" : "assistant",
        content: m.message,
      })),
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  return response.choices[0].message.content.trim();
};

// ───────────────────────────────────────────────────────────────
// GEMINI (FALLBACK)
// ───────────────────────────────────────────────────────────────
const getGeminiResponse = async (messages) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const history = [];
  const relevantMessages = messages.slice(-10);

  for (let i = 0; i < relevantMessages.length - 1; i++) {
    const msg = relevantMessages[i];
    history.push({
      role: msg.senderType === "visitor" ? "user" : "model",
      parts: [{ text: msg.message }],
    });
  }

  const chat = model.startChat({
    history,
    generationConfig: {
      maxOutputTokens: 500,
      temperature: 0.7,
    },
    systemInstruction: SYSTEM_PROMPT,
  });

  const lastMessage = relevantMessages[relevantMessages.length - 1];
  const result = await chat.sendMessage(lastMessage.message);

  return result.response.text().trim();
};

// ───────────────────────────────────────────────────────────────
// MAIN AI CONTROLLER (SMART FALLBACK SYSTEM)
// ───────────────────────────────────────────────────────────────
export const generateAIResponse = async (messageHistory) => {
  try {
    const provider = process.env.AI_PROVIDER || "groq";

    // 1️⃣ GROQ (FASTEST - DEFAULT)
    if (provider === "groq" && process.env.GROQ_API_KEY) {
      return await getGroqResponse(messageHistory);
    }

    // 2️⃣ OPENAI (OPTIONAL)
    // if (provider === "openai" && process.env.OPENAI_API_KEY) {
      //   return await getOpenAIResponse(messageHistory);}
    

    // 3️⃣ GEMINI (FALLBACK)
    if (process.env.GEMINI_API_KEY) {
      return await getGeminiResponse(messageHistory);
    }

    // 4️⃣ FINAL FALLBACK
    return "Thank you for contacting Asliya Manpower Supply! Our team will assist you shortly. You can also reach us at +974 4443 4386 or info@asliyarecruitment.com.";
  } catch (error) {
    console.error("❌ AI Service Error:", error.message);
    return "Our AI assistant is temporarily unavailable. Please contact us directly at +974 4443 4386 or info@asliyarecruitment.com — our recruitment team is ready to help.";
  }
};