import { useEffect, useState } from 'react';
import { BarChart3, BellRing, GitMerge, ShieldCheck, Sparkles, ArrowRight, UserCheck } from 'lucide-react';
import clsx from 'clsx';
import { api, DEMO } from '../lib/api';
import { useAuth } from '../lib/context';
import { Button, ErrorBox, Field, Input } from '../components/ui';

interface Demo { username: string; name: string; designation: string; role: string; bureau_code: string | null; region_code: string | null }

const FEATURES = [
  { icon: GitMerge, title: 'Cross-Bureau Overlap Engine', body: 'Neural matching finds related complaints across RB, PGRC & regional offices in real time.' },
  { icon: BellRing, title: 'Automated SLA Radar', body: 'Proactive escalation before statutory deadlines expire with hierarchical alert routing.' },
  { icon: BarChart3, title: 'Real-Time MIS Analytics', body: 'Bureau-, region- and status-wise intelligence with automated ageing & disposal metrics.' },
  { icon: ShieldCheck, title: 'Tamper-Evident Audit Trail', body: 'End-to-end provenance with immutable officer action history, remarks and digital records.' },
];

const initials = (name?: string) => (name ?? '').replace(/^(Prof\.|Dr\.)\s*/, '').split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<unknown>(null);
  const [busy, setBusy] = useState(false);
  const [demo, setDemo] = useState<Demo[]>([]);
  useEffect(() => { api<Demo[]>('/auth/demo-accounts').then(setDemo).catch(() => {}); }, []);

  const submit = async (u = username, p = password) => {
    setBusy(true); setError(null);
    try { await login(u, p); } catch (e) { setError(e); } finally { setBusy(false); }
  };

  const getRoleBadge = (role: string, bureau: string | null) => {
    if (role === 'admin') return { label: 'Admin', color: 'text-amber-300 border-amber-500/30 bg-amber-500/10' };
    if (role === 'head') return { label: bureau ?? 'Head', color: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10' };
    if (role === 'regional') return { label: 'Regional', color: 'text-purple-300 border-purple-500/30 bg-purple-500/10' };
    return { label: bureau ?? 'Officer', color: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10' };
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-3 sm:p-8">
      <div className="w-full max-w-[1140px]">
        {/* Top Eyebrow */}
        <div className="eyebrow mb-3 flex items-center justify-between px-1 text-ink-3">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            .01 · Sign in
          </span>
          <span className="font-semibold tracking-[0.2em] text-white">SIH26264 · brAin--byte</span>
        </div>

        {/* Main Shell Card */}
        <div className="grid overflow-hidden rounded-[14px] border border-white/10 bg-[#050508] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.98)] lg:grid-cols-[1.1fr_1fr]">
          
          {/* Left Hero Section */}
          <div className="relative hidden min-h-[580px] flex-col justify-between border-r border-white/10 bg-gradient-to-b from-[#09090f] via-[#050508] to-[#040406] p-10 lg:flex">
            {/* Top Brand */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-white/20 to-white/5 font-mono text-base font-bold text-white shadow-md ring-1 ring-white/20">
                  β
                </div>
                <div>
                  <div className="text-[13px] font-bold tracking-[0.2em] text-white">brAin--byte</div>
                  <div className="text-[9.5px] font-medium tracking-[0.2em] text-ink-3">AICTE · ICMS COMMAND</div>
                </div>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9.5px] uppercase tracking-[0.16em] text-zinc-400">
                Official Portal
              </span>
            </div>

            {/* Central Wordmark */}
            <div className="my-8 text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-300">
                <Sparkles className="size-3 text-emerald-400" />
                Intelligent Grievance Monitoring
              </div>
              <h1 className="mt-4 text-[76px] font-bold leading-none tracking-[0.08em] text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.15)]">
                ICMS
              </h1>
              <p className="eyebrow mt-3 text-[10.5px] text-zinc-400">
                Integrated Bureau Resolution Architecture
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {FEATURES.map((f) => (
                <div key={f.title} className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3 transition-colors hover:border-white/15 hover:bg-white/[0.04]">
                  <div className="flex items-center gap-2">
                    <f.icon className="size-4 shrink-0 text-white/80" strokeWidth={1.8} />
                    <span className="text-xs font-semibold text-white">{f.title}</span>
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-400">{f.body}</p>
                </div>
              ))}
            </div>

            {/* Bottom Status bar */}
            <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                System Status: Operational
              </span>
              <span>Encrypted Node v2.4</span>
            </div>
          </div>

          {/* Right Form & Personas Section */}
          <div className="glass m-0 flex flex-col justify-between rounded-none p-6 sm:p-10 lg:m-3 lg:rounded-[12px]">
            {/* Mobile Brand Banner */}
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-white/20 to-white/5 font-mono text-lg font-bold text-white ring-1 ring-white/20">
                β
              </div>
              <div>
                <div className="text-sm font-bold tracking-[0.18em] text-white">brAin--byte ICMS</div>
                <div className="text-[10px] uppercase tracking-wider text-ink-3">AICTE Grievance Portal</div>
              </div>
            </div>

            {/* Sign In Form */}
            <form className="mx-auto w-full max-w-sm" onSubmit={(e) => { e.preventDefault(); submit(); }}>
              <div className="text-center">
                <h2 className="text-[20px] font-semibold uppercase tracking-[0.16em] text-white">Sign In</h2>
                <p className="eyebrow mt-1 text-[9.5px] text-zinc-400">Authorized Personnel & Officials</p>
              </div>

              {DEMO && (
                <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-xs leading-relaxed text-zinc-300">
                  <div className="flex items-center gap-1.5 font-semibold text-white">
                    <UserCheck className="size-3.5 text-emerald-400" /> Live Demo Mode
                  </div>
                  <p className="mt-0.5 text-[11px] text-zinc-400">Instant login enabled. Pick any demo persona below or sign in directly.</p>
                </div>
              )}

              <div className="mt-5 space-y-4">
                <Field label="Username">
                  <Input autoComplete="username" placeholder="e.g. chairman or rb.head" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </Field>
                <Field label="Password">
                  <Input type="password" autoComplete="current-password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Field>
                <ErrorBox error={error} />
                <div className="pt-2">
                  <Button variant="primary" className="h-11 w-full text-xs font-semibold tracking-[0.16em]" loading={busy} type="submit">
                    Sign in to Portal <ArrowRight className="size-4 ml-1" />
                  </Button>
                </div>
              </div>
            </form>

            {/* Demo Personas List */}
            {!!demo.length && (
              <div className="mx-auto mt-8 w-full max-w-sm">
                <div className="eyebrow mb-2.5 flex items-center justify-between text-zinc-400">
                  <span>Demo Personas</span>
                  <span className="text-[10px] normal-case tracking-normal text-zinc-400">
                    Key: <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10.5px] text-white">Aicte@2026</code>
                  </span>
                </div>

                <div className="max-h-56 space-y-1.5 overflow-y-auto pr-1">
                  {demo.map((d) => {
                    const badge = getRoleBadge(d.role, d.bureau_code);
                    return (
                      <button
                        key={d.username}
                        type="button"
                        onClick={() => submit(d.username, 'Aicte@2026')}
                        disabled={busy}
                        className="group flex w-full items-center justify-between gap-3 rounded-lg border border-white/[0.07] bg-white/[0.02] p-2.5 text-left transition-all hover:border-white/25 hover:bg-white/[0.06]"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Initials Badge */}
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold text-white ring-1 ring-white/15 group-hover:ring-white/30">
                            {initials(d.name)}
                          </div>
                          {/* Details */}
                          <div className="min-w-0 truncate">
                            <div className="flex items-center gap-2">
                              <span className="truncate text-[12.5px] font-semibold text-white group-hover:text-emerald-300 transition-colors">
                                {d.name}
                              </span>
                              <span className={clsx('rounded px-1.5 py-0.2 text-[9px] font-medium uppercase tracking-wider border', badge.color)}>
                                {badge.label}
                              </span>
                            </div>
                            <span className="block truncate text-[11px] text-zinc-400">
                              {d.designation} · <span className="font-mono text-zinc-500">{d.username}</span>
                            </span>
                          </div>
                        </div>

                        {/* Arrow */}
                        <span className="text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-white">
                          →
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
