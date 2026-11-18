'use client';

import { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  MessageSquare,
  RotateCcw,
} from 'lucide-react';
import { PROGRAMME_TRACKS, type TrackId } from '@/data/programmes';

export type FormMode = 'register' | 'enquiry';

interface RegistrationHubProps {
  selectedTrackId: TrackId;
  selectedIntakeId: string;
  formMode: FormMode;
  onModeChange: (mode: FormMode) => void;
  onTrackChange: (trackId: TrackId) => void;
  onIntakeChange: (intakeId: string) => void;
}

interface FormValues {
  fullName: string;
  email: string;
  stage: string;
  enquiryTopic: string;
  goalOrQuestion: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  goalOrQuestion?: string;
}

interface SubmissionReceipt {
  referenceId: string;
  mode: FormMode;
  fullName: string;
  email: string;
  stage: string;
  trackTitle: string;
  intakeLabel?: string;
  enquiryTopic?: string;
  goalOrQuestion: string;
  submittedAt: string;
}

const STORAGE_KEY = 'csa_lead_receipt_v1';

const LEARNER_STAGES = [
  'University Student',
  'Recent Graduate (0–1 yr)',
  'Young Professional (1–4 yrs)',
  'Career Switcher',
];

const ENQUIRY_TOPICS = [
  'Track recommendation & career fit',
  'Student tuition concession eligibility',
  'Employer sponsorship & invoice letter',
  'Prerequisites & weekly schedule',
];

function generateReferenceCode(seedText: string): string {
  let hash = 0;
  for (let i = 0; i < seedText.length; i += 1) {
    hash = (hash * 31 + seedText.charCodeAt(i)) % 9000;
  }
  const suffix = String(1000 + Math.abs(hash)).slice(0, 4);
  return `CSA-2026-${suffix}`;
}

export function RegistrationHub({
  selectedTrackId,
  selectedIntakeId,
  formMode,
  onModeChange,
  onTrackChange,
  onIntakeChange,
}: RegistrationHubProps) {
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    email: '',
    stage: LEARNER_STAGES[0],
    enquiryTopic: ENQUIRY_TOPICS[0],
    goalOrQuestion: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [enquiryUndecided, setEnquiryUndecided] = useState(false);
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as SubmissionReceipt;
        if (parsed && parsed.referenceId) {
          setReceipt(parsed);
        }
      }
    } catch {
      // Ignore storage access errors in restricted environments
    }
  }, []);

  const currentTrack =
    PROGRAMME_TRACKS.find((track) => track.id === selectedTrackId) ?? PROGRAMME_TRACKS[0];

  const currentIntake =
    currentTrack.intakes.find((intake) => intake.id === selectedIntakeId) ??
    currentTrack.intakes[0];

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (values.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid email address (for example, name@domain.com).';
    }
    if (formMode === 'enquiry' && values.goalOrQuestion.trim().length < 8) {
      nextErrors.goalOrQuestion =
        'Please share a short question (at least 8 characters) so an adviser can help.';
    }
    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const trackTitle =
      formMode === 'enquiry' && enquiryUndecided
        ? 'Undecided — Track Recommendation Requested'
        : currentTrack.title;

    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const nextReceipt: SubmissionReceipt = {
      referenceId: generateReferenceCode(`${values.email}-${Date.now()}`),
      mode: formMode,
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      stage: values.stage,
      trackTitle,
      intakeLabel: formMode === 'register' ? currentIntake.label : undefined,
      enquiryTopic: formMode === 'enquiry' ? values.enquiryTopic : undefined,
      goalOrQuestion: values.goalOrQuestion.trim(),
      submittedAt: `Today at ${timestamp}`,
    };

    setReceipt(nextReceipt);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextReceipt));
    } catch {
      // Ignore storage errors
    }
  };

  const handleModify = () => {
    setReceipt(null);
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const handleResetAll = () => {
    setReceipt(null);
    setErrors({});
    setEnquiryUndecided(false);
    setValues({
      fullName: '',
      email: '',
      stage: LEARNER_STAGES[0],
      enquiryTopic: ENQUIRY_TOPICS[0],
      goalOrQuestion: '',
    });
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <section
      id="apply"
      aria-labelledby="apply-heading"
      className="border-y border-slate-200 bg-slate-50 py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Journey Explanation & Live Selection Summary */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wide text-blue-700">
              03. Registration & Adviser Desk
            </p>
            <h2
              id="apply-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance"
            >
              Reserve your cohort seat or ask an admissions adviser.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Choose the path that matches where you are today. Both routes are processed
              instantly in this interactive preview with zero payment required upfront.
            </p>

            {/* Transparent Journey Steps */}
            <div className="mt-8 space-y-5 border-t border-slate-200 pt-6">
              <div>
                <h3 className="font-display text-sm font-semibold text-slate-900">
                  Path A · Provisional Seat Reservation
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Locks one of 12 cohort seats for 72 hours while admissions verifies your
                  student concession or employer sponsorship details.
                </p>
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold text-slate-900">
                  Path B · Admissions Adviser Enquiry
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Ideal if you are deciding between tracks, confirming prerequisites, or need a
                  syllabus PDF for university credit or team L&D approval.
                </p>
              </div>
            </div>

            {/* Live Selection Context Box */}
            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold text-slate-500">Current selection preview</p>
              <dl className="mt-3 space-y-2.5 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-500">Journey mode</dt>
                  <dd className="font-medium text-blue-700">
                    {formMode === 'register' ? 'Seat Reservation' : 'Adviser Enquiry'}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-500">Programme track</dt>
                  <dd className="font-medium text-slate-900">
                    {formMode === 'enquiry' && enquiryUndecided
                      ? 'Undecided (Adviser Match)'
                      : currentTrack.title}
                  </dd>
                </div>
                {formMode === 'register' ? (
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-slate-500">Target intake</dt>
                    <dd className="font-mono text-xs font-medium text-slate-900 tabular-nums">
                      {currentIntake.label}
                    </dd>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-slate-500">Enquiry topic</dt>
                    <dd className="text-right font-medium text-slate-900">
                      {values.enquiryTopic}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Right Column: Dual-Mode Form OR Instant Confirmation Receipt */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-7">
            {receipt ? (
              <div aria-live="polite" className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-blue-700">
                        {receipt.mode === 'register'
                          ? 'Provisional Seat Reserved'
                          : 'Adviser Enquiry Logged'}
                      </p>
                      <h3 className="font-display text-xl font-bold text-slate-900">
                        Confirmation for {receipt.fullName}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Reference ID</p>
                    <p className="font-mono text-sm font-semibold text-slate-900 tabular-nums">
                      {receipt.referenceId}
                    </p>
                  </div>
                </div>

                <dl className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-slate-500">Email</dt>
                    <dd className="mt-1 text-sm font-medium text-slate-900">{receipt.email}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Applicant profile</dt>
                    <dd className="mt-1 text-sm font-medium text-slate-900">{receipt.stage}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Programme track</dt>
                    <dd className="mt-1 text-sm font-semibold text-blue-700">
                      {receipt.trackTitle}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">
                      {receipt.mode === 'register' ? 'Selected cohort' : 'Enquiry topic'}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-slate-900">
                      {receipt.intakeLabel ?? receipt.enquiryTopic}
                    </dd>
                  </div>
                  {receipt.goalOrQuestion && (
                    <div className="sm:col-span-2">
                      <dt className="text-xs text-slate-500">
                        {receipt.mode === 'register' ? 'Learning objective' : 'Submitted question'}
                      </dt>
                      <dd className="mt-1 text-sm text-slate-700">{receipt.goalOrQuestion}</dd>
                    </div>
                  )}
                </dl>

                <div className="space-y-2.5 text-sm text-slate-600">
                  <p className="font-display text-sm font-semibold text-slate-900">
                    What happens next in the admissions workflow
                  </p>
                  <p>
                    01. Your {receipt.mode === 'register' ? '72-hour seat hold' : 'enquiry brief'}{' '}
                    is tagged under reference{' '}
                    <span className="font-mono font-medium text-slate-900">
                      {receipt.referenceId}
                    </span>{' '}
                    ({receipt.submittedAt}).
                  </p>
                  <p>
                    02. Admissions sends the week-by-week syllabus packet and{' '}
                    {receipt.stage === 'University Student'
                      ? 'student concession verification instructions'
                      : 'cohort onboarding checklist'}
                    .
                  </p>
                  <p className="text-xs text-slate-500">
                    Prototype note: All validation and receipt generation ran locally in browser
                    state with zero API requests.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5">
                  <button
                    type="button"
                    onClick={handleModify}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-700 hover:text-blue-700 whitespace-nowrap cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    <span>Edit Details</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetAll}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 whitespace-nowrap cursor-pointer"
                  >
                    <span>Submit Another Request</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Segmented Dual-Mode Switch */}
                <div
                  role="tablist"
                  aria-label="Choose registration or adviser enquiry"
                  className="grid grid-cols-2 gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={formMode === 'register'}
                    onClick={() => {
                      setErrors({});
                      onModeChange('register');
                    }}
                    className={`flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap cursor-pointer sm:text-sm ${
                      formMode === 'register'
                        ? 'bg-blue-700 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ClipboardCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Reserve a Cohort Seat</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={formMode === 'enquiry'}
                    onClick={() => {
                      setErrors({});
                      onModeChange('enquiry');
                    }}
                    className={`flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap cursor-pointer sm:text-sm ${
                      formMode === 'enquiry'
                        ? 'bg-blue-700 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Request Adviser Enquiry</span>
                  </button>
                </div>

                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="lead-full-name"
                        className="block text-xs font-semibold text-slate-700"
                      >
                        Full Name
                      </label>
                      <input
                        id="lead-full-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Maya Lin"
                        value={values.fullName}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, fullName: e.target.value }));
                          if (errors.fullName) {
                            setErrors((prev) => ({ ...prev, fullName: undefined }));
                          }
                        }}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'error-full-name' : undefined}
                        className={`mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 ${
                          errors.fullName ? 'border-red-600' : 'border-slate-300'
                        }`}
                      />
                      {errors.fullName && (
                        <p
                          id="error-full-name"
                          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="lead-email"
                        className="block text-xs font-semibold text-slate-700"
                      >
                        Email Address
                      </label>
                      <input
                        id="lead-email"
                        type="email"
                        autoComplete="email"
                        placeholder="maya@university.edu"
                        value={values.email}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, email: e.target.value }));
                          if (errors.email) {
                            setErrors((prev) => ({ ...prev, email: undefined }));
                          }
                        }}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'error-email' : undefined}
                        className={`mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 ${
                          errors.email ? 'border-red-600' : 'border-slate-300'
                        }`}
                      />
                      {errors.email && (
                        <p
                          id="error-email"
                          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Current Stage */}
                    <div>
                      <label
                        htmlFor="lead-stage"
                        className="block text-xs font-semibold text-slate-700"
                      >
                        Current Stage
                      </label>
                      <select
                        id="lead-stage"
                        value={values.stage}
                        onChange={(e) =>
                          setValues((prev) => ({ ...prev, stage: e.target.value }))
                        }
                        className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
                      >
                        {LEARNER_STAGES.map((stage) => (
                          <option key={stage} value={stage}>
                            {stage}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Track Selector */}
                    <div>
                      <label
                        htmlFor="lead-track"
                        className="block text-xs font-semibold text-slate-700"
                      >
                        Programme Track
                      </label>
                      <select
                        id="lead-track"
                        value={
                          formMode === 'enquiry' && enquiryUndecided ? 'undecided' : selectedTrackId
                        }
                        onChange={(e) => {
                          if (e.target.value === 'undecided') {
                            setEnquiryUndecided(true);
                          } else {
                            setEnquiryUndecided(false);
                            onTrackChange(e.target.value as TrackId);
                          }
                        }}
                        className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
                      >
                        {PROGRAMME_TRACKS.map((track) => (
                          <option key={track.id} value={track.id}>
                            {track.number} {track.title}
                          </option>
                        ))}
                        {formMode === 'enquiry' && (
                          <option value="undecided">Undecided — Help me choose</option>
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Mode-Conditional Field */}
                  {formMode === 'register' ? (
                    <div>
                      <span className="block text-xs font-semibold text-slate-700">
                        Preferred Cohort Intake
                      </span>
                      <div className="mt-2 grid gap-3 sm:grid-cols-2">
                        {currentTrack.intakes.map((intake) => {
                          const isChecked = currentIntake.id === intake.id;
                          return (
                            <button
                              key={intake.id}
                              type="button"
                              onClick={() => onIntakeChange(intake.id)}
                              className={`flex flex-col rounded-lg border p-3.5 text-left transition-colors cursor-pointer ${
                                isChecked
                                  ? 'border-blue-700 bg-blue-50/70'
                                  : 'border-slate-200 bg-white hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-900 tabular-nums">
                                  <Calendar
                                    className="h-3.5 w-3.5 text-blue-700"
                                    aria-hidden="true"
                                  />
                                  {intake.label}
                                </span>
                                <span className="font-mono text-xs font-medium text-blue-700 tabular-nums">
                                  {intake.seatsLeft} left
                                </span>
                              </div>
                              <span className="mt-1 text-xs text-slate-600">{intake.schedule}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="lead-enquiry-topic"
                        className="block text-xs font-semibold text-slate-700"
                      >
                        Enquiry Topic
                      </label>
                      <select
                        id="lead-enquiry-topic"
                        value={values.enquiryTopic}
                        onChange={(e) =>
                          setValues((prev) => ({ ...prev, enquiryTopic: e.target.value }))
                        }
                        className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
                      >
                        {ENQUIRY_TOPICS.map((topic) => (
                          <option key={topic} value={topic}>
                            {topic}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Goal or Question */}
                  <div>
                    <label
                      htmlFor="lead-message"
                      className="block text-xs font-semibold text-slate-700"
                    >
                      {formMode === 'register'
                        ? 'Primary Learning Goal (optional)'
                        : 'Your Question for Admissions'}
                    </label>
                    <textarea
                      id="lead-message"
                      rows={3}
                      placeholder={
                        formMode === 'register'
                          ? 'For example: Build an AI document workflow portfolio before summer internship applications.'
                          : 'Ask about prerequisites, weekly time commitment, or which track fits your background.'
                      }
                      value={values.goalOrQuestion}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, goalOrQuestion: e.target.value }));
                        if (errors.goalOrQuestion) {
                          setErrors((prev) => ({ ...prev, goalOrQuestion: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(errors.goalOrQuestion)}
                      aria-describedby={errors.goalOrQuestion ? 'error-message' : undefined}
                      className={`mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 ${
                        errors.goalOrQuestion ? 'border-red-600' : 'border-slate-300'
                      }`}
                    />
                    {errors.goalOrQuestion && (
                      <p
                        id="error-message"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.goalOrQuestion}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-800 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                    >
                      <span>
                        {formMode === 'register'
                          ? 'Confirm Provisional Seat Reservation'
                          : 'Send Adviser Enquiry'}
                      </span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="text-xs text-slate-500">
                      {formMode === 'register'
                        ? '72-hour hold · No card required'
                        : 'Instant confirmation summary'}
                    </span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
