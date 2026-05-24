/*
 * AI Agent 마스터 클래스 2기 - 홍보 랜딩페이지
 * Design: Neo-Brutalism + Tech Hybrid
 * Colors: #FFFBF0 (warm white), #FFD600 (yellow), #FF3B00 (red), #0057FF (blue), #0D0D0D (dark)
 * Fonts: Black Han Sans (headlines), Noto Sans KR (body), Space Grotesk (numbers)
 */

import { useEffect, useRef, useState } from "react";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/114049990/HAU46XVtMt6Dau3BbbpZTF/hero-bg-dapzTeJKCzMvGsRe3qJxwF.webp";
const CURRICULUM_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/114049990/HAU46XVtMt6Dau3BbbpZTF/curriculum-bg-PEFpjmQPz6qy84wztKpNY3.webp";
const CTA_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/114049990/HAU46XVtMt6Dau3BbbpZTF/cta-accent-ZsBCZuD3zSuNeutXzdzYmx.webp";

const curriculum = [
  { week: "1주차", date: "6/14", topic: "AI Agent 업무설계와 보고서·제안서 자동화", instructor: "이현구", color: "#FFD600", icon: "📄" },
  { week: "2주차", date: "6/21", topic: "AI 리서치와 데이터 분석", instructor: "김성식", color: "#0057FF", icon: "🔍" },
  { week: "3주차", date: "6/28", topic: "앤티그래비티 활용 미니 웹앱 만들기", instructor: "홍용기", color: "#FF3B00", icon: "💻" },
  { week: "4주차", date: "7/5", topic: "AI 이미지·영상 콘텐츠 제작과 강의/홍보물 자동화", instructor: "송민경", color: "#FFD600", icon: "🎨" },
  { week: "5주차", date: "7/12", topic: "나만의 맞춤형 챗봇 만들기", instructor: "윤성임", color: "#0057FF", icon: "🤖" },
  { week: "6주차", date: "7/19", topic: "SNS 콘텐츠 자동화 시스템 설계", instructor: "홍진경", color: "#FF3B00", icon: "📱" },
];

const schedule = [
  { period: "5/30~6/2", phase: "1차 오픈 공지", message: "2기 모집 시작, 6주 커리큘럼 공개", color: "#FFD600" },
  { period: "6/3~6/7", phase: "가치 제안", message: "보고서, 리서치, 웹앱, 콘텐츠, 챗봇, SNS 자동화 결과물 강조", color: "#0057FF" },
  { period: "6/8~6/11", phase: "사례 중심 홍보", message: "1기 피드백 반영, 2기 개선 포인트 안내", color: "#FF3B00" },
  { period: "6/12~6/13", phase: "마감 임박", message: "6/14 개강, 신청 마감 안내", color: "#FFD600" },
  { period: "6/14", phase: "개강 당일", message: "마지막 신청 안내 또는 대기자 접수", color: "#0057FF" },
];

const targets = [
  { icon: "💼", label: "경영컨설턴트" },
  { icon: "🎤", label: "강사·코치" },
  { icon: "👤", label: "1인 전문가" },
  { icon: "🤖", label: "AI 고관여자" },
];

const outcomes = [
  { icon: "📋", title: "보고서·제안서 자동화", desc: "AI로 업무 문서를 자동 생성하는 시스템 구축" },
  { icon: "🔬", title: "AI 리서치 시스템", desc: "데이터 분석과 인사이트 도출 자동화" },
  { icon: "🌐", title: "미니 웹앱 제작", desc: "코딩 없이 나만의 업무 도구 만들기" },
  { icon: "🎬", title: "콘텐츠 자동화", desc: "이미지·영상·홍보물 AI 제작 파이프라인" },
  { icon: "💬", title: "맞춤형 챗봇", desc: "내 업무에 특화된 AI 어시스턴트 구축" },
  { icon: "📣", title: "SNS 자동화", desc: "콘텐츠 기획부터 발행까지 자동화 시스템" },
];

function useIntersection(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useIntersection();

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleApply = () => {
    const el = document.getElementById("apply");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFBF0", fontFamily: "'Noto Sans KR', sans-serif" }}>

      {/* ─── STICKY NAV ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "#0D0D0D" : "transparent",
          borderBottom: scrolled ? "3px solid #FFD600" : "none",
        }}
      >
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <span
              className="font-black-han text-lg"
              style={{ color: scrolled ? "#FFD600" : "#0D0D0D", fontFamily: "'Black Han Sans', sans-serif" }}
            >
              AI AGENT
            </span>
            <span
              className="text-xs font-bold px-2 py-0.5"
              style={{
                backgroundColor: "#FF3B00",
                color: "#fff",
                border: "2px solid #0D0D0D",
              }}
            >
              2기
            </span>
          </div>
          <button
            onClick={handleApply}
            className="brutal-btn text-sm font-bold px-4 py-2"
            style={{
              backgroundColor: "#FFD600",
              color: "#0D0D0D",
              fontFamily: "'Black Han Sans', sans-serif",
              fontSize: "0.85rem",
            }}
          >
            지금 신청하기 →
          </button>
        </div>
      </nav>

      {/* ─── TICKER BANNER ─── */}
      <div
        className="overflow-hidden py-2 mt-0"
        style={{ backgroundColor: "#0D0D0D", borderBottom: "3px solid #FFD600" }}
      >
        <div className="ticker-track flex gap-8 whitespace-nowrap" style={{ width: "200%" }}>
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center gap-6" style={{ color: "#FFD600", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", fontWeight: 600 }}>
              <span>⚡ 2기 특별가 25만원</span>
              <span style={{ color: "#FF3B00" }}>●</span>
              <span>6/14 개강</span>
              <span style={{ color: "#FF3B00" }}>●</span>
              <span>매주 일요일 저녁 8~10시</span>
              <span style={{ color: "#FF3B00" }}>●</span>
              <span>비개발자 전문가 대상</span>
              <span style={{ color: "#FF3B00" }}>●</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-16" style={{ backgroundColor: "#0D0D0D" }}>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,13,13,0.85) 0%, rgba(0,87,255,0.2) 100%)" }} />

        <div className="container relative z-10 py-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span
                className="inline-block px-3 py-1 text-sm font-bold"
                style={{ backgroundColor: "#FF3B00", color: "#fff", border: "2px solid #FFD600", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                2026.06.14 개강
              </span>
              <span
                className="inline-block px-3 py-1 text-sm font-bold"
                style={{ backgroundColor: "#FFD600", color: "#0D0D0D", border: "2px solid #FFD600" }}
              >
                2기 모집 중
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="font-black-han leading-tight mb-6"
              style={{
                fontFamily: "'Black Han Sans', sans-serif",
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                color: "#FFFBF0",
                lineHeight: 1.15,
              }}
            >
              AI 도구 사용법이 아닌,<br />
              <span style={{ color: "#FFD600" }}>내 업무에 바로 쓰는</span><br />
              AI 업무 시스템을 만드는<br />
              <span
                style={{
                  backgroundColor: "#FF3B00",
                  padding: "0 8px",
                  display: "inline-block",
                  marginTop: "4px",
                }}
              >
                6주 실전 과정
              </span>
            </h1>

            <p
              className="text-lg mb-8 max-w-2xl"
              style={{ color: "#D0CFC8", lineHeight: 1.8, fontWeight: 400 }}
            >
              보고서, 리서치, 웹앱, 콘텐츠, 챗봇, SNS 자동화까지<br />
              <strong style={{ color: "#FFD600" }}>비개발자 전문가</strong>가 실제 업무 산출물을 만드는 과정입니다.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={handleApply}
                className="brutal-btn pulse-cta px-8 py-4 text-xl font-bold"
                style={{
                  backgroundColor: "#FFD600",
                  color: "#0D0D0D",
                  fontFamily: "'Black Han Sans', sans-serif",
                  fontSize: "1.25rem",
                }}
              >
                지금 신청하기 →
              </button>
              <div style={{ color: "#FFFBF0" }}>
                <span className="strike-through font-space text-lg" style={{ color: "#888", fontFamily: "'Space Grotesk', sans-serif" }}>
                  500,000원
                </span>
                <span className="font-space text-2xl font-bold ml-3" style={{ color: "#FFD600", fontFamily: "'Space Grotesk', sans-serif" }}>
                  250,000원
                </span>
              </div>
            </div>

            {/* Info pills */}
            <div className="flex flex-wrap gap-3 mt-8">
              {[
                { label: "매주 일요일", val: "저녁 8~10시" },
                { label: "과정 기간", val: "6주" },
                { label: "수강 방식", val: "온라인 실시간" },
                { label: "모집 인원", val: "소수 정예" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="px-4 py-2"
                  style={{
                    backgroundColor: "rgba(255,251,240,0.1)",
                    border: "2px solid rgba(255,214,0,0.4)",
                    color: "#FFFBF0",
                  }}
                >
                  <span style={{ color: "#FFD600", fontSize: "0.75rem", display: "block" }}>{item.label}</span>
                  <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "#FFD600" }}>
          <span style={{ fontSize: "0.75rem", fontFamily: "'Space Grotesk', sans-serif" }}>SCROLL</span>
          <div className="w-0.5 h-8 animate-bounce" style={{ backgroundColor: "#FFD600" }} />
        </div>
      </section>

      {/* ─── STATS SECTION ─── */}
      <section style={{ backgroundColor: "#FFD600", borderTop: "3px solid #0D0D0D", borderBottom: "3px solid #0D0D0D" }}>
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {[
              { num: 6, suffix: "주", label: "집중 커리큘럼" },
              { num: 6, suffix: "명", label: "현직 전문 강사" },
              { num: 50, suffix: "%", label: "2기 특별 할인" },
              { num: 12, suffix: "H", label: "총 강의 시간" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center py-6"
                style={{
                  borderRight: i < 3 ? "3px solid #0D0D0D" : "none",
                }}
              >
                <div
                  className="font-space font-bold"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontFamily: "'Space Grotesk', sans-serif", color: "#0D0D0D" }}
                >
                  <CountUp target={stat.num} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#0D0D0D", marginTop: "4px" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TARGET SECTION ─── */}
      <section className="py-20" style={{ backgroundColor: "#FFFBF0" }}>
        <div className="container">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: "40px", height: "4px", backgroundColor: "#FF3B00" }} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#FF3B00", letterSpacing: "0.1em" }}>
                WHO IS THIS FOR
              </span>
            </div>
            <h2
              className="font-black-han"
              style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#0D0D0D", lineHeight: 1.2 }}
            >
              이런 분들을 위한 과정입니다
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {targets.map((t, i) => (
              <div
                key={i}
                className="brutal-card p-6 text-center"
                style={{ backgroundColor: i % 2 === 0 ? "#0D0D0D" : "#FFFBF0" }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "12px" }}>{t.icon}</div>
                <div
                  className="font-bold text-lg"
                  style={{ color: i % 2 === 0 ? "#FFD600" : "#0D0D0D", fontWeight: 800 }}
                >
                  {t.label}
                </div>
              </div>
            ))}
          </div>

          {/* Key message box */}
          <div
            className="mt-12 p-8"
            style={{
              backgroundColor: "#0D0D0D",
              border: "3px solid #0D0D0D",
              boxShadow: "8px 8px 0px #FF3B00",
            }}
          >
            <p
              style={{
                color: "#FFFBF0",
                fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                lineHeight: 1.9,
                fontWeight: 400,
              }}
            >
              <span style={{ color: "#FFD600", fontFamily: "'Black Han Sans', sans-serif", fontSize: "1.5em" }}>"</span>
              AI 도구 사용법을 배우는 과정이 아닙니다.<br />
              보고서, 리서치, 웹앱, 콘텐츠, 챗봇, SNS 자동화까지<br />
              <strong style={{ color: "#FFD600" }}>내 업무에 바로 쓰는 AI 업무 시스템을 만드는 6주 과정입니다.</strong>
              <span style={{ color: "#FFD600", fontFamily: "'Black Han Sans', sans-serif", fontSize: "1.5em" }}>"</span>
            </p>
          </div>
        </div>
      </section>

      {/* ─── OUTCOMES SECTION ─── */}
      <section className="py-20" style={{ backgroundColor: "#0057FF" }}>
        <div className="container">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: "40px", height: "4px", backgroundColor: "#FFD600" }} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#FFD600", letterSpacing: "0.1em" }}>
                WHAT YOU'LL BUILD
              </span>
            </div>
            <h2
              className="font-black-han"
              style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#FFFBF0", lineHeight: 1.2 }}
            >
              6주 후 당신이 갖게 될 것들
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {outcomes.map((item, i) => (
              <div
                key={i}
                className="p-6"
                style={{
                  backgroundColor: "#FFFBF0",
                  border: "3px solid #0D0D0D",
                  boxShadow: "5px 5px 0px #0D0D0D",
                  transition: "transform 150ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 150ms cubic-bezier(0.23, 1, 0.32, 1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translate(-3px, -3px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "8px 8px 0px #0D0D0D";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "5px 5px 0px #0D0D0D";
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0D0D0D", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "#444", fontSize: "0.9rem", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CURRICULUM SECTION ─── */}
      <section className="py-20" style={{ backgroundColor: "#FFFBF0" }}>
        <div className="container">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: "40px", height: "4px", backgroundColor: "#0057FF" }} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#0057FF", letterSpacing: "0.1em" }}>
                6-WEEK CURRICULUM
              </span>
            </div>
            <h2
              className="font-black-han"
              style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#0D0D0D", lineHeight: 1.2 }}
            >
              6주 커리큘럼
            </h2>
            <p style={{ color: "#555", marginTop: "12px", fontSize: "1rem" }}>
              매주 일요일 저녁 8시 ~ 10시 · 온라인 실시간
            </p>
          </div>

          <div className="space-y-4">
            {curriculum.map((item, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 p-5"
                style={{
                  backgroundColor: "#fff",
                  border: "3px solid #0D0D0D",
                  boxShadow: `5px 5px 0px ${item.color}`,
                  transition: "transform 150ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 150ms cubic-bezier(0.23, 1, 0.32, 1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translate(-3px, -3px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0px ${item.color}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = `5px 5px 0px ${item.color}`;
                }}
              >
                {/* Week badge */}
                <div
                  className="flex-shrink-0 text-center px-4 py-3 min-w-[80px]"
                  style={{ backgroundColor: item.color, border: "2px solid #0D0D0D" }}
                >
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#0D0D0D" }}>
                    {item.week}
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#0D0D0D" }}>
                    {item.date}
                  </div>
                </div>

                {/* Icon */}
                <div style={{ fontSize: "2rem", flexShrink: 0 }}>{item.icon}</div>

                {/* Topic */}
                <div className="flex-1">
                  <h3 style={{ fontWeight: 800, fontSize: "1.05rem", color: "#0D0D0D", lineHeight: 1.4 }}>
                    {item.topic}
                  </h3>
                </div>

                {/* Instructor */}
                <div
                  className="flex-shrink-0 px-3 py-2"
                  style={{
                    backgroundColor: "#0D0D0D",
                    color: "#FFD600",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.instructor} 강사
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICE SECTION ─── */}
      <section id="apply" className="py-20" style={{ backgroundColor: "#0D0D0D" }}>
        <div className="container">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: "40px", height: "4px", backgroundColor: "#FFD600" }} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#FFD600", letterSpacing: "0.1em" }}>
                PRICING
              </span>
            </div>
            <h2
              className="font-black-han"
              style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#FFFBF0", lineHeight: 1.2 }}
            >
              수강료 안내
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Price card */}
            <div
              className="p-8"
              style={{
                backgroundColor: "#FFD600",
                border: "3px solid #FFD600",
                boxShadow: "8px 8px 0px #FF3B00",
              }}
            >
              <div style={{ marginBottom: "24px" }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    backgroundColor: "#FF3B00",
                    color: "#fff",
                    padding: "4px 10px",
                    border: "2px solid #0D0D0D",
                    display: "inline-block",
                    marginBottom: "16px",
                  }}
                >
                  2기 특별 모집가
                </span>
                <div className="flex items-baseline gap-4">
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", color: "#666", textDecoration: "line-through", fontWeight: 600 }}>
                      정가 500,000원
                    </div>
                    <div
                      className="font-space font-bold"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(3rem, 8vw, 5rem)", color: "#0D0D0D", lineHeight: 1 }}
                    >
                      250,000<span style={{ fontSize: "0.5em" }}>원</span>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#FF3B00",
                      color: "#fff",
                      padding: "8px 12px",
                      fontFamily: "'Black Han Sans', sans-serif",
                      fontSize: "1.5rem",
                      border: "2px solid #0D0D0D",
                    }}
                  >
                    50%<br />OFF
                  </div>
                </div>
              </div>

              <div
                className="p-4 mb-6"
                style={{ backgroundColor: "rgba(13,13,13,0.1)", border: "2px solid #0D0D0D" }}
              >
                <p style={{ fontSize: "0.9rem", color: "#0D0D0D", lineHeight: 1.7 }}>
                  2기 과정은 커리큘럼 고도화 및 수강생 피드백 반영 과정으로 특별가 적용
                </p>
              </div>

              <button
                className="brutal-btn w-full py-4 text-xl font-bold"
                style={{
                  backgroundColor: "#0D0D0D",
                  color: "#FFD600",
                  fontFamily: "'Black Han Sans', sans-serif",
                  fontSize: "1.3rem",
                  width: "100%",
                  border: "3px solid #0D0D0D",
                  boxShadow: "5px 5px 0px #FF3B00",
                }}
              >
                2기 수강 신청하기 →
              </button>
            </div>

            {/* What's included */}
            <div className="space-y-4">
              <h3
                style={{
                  fontFamily: "'Black Han Sans', sans-serif",
                  fontSize: "1.5rem",
                  color: "#FFFBF0",
                  marginBottom: "16px",
                }}
              >
                포함 내용
              </h3>
              {[
                "6주 온라인 실시간 강의 (매주 일요일 8~10시)",
                "6명 현직 전문 강사 직강",
                "강의 녹화본 제공 (복습 가능)",
                "실습 자료 및 템플릿 제공",
                "수강생 전용 커뮤니티 참여",
                "1기 피드백 반영 개선된 커리큘럼",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4"
                  style={{
                    backgroundColor: "rgba(255,251,240,0.05)",
                    border: "2px solid rgba(255,214,0,0.3)",
                  }}
                >
                  <span style={{ color: "#FFD600", fontSize: "1.2rem", flexShrink: 0 }}>✓</span>
                  <span style={{ color: "#FFFBF0", fontSize: "0.95rem" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SCHEDULE SECTION ─── */}
      <section className="py-20" style={{ backgroundColor: "#FFFBF0" }}>
        <div className="container">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: "40px", height: "4px", backgroundColor: "#FF3B00" }} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#FF3B00", letterSpacing: "0.1em" }}>
                PROMOTION SCHEDULE
              </span>
            </div>
            <h2
              className="font-black-han"
              style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#0D0D0D", lineHeight: 1.2 }}
            >
              홍보 일정
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="hidden md:block absolute left-[120px] top-0 bottom-0 w-0.5"
              style={{ backgroundColor: "#0D0D0D" }}
            />

            <div className="space-y-4">
              {schedule.map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                  {/* Date */}
                  <div
                    className="flex-shrink-0 px-3 py-2 text-center min-w-[100px]"
                    style={{
                      backgroundColor: item.color,
                      border: "2px solid #0D0D0D",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      color: "#0D0D0D",
                    }}
                  >
                    {item.period}
                  </div>

                  {/* Timeline dot */}
                  <div
                    className="hidden md:block flex-shrink-0 w-4 h-4 mt-2 z-10"
                    style={{
                      backgroundColor: item.color,
                      border: "3px solid #0D0D0D",
                      borderRadius: "50%",
                    }}
                  />

                  {/* Content */}
                  <div
                    className="flex-1 p-4"
                    style={{
                      backgroundColor: "#fff",
                      border: "2px solid #0D0D0D",
                      boxShadow: `4px 4px 0px ${item.color}`,
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: "1rem", color: "#0D0D0D", marginBottom: "4px" }}>
                      {item.phase}
                    </div>
                    <div style={{ color: "#555", fontSize: "0.9rem" }}>{item.message}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA SECTION ─── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ backgroundColor: "#FF3B00" }}
      >
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 hidden lg:block"
          style={{
            backgroundImage: `url(${CTA_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <div
              className="inline-block px-3 py-1 mb-6 text-sm font-bold"
              style={{ backgroundColor: "#FFD600", color: "#0D0D0D", border: "2px solid #0D0D0D" }}
            >
              ⚡ 홍보 시작: 2026년 5월 30일
            </div>
            <h2
              className="font-black-han mb-6"
              style={{
                fontFamily: "'Black Han Sans', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "#FFFBF0",
                lineHeight: 1.2,
              }}
            >
              지금 신청하고<br />
              <span style={{ color: "#FFD600" }}>2기 특별가</span>를<br />
              놓치지 마세요
            </h2>
            <p style={{ color: "rgba(255,251,240,0.85)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "32px" }}>
              비개발자 전문가를 위한 AI 업무자동화 실전 과정<br />
              <strong style={{ color: "#FFD600" }}>2026년 6월 14일 개강 · 정가 50만원 → 2기 특별가 25만원</strong>
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                className="brutal-btn px-10 py-5 text-xl"
                style={{
                  backgroundColor: "#FFD600",
                  color: "#0D0D0D",
                  fontFamily: "'Black Han Sans', sans-serif",
                  fontSize: "1.3rem",
                  border: "3px solid #0D0D0D",
                  boxShadow: "6px 6px 0px #0D0D0D",
                }}
              >
                수강 신청하기 →
              </button>
              <div
                className="flex items-center gap-2 px-6 py-4"
                style={{
                  backgroundColor: "rgba(255,251,240,0.15)",
                  border: "2px solid rgba(255,251,240,0.4)",
                  color: "#FFFBF0",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>📅</span>
                <div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>개강일</div>
                  <div style={{ fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif" }}>2026.06.14 SUN</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        style={{
          backgroundColor: "#0D0D0D",
          borderTop: "3px solid #FFD600",
          padding: "40px 0",
        }}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div
                className="font-black-han text-2xl mb-2"
                style={{ fontFamily: "'Black Han Sans', sans-serif", color: "#FFD600" }}
              >
                AI AGENT 마스터 클래스 2기
              </div>
              <p style={{ color: "#888", fontSize: "0.85rem" }}>
                비개발자 전문가를 위한 AI 업무자동화 실전 과정
              </p>
            </div>
            <div className="text-right">
              <div style={{ color: "#FFD600", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: "4px" }}>
                2026.06.14 개강
              </div>
              <div style={{ color: "#888", fontSize: "0.85rem" }}>
                매주 일요일 저녁 8시 ~ 10시
              </div>
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid rgba(255,214,0,0.2)",
              marginTop: "24px",
              paddingTop: "24px",
              color: "#555",
              fontSize: "0.8rem",
              textAlign: "center",
            }}
          >
            © 2026 AI Agent 마스터 클래스. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
