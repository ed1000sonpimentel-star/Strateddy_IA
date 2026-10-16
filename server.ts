import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `Eres Edmilson Santos (Eddy), fundador de Strateddy (strateddy.com), diseñador web estratégico y consultor de IA en Granada.
Hablas SIEMPRE en primera persona ("Yo", "En mi criterio", "Lo que haría contigo"), tuteando al visitante, con tono directo, seguro y cero humo.
Reglas estrictas de tu tono de voz:
- Frases cortas, directas y accionables.
- Prohibido usar jerga de agencia ("soluciones integrales 360", "sinergias", "potenciar exponencialmente", "revolucionar").
- Hablas de resultados tangibles: mensaje claro en 3 segundos, captación directa por WhatsApp sin formularios eternos, y automatización práctica con IA que ahorra horas reales.

Cuando el usuario te diga su tipo de negocio, devuelves un análisis directo en JSON con:
1) intro: Una frase inicial directa como Eddy analizando ese negocio concreto.
2) webMessageHeadline: La propuesta exacta de titular H1 o promesa de 3 segundos que pondrías en la portada de su web (entre comillas).
3) webMessageExplanation: Por qué ese mensaje funciona y qué debe responder su web en los primeros 3 segundos.
4) whatsappStrategy: Cómo plantearías el botón y el flujo de entrada por WhatsApp para que el cliente escriba listo para reservar o comprar, sin perder el tiempo.
5) aiAutomationTask: Qué tarea repetitiva o proceso exacto de ese negocio automatizarías hoy mismo con IA (ej. filtrado de citas, respuesta inmediata a preguntas frecuentes con criterio, seguimiento de presupuestos o clasificación de pedidos).
6) closingCta: Una frase corta final invitándole a escribirte por WhatsApp para construirlo en días.`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    intro: {
      type: Type.STRING,
      description: 'Saludo directo en primera persona como Eddy analizando el negocio.',
    },
    webMessageHeadline: {
      type: Type.STRING,
      description: 'Propuesta exacta de titular claro para su web en menos de 12 palabras.',
    },
    webMessageExplanation: {
      type: Type.STRING,
      description: 'Explicación directa de qué mensaje poner en su web para que se entienda en 3 segundos.',
    },
    whatsappStrategy: {
      type: Type.STRING,
      description: 'Cómo captar por WhatsApp sin fricción para este negocio específico.',
    },
    aiAutomationTask: {
      type: Type.STRING,
      description: 'Qué tarea concreta de su negocio automatizar con IA hoy mismo.',
    },
    closingCta: {
      type: Type.STRING,
      description: 'Cierre corto y directo de Eddy.',
    },
  },
  required: [
    'intro',
    'webMessageHeadline',
    'webMessageExplanation',
    'whatsappStrategy',
    'aiAutomationTask',
    'closingCta',
  ],
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post('/api/analyze-business', async (req, res) => {
    const businessType = String(req.body?.businessType || '').trim();

    if (!businessType) {
      res.status(400).json({ error: 'Escribe a qué se dedica tu negocio para que pueda analizarlo.' });
      return;
    }

    const userPrompt = `Analiza este negocio con el criterio de Edmilson Santos (Eddy): "${businessType}". Dame los 3 puntos exactos: 1) Qué mensaje poner en su web, 2) Cómo captar por WhatsApp, y 3) Qué tarea automatizar con IA.`;

    try {
      let response;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: userPrompt,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            responseSchema: RESPONSE_SCHEMA,
            temperature: 0.7,
          },
        });
      } catch (primaryErr) {
        // Fallback to gemini-3.8-flash if gemini-2.5-flash is aliased in this runtime
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userPrompt,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            responseSchema: RESPONSE_SCHEMA,
            temperature: 0.7,
          },
        });
      }

      const rawText = response.text?.trim();
      if (!rawText) {
        throw new Error('No se recibió respuesta del modelo.');
      }

      const parsed = JSON.parse(rawText);
      res.json(parsed);
    } catch (error: unknown) {
      console.error('Error calling Gemini API:', error);
      const message = error instanceof Error ? error.message : 'Error al analizar con IA';
      res.status(500).json({
        error: `No he podido completar el análisis en este segundo (${message}). Inténtalo de nuevo o escríbeme directo por WhatsApp.`,
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Strateddy server running on http://localhost:${PORT}`);
  });
}

startServer();
