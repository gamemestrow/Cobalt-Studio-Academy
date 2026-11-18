'use client';

import { ArrowRight, Calendar, Check, Users } from 'lucide-react';
import { PROGRAMME_TRACKS, type ProgrammeTrack, type TrackId } from '@/data/programmes';
import { ResilientImage } from './ResilientImage';

interface TrackExplorerProps {
  activeTrackId: TrackId;
  onSelectTrack: (trackId: TrackId) => void;
  onApplyTrack: (trackId: TrackId, intakeId?: string) => void;
  onEnquireTrack: (trackId: TrackId) => void;
}

export function TrackExplorer({
  activeTrackId,
  onSelectTrack,
  onApplyTrack,
  onEnquireTrack,
}: TrackExplorerProps) {
  const activeTrack: ProgrammeTrack =
    PROGRAMME_TRACKS.find((track) => track.id === activeTrackId) ?? PROGRAMME_TRACKS[0];

  return (
    <section
      id="tracks"
      aria-labelledby="tracks-heading"
      className="border-y border-slate-200 bg-slate-50 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header + Segmented Track Tabs */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-blue-700">
              01. Core Programme Tracks
            </p>
            <h2
              id="tracks-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance sm:text-4xl"
            >
              Three focused tracks built around real deliverables.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Select a track below to inspect its six-week syllabus, tools practiced, upcoming
              cohort dates, and remaining seats.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Programme tracks"
            className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 self-start lg:self-auto"
          >
            {PROGRAMME_TRACKS.map((track) => {
              const isSelected = track.id === activeTrackId;
              return (
                <button
                  key={track.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectTrack(track.id)}
                  className={`rounded-md px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                    isSelected
                      ? 'bg-blue-700 text-white'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {track.number} {track.shortTitle}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Card Interactive Selector Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PROGRAMME_TRACKS.map((track) => {
            const isSelected = track.id === activeTrackId;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => onSelectTrack(track.id)}
                className={`group flex flex-col overflow-hidden rounded-xl border bg-white text-left transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                  isSelected
                    ? 'border-blue-700 ring-1 ring-blue-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden border-b border-slate-200 bg-slate-100">
                  <ResilientImage
                    src={track.imageSrc}
                    alt={track.imageAlt}
                    fallbackTitle={track.title}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs font-medium text-blue-700 tabular-nums">
                      {track.number}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {isSelected ? 'Selected track' : 'Inspect syllabus'}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-slate-900">
                    {track.title}
                  </h3>
                  <p className="mt-1.5 text-xs font-medium text-slate-500">
                    {track.metaLine}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {track.summary}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Expanded Active Track Syllabus & Cohort Detail */}
        <div
          role="tabpanel"
          aria-label={`${activeTrack.title} syllabus and cohorts`}
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10"
        >
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Left: Syllabus + Tools + Capstone */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-5">
                <div>
                  <p className="text-xs font-semibold text-blue-700">
                    {activeTrack.number} Curriculum Breakdown
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-slate-900">
                    {activeTrack.title}
                  </h3>
                </div>
                <p className="text-xs font-medium text-slate-500">
                  {activeTrack.audienceFit}
                </p>
              </div>

              <div className="mt-6 space-y-6">
                {activeTrack.syllabus.map((phase) => (
                  <div
                    key={phase.weeks}
                    className="grid gap-2 border-b border-slate-100 pb-5 last:border-b-0 last:pb-0 sm:grid-cols-12"
                  >
                    <div className="sm:col-span-3">
                      <span className="font-mono text-xs font-medium text-blue-700 tabular-nums">
                        {phase.weeks}
                      </span>
                    </div>
                    <div className="sm:col-span-9">
                      <h4 className="font-display text-base font-semibold text-slate-900">
                        {phase.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {phase.deliverable}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tools & Capstone (clean unboxed separation, no nested card borders) */}
              <div className="mt-7 border-t border-slate-200 pt-6">
                <p className="text-xs font-semibold text-slate-500">Tools & methods practiced</p>
                <p className="mt-1.5 text-sm font-medium text-slate-800">
                  {activeTrack.tools.join('  ·  ')}
                </p>

                <div className="mt-5">
                  <p className="text-xs font-semibold text-blue-700">Week 6 Portfolio Capstone</p>
                  <p className="mt-1 font-display text-base font-semibold text-slate-900">
                    {activeTrack.capstoneTitle}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {activeTrack.capstoneSummary}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Upcoming Cohorts, Tuition & Direct CTAs */}
            <div className="flex flex-col justify-between border-t border-slate-200 pt-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:border-slate-200 lg:pl-10 lg:pt-0">
              <div>
                <h4 className="font-display text-lg font-bold text-slate-900">
                  Upcoming Cohorts
                </h4>
                <p className="mt-1 text-sm text-slate-600">
                  Reserve a provisional spot now; no upfront payment required to hold a seat.
                </p>

                <div className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
                  {activeTrack.intakes.map((intake) => (
                    <div key={intake.id} className="py-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-2 font-mono text-sm font-medium text-slate-900 tabular-nums">
                          <Calendar className="h-4 w-4 text-blue-700" aria-hidden="true" />
                          {intake.label}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-blue-700 tabular-nums">
                          <Users className="h-3.5 w-3.5" aria-hidden="true" />
                          {intake.seatsLeft}/{intake.totalSeats} seats left
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs text-slate-500">{intake.schedule}</p>
                    </div>
                  ))}
                </div>

                {/* Tuition Breakdown */}
                <div className="mt-6 grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div>
                    <p className="text-xs font-medium text-slate-500">Student concession</p>
                    <p className="mt-1 font-mono text-xl font-bold text-blue-700 tabular-nums">
                      {activeTrack.tuitionStudent}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Standard professional</p>
                    <p className="mt-1 font-mono text-xl font-bold text-slate-900 tabular-nums">
                      {activeTrack.tuitionStandard}
                    </p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-blue-700 shrink-0" aria-hidden="true" />
                    <span>Includes live mentor office hours & graded capstone feedback</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-blue-700 shrink-0" aria-hidden="true" />
                    <span>Employer L&D reimbursement invoice provided upon request</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() =>
                    onApplyTrack(activeTrack.id, activeTrack.intakes[0]?.id)
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-800 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  <span>Apply for {activeTrack.shortTitle}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onEnquireTrack(activeTrack.id)}
                  className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-150 hover:border-blue-700 hover:text-blue-700 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  Ask an adviser about this track
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
