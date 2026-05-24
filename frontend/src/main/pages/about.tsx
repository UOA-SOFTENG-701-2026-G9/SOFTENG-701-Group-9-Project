import learnImg from "../../resources/assets/images/Learn.png"
import practiceImg from "../../resources/assets/images/Practice.png"
import castImg from "../../resources/assets/images/Meet Our Cast.png"


// Load Holtwood One SC from Google Fonts
const fontLink = document.createElement("link")
fontLink.href = "https://fonts.googleapis.com/css2?family=Holtwood+One+SC&display=swap"
fontLink.rel = "stylesheet"
document.head.appendChild(fontLink)

const HEADING_FONT = "'Holtwood One SC', serif"
const teamNames = "Henry, Will, Amir, Alex, Toma, Moksh, Thomas"

export default function About() {
  return (
    <div style={{ background: "#F5F0E8", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>

      {/* ── HERO HEADER ── */}
      <section style={{
        background: "linear-gradient(180deg, #0F6E56 0%, #1a8a6a 100%)",
        padding: "60px 5vw 48px",
        textAlign: "center",
      }}>
        <h1 style={{
          fontSize: "clamp(48px, 8vw, 80px)",
          fontWeight: 400,
          color: "#ffffff",
          margin: "0 0 16px",
          fontFamily: HEADING_FONT,
        }}>
          701 T9
        </h1>
        <p style={{
          fontSize: "clamp(14px, 2vw, 18px)",
          color: "rgba(255,255,255,0.85)",
          margin: 0,
          fontWeight: 500,
        }}>
          {teamNames}
        </p>
      </section>

      {/* ── AMBER ACCENT BAR ── */}
      <div style={{ height: 14, background: "#E8A020" }} />

      {/* ── LEARN & PRACTICE CARDS ── */}
      <section style={{ padding: "56px 5vw", display: "flex", flexDirection: "column", gap: 24, maxWidth: 820, margin: "0 auto" }}>

        {/* Learn card */}
        <div style={{
          background: "#ffffff",
          borderRadius: 20,
          padding: "32px 36px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          display: "flex",
          alignItems: "center",
          gap: 28,
        }}>
          <img src={learnImg} alt="Learn" style={{ width: 110, height: "auto", flexShrink: 0, objectFit: "contain" }} />
          <div>
            <h2 style={{
              fontSize: 28, fontWeight: 400, color: "#2d5a1b",
              margin: "0 0 14px", fontFamily: HEADING_FONT,
            }}>Learn</h2>
            <ul style={{ margin: 0, padding: "0 0 0 18px", color: "#2d5a1b", fontSize: 15, lineHeight: 2 }}>
              <li>Know when your cyber safety is in trouble</li>
              <li>Be able to handle cyber safety attacks</li>
              <li>Be able to prevent cyber attacks and stop future ones</li>
            </ul>
          </div>
        </div>

        {/* Practice card */}
        <div style={{
          background: "#ffffff",
          borderRadius: 20,
          padding: "32px 36px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 28,
        }}>
          <p style={{
            fontSize: 15, color: "#3a3a3a", lineHeight: 1.75,
            margin: 0, maxWidth: 420, textAlign: "center", flex: 1,
          }}>
            Jump into fun stories and mini-games to practise staying safe online! Each module is a mini-adventure that teaches you one cool cyber safety skill.
          </p>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <h2 style={{
              fontSize: 28, fontWeight: 400, color: "#2d5a1b",
              margin: "0 0 14px", fontFamily: HEADING_FONT,
              textAlign: "right",
            }}>Practice</h2>
            <img src={practiceImg} alt="Practice" style={{ width: 100, height: "auto", objectFit: "contain" }} />
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 5vw" }}>
        <div style={{ height: 2, background: "#3B6D11", borderRadius: 2 }} />
      </div>

      {/* ── MEET OUR CAST ── */}
      <section style={{ padding: "56px 5vw", maxWidth: 820, margin: "0 auto" }}>
        <div style={{
          background: "#ffffff",
          borderRadius: 20,
          padding: "36px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        }}>
          <h2 style={{
            fontSize: 32, fontWeight: 400, color: "#2d5a1b",
            margin: "0 0 28px", fontFamily: HEADING_FONT,
            textAlign: "center",
          }}>Meet Our Cast</h2>
          <img
            src={castImg}
            alt="Meet our cast — Tāne, Āroha, Kōro, Ruru"
            style={{ width: "100%", height: "auto", borderRadius: 12, display: "block" }}
          />
        </div>
      </section>

    </div>
  )
}