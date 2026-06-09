"use client";

import { useState, useMemo } from "react";
import { Phone, Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const loanTerms = [
  { label: "10-Year Fixed", years: 10 },
  { label: "15-Year Fixed", years: 15 },
  { label: "20-Year Fixed", years: 20 },
  { label: "25-Year Fixed", years: 25 },
  { label: "30-Year Fixed", years: 30 },
];

export default function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [loanTermIdx, setLoanTermIdx] = useState(0);
  const [interestRate, setInterestRate] = useState(5.85);
  const [activeTab, setActiveTab] = useState<"payment" | "schedule">("payment");

  const downPercent = ((downPayment / homePrice) * 100).toFixed(3);
  const loanAmount = homePrice - downPayment;
  const term = loanTerms[loanTermIdx];
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = term.years * 12;

  const monthlyPayment = useMemo(() => {
    if (monthlyRate === 0) return loanAmount / numPayments;
    return (
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
    );
  }, [loanAmount, monthlyRate, numPayments]);

  const totalPayment = monthlyPayment * numPayments;

  const schedule = useMemo(() => {
    const rows = [];
    let balance = loanAmount;
    for (let i = 1; i <= numPayments; i++) {
      const interest = balance * monthlyRate;
      const principal = monthlyPayment - interest;
      balance -= principal;
      rows.push({
        month: i,
        payment: monthlyPayment,
        principal,
        interest,
        balance: Math.max(0, balance),
      });
    }
    return rows;
  }, [loanAmount, monthlyPayment, monthlyRate, numPayments]);

  const totalInterest = totalPayment - loanAmount;
  const principalPercent = (loanAmount / totalPayment) * 100;
  const interestPercent = (totalInterest / totalPayment) * 100;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-3">MORTGAGE CALCULATOR</h1>
        <p className="text-sm text-gray-500 mb-10 max-w-[700px]">
          Use our home loan calculator to estimate your total mortgage payment, including taxes and
          insurance. Simply enter the price of the home, your down payment, and details about the home
          loan, to calculate your mortgage payment, schedule, and more.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Inputs */}
          <div className="flex flex-col gap-6">
            <InputField
              label="Home Price"
              value={homePrice}
              prefix="$"
              onChange={(v) => setHomePrice(Number(v) || 0)}
            />
            <div className="flex gap-2">
              <InputField
                label="Down Payment"
                value={downPayment}
                prefix="$"
                onChange={(v) => setDownPayment(Number(v) || 0)}
              />
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1.5">%</label>
                <div className="border border-gray-300 px-3 py-3 text-sm text-gray-700 w-20 text-right bg-gray-50">
                  {downPercent}%
                </div>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1.5">Loan Term</label>
              <select
                value={loanTermIdx}
                onChange={(e) => setLoanTermIdx(Number(e.target.value))}
                className="w-full border border-gray-300 px-3 py-3 text-sm text-gray-700 outline-none appearance-none bg-white"
              >
                {loanTerms.map((t, i) => (
                  <option key={t.label} value={i}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1.5">Interest Rate</label>
              <div className="flex items-center border border-gray-300">
                <input
                  type="number"
                  step="0.001"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="flex-1 px-3 py-3 text-sm text-gray-700 outline-none"
                />
                <span className="px-3 text-gray-500 text-sm border-l border-gray-300 bg-gray-50">%</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="md:col-span-2">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab("payment")}
                className={`px-6 py-3 text-sm tracking-wide ${activeTab === "payment" ? "border-b-2 border-gray-900 text-gray-900 font-medium" : "text-gray-400 hover:text-gray-700"}`}
              >
                Payment
              </button>
              <button
                onClick={() => setActiveTab("schedule")}
                className={`px-6 py-3 text-sm tracking-wide ${activeTab === "schedule" ? "border-b-2 border-gray-900 text-gray-900 font-medium" : "text-gray-400 hover:text-gray-700"}`}
              >
                Schedule
              </button>
            </div>

            {activeTab === "payment" ? (
              <div className="flex flex-col md:flex-row items-center gap-10">
                {/* Donut Chart */}
                <div className="relative w-52 h-52 flex-shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray={`${interestPercent} ${100 - interestPercent}`} />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1d4ed8" strokeWidth="3.5" strokeDasharray={`${principalPercent} ${100 - principalPercent}`} strokeDashoffset={`${-interestPercent}`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold text-gray-900">{fmt(monthlyPayment)}</p>
                    <p className="text-xs text-gray-500">Per Month</p>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-6">
                    Your mortgage payments over <strong>{term.years} years</strong> will add up to{" "}
                    <strong>{fmt(totalPayment)}</strong>.
                  </p>
                  <div className="space-y-4">
                    <SummaryRow label="Principal & Interest" value={fmt(monthlyPayment)} color="bg-blue-700" />
                    <SummaryRow label="Total Principal" value={fmt(loanAmount)} color="bg-blue-500" />
                    <SummaryRow label="Total Interest" value={fmt(totalInterest)} color="bg-amber-400" />
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between">
                        <span className="text-sm font-semibold text-gray-900">Total Cost</span>
                        <span className="text-sm font-bold text-gray-900">{fmt(totalPayment)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="overflow-auto max-h-[500px]">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-xs text-gray-500 font-medium">Month</th>
                      <th className="text-right py-3 px-2 text-xs text-gray-500 font-medium">Payment</th>
                      <th className="text-right py-3 px-2 text-xs text-gray-500 font-medium">Principal</th>
                      <th className="text-right py-3 px-2 text-xs text-gray-500 font-medium">Interest</th>
                      <th className="text-right py-3 px-2 text-xs text-gray-500 font-medium">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((row) => (
                      <tr key={row.month} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-2 px-2 text-gray-700">{row.month}</td>
                        <td className="py-2 px-2 text-gray-700 text-right">{fmt(row.payment)}</td>
                        <td className="py-2 px-2 text-blue-700 text-right">{fmt(row.principal)}</td>
                        <td className="py-2 px-2 text-amber-600 text-right">{fmt(row.interest)}</td>
                        <td className="py-2 px-2 text-gray-700 text-right">{fmt(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Contact Sidebar */}
        <div className="mt-16 bg-[#111111] text-white p-8 max-w-[500px] ml-auto">
          <h3 className="font-serif text-2xl mb-2">Get more info from a local expert!</h3>
          <p className="text-sm text-gray-400 mb-6">Let our team help you navigate your financing options.</p>
          <ContactForm source="Mortgage Calculator · /mortgage-calculator" variant="dark" />
          <div className="mt-5 pt-5 border-t border-white/10 flex flex-col gap-2">
            <a href="tel:+13178685478" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
              <Phone size={13} />+1(317) 868-5478
            </a>
            <a href="mailto:info@listwithlew.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
              <Mail size={13} />info@listwithlew.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, prefix, onChange }: { label: string; value: number; prefix?: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs text-gray-500 block mb-1.5">{label}</label>
      <div className="flex items-center border border-gray-300">
        {prefix && <span className="px-3 text-gray-500 text-sm border-r border-gray-300 bg-gray-50">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-3 text-sm text-gray-700 outline-none"
        />
      </div>
    </div>
  );
}

function SummaryRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-sm flex-shrink-0 ${color}`} />
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}
