import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';
import { prisma } from '@meta-geniusz/database';

// ============================================================
// CLIENT SETUP
// ============================================================

let _genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI {
  if (_genAI) return _genAI;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');
  _genAI = new GoogleGenerativeAI(apiKey);
  return _genAI;
}

function getModel(modelName = process.env.GEMINI_MODEL ?? 'gemini-1.5-flash') {
  return getGenAI().getGenerativeModel({
    model: modelName,
    safetySettings: [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT,        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ],
  });
}

// ============================================================
// CREDIT SYSTEM
// ============================================================

export const CREDIT_COST: Record<string, number> = {
  bio:        1,
  caption:    1,
  hashtags:   1,
  promo:      2,
  ideas:      2,
  cover:      3,
  workflow:   2,
};

export async function getCredits(userId: string): Promise<number> {
  let balance = await prisma.creditBalance.findUnique({ where: { userId } });
  if (!balance) {
    balance = await prisma.creditBalance.create({
      data: { userId, balance: 10, lifetimeEarned: 10 },
    });
  }
  return balance.balance;
}

export async function deductCredits(userId: string, cost: number): Promise<void> {
  const balance = await prisma.creditBalance.findUnique({ where: { userId } });
  if (!balance || balance.balance < cost) {
    throw new Error('INSUFFICIENT_CREDITS');
  }
  await prisma.creditBalance.update({
    where: { userId },
    data: { balance: { decrement: cost } },
  });
}

// ============================================================
// CORE GENERATE FUNCTION
// ============================================================

async function generate(prompt: string): Promise<string> {
  const model = getModel();
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  if (!text) throw new Error('Empty AI response');
  return text.trim();
}

// ============================================================
// AI TOOLS
// ============================================================

export interface GenerateBioInput {
  name: string;
  niche: string;
  keywords?: string[];
  tone?: 'professional' | 'casual' | 'bold';
}

export async function generateBio(input: GenerateBioInput): Promise<string> {
  const tone = input.tone ?? 'professional';
  const keywords = input.keywords?.join(', ') ?? '';

  const prompt =
    `Write a short, compelling social media bio (max 150 characters) for a ${input.niche} creator named "${input.name}". ` +
    `Tone: ${tone}. ` +
    (keywords ? `Include keywords: ${keywords}. ` : '') +
    `Return ONLY the bio text, no quotes, no explanation.`;

  return generate(prompt);
}

export interface GenerateCaptionInput {
  topic: string;
  platform?: 'instagram' | 'twitter' | 'facebook' | 'tiktok';
  tone?: string;
  length?: 'short' | 'medium' | 'long';
}

export async function generateCaption(input: GenerateCaptionInput): Promise<string> {
  const platform = input.platform ?? 'instagram';
  const length = input.length ?? 'medium';
  const tone = input.tone ?? 'engaging';

  const prompt =
    `Write a ${length} ${tone} ${platform} caption about: "${input.topic}". ` +
    `Include emojis where appropriate. ` +
    `Return ONLY the caption text, no explanation.`;

  return generate(prompt);
}

export interface SuggestHashtagsInput {
  topic: string;
  niche?: string;
  count?: number;
}

export async function suggestHashtags(input: SuggestHashtagsInput): Promise<string[]> {
  const count = input.count ?? 15;

  const prompt =
    `Generate ${count} relevant hashtags for a post about "${input.topic}"` +
    (input.niche ? ` in the ${input.niche} niche` : '') +
    `. Return ONLY a space-separated list of hashtags starting with #, no explanation.`;

  const text = await generate(prompt);
  return text.split(/\s+/).filter(t => t.startsWith('#')).slice(0, count);
}

export interface GeneratePromoTextInput {
  product: string;
  audience: string;
  cta?: string;
  platform?: string;
}

export async function generatePromoText(input: GeneratePromoTextInput): Promise<string> {
  const prompt =
    `Write a persuasive promotional post for "${input.product}" targeting ${input.audience}` +
    (input.platform ? ` on ${input.platform}` : '') +
    (input.cta ? `. Call to action: ${input.cta}` : '') +
    `. Return ONLY the post text.`;

  return generate(prompt);
}

export interface GenerateContentIdeasInput {
  niche: string;
  count?: number;
  format?: 'list' | 'detailed';
}

export async function generateContentIdeas(input: GenerateContentIdeasInput): Promise<string[]> {
  const count = input.count ?? 10;

  const prompt =
    `Generate ${count} unique content ideas for a ${input.niche} creator. ` +
    `Format as a numbered list. Return ONLY the numbered list, no introduction.`;

  const text = await generate(prompt);
  return text
    .split('\n')
    .map(l => l.replace(/^\d+[\.\)]\s*/, '').trim())
    .filter(l => l.length > 5)
    .slice(0, count);
}

// ============================================================
// MAIN GENERATE ENTRY POINT (for API)
// ============================================================

export type AIGenType = 'bio' | 'caption' | 'hashtags' | 'promo' | 'ideas';

export interface AIGenerateRequest {
  type: AIGenType;
  payload: Record<string, string | string[]>;
}

export async function runAIGeneration(
  userId: string,
  req: AIGenerateRequest,
): Promise<{ output: string; creditsUsed: number; creditsRemaining: number }> {
  const cost = CREDIT_COST[req.type] ?? 1;

  // Check and deduct credits
  await deductCredits(userId, cost);

  let output: string;

  switch (req.type) {
    case 'bio':
      output = await generateBio(req.payload as unknown as GenerateBioInput);
      break;
    case 'caption':
      output = await generateCaption(req.payload as unknown as GenerateCaptionInput);
      break;
    case 'hashtags': {
      const tags = await suggestHashtags(req.payload as unknown as SuggestHashtagsInput);
      output = tags.join(' ');
      break;
    }
    case 'promo':
      output = await generatePromoText(req.payload as unknown as GeneratePromoTextInput);
      break;
    case 'ideas': {
      const ideas = await generateContentIdeas(req.payload as unknown as GenerateContentIdeasInput);
      output = ideas.map((idea, i) => `${i + 1}. ${idea}`).join('\n');
      break;
    }
    default:
      throw new Error(`Unknown AI generation type: ${req.type}`);
  }

  // Save to DB
  const gen = await prisma.aIGeneration.create({
    data: {
      userId,
      type: req.type,
      input: req.payload as Record<string, string>,
      output,
      model: process.env.GEMINI_MODEL ?? 'gemini-1.5-flash',
      creditsUsed: cost,
    },
  });

  const balance = await prisma.creditBalance.findUnique({ where: { userId } });

  return {
    output: gen.output,
    creditsUsed: cost,
    creditsRemaining: balance?.balance ?? 0,
  };
}

export { prisma };
