/*
 * AI Agent 마스터 클래스 2기 — Landing Page
 * Design: Webflow-inspired Professional System
 * Canvas: #ffffff | Ink: #080808
 * Accents: purple #7a3dff | pink #ed52cb | blue #3b89ff | orange #ff6b00 | green #00d722 | yellow #ffae13
 * Font: Inter 400/500/600 + Noto Sans KR
 * Radius: buttons 4px | cards 8px
 * Elevation: layered 5-stop drop-shadow on featured cards
 * NO background images behind text — clean white canvas layout
 */

import { useEffect, useRef, useState } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────

const CURRICULUM = [
  {
    week: "1주차",
    date: "6/14",
    topic: "보고서와 제안서,\nAI가 초안을 잡아드립니다",
    instructor: "이현구",
    catClass: "cat-purple",
    icon: "📄",
  },
  {
    week: "2주차",
    date: "6/21",
    topic: "리서치에 쏟던 시간을 줄이고,\n인사이트에 집중하세요",
    instructor: "김성식",
    catClass: "cat-blue",
    icon: "🔍",
  },
  {
    week: "3주차",
    date: "6/28",
    topic: "개발자 없이, 내 업무에 딱 맞는\n웹앱을 직접 만드는 법",
    instructor: "홍용기",
    catClass: "cat-orange",
    icon: "💻",
  },
  {
    week: "4주차",
    date: "7/5",
    topic: "강의자료·홍보물·영상,\nAI와 함께라면 혼자서도 충분합니다",
    instructor: "송민경",
    catClass: "cat-pink",
    icon: "🎨",
  },
  {
    week: "5주차",
    date: "7/12",
    topic: "24시간 나를 대신하는\nAI 어시스턴트, 직접 설계하기",
    instructor: "윤성임",
    catClass: "cat-green",
    icon: "🤖",
  },
  {
    week: "6주차",
    date: "7/19",
    topic: "SNS 콘텐츠 고민은 끝.\n기획부터 발행까지 자동화 시스템 구축",
    instructor: "홍진경",
    catClass: "cat-yellow",
    icon: "📱",
  },
];

const OUTCOMES = [
  { icon: "📋", title: "보고서·제안서 자동화", desc: "AI로 업무 문서를 자동 생성하는 시스템 구축", color: "#7a3dff" },
  { icon: "🔬", title: "AI 리서치 시스템", desc: "데이터 분석과 인사이트 도출 자동화", color: "#3b89ff" },
  { icon: "🌐", title: "미니 웹앱 제작", desc: "코딩 없이 나만의 업무 도구 만들기", color: "#ff6b00" },
  { icon: "🎬", title: "콘텐츠 자동화", desc: "이미지·영상·홍보물 AI 제작 파이프라인", color: "#ed52cb" },
  { icon: "💬", title: "맞춤형 챗봇", desc: "내 업무에 특화된 AI 어시스턴트 구축", color: "#00d722" },
  { icon: "📣", title: "SNS 자동화", desc: "콘텐츠 기획부터 발행까지 자동화 시스템", color: "#ffae13" },
];

const INSTRUCTORS = [
  {
    name: "이현구",
    week: "1주차",
    specialty: "AI 업무설계 · 보고서 자동화",
    desc: "AI 기반 기획서·제안서 자동화 전문가. 컨설팅 현장에서 직접 검증한 AI 업무 시스템을 전달합니다.",
    photo: "/manus-storage/face_hyungu_c03e7b17.webp",
    color: "#7a3dff",
  },
  {
    name: "김성식",
    week: "2주차",
    specialty: "AI 리서치 · 데이터 분석",
    desc: "방대한 데이터를 AI로 빠르게 분석하고 인사이트를 도출하는 실전 리서치 전문가입니다.",
    photo: "/manus-storage/face_sungsik_22b97da1.webp",
    color: "#3b89ff",
  },
  {
    name: "홍용기",
    week: "3주차",
    specialty: "노코드 웹앱 · DB 설계",
    desc: "코딩 없이 실무에 바로 쓰는 웹앱을 만드는 노코드 전문가. 앤티그래비티 활용 강의를 담당합니다.",
    photo: "/manus-storage/face_yongki_c6867873.webp",
    color: "#ff6b00",
  },
  {
    name: "송민경",
    week: "4주차",
    specialty: "AI 이미지 · 영상 콘텐츠",
    desc: "AI 아트 작가이자 캔바 지국장. 강의자료·홍보물·영상을 AI로 자동화하는 콘텐츠 전문가입니다.",
    photo: "/manus-storage/face_minkyung_14909d2f.webp",
    color: "#ed52cb",
  },
  {
    name: "윤성임",
    week: "5주차",
    specialty: "맞춤형 챗봇 · AI 어시스턴트",
    desc: "업무 특화 AI 챗봇 설계 전문가. 나만의 AI 어시스턴트를 직접 만들고 바로 활용하는 법을 알려드립니다.",
    photo: "/manus-storage/face_sunglim_df37fdb1.webp",
    color: "#00d722",
  },
  {
    name: "홍진경",
    week: "6주차",
    specialty: "SNS 자동화 · 콘텐츠 시스템",
    desc: "SNS 콘텐츠 기획부터 발행까지 자동화 시스템을 구축하는 디지털 마케팅 전문가입니다.",
    photo: "/manus-storage/face_jinkyung_e034ce81.webp",
    color: "#ffae13",
  },
];

const INCLUDES = [
  "6주 온라인 실시간 강의 (매주 일요일 저녁 8~10시)",
  "6명 현직 전문 강사 직강",
  "강의 녹화본 제공 (복습 가능)",
  "실습 자료 및 템플릿 제공",
  "수강생 전용 커뮤니티 참여",
  "1기 피드백 반영 개선된 커리큘럼",
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function useVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const { ref, visible } = useVisible();
  useEffect(() => {
    if (!visible) return;
    let v = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const t = setInterval(() => {
      v = Math.min(v + step, target);
      setN(v);
      if (v >= target) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [visible, target]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function InstructorsSection() {
  return (
    <section className="band" style={{ backgroundColor: "#f8f8f8" }} id="instructors">
      <div className="container">
        <div style={{ marginBottom: "56px" }}>
          <p className="eyebrow" style={{ marginBottom: "12px" }}>Meet the Instructors</p>
          <h2 className="display-lg">6명의 현직 전문 강사</h2>
          <p style={{ marginTop: "16px", fontSize: "17px", color: "#5a5a5a", maxWidth: "560px", lineHeight: 1.7 }}>
            각 분야 최전선에서 활동 중인 전문가들이 실무에서 검증된 AI 업무 시스템을 직접 전달합니다.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {INSTRUCTORS.map((ins, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.14)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
              }}
            >
              {/* 상단 컬러 바 */}
              <div style={{ height: "4px", backgroundColor: ins.color }} />

              {/* 카드 본문 */}
              <div style={{ padding: "24px" }}>
                {/* 프로필 사진 + 이름 */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      flexShrink: 0,
                      border: `2px solid ${ins.color}`,
                    }}
                  >
                    <img
                      src={ins.photo}
                      alt={ins.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        display: "inline-block",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: ins.color,
                        backgroundColor: `${ins.color}18`,
                        padding: "2px 8px",
                        borderRadius: "4px",
                        marginBottom: "4px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {ins.week}
                    </div>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "#080808", lineHeight: 1.2 }}>
                      {ins.name}
                    </div>
                  </div>
                </div>

                {/* 전문 분야 */}
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: ins.color,
                    marginBottom: "10px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {ins.specialty}
                </div>

                {/* 소개 */}
                <p
                  style={{
                    fontSize: "14px",
                    color: "#5a5a5a",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {ins.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function Nav({ onApply }: { onApply: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "#ffffff",
        borderBottom: `1px solid ${scrolled ? "#d8d8d8" : "transparent"}`,
        transition: "border-color 200ms",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "14px",
          paddingBottom: "14px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontSize: "clamp(13px, 3vw, 15px)",
              fontWeight: 600,
              color: "#080808",
              letterSpacing: "-0.3px",
              whiteSpace: "nowrap",
            }}
          >
            AI Agent 마스터 클래스
          </span>
          <span
            className="badge badge-dark"
            style={{ fontSize: "11px", padding: "3px 8px", flexShrink: 0 }}
          >
            2기
          </span>
        </div>

        {/* CTA */}
        <button
          className="btn-primary"
          onClick={onApply}
          style={{ fontSize: "14px", padding: "10px 16px", flexShrink: 0, width: "auto" }}
        >
          수강 신청 →
        </button>
      </div>
    </nav>
  );
}

function TickerBanner() {
  const items = [
    "⚡ 2기 특별가 250,000원",
    "📅 2026년 6월 14일 개강",
    "🕗 매주 일요일 저녁 8~10시",
    "👥 비개발자 전문가 대상",
    "🎓 6주 온라인 실시간",
    "✅ 정가 50만원 → 2기 특별가 25만원",
  ];
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        backgroundColor: "#080808",
        overflow: "hidden",
        paddingTop: "10px",
        paddingBottom: "10px",
        marginTop: "57px",
      }}
    >
      <div
        className="ticker-track"
        style={{
          display: "flex",
          gap: "48px",
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: 500,
              whiteSpace: "nowrap",
              opacity: 0.85,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function HeroSection({ onApply }: { onApply: () => void }) {
  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        paddingTop: "clamp(60px, 8vw, 96px)",
        paddingBottom: "clamp(60px, 8vw, 96px)",
      }}
    >
      <div className="container">
        <div style={{ maxWidth: "800px" }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <span className="badge badge-info">2기 모집 중</span>
            <span className="badge badge-soft">2026.06.14 개강</span>
          </div>

          {/* Headline */}
          <h1
            className="display-xxl fade-up"
            style={{ marginBottom: "24px", whiteSpace: "pre-line" }}
          >
            AI 도구 사용법이 아닌,{"\n"}
            <span style={{ color: "#7a3dff" }}>내 업무에 바로 쓰는</span>{"\n"}
            AI 업무 시스템을 만드는{"\n"}
            6주 실전 과정
          </h1>

          {/* Sub-copy */}
          <p
            className="body-lg fade-up fade-up-d1"
            style={{ marginBottom: "40px", maxWidth: "620px" }}
          >
            보고서, 리서치, 웹앱, 콘텐츠, 챗봇, SNS 자동화까지{"\n"}
            <strong style={{ color: "#080808", fontWeight: 600 }}>비개발자 전문가</strong>가 실제 업무 산출물을 만드는 과정입니다.
          </p>

          {/* CTA row */}
          <div
            className="fade-up fade-up-d2"
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px", marginBottom: "48px" }}
          >
            <button className="btn-primary" onClick={onApply} style={{ fontSize: "16px", padding: "14px 28px" }}>
              지금 신청하기 →
            </button>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
              <span
                style={{
                  fontSize: "16px",
                  color: "#898989",
                  textDecoration: "line-through",
                  fontWeight: 500,
                }}
              >
                500,000원
              </span>
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 600,
                  color: "#080808",
                  letterSpacing: "-0.5px",
                }}
              >
                250,000원
              </span>
              <span
                className="badge badge-orange"
                style={{ fontSize: "12px" }}
              >
                50% OFF
              </span>
            </div>
          </div>

          {/* Info pills */}
          <div
            className="fade-up fade-up-d3"
            style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
          >
            {[
              { label: "운영 요일", val: "매주 일요일" },
              { label: "시간", val: "저녁 8~10시" },
              { label: "기간", val: "6주" },
              { label: "방식", val: "온라인 실시간" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "12px 16px",
                  border: "1px solid #d8d8d8",
                  borderRadius: "8px",
                  minWidth: "100px",
                }}
              >
                <span style={{ fontSize: "11px", color: "#898989", fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "2px" }}>
                  {item.label}
                </span>
                <span style={{ fontSize: "15px", fontWeight: 600, color: "#080808" }}>
                  {item.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section style={{ backgroundColor: "#f5f5f5", borderTop: "1px solid #d8d8d8", borderBottom: "1px solid #d8d8d8" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "0",
          }}
        >
          {[
            { num: 6, suffix: "주", label: "집중 커리큘럼" },
            { num: 6, suffix: "명", label: "현직 전문 강사" },
            { num: 50, suffix: "%", label: "2기 특별 할인" },
            { num: 12, suffix: "H", label: "총 강의 시간" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: "40px 24px",
                borderRight: i < 3 ? "1px solid #d8d8d8" : "none",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 600,
                  color: "#080808",
                  letterSpacing: "-1px",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                <CountUp target={s.num} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: "14px", color: "#5a5a5a", fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TargetSection() {
  const { ref, visible } = useVisible();
  return (
    <section className="band" style={{ backgroundColor: "#ffffff" }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <p className="eyebrow" style={{ marginBottom: "12px" }}>Who is this for</p>
          <h2 className="display-lg" style={{ marginBottom: "16px" }}>
            이런 분들을 위한 과정입니다
          </h2>
          <p className="body-lg" style={{ maxWidth: "560px" }}>
            비개발자 전문가가 AI를 실무에 바로 적용할 수 있도록 설계된 실전 과정입니다.
          </p>
        </div>

        {/* Target grid */}
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          {[
            { icon: "💼", label: "경영컨설턴트", desc: "보고서·제안서 자동화", color: "#7a3dff" },
            { icon: "🎤", label: "강사·코치",    desc: "강의 콘텐츠 자동화",   color: "#ed52cb" },
            { icon: "👤", label: "1인 전문가",   desc: "업무 시스템 구축",     color: "#3b89ff" },
            { icon: "🤖", label: "AI 고관여자",  desc: "심화 활용 역량 강화",  color: "#ff6b00" },
          ].map((t, i) => (
            <div
              key={i}
              className="card-feature"
              style={{
                opacity: 1,
                transform: "translateY(0)",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "9999px",
                  backgroundColor: t.color + "18",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  marginBottom: "20px",
                  flexShrink: 0,
                }}
              >
                {t.icon}
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#080808", marginBottom: "6px" }}>
                {t.label}
              </h3>
              <p style={{ fontSize: "14px", color: "#5a5a5a" }}>{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Key message */}
        <div
          style={{
            backgroundColor: "#080808",
            borderRadius: "8px",
            padding: "48px",
          }}
        >
          <p
            style={{
              fontSize: "clamp(16px, 2.5vw, 22px)",
              fontWeight: 400,
              color: "#ffffff",
              lineHeight: 1.8,
              maxWidth: "720px",
            }}
          >
            "AI 도구 사용법을 배우는 과정이 아닙니다.{" "}
            보고서, 리서치, 웹앱, 콘텐츠, 챗봇, SNS 자동화까지{" "}
            <strong style={{ color: "#7a3dff", fontWeight: 600 }}>
              내 업무에 바로 쓰는 AI 업무 시스템을 만드는 6주 과정입니다.
            </strong>"
          </p>
        </div>
      </div>
    </section>
  );
}

function OutcomesSection() {
  const { ref, visible } = useVisible();
  return (
    <section className="band" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="container">
        <div style={{ marginBottom: "56px" }}>
          <p className="eyebrow" style={{ marginBottom: "12px" }}>What you'll build</p>
          <h2 className="display-lg">6주 후 당신이 갖게 될 것들</h2>
        </div>
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {OUTCOMES.map((item, i) => (
            <div
              key={i}
              className="card-feature"
              style={{
                opacity: 1,
                transform: "translateY(0)",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "9999px",
                  backgroundColor: item.color + "20",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  marginBottom: "16px",
                }}
              >
                {item.icon}
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#080808", marginBottom: "8px" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#5a5a5a", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CurriculumSection() {
  const { ref, visible } = useVisible();
  return (
    <section className="band" style={{ backgroundColor: "#ffffff" }}>
      <div className="container">
        <div style={{ marginBottom: "56px" }}>
          <p className="eyebrow" style={{ marginBottom: "12px" }}>6-Week Curriculum</p>
          <h2 className="display-lg" style={{ marginBottom: "12px" }}>6주 커리큘럼</h2>
          <p className="body-md" style={{ color: "#5a5a5a" }}>
            매주 일요일 저녁 8시 ~ 10시 · 온라인 실시간
          </p>
        </div>

        <div
          ref={ref}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          {CURRICULUM.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "stretch",
                gap: "0",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #d8d8d8",
                opacity: 1,
                boxShadow: "0 3px 7px rgba(0,0,0,0.06), 0 13px 13px rgba(0,0,0,0.04)",
              }}
            >
              {/* Color accent bar */}
              <div
                className={item.catClass}
                style={{
                  minWidth: "96px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px 16px",
                  borderRadius: "0",
                  gap: "4px",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: "20px" }}>{item.icon}</span>
                <span style={{ fontSize: "13px", fontWeight: 600, opacity: 0.9 }}>{item.week}</span>
                <span style={{ fontSize: "18px", fontWeight: 700, lineHeight: 1 }}>{item.date}</span>
              </div>

              {/* Content */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 24px",
                  backgroundColor: "#ffffff",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <h3
                  style={{
                    fontSize: "clamp(14px, 2vw, 16px)",
                    fontWeight: 600,
                    color: "#080808",
                    lineHeight: 1.5,
                    whiteSpace: "pre-line",
                    flex: 1,
                    minWidth: "200px",
                  }}
                >
                  {item.topic}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#5a5a5a",
                      fontWeight: 500,
                    }}
                  >
                    강사
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#080808",
                      backgroundColor: "#f5f5f5",
                      padding: "4px 12px",
                      borderRadius: "4px",
                      border: "1px solid #d8d8d8",
                    }}
                  >
                    {item.instructor}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="apply" className="band" style={{ backgroundColor: "#080808" }}>
      <div className="container">
        <div style={{ marginBottom: "56px" }}>
          <p className="eyebrow" style={{ marginBottom: "12px", color: "#898989" }}>Pricing</p>
          <h2 className="display-lg" style={{ color: "#ffffff" }}>수강료 안내</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* Price card */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "40px",
              boxShadow: "0 24px 24px rgba(0,0,0,0.26), 0 6px 13px rgba(0,0,0,0.29)",
            }}
          >
            <div style={{ marginBottom: "8px" }}>
              <span className="badge badge-orange" style={{ marginBottom: "16px", display: "inline-block" }}>
                2기 특별 모집가
              </span>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  fontSize: "15px",
                  color: "#898989",
                  textDecoration: "line-through",
                  fontWeight: 500,
                  marginBottom: "6px",
                }}
              >
                정가 500,000원
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(40px, 6vw, 56px)",
                    fontWeight: 600,
                    color: "#080808",
                    letterSpacing: "-1px",
                    lineHeight: 1,
                  }}
                >
                  250,000
                </span>
                <span style={{ fontSize: "20px", fontWeight: 500, color: "#363636" }}>원</span>
                <span
                  style={{
                    backgroundColor: "#ff6b00",
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: "4px",
                  }}
                >
                  50% OFF
                </span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#f5f5f5",
                borderRadius: "6px",
                padding: "16px",
                marginBottom: "28px",
                fontSize: "14px",
                color: "#5a5a5a",
                lineHeight: 1.7,
              }}
            >
              2기 과정은 커리큘럼 고도화 및 수강생 피드백 반영 과정으로 특별가 적용
            </div>

            <button
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "16px", fontSize: "16px" }}
            >
              2기 수강 신청하기 →
            </button>
          </div>

          {/* Includes list */}
          <div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: "24px",
              }}
            >
              포함 내용
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {INCLUDES.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "16px",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <span
                    style={{
                      color: "#00d722",
                      fontSize: "16px",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  >
                    ✓
                  </span>
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function CtaSection({ onApply }: { onApply: () => void }) {
  return (
    <section
      className="band"
      style={{
        background: "linear-gradient(135deg, #7a3dff 0%, #3b89ff 100%)",
      }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        <span
          className="badge"
          style={{
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "#ffffff",
            marginBottom: "24px",
            display: "inline-block",
            fontSize: "13px",
          }}
        >
          ⚡ 홍보 시작: 2026년 5월 30일
        </span>

        <h2
          className="display-xl"
          style={{
            color: "#ffffff",
            marginBottom: "20px",
            maxWidth: "600px",
            margin: "0 auto 20px",
          }}
        >
          지금 신청하고{"\n"}
          2기 특별가를 놓치지 마세요
        </h2>

        <p
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.7,
            marginBottom: "40px",
            maxWidth: "500px",
            margin: "0 auto 40px",
          }}
        >
          비개발자 전문가를 위한 AI 업무자동화 실전 과정<br />
          <strong style={{ color: "#ffffff" }}>2026년 6월 14일 개강</strong>
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            className="btn-primary"
            onClick={onApply}
            style={{
              backgroundColor: "#ffffff",
              color: "#080808",
              padding: "16px 36px",
              fontSize: "16px",
            }}
          >
            수강 신청하기 →
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "rgba(255,255,255,0.9)",
              fontSize: "15px",
            }}
          >
            <span>📅</span>
            <span style={{ fontWeight: 600 }}>2026.06.14 SUN 개강</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: "#ffffff", borderTop: "1px solid #d8d8d8" }}>
      <div
        className="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          paddingTop: "32px",
          paddingBottom: "32px",
        }}
      >
        <div>
          <div style={{ fontSize: "15px", fontWeight: 600, color: "#080808", marginBottom: "4px" }}>
            AI Agent 마스터 클래스 2기
          </div>
          <div style={{ fontSize: "13px", color: "#898989" }}>
            비개발자 전문가를 위한 AI 업무자동화 실전 과정
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#080808", marginBottom: "2px" }}>
            2026.06.14 개강
          </div>
          <div style={{ fontSize: "13px", color: "#898989" }}>
            매주 일요일 저녁 8시 ~ 10시
          </div>
        </div>
      </div>
      <div
        className="container"
        style={{
          borderTop: "1px solid #d8d8d8",
          paddingTop: "20px",
          paddingBottom: "20px",
          fontSize: "12px",
          color: "#ababab",
          textAlign: "center",
        }}
      >
        © 2026 AI Agent 마스터 클래스. All rights reserved.
      </div>
    </footer>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function Home() {
  const handleApply = () => {
    const el = document.getElementById("apply");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ backgroundColor: "#ffffff", fontFamily: "'Inter', 'Noto Sans KR', sans-serif" }}>
      <Nav onApply={handleApply} />
      <TickerBanner />
      <HeroSection onApply={handleApply} />
      <hr className="divider" />
      <StatsSection />
      <hr className="divider" />
      <TargetSection />
      <hr className="divider" />
      <OutcomesSection />
      <hr className="divider" />
      <CurriculumSection />
      <hr className="divider" />
      <InstructorsSection />
      <PricingSection />
      <CtaSection onApply={handleApply} />
      <Footer />
    </div>
  );
}
