'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  ADMISSIONS_FAQS,
  GRADUATE_OUTCOMES,
  KEY_FACTS,
  METHODOLOGY_STEPS,
  PROGRAMME_TRACKS,
  PROOF_METRICS,
  type TrackId,
} from '@/data/programmes';
import { FaqAccordion } from './FaqAccordion';
import { Navbar } from './Navbar';
import { RegistrationHub, type FormMode } from './RegistrationHub';
import { ResilientImage } from './ResilientImage';
import { TrackExplorer } from './TrackExplorer';

export function LandingPageClient() {
  const [activeTrackId, setActiveTrackId] = useState<TrackId>('ai-workflows');
  const [selectedIntakeId, setSelectedIntakeId] = useState<string>(
    PROGRAMME_TRACKS[0].intakes[0].id
  );
  const [formMode, setFormMode] = useState<FormMode>('register');

  const scrollToApply = () => {
    const el = document.getElementById('apply');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectTrack = (trackId: TrackId) => {
    setActiveTrackId(trackId);
    const track = PROGRAMME_TRACKS.find((item) => item.id === trackId);
    if (track && track.intakes[0]) {
      setSelectedIntakeId(track.intakes[0].id);
    }
  };

  const handleApplyTrack = (trackId: TrackId, intakeId?: string) => {
    setActiveTrackId(trackId);
    const track = PROGRAMME_TRACKS.find((item) => item.id === trackId);
    if (intakeId) {
      setSelectedIntakeId(intakeId);
    } else if (track && track.intakes[0]) {
      setSelectedIntakeId(track.intakes[0].id);
    }
    setFormMode('register');
    scrollToApply();
  };

  const handleEnquireTrack = (trackId: TrackId) => {
    setActiveTrackId(trackId);
    setFormMode('enquiry');
    scrollToApply();
  };

  const handleReserveFromChrome = () => {
    setFormMode('register');
    scrollToApply();
  };

  return (
    <div id="top" className="min-h-screen bg-white text-slate-900">
      <Navbar onReserveClick={handleReserveFromChrome} />

      <main>
        {/* 1. Asymmetric Hero Section */}
        <section className="bg-white py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
              {/* Left Proposition Column */}
              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-blue-700">
                    Applied Digital-Skills Cohorts · Students & Young Professionals
                  </p>

                  <h1 className="mt-4 font-display text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-slate-900 text-balance">
                    Build practical AI workflows and data systems employers test for.
                  </h1>

                  <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                    Cobalt Studio Academy runs six-week, mentor-led studio cohorts in AI
                    Workflows, Data Analytics, and Product Automation. Ship three reviewed
                    projects from real industry briefs—without pausing university or full-time
                    work.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleReserveFromChrome}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-800 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                    >
                      <span>Reserve Your Cohort Seat</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>

                    <a
                      href="#tracks"
                      className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors duration-150 hover:border-blue-700 hover:text-blue-700 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                    >
                      Explore the 3 Tracks
                    </a>
                  </div>
                </div>

                <p className="mt-8 border-t border-slate-200 pt-5 text-xs font-medium text-slate-500">
                  Winter & Spring 2026 Admissions Open · Evening & Saturday live workshops ·
                  Student concession available
                </p>
              </div>

              {/* Right Visual Anchor */}
              <div className="lg:col-span-5">
                <div className="relative h-full min-h-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                  <ResilientImage
                    src="/images/hero-cobalt-studio.jpg"
                    alt="University students and young professionals collaborating on laptops during a Cobalt Studio Academy live workshop"
                    fallbackTitle="Cobalt Studio Workshop"
                    priority
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent p-5">
                    <p className="text-xs font-medium text-blue-200">
                      Live Studio Critique · Max 12 Learners
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-white">
                      Hands-on workflow & analytics builds reviewed weekly by practitioners
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Key Facts Strip */}
            <div className="mt-12 grid grid-cols-1 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50/80 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
              {KEY_FACTS.map((fact) => (
                <div key={fact.metric} className="p-6">
                  <p className="font-mono text-2xl font-bold tracking-tight text-blue-700 tabular-nums">
                    {fact.metric}
                  </p>
                  <p className="mt-1 font-display text-sm font-semibold text-slate-900">
                    {fact.label}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{fact.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Three Core Programme Tracks Explorer */}
        <TrackExplorer
          activeTrackId={activeTrackId}
          onSelectTrack={handleSelectTrack}
          onApplyTrack={handleApplyTrack}
          onEnquireTrack={handleEnquireTrack}
        />

        {/* 3. Studio Methodology & Adjacent Claim-to-Proof Outcomes */}
        <section id="methodology" aria-labelledby="methodology-heading" className="bg-white py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-blue-700">
                02. Studio Methodology & Outcomes
              </p>
              <h2
                id="methodology-heading"
                className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance sm:text-4xl"
              >
                Built for measurable output, not passive video completion.
              </h2>
            </div>

            {/* 3-Step Studio Mechanism */}
            <div className="mt-10 grid gap-8 border-t border-slate-200 pt-8 md:grid-cols-3">
              {METHODOLOGY_STEPS.map((step) => (
                <div key={step.number}>
                  <span className="font-mono text-sm font-semibold text-blue-700 tabular-nums">
                    {step.number}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Quantified Proof + Attributable Graduate Outcomes */}
            <div
              id="outcomes"
              className="mt-16 grid gap-10 border-t border-slate-200 pt-14 lg:grid-cols-12"
            >
              <div className="lg:col-span-5">
                <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900 text-balance">
                  Verified cohort results across recent graduates
                </h3>
                <div className="mt-8 space-y-6">
                  {PROOF_METRICS.map((item) => (
                    <div key={item.label} className="border-b border-slate-200 pb-5 last:border-b-0">
                      <p className="font-mono text-3xl font-bold tracking-tight text-blue-700 tabular-nums">
                        {item.value}
                      </p>
                      <p className="mt-1 font-display text-sm font-semibold text-slate-900">
                        {item.label}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.context}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 lg:col-span-7">
                {GRADUATE_OUTCOMES.map((story) => (
                  <article
                    key={story.name}
                    className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-4">
                      <div>
                        <h4 className="font-display text-lg font-bold text-slate-900">
                          {story.name}
                        </h4>
                        <p className="text-xs font-medium text-slate-600">
                          {story.role} · {story.organization}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-blue-700">{story.track}</span>
                    </div>
                    <div className="mt-4 space-y-3 text-sm leading-relaxed">
                      <p className="text-slate-600">
                        <span className="font-semibold text-slate-900">Before: </span>
                        {story.before}
                      </p>
                      <p className="text-slate-700">
                        <span className="font-semibold text-blue-700">Outcome: </span>
                        {story.outcome}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Dual-Mode Registration & Adviser Enquiry Hub */}
        <RegistrationHub
          selectedTrackId={activeTrackId}
          selectedIntakeId={selectedIntakeId}
          formMode={formMode}
          onModeChange={setFormMode}
          onTrackChange={handleSelectTrack}
          onIntakeChange={setSelectedIntakeId}
        />

        {/* 5. Admissions FAQ */}
        <section id="admissions" aria-labelledby="faq-heading" className="bg-white py-20 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-xs font-semibold tracking-wide text-blue-700">
                04. Admissions & Practical Details
              </p>
              <h2
                id="faq-heading"
                className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance"
              >
                Common questions from students and early-career applicants
              </h2>
            </div>

            <FaqAccordion items={ADMISSIONS_FAQS} />
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <a
              href="#top"
              className="font-display text-base font-bold tracking-tight text-slate-900"
            >
              Cobalt Studio Academy
            </a>
            <p className="mt-1 text-xs text-slate-500">
              Practical AI workflows, data analytics, and product automation cohorts.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-600">
            <a href="#tracks" className="hover:text-blue-700">
              Tracks
            </a>
            <a href="#methodology" className="hover:text-blue-700">
              Methodology
            </a>
            <a href="#outcomes" className="hover:text-blue-700">
              Outcomes
            </a>
            <a href="#apply" className="hover:text-blue-700">
              Reserve Seat
            </a>
            <a href="#admissions" className="hover:text-blue-700">
              Admissions FAQ
            </a>
          </nav>

          <div className="text-xs text-slate-500 md:text-right">
            <p>Admissions desk: admissions@cobaltstudio.academy</p>
            <p className="mt-1">© 2026 Cobalt Studio Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
