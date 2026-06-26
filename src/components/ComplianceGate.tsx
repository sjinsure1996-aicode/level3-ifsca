"use client";

import { useState } from "react";

type Props = {
  onQualified: () => void;
};

export default function ComplianceGate({ onQualified }: Props) {
  const [residency, setResidency] = useState("");
  const [professionalInvestor, setProfessionalInvestor] = useState(false);
  const [reverseInquiry, setReverseInquiry] = useState(false);
  const [error, setError] = useState("");

  function handleContinue() {
    if (!residency) {
      setError("Please select your residency classification.");
      return;
    }

    if (residency === "resident-indian") {
      setError("Resident Indian access requires separate LRS and Indian compliance review before any fund material can be shared.");
      return;
    }

    if (!professionalInvestor || !reverseInquiry) {
      setError("Please confirm professional investor qualification and reverse-inquiry acknowledgement.");
      return;
    }

    setError("");
    onQualified();
  }

  return (
    <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-12">
      <div className="mb-8 inline-flex w-fit rounded-full border border-gold/40 px-4 py-2 text-sm text-gold">
        IFSCA Category III AIF | Outbound Feeder Fund | Reverse-Inquiry Gateway
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            A USD-native global investment pipeline from GIFT City.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/75">
            Educational gateway for UAE-based HNIs and NRIs seeking a legally compliant, single-window route to global absolute-return and long-only alpha strategies through an IFSCA-regulated Category III AIF feeder structure.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Metric title="Minimum Ticket" value="$150,000" />
            <Metric title="Hedged CAGR Range" value="11%-15%" />
            <Metric title="Long-Only Alpha" value="20%-28%+" />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
          <h2 className="text-2xl font-semibold">Investor access gate</h2>
          <p className="mt-2 text-sm leading-6 text-ivory/70">
            Information beyond this point is available only after self-classification and voluntary request.
          </p>

          <label className="mt-6 block text-sm font-medium">Residency classification</label>
          <select
            className="mt-2 w-full rounded-xl border border-white/10 bg-navy px-4 py-3 text-ivory outline-none"
            value={residency}
            onChange={(event) => setResidency(event.target.value)}
          >
            <option value="">Select one</option>
            <option value="uae-nri">UAE Resident / NRI</option>
            <option value="uae-foreign-national">UAE Resident / Foreign National</option>
            <option value="resident-indian">Resident Indian</option>
          </select>

          <label className="mt-5 flex gap-3 text-sm leading-6 text-ivory/80">
            <input
              type="checkbox"
              checked={professionalInvestor}
              onChange={(event) => setProfessionalInvestor(event.target.checked)}
              className="mt-1 h-4 w-4"
            />
            I confirm that I am a professional / qualified investor and understand the minimum investment threshold of USD 150,000.
          </label>

          <label className="mt-4 flex gap-3 text-sm leading-6 text-ivory/80">
            <input
              type="checkbox"
              checked={reverseInquiry}
              onChange={(event) => setReverseInquiry(event.target.checked)}
              className="mt-1 h-4 w-4"
            />
            I am voluntarily requesting information and understand this is not public solicitation, tax advice, or investment advice.
          </label>

          {error && <p className="mt-4 rounded-xl bg-red-500/15 p-3 text-sm text-red-100">{error}</p>}

          <button
            onClick={handleContinue}
            className="mt-6 w-full rounded-xl bg-gold px-5 py-3 font-semibold text-navy transition hover:opacity-90"
          >
            Request educational access
          </button>
        </div>
      </div>
    </section>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
      <p className="text-sm text-ivory/60">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-gold">{value}</p>
    </div>
  );
}
