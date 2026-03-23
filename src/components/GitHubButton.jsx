import { useState } from "react";

export default function GitHubButton() {
  const [hov, setHov] = useState(false);

  return (
    <a
      href="https://github.com/felipe2727"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Label */}
      <span style={{
        fontFamily: "var(--f-mono)",
        fontSize: 9,
        letterSpacing: "0.14em",
        color: hov ? "var(--ink)" : "var(--muted)",
        transition: "color 0.3s ease",
      }}>
        VIEW ON GITHUB
      </span>

      {/* Dotted border ring */}
      <div style={{
        border: "1px dotted",
        borderColor: hov ? "var(--red)" : "var(--border)",
        borderRadius: "50%",
        padding: 4,
        transition: "border-color 0.4s ease",
      }}>
        {/* Main circle */}
        <div style={{
          position: "relative",
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: "var(--red)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.4s cubic-bezier(.16,1,.3,1)",
          transform: hov ? "scale(1.08)" : "scale(1)",
        }}>
          {/* Center arrow circle */}
          <div style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}>
            {/* Arrow 1 — exits top-right on hover */}
            <svg
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                width: 12,
                height: 12,
                transition: "transform 0.3s ease",
                transform: hov ? "translate(150%, -150%)" : "translate(0, 0)",
                color: "var(--red)",
              }}
            >
              <path
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                fill="currentColor"
              />
            </svg>
            {/* Arrow 2 — enters from bottom-left on hover */}
            <svg
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                width: 12,
                height: 12,
                transition: "transform 0.3s ease 0.08s",
                transform: hov ? "translate(0, 0)" : "translate(-150%, 150%)",
                color: "var(--red)",
              }}
            >
              <path
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}
