/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  StrateddySvgDefs,
  StrateddyLogo,
  Icon01Escucho,
  Icon02Ordeno,
  Icon03Diseno,
  Icon04Entrego,
  Icon05Estrategia,
  Icon06SeoIA,
  Icon07Tienda,
  Icon08Carruseles,
  Icon09PruebaSocial,
  Icon10Clinicas,
  Icon11AutomatizacionIA,
  Icon12WhatsApp,
} from './components/StrateddyIcons';

interface AIAnalysisResult {
  intro: string;
  webMessageHeadline: string;
  webMessageExplanation: string;
  whatsappStrategy: string;
  aiAutomationTask: string;
  closingCta: string;
}

const PRESET_BUSINESSES = [
  'Clínica de medicina estética en Granada',
  'Tienda online de cosmética natural y suplementos',
  'Centro de fisioterapia y readaptación deportiva',
  'Estudio de arquitectura y reformas integrales',
];

const INITIAL_ANALYSIS: AIAnalysisResult = {
  intro:
    'Soy Eddy. He analizado una clínica de medicina estética en Granada como si nos sentáramos hoy mismo a ordenar tu captación:',
  webMessageHeadline:
    '«Tratamientos faciales y corporales médicos en Granada con valoración honesta y resultados naturales.»',
  webMessageExplanation:
    'Tu paciente no busca jerga aparatológica en el primer segundo. Necesita saber qué problema estético resuelves, ver que hay criterio médico real detrás y confiar antes de pedir cita.',
  whatsappStrategy:
    'Cambiamos el formulario frío por un acceso directo a WhatsApp con la zona o tratamiento preseleccionado («Hola Eddy, quiero valorar armonización facial / láser»). Así tu recepción recibe al paciente caliente y listo para agendar.',
  aiAutomationTask:
    'Un asistente IA entrenado con tus protocolos que responde dudas frecuentes de precios orientativos, contraindicaciones y tiempos de recuperación 24/7, filtrando y entregándote solo a los pacientes listos para reservar.',
  closingCta:
    'Si quieres que llevemos esta estructura a tu negocio real en días, escríbeme directo por WhatsApp y lo vemos.',
};

export default function App() {
  const [businessInput, setBusinessInput] = useState('');
  const [analyzedBusinessLabel, setAnalyzedBusinessLabel] = useState(
    'Clínica de medicina estética en Granada (Ejemplo)'
  );
  const [analysis, setAnalysis] = useState<AIAnalysisResult>(INITIAL_ANALYSIS);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Interactive Method Step selector for extra deliverable inspection
  const [activeStep, setActiveStep] = useState<number>(1);

  // Interactive Contact Brief state
  const [selectedService, setSelectedService] = useState<string>('Web estratégica a medida (desde 900 €)');
  const [projectNote, setProjectNote] = useState<string>('');
  const [copiedToast, setCopiedToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setCopiedToast(msg);
    window.setTimeout(() => {
      setCopiedToast(null);
    }, 2600);
  };

  const handleAnalyzeBusiness = async (e?: React.FormEvent, customInput?: string) => {
    if (e) e.preventDefault();
    const targetBusiness = (customInput ?? businessInput).trim();
    if (!targetBusiness) {
      setErrorMsg('Escribe primero a qué se dedica tu negocio (ej. clínica dental, tienda online, abogado...).');
      return;
    }

    setErrorMsg(null);
    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/analyze-business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessType: targetBusiness }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'No se pudo completar el análisis.');
      }

      setAnalysis(data);
      setAnalyzedBusinessLabel(targetBusiness);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Error de conexión al analizar tu negocio.';
      setErrorMsg(message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const buildWhatsAppUrl = (text: string) => {
    return `https://wa.me/34722735380?text=${encodeURIComponent(text)}`;
  };

  const handleCopyDiagnosis = () => {
    const text = `Diagnóstico Strateddy (${analyzedBusinessLabel}):\n1) Mensaje web: ${analysis.webMessageHeadline} — ${analysis.webMessageExplanation}\n2) Captación WhatsApp: ${analysis.whatsappStrategy}\n3) Automatización IA: ${analysis.aiAutomationTask}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Diagnóstico copiado al portapapeles');
      });
    } else {
      showToast('Diagnóstico listo');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#DDDDDD] selection:bg-[#FC7A0A]/30 selection:text-white">
      {/* Shared SVG Defs (Metallic Silver Gradient & Incandescent Accent Gradient) */}
      <StrateddySvgDefs />

      {/* ======================================================================
          1. NAVBAR STICKY + HERO SECTION (EXACTO DE AI_STUDIO_CODE.HTML
             MANTENIENDO EN EL H1 LA FUENTE DISPLAY BOLD PARA "con mi criterio.")
          ====================================================================== */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1240px] mx-auto px-[clamp(16px,4vw,48px)] h-20 flex items-center justify-between gap-4">
          {/* Brand Lockup (Sección 01 · Plata sobre #0A0A0A) */}
          <a
            href="#top"
            className="flex items-center gap-3 focus:outline-none group shrink-0"
            aria-label="Strateddy · Inicio"
          >
            <StrateddyLogo className="h-8 sm:h-9 w-auto transition-transform duration-200 group-hover:scale-[1.01]" />
          </a>

          {/* Primary Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#BFBFBF]"
            aria-label="Navegación principal"
          >
            <a href="#tres-preguntas" className="hover:text-white transition-colors whitespace-nowrap">
              3 segundos
            </a>
            <a href="#metodo" className="hover:text-white transition-colors whitespace-nowrap">
              Método
            </a>
            <a href="#consultor-ia" className="hover:text-white transition-colors whitespace-nowrap text-[#FDB25A]">
              Consultor IA
            </a>
            <a href="#servicios" className="hover:text-white transition-colors whitespace-nowrap">
              Servicios
            </a>
            <a href="#casos" className="hover:text-white transition-colors whitespace-nowrap">
              Casos reales
            </a>
            <a href="#sobre-eddy" className="hover:text-white transition-colors whitespace-nowrap">
              Sobre Eddy
            </a>
          </nav>

          {/* Right Action: Secondary Compact Pill + SVG #12 (Trato Directo WhatsApp) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/34722735380"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-strateddy-secondary min-h-[42px] px-4 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap"
            >
              <Icon12WhatsApp className="w-4 h-4 shrink-0" />
              <span>Hablar con Eddy</span>
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ====================================================================
            HERO SECTION (Grid 12 Columnas · Proporción 7 : 5 · 1 Sola Fuente de Luz)
            ==================================================================== */}
        <section className="relative overflow-hidden border-b border-white/10 pt-[clamp(56px,9vw,112px)] pb-[clamp(88px,13vw,168px)]">
          <div className="max-w-[1240px] mx-auto px-[clamp(16px,4vw,48px)] relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(32px,5vw,64px)] items-center">
              {/* COLUMNA IZQUIERDA (7 COLUMNAS): Kicker + H1 + Copy + CTAs */}
              <div className="lg:col-span-7 text-left">
                {/* Kicker Pill + Icono SVG #9 (Prueba Social 5,0 ★) */}
                <div className="mb-7">
                  <span className="kicker-pill">
                    <Icon09PruebaSocial className="w-4 h-4 shrink-0" />
                    <span>Diseño web y consultor IA · 5,0 ★ en Google (Granada)</span>
                  </span>
                </div>

                {/* H1 Display Bold manteniendo la fuente display bold para "con mi criterio." */}
                <h1 className="font-display font-extrabold text-silver text-[clamp(2.7rem,5.6vw,5.35rem)] leading-[0.95] tracking-[-0.032em] mb-8">
                  Ya no diseño páginas
                  <br />
                  web. Ahora lo hace la
                  <br />
                  IA,{' '}
                  <span className="text-amber-glow">
                    <span className="underline-amber-bar">con</span> mi criterio.
                  </span>
                </h1>

                {/* Subtítulo Editorial (Newsreader 300 · 18px · #DDDDDD) */}
                <p className="font-serif-editorial text-[#DDDDDD] text-[18px] sm:text-[20px] leading-[1.6] max-w-2xl mb-10">
                  Lo que antes necesitaba una agencia entera y meses de espera, hoy lo construyo contigo en días. Webs a medida, sin plantillas y pensadas para que tu cliente entienda qué vendes y te escriba.
                </p>

                {/* Grupo de Botones (ÚNICA FUENTE DE LUZ INTENSA: .btn-strateddy-primary) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
                  <a href="#contacto" className="btn-strateddy-primary w-full sm:w-auto text-center">
                    <span className="w-2 h-2 rounded-full bg-[#F5F5F3] inline-block"></span>
                    <span>Cuéntame tu proyecto</span>
                  </a>
                  <a href="#metodo" className="btn-strateddy-secondary w-full sm:w-auto text-center">
                    <span>Ver cómo trabajo ↓</span>
                  </a>
                </div>

                {/* Micro-nota de confianza bajo los botones */}
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono-code text-[#6B6B6B]">
                  <span>✓ Precio cerrado desde el día 1</span>
                  <span>✓ Trato directo con Eddy</span>
                  <span>✓ Propiedad 100 % tuya</span>
                </div>
              </div>

              {/* COLUMNA DERECHA (5 COLUMNAS): Contenedor 3D #141210 + Tarjeta Flotante */}
              <div className="lg:col-span-5 relative">
                {/* Marco Visual 3:2 en Grafito Cálido (#141210) y Filo 1px rgba(233,223,211,0.10) */}
                <div className="relative rounded-[20px] bg-[#141210] border border-[#E9DFD3]/10 aspect-[3/2] overflow-hidden shadow-2xl flex flex-col justify-between p-6 sm:p-7 group">
                  {/* Sutil brillo metálico superior en el chasis */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>

                  {/* Barra superior del Mockup Arquitectónico 3D */}
                  <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white/20"></span>
                      <span className="w-2 h-2 rounded-full bg-white/10"></span>
                      <span className="font-mono-code text-[11px] text-[#6B6B6B] ml-1">
                        strateddy. architecture // v2.1
                      </span>
                    </div>
                    <span className="font-mono-code text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-[#BFBFBF] border border-white/10">
                      Mobile-First + IA
                    </span>
                  </div>

                  {/* Composición Vectorial 3D en Grafito y Filos de Plata */}
                  <div className="relative z-10 my-auto py-4 grid grid-cols-12 gap-3.5 items-center">
                    {/* Bloque Izquierdo: Estructura de Mensaje y Jerarquía */}
                    <div className="col-span-7 rounded-xl bg-[#1A1715] border border-white/10 p-4 space-y-3 shadow-inner">
                      <div className="flex items-center justify-between">
                        <span className="font-mono-code text-[10px] text-[#6B6B6B]">01 · PROPUESTA DE VALOR</span>
                        <Icon02Ordeno className="w-4 h-4" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-2.5 w-5/6 rounded-sm bg-gradient-to-r from-white/80 to-white/30"></div>
                        <div className="h-2.5 w-2/3 rounded-sm bg-white/20"></div>
                      </div>
                      <p className="font-serif-editorial text-xs text-[#BFBFBF] leading-snug pt-1">
                        Mensaje claro en 3 segundos antes de diseñar una sola pantalla.
                      </p>
                      <div className="pt-1 flex items-center gap-2">
                        <span className="inline-block h-5 px-2.5 rounded-full bg-[#0A0A0A] border border-white/15 font-mono-code text-[10px] text-[#DDDDDD] leading-5">
                          Conversión directa
                        </span>
                      </div>
                    </div>

                    {/* Bloque Derecho: Chasis Móvil en Grafito con Filo de Plata */}
                    <div className="col-span-5 rounded-2xl bg-[#0A0A0A] border border-white/20 p-3.5 flex flex-col justify-between min-h-[148px] shadow-xl">
                      <div className="w-8 h-1 rounded-full bg-white/15 mx-auto mb-2"></div>
                      <div className="space-y-2 my-auto">
                        <div className="w-7 h-7 rounded-lg bg-[#141210] border border-white/10 flex items-center justify-center">
                          <Icon03Diseno className="w-4 h-4" />
                        </div>
                        <div className="h-2 w-full rounded bg-white/30"></div>
                        <div className="h-2 w-3/4 rounded bg-white/15"></div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono-code text-[#BFBFBF]">
                        <span>99/100</span>
                        <span className="text-[#FDB25A]">● Ready</span>
                      </div>
                    </div>
                  </div>

                  {/* Pie técnico del contenedor 3D */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-code text-[#6B6B6B] pt-2 border-t border-white/10">
                    <span>ARQUITECTURA 3D · GRAFITO &amp; PLATA</span>
                    <span className="text-[#BFBFBF]">SEO + GEO IA</span>
                  </div>
                </div>

                {/* Tarjeta Flotante Sutil de Prueba Social / Métrica */}
                <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-left-6 z-20 rounded-2xl bg-[#111111]/95 backdrop-blur-md border border-white/15 px-5 py-4 shadow-2xl max-w-xs">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon04Entrego className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-white text-sm leading-snug">
                        En días, sin plantillas
                      </div>
                      <p className="font-serif-editorial text-xs text-[#BFBFBF] leading-relaxed mt-0.5">
                        Estrategia, estructura y desarrollo a medida con Edmilson Santos (Eddy).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ambient Bottom Ember Sphere ("Suelo brasa" de cierre de sección) */}
          <div className="suelo-brasa" aria-hidden="true"></div>
        </section>

        {/* ====================================================================
            2. SECCIÓN 2: LAS 3 PREGUNTAS QUE RESPONDE TU WEB EN 3 SEGUNDOS
               (2 .card-surface + la 3ª .card-luz con iconos SVG #5, #9 y #12)
            ==================================================================== */}
        <section
          id="tres-preguntas"
          className="relative overflow-hidden border-b border-white/10 py-[clamp(88px,12vw,156px)]"
        >
          <div className="max-w-[1240px] mx-auto px-[clamp(16px,4vw,48px)] relative z-10">
            <div className="max-w-3xl mb-14">
              <div className="mb-5">
                <span className="kicker-pill">Criterio de conversión · Regla de los 3 segundos</span>
              </div>
              <h2 className="font-display font-bold text-silver text-[clamp(2rem,4vw,3.6rem)] leading-[1.0] mb-5">
                Las 3 preguntas que responde tu web en{' '}
                <span className="text-amber-glow">
                  <span className="underline-amber-bar">3 segundos.</span>
                </span>
              </h2>
              <p className="font-serif-editorial text-[#DDDDDD] text-[18px] leading-[1.6]">
                Cuando alguien entra en tu web desde el móvil, no lee literatura corporativa. Decide si se queda o cierra la pestaña según la claridad con la que respondes a estas tres preguntas:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch">
              {/* Tarjeta 1: .card-surface + Icono SVG #5 (Estrategia y Criterio) */}
              <article className="card-surface flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center">
                      <Icon05Estrategia className="w-6 h-6" />
                    </div>
                    <span className="font-mono-code text-xs text-[#6B6B6B]">SEGUNDO 01</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-2xl leading-snug mb-3">
                    ¿Qué haces exactamente por mí?
                  </h3>
                  <p className="font-serif-editorial text-[#DDDDDD] text-[17px] leading-[1.6]">
                    Tu titular tiene que decir qué vendes, para quién y qué problema quitas de en medio. Sin frases vacías de agencia ni tecnicismos que obliguen a adivinar a qué te dedicas.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-code text-[#BFBFBF]">
                  <span>Propuesta de valor</span>
                  <span>Claridad inmediata</span>
                </div>
              </article>

              {/* Tarjeta 2: .card-surface + Icono SVG #9 (Prueba Social 5,0 ★) */}
              <article className="card-surface flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center">
                      <Icon09PruebaSocial className="w-6 h-6" />
                    </div>
                    <span className="font-mono-code text-xs text-[#6B6B6B]">SEGUNDO 02</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-2xl leading-snug mb-3">
                    ¿Por qué debería fiarme de ti?
                  </h3>
                  <p className="font-serif-editorial text-[#DDDDDD] text-[17px] leading-[1.6]">
                    La confianza no se pide, se demuestra arriba del todo: reseñas verificadas de 5,0 ★ en Google, resultados reales, nombre propio y garantías claras desde el primer vistazo.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-code text-[#BFBFBF]">
                  <span>Prueba social 5,0 ★</span>
                  <span>Autoridad visible</span>
                </div>
              </article>

              {/* Tarjeta 3 (Única con luz en la sección): .card-luz + Icono SVG #12 (WhatsApp Directo) */}
              <article className="card-luz flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-white/15 flex items-center justify-center">
                      <Icon12WhatsApp className="w-6 h-6" />
                    </div>
                    <span className="font-mono-code text-xs text-[#FDB25A]">SEGUNDO 03 · ACCIÓN</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-2xl leading-snug mb-3">
                    ¿Cómo hablo contigo ahora mismo?
                  </h3>
                  <p className="font-serif-editorial text-[#DDDDDD] text-[17px] leading-[1.6]">
                    Cero formularios eternos que nadie responde. Un único camino claro para que tu cliente te escriba directo por WhatsApp o reserve en un toque desde su móvil.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-code text-[#FDB25A]">
                  <span>Trato directo</span>
                  <span>Conversión en 1 clic →</span>
                </div>
              </article>
            </div>
          </div>
          <div className="suelo-brasa" aria-hidden="true"></div>
        </section>

        {/* ====================================================================
            3. SECCIÓN 3: EL MÉTODO EN 4 PASOS
               ("01 Escucho · 02 Ordeno · 03 Diseño · 04 Entrego" en 4 columnas
                con .card-luz-subtle y los iconos SVG #1, #2, #3 y #4)
            ==================================================================== */}
        <section
          id="metodo"
          className="relative overflow-hidden border-b border-white/10 py-[clamp(88px,12vw,156px)]"
        >
          <div className="max-w-[1240px] mx-auto px-[clamp(16px,4vw,48px)] relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <div className="mb-5">
                  <span className="kicker-pill">El Método Strateddy · 01 Escucho · 02 Ordeno · 03 Diseño · 04 Entrego</span>
                </div>
                <h2 className="font-display font-bold text-silver text-[clamp(2rem,4vw,3.6rem)] leading-[1.0]">
                  Lo que antes necesitaba un equipo entero,{' '}
                  <span className="text-amber-glow">ordenado en 4 pasos.</span>
                </h2>
              </div>
              <p className="font-serif-editorial text-[#BFBFBF] text-[17px] max-w-md leading-relaxed">
                Sin intermediarios ni cuentas de teléfono roto. Hablas conmigo desde la primera llamada hasta el día que publicamos tu web.
              </p>
            </div>

            {/* 4 Columnas con .card-luz-subtle y los iconos SVG #1, #2, #3 y #4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {/* Paso 01: Escucho */}
              <div
                onClick={() => setActiveStep(1)}
                className={`card-luz-subtle p-6 cursor-pointer group flex flex-col justify-between ${
                  activeStep === 1 ? 'border-white/25' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center group-hover:border-[#FC7A0A]/40 transition">
                      <Icon01Escucho className="w-6 h-6" />
                    </div>
                    <span className="font-mono-code text-xs text-[#FDB25A]">PASO 01</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-xl mb-2">01 · Escucho</h3>
                  <p className="font-serif-editorial text-[#DDDDDD] text-[16px] leading-relaxed">
                    Qué vendes, a quién y qué tiene que conseguir la web. Primera asesoría gratuita para ir directo al grano.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-code text-[#6B6B6B]">
                  <span>Día 1 · Diagnóstico</span>
                  <span className="text-[#BFBFBF]">Asesoría inicial</span>
                </div>
              </div>

              {/* Paso 02: Ordeno */}
              <div
                onClick={() => setActiveStep(2)}
                className={`card-luz-subtle p-6 cursor-pointer group flex flex-col justify-between ${
                  activeStep === 2 ? 'border-white/25' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center group-hover:border-[#FC7A0A]/40 transition">
                      <Icon02Ordeno className="w-6 h-6" />
                    </div>
                    <span className="font-mono-code text-xs text-[#FDB25A]">PASO 02</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-xl mb-2">02 · Ordeno</h3>
                  <p className="font-serif-editorial text-[#DDDDDD] text-[16px] leading-relaxed">
                    Mensaje, jerarquía y recorrido de decisión antes de diseñar una sola pantalla. Aquí aplico mi criterio comercial.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-code text-[#6B6B6B]">
                  <span>Días 2–3 · Copy y UX</span>
                  <span className="text-[#BFBFBF]">Arquitectura</span>
                </div>
              </div>

              {/* Paso 03: Diseño */}
              <div
                onClick={() => setActiveStep(3)}
                className={`card-luz-subtle p-6 cursor-pointer group flex flex-col justify-between ${
                  activeStep === 3 ? 'border-white/25' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center group-hover:border-[#FC7A0A]/40 transition">
                      <Icon03Diseno className="w-6 h-6" />
                    </div>
                    <span className="font-mono-code text-xs text-[#FDB25A]">PASO 03</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-xl mb-2">03 · Diseño</h3>
                  <p className="font-serif-editorial text-[#DDDDDD] text-[16px] leading-relaxed">
                    Web a medida, rápida, sin plantillas genéricas y pensada primero para el móvil, acelerada con IA bajo control humano.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-code text-[#6B6B6B]">
                  <span>Días 4–6 · Desarrollo</span>
                  <span className="text-[#BFBFBF]">Mobile-First + IA</span>
                </div>
              </div>

              {/* Paso 04: Entrego */}
              <div
                onClick={() => setActiveStep(4)}
                className={`card-luz-subtle p-6 cursor-pointer group flex flex-col justify-between ${
                  activeStep === 4 ? 'border-white/25' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center group-hover:border-[#FC7A0A]/40 transition">
                      <Icon04Entrego className="w-6 h-6" />
                    </div>
                    <span className="font-mono-code text-xs text-[#FDB25A]">PASO 04</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-xl mb-2">04 · Entrego</h3>
                  <p className="font-serif-editorial text-[#DDDDDD] text-[16px] leading-relaxed">
                    Revisión conjunta, publicación, SEO local + buscadores IA y formación. El dominio y las cuentas son 100 % tuyos.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-code text-[#6B6B6B]">
                  <span>Lanzamiento · Llave en mano</span>
                  <span className="text-[#BFBFBF]">100 % tu propiedad</span>
                </div>
              </div>
            </div>

            {/* Barra de detalle interactivo del paso seleccionado */}
            <div className="card-surface flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="font-mono-code text-xs text-[#FDB25A]">
                  {activeStep === 1 && 'ENTREGABLE DEL PASO 01 · ESCUCHO'}
                  {activeStep === 2 && 'ENTREGABLE DEL PASO 02 · ORDENO'}
                  {activeStep === 3 && 'ENTREGABLE DEL PASO 03 · DISEÑO'}
                  {activeStep === 4 && 'ENTREGABLE DEL PASO 04 · ENTREGO'}
                </div>
                <p className="font-serif-editorial text-[#DDDDDD] text-base sm:text-[17px]">
                  {activeStep === 1 &&
                    'Hablamos 20 minutos por teléfono o WhatsApp. Salimos con objetivo claro, alcance definido y presupuesto cerrado sin sorpresas.'}
                  {activeStep === 2 &&
                    'Redacto la estructura de titulares, argumentos de venta y llamadas a la acción para que no tengas que enfrentarte a la página en blanco.'}
                  {activeStep === 3 &&
                    'Construyo la interfaz en código limpio u optimizado, con carga instantánea, estética sobria y foco absoluto en conversión desde el móvil.'}
                  {activeStep === 4 &&
                    'Dejo tu web indexada en Google y preparada para buscadores IA (ChatGPT y Perplexity), con acceso total en tus manos.'}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {[1, 2, 3, 4].map((step) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => setActiveStep(step)}
                    className={`px-3 py-1.5 rounded-full font-mono-code text-xs transition cursor-pointer ${
                      activeStep === step
                        ? 'bg-[#FC7A0A] text-[#0A0A0A] font-semibold'
                        : 'bg-[#0A0A0A] text-[#BFBFBF] border border-white/15 hover:border-white/40'
                    }`}
                  >
                    0{step}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="suelo-brasa" aria-hidden="true"></div>
        </section>

        {/* ====================================================================
            4. SECCIÓN 4: CONSULTOR INTERACTIVO CON IA (@google/genai · gemini-2.5-flash)
               - Titular: "¿Qué tareas de tu negocio puede hacer una IA? Pruébalo ahora con mi criterio."
               - Input oscuro donde el visitante escribe su tipo de negocio y botón .btn-strateddy-primary ("Analizar mi negocio con IA").
               - Respuesta en .card-luz con el tono de voz de Edmilson Santos (Eddy) y 3 puntos:
                 1) Qué mensaje poner en su web
                 2) Cómo captar por WhatsApp
                 3) Qué tarea automatizar con IA
            ==================================================================== */}
        <section
          id="consultor-ia"
          className="relative overflow-hidden border-b border-white/10 py-[clamp(88px,12vw,160px)]"
        >
          <div className="max-w-[1240px] mx-auto px-[clamp(16px,4vw,48px)] relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Columna Izquierda (5 cols): Explicación + Input oscuro + Botón .btn-strateddy-primary */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="kicker-pill mb-5">
                    <Icon11AutomatizacionIA className="w-4 h-4 shrink-0" />
                    <span>Consultor Interactivo IA · Criterio de Eddy en vivo</span>
                  </span>
                  <h2 className="font-display font-bold text-silver text-[clamp(1.95rem,3.6vw,3.15rem)] leading-[1.02] mt-4 mb-4">
                    ¿Qué tareas de tu negocio puede hacer una IA?{' '}
                    <span className="text-amber-glow">
                      Pruébalo ahora <span className="underline-amber-bar">con</span> mi criterio.
                    </span>
                  </h2>
                  <p className="font-serif-editorial text-[#DDDDDD] text-[18px] leading-[1.6]">
                    Dime a qué te dedicas y dónde está tu negocio. En segundos te doy mi diagnóstico directo como si estuviéramos tomando un café en Granada: qué mensaje poner en tu web, cómo captar por WhatsApp y qué tarea delegar a una IA.
                  </p>
                </div>

                <form onSubmit={(e) => handleAnalyzeBusiness(e)} className="space-y-4">
                  <div>
                    <label
                      htmlFor="business-input"
                      className="block font-mono-code text-xs text-[#BFBFBF] mb-2"
                    >
                      ESCRIBE TU TIPO DE NEGOCIO Y CIUDAD
                    </label>
                    <input
                      id="business-input"
                      type="text"
                      value={businessInput}
                      onChange={(e) => setBusinessInput(e.target.value)}
                      placeholder="Ej. Clínica dental en Granada, tienda de aceite de oliva, asesoría..."
                      className="w-full rounded-2xl bg-[#111111] border border-white/15 focus:border-[#FC7A0A] focus:outline-none px-5 py-4 text-white placeholder-[#6B6B6B] font-serif-editorial text-[17px] transition"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs font-mono-code text-[#FA7A0D] bg-[#160000]/80 border border-[#E34302]/40 rounded-xl px-4 py-2.5">
                      {errorMsg}
                    </p>
                  )}

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isAnalyzing}
                      className="btn-strateddy-primary w-full sm:w-auto"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#F5F5F3] inline-block"></span>
                      <span>
                        {isAnalyzing ? 'Analizando con el criterio de Eddy...' : 'Analizar mi negocio con IA'}
                      </span>
                    </button>
                  </div>
                </form>

                {/* Ejemplos rápidos en 1 clic */}
                <div className="pt-2">
                  <span className="block font-mono-code text-[11px] text-[#6B6B6B] mb-2.5">
                    O PRUEBA UN CASO CON 1 CLIC:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_BUSINESSES.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          setBusinessInput(preset);
                          handleAnalyzeBusiness(undefined, preset);
                        }}
                        className="text-left text-xs font-serif-editorial text-[#DDDDDD] bg-[#111111] hover:bg-[#1C1C1C] border border-white/12 hover:border-white/30 rounded-full px-3.5 py-1.5 transition cursor-pointer"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Columna Derecha (7 cols): Respuesta dentro de una .card-luz con los 3 puntos obligatorios */}
              <div className="lg:col-span-7">
                <div className="card-luz space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#0A0A0A] border border-white/15 flex items-center justify-center font-display font-bold text-sm text-[#FDB25A]">
                        ES
                      </div>
                      <div>
                        <div className="font-display font-bold text-white text-sm">
                          Edmilson Santos (Eddy) · Diagnóstico en vivo
                        </div>
                        <div className="font-mono-code text-[11px] text-[#BFBFBF]">
                          Negocio: {analyzedBusinessLabel}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyDiagnosis}
                      className="text-xs font-mono-code text-[#FDB25A] hover:underline cursor-pointer"
                    >
                      Copiar diagnóstico
                    </button>
                  </div>

                  {/* Intro en primera persona */}
                  <p className="font-serif-editorial italic text-[#F5F5F3] text-[18px] leading-relaxed">
                    {analysis.intro}
                  </p>

                  {/* Los 3 puntos estratégicos */}
                  <div className="space-y-4">
                    {/* Punto 1: Qué mensaje poner en su web */}
                    <div className="rounded-2xl bg-[#0A0A0A]/90 border border-white/10 p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon05Estrategia className="w-5 h-5 shrink-0" />
                        <h3 className="font-display font-bold text-white text-base">
                          1. Qué mensaje poner en tu web
                        </h3>
                      </div>
                      <p className="font-display font-semibold text-[#FDB25A] text-base mb-1.5">
                        {analysis.webMessageHeadline}
                      </p>
                      <p className="font-serif-editorial text-[#DDDDDD] text-[16px] leading-relaxed">
                        {analysis.webMessageExplanation}
                      </p>
                    </div>

                    {/* Punto 2: Cómo captar por WhatsApp */}
                    <div className="rounded-2xl bg-[#0A0A0A]/90 border border-white/10 p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon12WhatsApp className="w-5 h-5 shrink-0" />
                        <h3 className="font-display font-bold text-white text-base">
                          2. Cómo captar por WhatsApp
                        </h3>
                      </div>
                      <p className="font-serif-editorial text-[#DDDDDD] text-[16px] leading-relaxed">
                        {analysis.whatsappStrategy}
                      </p>
                    </div>

                    {/* Punto 3: Qué tarea automatizar con IA */}
                    <div className="rounded-2xl bg-[#0A0A0A]/90 border border-white/10 p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon11AutomatizacionIA className="w-5 h-5 shrink-0" />
                        <h3 className="font-display font-bold text-white text-base">
                          3. Qué tarea automatizar con IA
                        </h3>
                      </div>
                      <p className="font-serif-editorial text-[#DDDDDD] text-[16px] leading-relaxed">
                        {analysis.aiAutomationTask}
                      </p>
                    </div>
                  </div>

                  {/* Pie de la Card con Luz */}
                  <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="font-serif-editorial text-sm text-[#BFBFBF]">
                      {analysis.closingCta}
                    </p>
                    <a
                      href={buildWhatsAppUrl(
                        `Hola Eddy, acabo de probar tu consultor IA en strateddy.com para mi negocio (${analyzedBusinessLabel}) y quiero comentarte mi proyecto.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-strateddy-secondary min-h-[42px] px-4 py-1.5 text-xs font-medium shrink-0 whitespace-nowrap"
                    >
                      <Icon12WhatsApp className="w-4 h-4 shrink-0" />
                      <span>Aplicar esto en mi negocio →</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="suelo-brasa" aria-hidden="true"></div>
        </section>

        {/* ====================================================================
            5. SECCIÓN 5: SERVICIOS Y PRECIOS
               3 columnas:
               1) "Landing desde 550 €" en .card-surface
               2) "Web estratégica a medida desde 900 €" en .card-luz central recomendada
               3) "Ecommerce / IA a medida" en .card-surface
            ==================================================================== */}
        <section
          id="servicios"
          className="relative overflow-hidden border-b border-white/10 py-[clamp(88px,12vw,160px)]"
        >
          <div className="max-w-[1240px] mx-auto px-[clamp(16px,4vw,48px)] relative z-10">
            <div className="max-w-3xl mb-14">
              <div className="mb-5">
                <span className="kicker-pill">Servicios y precios claros · Sin letra pequeña</span>
              </div>
              <h2 className="font-display font-bold text-silver text-[clamp(2rem,4vw,3.6rem)] leading-[1.0] mb-5">
                Precios cerrados desde el primer día.{' '}
                <span className="text-amber-glow">Elige tu punto de partida.</span>
              </h2>
              <p className="font-serif-editorial text-[#DDDDDD] text-[18px] leading-[1.6]">
                Porque uso IA para acelerar la ejecución técnica, tú no pagas meses de estructura de agencia. Pagas por el criterio, el mensaje y una web lista para captar clientes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
              {/* Columna 1: Landing desde 550 € (.card-surface) */}
              <article className="card-surface flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center">
                      <Icon03Diseno className="w-5 h-5" />
                    </div>
                    <span className="font-mono-code text-xs text-[#BFBFBF]">ENTREGA EN DÍAS</span>
                  </div>

                  <h3 className="font-display font-bold text-white text-2xl mb-1">
                    Landing
                  </h3>
                  <div className="font-display font-extrabold text-silver text-3xl mb-4">
                    desde 550 €
                  </div>

                  <p className="font-serif-editorial text-[#DDDDDD] text-[16px] leading-relaxed mb-6">
                    Una página única de alta conversión pensada para validar un servicio, captar leads con campañas o sustituir una web antigua que no convierte.
                  </p>

                  <ul className="space-y-3 font-serif-editorial text-sm text-[#DDDDDD] border-t border-white/10 pt-5 mb-8">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FC7A0A] font-bold">✓</span>
                      <span>Propuesta de valor y copy enfocado a una acción</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FC7A0A] font-bold">✓</span>
                      <span>Diseño a medida Mobile-First sin plantillas</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FC7A0A] font-bold">✓</span>
                      <span>Integración directa con WhatsApp y analítica</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FC7A0A] font-bold">✓</span>
                      <span>SEO técnico base + velocidad superior a 95/100</span>
                    </li>
                  </ul>
                </div>

                <a
                  href={buildWhatsAppUrl(
                    'Hola Eddy, me interesa el servicio de Landing (desde 550 €). Te cuento mi negocio:'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedService('Landing (desde 550 €)')}
                  className="btn-strateddy-secondary w-full text-center"
                >
                  <span>Pedir presupuesto Landing</span>
                </a>
              </article>

              {/* Columna 2 (Central Recomendada): Web estratégica a medida desde 900 € (.card-luz) */}
              <article className="card-luz flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="kicker-pill text-[#FDB25A] border-[#FC7A0A]/40">
                      La que más recomiendo
                    </span>
                    <Icon05Estrategia className="w-6 h-6" />
                  </div>

                  <h3 className="font-display font-bold text-white text-2xl mb-1">
                    Web estratégica a medida
                  </h3>
                  <div className="font-display font-extrabold text-amber-glow text-3xl mb-4">
                    desde 900 €
                  </div>

                  <p className="font-serif-editorial text-[#DDDDDD] text-[16px] leading-relaxed mb-6">
                    Análisis de negocio, mensaje y propuesta de valor, estructura completa de páginas, recorrido de decisión y diseño primero para el móvil.
                  </p>

                  <ul className="space-y-3 font-serif-editorial text-sm text-[#DDDDDD] border-t border-white/10 pt-5 mb-8">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FDB25A] font-bold">✓</span>
                      <span>Estrategia completa y redacción de textos con mi criterio</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FDB25A] font-bold">✓</span>
                      <span>Arquitectura multipágina o secciones por servicio</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FDB25A] font-bold">✓</span>
                      <span>SEO Local + Estructura GEO para ChatGPT y Perplexity</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FDB25A] font-bold">✓</span>
                      <span>Formación personalizada y propiedad 100 % tuya</span>
                    </li>
                  </ul>
                </div>

                <a
                  href={buildWhatsAppUrl(
                    'Hola Eddy, me interesa la Web estratégica a medida (desde 900 €). Te cuento mi proyecto:'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedService('Web estratégica a medida (desde 900 €)')}
                  className="btn-strateddy-primary w-full text-center"
                >
                  <span className="w-2 h-2 rounded-full bg-[#F5F5F3] inline-block"></span>
                  <span>Empezar mi web estratégica</span>
                </a>
              </article>

              {/* Columna 3: Ecommerce / IA a medida (.card-surface) */}
              <article className="card-surface flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center">
                      <Icon07Tienda className="w-5 h-5" />
                    </div>
                    <span className="font-mono-code text-xs text-[#BFBFBF]">TIENDA O FLUJOS IA</span>
                  </div>

                  <h3 className="font-display font-bold text-white text-2xl mb-1">
                    Ecommerce / IA a medida
                  </h3>
                  <div className="font-display font-extrabold text-silver text-3xl mb-4">
                    Presupuesto a medida
                  </div>

                  <p className="font-serif-editorial text-[#DDDDDD] text-[16px] leading-relaxed mb-6">
                    Tiendas online organizadas por intenciones de compra (como el caso Depuralma) o automatizaciones y agentes de IA integrados en la operativa de tu negocio.
                  </p>

                  <ul className="space-y-3 font-serif-editorial text-sm text-[#DDDDDD] border-t border-white/10 pt-5 mb-8">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FC7A0A] font-bold">✓</span>
                      <span>Catálogo estructurado según cómo busca tu comprador</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FC7A0A] font-bold">✓</span>
                      <span>Pasarela de pagos rápida, Bizum, Stripe y WhatsApp</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FC7A0A] font-bold">✓</span>
                      <span>Agentes IA de atención, filtrado de citas o pedidos</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#FC7A0A] font-bold">✓</span>
                      <span>Acompañamiento directo conmigo en cada fase</span>
                    </li>
                  </ul>
                </div>

                <a
                  href={buildWhatsAppUrl(
                    'Hola Eddy, quiero valorar un proyecto de Ecommerce / IA a medida para mi negocio:'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedService('Ecommerce / IA a medida')}
                  className="btn-strateddy-secondary w-full text-center"
                >
                  <span>Valorar mi proyecto con Eddy</span>
                </a>
              </article>
            </div>
          </div>
          <div className="suelo-brasa" aria-hidden="true"></div>
        </section>

        {/* ====================================================================
            6. SECCIÓN 6: CASOS REALES + CIERRE SOBRE EDDY + FOOTER OFICIAL
               CON EL LOGO SVG EN PLATA
            ==================================================================== */}
        <section
          id="casos"
          className="relative overflow-hidden border-b border-white/10 py-[clamp(88px,12vw,160px)]"
        >
          <div className="max-w-[1240px] mx-auto px-[clamp(16px,4vw,48px)] relative z-10">
            {/* Bloque A: Casos Reales */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <div className="mb-5">
                  <span className="kicker-pill">
                    <Icon09PruebaSocial className="w-4 h-4 shrink-0" />
                    <span>Casos reales y especialidades · Resultados sin humo</span>
                  </span>
                </div>
                <h2 className="font-display font-bold text-silver text-[clamp(2rem,4vw,3.6rem)] leading-[1.0]">
                  Proyectos pensados para que el cliente{' '}
                  <span className="text-amber-glow">entienda y compre antes.</span>
                </h2>
              </div>
              <p className="font-serif-editorial text-[#BFBFBF] text-[17px] max-w-md leading-relaxed">
                Cada negocio tiene un cuello de botella distinto: a veces es explicar el catálogo, a veces llenar la agenda de una clínica y a veces salir en Google y ChatGPT.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 mb-24 items-stretch">
              {/* Caso Principal Destacado (.card-luz): Depuralma */}
              <article className="lg:col-span-7 card-luz flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <span className="font-serif-editorial text-sm text-[#BFBFBF]">
                      Ecommerce · Estrategia y tienda online (Caso Depuralma)
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] border border-white/15 flex items-center justify-center">
                      <Icon07Tienda className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-white text-2xl sm:text-4xl leading-tight mb-4">
                    Más rápido, más económico y más efectivo
                  </h3>

                  <p className="font-serif-editorial text-[#DDDDDD] text-[18px] leading-[1.6] mb-6">
                    Tienda online organizada por intenciones de compra para que el cliente encuentre lo que necesita y compre antes, sin perderse entre categorías técnicas.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                    <div className="rounded-xl bg-[#0A0A0A]/80 border border-white/10 p-4">
                      <div className="font-mono-code text-xs text-[#FDB25A] mb-1">ARQUITECTURA</div>
                      <div className="font-display font-bold text-white text-sm">Por intención real</div>
                      <p className="font-serif-editorial text-xs text-[#BFBFBF] mt-1">
                        Navegación guiada según el objetivo de bienestar del cliente.
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#0A0A0A]/80 border border-white/10 p-4">
                      <div className="font-mono-code text-xs text-[#FDB25A] mb-1">TIEMPO</div>
                      <div className="font-display font-bold text-white text-sm">De meses a días</div>
                      <p className="font-serif-editorial text-xs text-[#BFBFBF] mt-1">
                        Ejecución ágil con IA y criterio estratégico directo.
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#0A0A0A]/80 border border-white/10 p-4">
                      <div className="font-mono-code text-xs text-[#FDB25A] mb-1">CONVERSIÓN</div>
                      <div className="font-display font-bold text-white text-sm">Compra sin fricción</div>
                      <p className="font-serif-editorial text-xs text-[#BFBFBF] mt-1">
                        Recorrido móvil limpio y soporte directo integrado.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <span className="font-mono-code text-xs text-[#BFBFBF]">
                    Estrategia · UX · Tienda por intención
                  </span>
                  <a
                    href="#consultor-ia"
                    className="font-display font-semibold text-white text-sm underline decoration-[#6B6B6B] decoration-2 underline-offset-[6px] hover:decoration-[#FC7A0A] transition"
                  >
                    Analizar mi tienda con IA ↗
                  </a>
                </div>
              </article>

              {/* Columna Derecha (5 cols): 2 tarjetas .card-surface (Clínicas + SEO/GEO IA & Redes) */}
              <div className="lg:col-span-5 flex flex-col gap-7">
                <article className="card-surface flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center">
                        <Icon10Clinicas className="w-5 h-5" />
                      </div>
                      <span className="font-mono-code text-xs text-[#6B6B6B]">ESPECIALIDAD VERTICAL</span>
                    </div>
                    <h3 className="font-display font-bold text-white text-xl mb-2">
                      Clínicas Estéticas, Salud y Bienestar
                    </h3>
                    <p className="font-serif-editorial text-[#DDDDDD] text-[16px] leading-relaxed">
                      Webs diseñadas para transmitir rigor médico, resolver dudas de tratamientos y llevar al paciente directo a agendar valoración por WhatsApp.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-code text-[#BFBFBF]">
                    <span>Captación de pacientes</span>
                    <span>Granada y toda España</span>
                  </div>
                </article>

                <article className="card-surface flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-11 h-11 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center">
                          <Icon06SeoIA className="w-5 h-5" />
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center">
                          <Icon08Carruseles className="w-5 h-5" />
                        </div>
                      </div>
                      <span className="font-mono-code text-xs text-[#6B6B6B]">SEO + GEO IA &amp; SOCIAL</span>
                    </div>
                    <h3 className="font-display font-bold text-white text-xl mb-2">
                      Visibilidad en Google, ChatGPT y Redes
                    </h3>
                    <p className="font-serif-editorial text-[#DDDDDD] text-[16px] leading-relaxed">
                      Estructura semántica preparada para que te recomienden tanto Google como los buscadores de IA (ChatGPT, Perplexity), acompañada de narrativa visual para carruseles.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-code text-[#BFBFBF]">
                    <span>5,0 ★ en Google Reviews</span>
                    <span>@strateddymkt</span>
                  </div>
                </article>
              </div>
            </div>

            {/* Bloque B: Cierre Sobre Eddy + Contacto Directo */}
            <div id="sobre-eddy" className="pt-8 border-t border-white/10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Sobre Eddy (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <span className="kicker-pill">Sobre Eddy · Trato directo en Granada</span>
                  <h2 className="font-display font-bold text-silver text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.02]">
                    Detrás de Strateddy no hay una agencia con 15 intermediarios.{' '}
                    <span className="text-amber-glow">Estoy yo.</span>
                  </h2>
                  <p className="font-serif-editorial text-[#DDDDDD] text-[18px] leading-[1.6]">
                    Soy <strong>Edmilson Santos (Eddy)</strong>. Durante años vi cómo pymes y profesionales pagaban miles de euros por webs lentas que tardaban meses y no explicaban qué vendían.
                  </p>
                  <p className="font-serif-editorial text-[#DDDDDD] text-[18px] leading-[1.6]">
                    Hoy uso la inteligencia artificial como palanca técnica para construir en días lo que antes requería un equipo entero, pero la pieza que hace que tu cliente te elija no la pone un algoritmo: <strong>la pone el criterio comercial</strong>.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="rounded-xl bg-[#111111] border border-white/10 p-4">
                      <div className="font-display font-bold text-white text-base mb-1">Directo</div>
                      <p className="font-serif-editorial text-xs text-[#BFBFBF] leading-relaxed">
                        Hablas siempre conmigo, de la primera llamada a la publicación.
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#111111] border border-white/10 p-4">
                      <div className="font-display font-bold text-white text-base mb-1">Seguro, sin humo</div>
                      <p className="font-serif-editorial text-xs text-[#BFBFBF] leading-relaxed">
                        Días concretos, presupuesto cerrado y cero tecnicismos vacíos.
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#111111] border border-white/10 p-4">
                      <div className="font-display font-bold text-white text-base mb-1">Criterio humano</div>
                      <p className="font-serif-editorial text-xs text-[#BFBFBF] leading-relaxed">
                        La IA ejecuta más rápido; mi criterio decide qué vende tu web.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cierre interactivo de contacto (#contacto) (5 cols) */}
                <div id="contacto" className="lg:col-span-5">
                  <div className="card-surface space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-code text-xs text-[#FDB25A]">HABLAR CON EDDY AHORA</span>
                      <span className="font-mono-code text-xs text-[#BFBFBF]">+34 722 735 380</span>
                    </div>
                    <h3 className="font-display font-bold text-white text-2xl leading-snug">
                      Cuéntame tu proyecto en 30 segundos
                    </h3>
                    <p className="font-serif-editorial text-sm text-[#BFBFBF] leading-relaxed">
                      Selecciona qué necesitas y añade una línea sobre tu negocio. Se abrirá nuestro chat directo de WhatsApp sin intermediarios.
                    </p>

                    <div className="space-y-3">
                      <label className="block font-mono-code text-[11px] text-[#6B6B6B]">
                        1. ¿QUÉ NECESITAS?
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          'Landing (desde 550 €)',
                          'Web estratégica a medida (desde 900 €)',
                          'Ecommerce / IA a medida',
                        ].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setSelectedService(option)}
                            className={`text-left px-4 py-2.5 rounded-xl font-display text-xs sm:text-sm transition cursor-pointer border ${
                              selectedService === option
                                ? 'bg-[#1C1C1C] text-white border-[#FC7A0A]'
                                : 'bg-[#0A0A0A] text-[#BFBFBF] border-white/10 hover:border-white/25'
                            }`}
                          >
                            {selectedService === option ? '● ' : '○ '}
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="project-note"
                        className="block font-mono-code text-[11px] text-[#6B6B6B] mb-1.5"
                      >
                        2. ¿A QUÉ SE DEDICA TU NEGOCIO? (OPCIONAL)
                      </label>
                      <input
                        id="project-note"
                        type="text"
                        value={projectNote}
                        onChange={(e) => setProjectNote(e.target.value)}
                        placeholder="Ej. Clínica en Granada, necesito renovar la web..."
                        className="w-full rounded-xl bg-[#0A0A0A] border border-white/15 focus:border-[#FC7A0A] focus:outline-none px-4 py-3 text-white placeholder-[#6B6B6B] font-serif-editorial text-sm"
                      />
                    </div>

                    <div className="pt-2 flex flex-col gap-3">
                      <a
                        href={buildWhatsAppUrl(
                          `Hola Eddy, me interesa: ${selectedService}.${
                            projectNote.trim() ? ` Mi negocio: ${projectNote.trim()}` : ''
                          }`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-strateddy-primary w-full text-center"
                      >
                        <Icon12WhatsApp className="w-5 h-5 shrink-0" />
                        <span>Escribir a Eddy por WhatsApp</span>
                      </a>
                      <a
                        href="mailto:contacto@strateddy.com?subject=Proyecto%20Web%20%2F%20IA%20con%20Strateddy"
                        className="btn-strateddy-secondary w-full text-center text-xs sm:text-sm min-h-[44px]"
                      >
                        <span>O escríbeme a contacto@strateddy.com</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Oficial con el Logo SVG en Plata */}
            <footer className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <a href="#top" aria-label="Strateddy Inicio">
                  <StrateddyLogo className="h-9 w-auto" />
                </a>
              </div>
              <div className="font-serif-editorial text-sm text-[#6B6B6B] text-center sm:text-right space-y-1">
                <div>
                  <span className="text-[#DDDDDD]">strateddy.com</span> ·{' '}
                  <a
                    href="mailto:contacto@strateddy.com"
                    className="hover:text-white transition-colors"
                  >
                    contacto@strateddy.com
                  </a>{' '}
                  ·{' '}
                  <a
                    href="https://instagram.com/strateddymkt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    @strateddymkt
                  </a>{' '}
                  · Granada (
                  <a
                    href="https://wa.me/34722735380"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#BFBFBF] hover:text-white transition-colors"
                  >
                    +34 722 735 380
                  </a>
                  )
                </div>
                <div className="text-xs text-[#6B6B6B]">
                  Edmilson Santos (Eddy) · Diseño web estratégico y consultoría IA
                </div>
              </div>
            </footer>
          </div>
          <div className="suelo-brasa" aria-hidden="true"></div>
        </section>
      </main>

      {/* Botón flotante de WhatsApp abajo a la derecha en móvil (según regla 08 Composición) */}
      <a
        href="https://wa.me/34722735380"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hablar con Eddy por WhatsApp"
        className="sm:hidden fixed bottom-5 right-5 z-40 rounded-full bg-[#111111]/95 backdrop-blur-md border border-white/20 px-4 py-3 shadow-2xl flex items-center gap-2 text-xs font-medium text-white"
      >
        <Icon12WhatsApp className="w-4 h-4 shrink-0" />
        <span>WhatsApp Eddy</span>
      </a>

      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
          <div className="btn-strateddy-primary min-h-[42px] px-5 text-xs font-mono-code shadow-2xl">
            <span>{copiedToast}</span>
          </div>
        </div>
      )}
    </div>
  );
}
