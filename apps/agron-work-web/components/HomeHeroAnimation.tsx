"use client";

import { useEffect, useMemo, useState } from "react";

type Metric = {
  key: string;
  label: string;
  target: number;
};

const metrics: Metric[] = [
  { key: "drone", label: "Drone pilot", target: 94 },
  { key: "ai", label: "AI engineer", target: 89 },
  { key: "robot", label: "Robot technician", target: 91 }
];

export function HomeHeroAnimation() {
  const [values, setValues] = useState<Record<string, number>>({
    drone: 56,
    ai: 48,
    robot: 52
  });
  const [previous, setPrevious] = useState<Record<string, number>>({
    drone: 56,
    ai: 48,
    robot: 52
  });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let mounted = true;
    let phase: "up" | "pause" = "up";
    let pauseUntil = 0;

    const timer = setInterval(() => {
      if (!mounted) return;

      if (phase === "pause") {
        if (Date.now() >= pauseUntil) {
          phase = "up";
          setValues({ drone: 55, ai: 47, robot: 51 });
        }
        return;
      }

      setValues((prev) => {
        const next = { ...prev };
        let done = true;
        for (const metric of metrics) {
          const current = prev[metric.key] ?? 0;
          if (current < metric.target) {
            const speed = current < 80 ? 2 : 1;
            next[metric.key] = Math.min(metric.target, current + speed);
            done = false;
          }
        }
        if (done) {
          phase = "pause";
          pauseUntil = Date.now() + 1300;
          for (const metric of metrics) {
            const base = next[metric.key];
            const jitter = Math.round(Math.sin((Date.now() / 180) * (metric.key.length + 1)) * 2);
            next[metric.key] = Math.max(metric.target - 2, Math.min(metric.target, base + jitter));
          }
        }
        setPrevious(prev);
        setTick((v) => v + 1);
        return next;
      });
    }, 85);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  const avg = useMemo(() => {
    const sum = metrics.reduce((acc, item) => acc + (values[item.key] ?? 0), 0);
    return Math.round(sum / metrics.length);
  }, [values]);

  const spark = useMemo(() => {
    const points = 24;
    const base = avg;
    return Array.from({ length: points }).map((_, index) => {
      const wave = Math.sin((tick + index) / 2.2) * 7;
      const pulse = Math.cos((tick + index) / 3.8) * 4;
      return Math.max(28, Math.min(98, Math.round(base + wave + pulse)));
    });
  }, [avg, tick]);

  const linePath = useMemo(() => {
    const w = 220;
    const h = 54;
    return spark
      .map((point, index) => {
        const x = (index / (spark.length - 1)) * w;
        const y = h - ((point - 20) / 80) * h;
        return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${Math.max(2, Math.min(h - 2, y)).toFixed(1)}`;
      })
      .join(" ");
  }, [spark]);

  const avgDelta = Math.max(0, avg - 70);
  const activeRoles = useMemo(() => 240 + ((tick * 3) % 48), [tick]);
  const freshMatches = useMemo(() => 18 + ((tick * 2) % 12), [tick]);
  const maxValue = Math.max(...metrics.map((m) => values[m.key] ?? 0));
  const minValue = Math.min(...metrics.map((m) => values[m.key] ?? 0));
  const consistency = Math.max(72, 100 - (maxValue - minValue) * 3);
  const responseSla = `${Math.max(8, 24 - Math.round(avgDelta / 2))}h`;

  return (
    <div className="job-fun-animation" aria-hidden="true">
      <div className="job-fun-screen">
        <div className="job-fun-topstats">
          <span>Match Score: {avg}%</span>
          <span>Active Roles: {activeRoles}</span>
          <span>Fresh Matches: {freshMatches}</span>
          <span>Response SLA: {responseSla}</span>
        </div>
        <span className="job-fun-label">Live Search</span>
        <div className="job-fun-query">
          <span className="job-fun-dot" />
          <div className="job-fun-query-words">
            <span>drone pilot remote</span>
            <span>ai engineer robotics</span>
            <span>uav inspection analyst</span>
          </div>
        </div>
        <div className="job-fun-pro-layout">
          <div className="job-fun-list">
            {metrics.map((metric) => (
              <div className="job-fun-item" key={metric.key}>
                <span>{metric.label}</span>
                <strong className={(values[metric.key] ?? 0) >= (previous[metric.key] ?? 0) ? "rise" : "fall"}>
                  {values[metric.key] ?? 0}%
                </strong>
                <em className={(values[metric.key] ?? 0) >= (previous[metric.key] ?? 0) ? "delta up" : "delta down"}>
                  {(values[metric.key] ?? 0) >= (previous[metric.key] ?? 0) ? "+" : ""}
                  {(values[metric.key] ?? 0) - (previous[metric.key] ?? 0)}
                </em>
                <div className="job-fun-meter" role="presentation">
                  <span style={{ width: `${values[metric.key] ?? 0}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="job-fun-analytics">
            <div className="job-fun-linewrap" role="presentation">
              <svg viewBox="0 0 220 54" className="job-fun-line">
                <path d="M0,52 L220,52" className="line-base" />
                <path d={linePath} className="line-main" />
              </svg>
            </div>
            <div className="job-fun-summary-grid" role="presentation">
              <div>
                <span>Interview Readiness</span>
                <strong>{Math.max(1, avgDelta)}%</strong>
              </div>
              <div>
                <span>Consistency</span>
                <strong>{consistency}%</strong>
              </div>
              <div>
                <span>Skill Coverage</span>
                <strong>{Math.min(99, avg + 4)}%</strong>
              </div>
            </div>
            <p className="job-fun-trend">Trend: +{Math.max(1, avgDelta)}% in current cycle</p>
          </div>
        </div>
        <span className="job-fun-scan" />
      </div>
    </div>
  );
}
