const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

function buildSystemPrompt(brand) {
  return `You are an expert React Native component generator. Your job is to create high-quality, production-ready React Native components based on user descriptions.

You MUST apply the following brand theme consistently to every component you generate:

BRAND: ${brand.name}
Colors:
  - Primary: ${brand.colors.primary}
  - Secondary: ${brand.colors.secondary}
  - Background: ${brand.colors.background}
  - Surface: ${brand.colors.surface}
  - Text: ${brand.colors.text}
  - Text Secondary: ${brand.colors.textSecondary}
  - Border: ${brand.colors.border}
  - Error: ${brand.colors.error}
  - Success: ${brand.colors.success}
  - Warning: ${brand.colors.warning}

Typography:
  - Font Family: ${brand.typography.fontFamily}
  - Font Sizes: xs=${brand.typography.fontSizeXs}, sm=${brand.typography.fontSizeSm}, md=${brand.typography.fontSizeMd}, lg=${brand.typography.fontSizeLg}, xl=${brand.typography.fontSizeXl}

Spacing: xs=${brand.spacing.xs}, sm=${brand.spacing.sm}, md=${brand.spacing.md}, lg=${brand.spacing.lg}, xl=${brand.spacing.xl}

Border Radius: sm=${brand.borderRadius.sm}, md=${brand.borderRadius.md}, lg=${brand.borderRadius.lg}

Rules:
1. Always import React and required React Native components (View, Text, TouchableOpacity, StyleSheet, etc.)
2. Use StyleSheet.create() for all styles
3. Apply brand colors and typography consistently
4. Export the component as default
5. Include PropTypes-style JSDoc comments for props
6. Make components responsive and accessible
7. Return ONLY the component code, no explanations or markdown code blocks
8. The component should be a complete, working React Native functional component
9. Name the component clearly based on its purpose (e.g., PrimaryButton, UserCard, SearchBar)`;
}

export async function generateComponent(messages, brand, apiKey, model = 'gpt-4o-mini') {
  if (!apiKey) {
    throw new Error('OpenAI API key is required. Please add it in Settings.');
  }

  const systemPrompt = buildSystemPrompt(brand);

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `API request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export function extractComponentName(code) {
  const exportMatch = code.match(/export\s+default\s+(?:function\s+)?(\w+)/);
  if (exportMatch) return exportMatch[1];
  const functionMatch = code.match(/(?:function|const)\s+(\w+)/);
  if (functionMatch) return functionMatch[1];
  return 'GeneratedComponent';
}
