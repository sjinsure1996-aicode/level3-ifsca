"use client";

import { FormEvent, useState } from "react";

export default function DashboardView() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: String(formData.get("fullName") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      interest: String(formData.get("interest") || "")
    };

    const response = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (!response.ok) {
      setStatus("Submission failed. Please check SMTP settings or try again.");
      return;
    }

    form.reset();
    setStatus("Your request has been recorded. The team will review your inquiry.");
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <header className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">Secure Educational Vault</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">IFSCA Category III Feeder Fund Overview</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ivory/75">
          A structured USD access route for qualified UAE-based HNIs and NRIs seeking global absolute-return mandates through an IFSCA-regulated GIFT City feeder fund framework.
        </p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <InfoCard title="Tax Architecture" body="Potential 0% Indian capital gains tax and 0% TDS treatment under Section 10(4D), subject to final fund structure and tax review." />
        <InfoCard title="USD Native" body="Designed to reduce INR depreciation drag by keeping subscription, reporting, and underlying exposure in USD terms." />
        <InfoCard title="Estate Tax Shield" body="Investors hold fund units rather than direct US securities, reducing direct exposure to US federal estate tax concerns for non-US citizens." />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-8">
          <h2 className="text-2xl font-semibold">Returns matrix for discussion</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/10 text-gold">
                <tr>
                  <th className="p-4">Strategy</th>
                  <th className="p-4">Indicative CAGR</th>
                  <th className="p-4">Risk posture</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-ivory/80">
                <tr>
                  <td className="p-4">Hedged / Market-Neutral</td>
                  <td className="p-4">11% to 15%</td>
                  <td className="p-4">Drawdown protection focus</td>
                </tr>
                <tr>
                  <td className="p-4">Long-Only Alpha</td>
                  <td className="p-4">20% to 28%+</td>
                  <td className="p-4">Higher baseline volatility</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-5 text-ivory/50">
            Returns are strategy-level historical/target discussion ranges only. They are not guaranteed and must be reconciled with final PPM, risk factors, and manager track record.
          </p>
        </div>

        <form onSubmit={submitLead} className="rounded-3xl border border-gold/30 bg-ivory p-8 text-navy shadow-2xl">
          <h2 className="text-2xl font-semibold">Request data room review</h2>
          <p className="mt-2 text-sm leading-6 text-navy/70">
            Submit details for internal review and controlled PPM/performance-sheet access.
          </p>

          <label className="mt-5 block text-sm font-medium">Full name</label>
          <input name="fullName" required className="mt-2 w-full rounded-xl border border-navy/20 px-4 py-3 outline-none" />

          <label className="mt-4 block text-sm font-medium">Email address</label>
          <input name="email" type="email" required className="mt-2 w-full rounded-xl border border-navy/20 px-4 py-3 outline-none" />

          <label className="mt-4 block text-sm font-medium">Phone with country code</label>
          <input name="phone" required placeholder="+971..." className="mt-2 w-full rounded-xl border border-navy/20 px-4 py-3 outline-none" />

          <label className="mt-4 block text-sm font-medium">Main interest</label>
          <select name="interest" className="mt-2 w-full rounded-xl border border-navy/20 px-4 py-3 outline-none">
            <option>Hedged / Market-Neutral Strategy</option>
            <option>Long-Only Alpha Strategy</option>
            <option>Both Strategies</option>
            <option>Tax and Estate Structuring Review</option>
          </select>

          <button disabled={loading} className="mt-6 w-full rounded-xl bg-navy px-5 py-3 font-semibold text-ivory transition hover:opacity-90 disabled:opacity-50">
            {loading ? "Submitting..." : "Submit inquiry"}
          </button>

          {status && <p className="mt-4 rounded-xl bg-navy/10 p-3 text-sm">{status}</p>}
        </form>
      </div>
    </section>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
      <h3 className="text-xl font-semibold text-gold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-ivory/70">{body}</p>
    </div>
  );
}
