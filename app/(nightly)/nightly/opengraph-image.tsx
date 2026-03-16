import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "nteract Nightly — after dark builds";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Stars scattered across the image
const stars = [
  { x: 120, y: 50, size: 4, opacity: 0.85 },
  { x: 300, y: 95, size: 3, opacity: 0.55 },
  { x: 480, y: 32, size: 2, opacity: 0.45 },
  { x: 660, y: 76, size: 3.5, opacity: 0.6 },
  { x: 840, y: 50, size: 2.5, opacity: 0.5 },
  { x: 1020, y: 113, size: 4, opacity: 0.75 },
  { x: 1104, y: 63, size: 3, opacity: 0.55 },
  { x: 180, y: 221, size: 2.5, opacity: 0.5 },
  { x: 360, y: 265, size: 3.5, opacity: 0.62 },
  { x: 936, y: 240, size: 3, opacity: 0.58 },
  { x: 1056, y: 284, size: 4, opacity: 0.72 },
  { x: 96, y: 410, size: 3.5, opacity: 0.6 },
  { x: 264, y: 454, size: 2.5, opacity: 0.5 },
  { x: 540, y: 429, size: 3, opacity: 0.56 },
  { x: 900, y: 441, size: 2, opacity: 0.4 },
  { x: 1080, y: 391, size: 4, opacity: 0.7 },
  { x: 420, y: 555, size: 3, opacity: 0.55 },
  { x: 720, y: 580, size: 4, opacity: 0.7 },
  { x: 984, y: 536, size: 2.5, opacity: 0.48 },
  { x: 60, y: 540, size: 2, opacity: 0.42 },
  { x: 150, y: 130, size: 2, opacity: 0.38 },
  { x: 750, y: 170, size: 3, opacity: 0.52 },
  { x: 50, y: 300, size: 2.5, opacity: 0.44 },
  { x: 1140, y: 480, size: 2, opacity: 0.4 },
];

// Firefly-like glowing dots
const fireflies = [
  { x: 160, y: 180, size: 6, opacity: 0.7 },
  { x: 1050, y: 350, size: 8, opacity: 0.6 },
  { x: 380, y: 520, size: 5, opacity: 0.5 },
  { x: 850, y: 130, size: 7, opacity: 0.55 },
  { x: 620, y: 560, size: 6, opacity: 0.45 },
];

export default function NightlyOGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#050a1a",
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse at 50% 30%, #141f52 0%, #0a1238 50%, #050a1a 100%)",
          }}
        />

        {/* Bottom wave - dark blue */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40px",
            display: "flex",
          }}
        >
          <svg
            width="1200"
            height="40"
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
            style={{ display: "flex" }}
          >
            <path
              d="M0 20 Q 75 0, 150 20 T 300 20 T 450 20 T 600 20 T 750 20 T 900 20 T 1050 20 T 1200 20 V 40 H 0 Z"
              fill="#1e3a5f"
            />
          </svg>
        </div>

        {/* Stars */}
        {stars.map((star, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              backgroundColor: "white",
              opacity: star.opacity,
              display: "flex",
            }}
          />
        ))}

        {/* 4-pointed sparkles */}
        <div
          style={{
            position: "absolute",
            left: 200,
            top: 160,
            display: "flex",
          }}
        >
          <svg width="20" height="20" viewBox="-8 -8 16 16" fill="white" fillOpacity={0.7}>
            <path d="M0 -6L1.5 -1.5L6 0L1.5 1.5L0 6L-1.5 1.5L-6 0L-1.5 -1.5Z" />
          </svg>
        </div>
        <div
          style={{
            position: "absolute",
            left: 920,
            top: 310,
            display: "flex",
          }}
        >
          <svg width="28" height="28" viewBox="-8 -8 16 16" fill="white" fillOpacity={0.75}>
            <path d="M0 -6L1.5 -1.5L6 0L1.5 1.5L0 6L-1.5 1.5L-6 0L-1.5 -1.5Z" />
          </svg>
        </div>
        <div
          style={{
            position: "absolute",
            left: 540,
            top: 490,
            display: "flex",
          }}
        >
          <svg width="16" height="16" viewBox="-8 -8 16 16" fill="white" fillOpacity={0.6}>
            <path d="M0 -6L1.5 -1.5L6 0L1.5 1.5L0 6L-1.5 1.5L-6 0L-1.5 -1.5Z" />
          </svg>
        </div>

        {/* Firefly glows */}
        {fireflies.map((fly, i) => (
          <div
            key={`ff-${i}`}
            style={{
              position: "absolute",
              left: fly.x - fly.size,
              top: fly.y - fly.size,
              width: fly.size * 2,
              height: fly.size * 2,
              borderRadius: "50%",
              backgroundColor: "#a3e635",
              opacity: fly.opacity,
              display: "flex",
              boxShadow: `0 0 ${fly.size * 3}px ${fly.size}px rgba(163, 230, 53, 0.4)`,
            }}
          />
        ))}

        {/* Logo - same as main OG card, soft gray palette, rotated, hanging off bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "15px",
            left: "-80px",
            display: "flex",
            transform: "rotate(-12deg)",
          }}
        >
          <svg
            width="580"
            height="580"
            viewBox="0 0 1024 1024"
            fill="none"
          >
            <path
              d="M359.251 58.667V975.167M206.501 58.667H766.584C793.592 58.667 819.494 69.3958 838.591 88.4933C857.688 107.591 868.417 133.492 868.417 160.5V771.5C868.417 798.508 857.688 824.41 838.591 843.507C819.494 862.605 793.592 873.334 766.584 873.334H206.501C192.997 873.334 180.046 867.969 170.497 858.421C160.948 848.872 155.584 835.921 155.584 822.417V109.584C155.584 96.0797 160.948 83.1289 170.497 73.5801C180.046 64.0314 192.997 58.667 206.501 58.667Z"
              stroke="#4a5a7a"
              strokeWidth="64"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M504 666C504 684.91 507.725 703.636 514.961 721.106C522.198 738.577 532.805 754.452 546.177 767.823C559.548 781.195 575.423 791.802 592.894 799.039C610.364 806.275 629.09 810 648 810C666.91 810 685.636 806.275 703.106 799.039C720.577 791.802 736.452 781.195 749.823 767.823C763.195 754.452 773.802 738.577 781.039 721.106C788.275 703.636 792 684.91 792 666C792 647.09 788.275 628.364 781.039 610.894C773.802 593.423 763.195 577.548 749.823 564.177C736.452 550.805 720.577 540.198 703.106 532.961C685.636 525.725 666.91 522 648 522C629.09 522 610.364 525.725 592.894 532.961C575.423 540.198 559.548 550.805 546.177 564.177C532.805 577.548 522.198 593.423 514.961 610.894C507.725 628.364 504 647.09 504 666Z"
              stroke="#4a5a7a"
              strokeWidth="36"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M671.521 808.112L648.001 714C605.617 712.592 568.001 688.016 568.001 658C568.001 627.072 603.825 602 648.001 602C692.177 602 712.001 618 728.001 650C728.385 650.768 739.041 685.44 760.001 754"
              stroke="#4a5a7a"
              strokeWidth="36"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M648 650H648.158"
              stroke="#4a5a7a"
              strokeWidth="36"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M648 234H536C527.513 234 519.374 237.371 513.373 243.373C507.371 249.374 504 257.513 504 266V330C504 338.487 507.371 346.626 513.373 352.627C519.374 358.629 527.513 362 536 362H584"
              stroke="#4a5a7a"
              strokeWidth="36"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M648 330H760C768.487 330 776.626 326.629 782.627 320.627C788.629 314.626 792 306.487 792 298V234C792 225.513 788.629 217.374 782.627 211.373C776.626 205.371 768.487 202 760 202H712"
              stroke="#4a5a7a"
              strokeWidth="36"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M583.999 234V170C583.999 161.513 587.37 153.374 593.372 147.373C599.373 141.371 607.512 138 615.999 138H679.999C688.486 138 696.625 141.371 702.626 147.373C708.628 153.374 711.999 161.513 711.999 170V250C711.999 258.487 708.628 266.626 702.626 272.627C696.625 278.629 688.486 282 679.999 282H615.999C607.512 282 599.373 285.371 593.372 291.373C587.37 297.374 583.999 305.513 583.999 314V394C583.999 402.487 587.37 410.626 593.372 416.627C599.373 422.629 607.512 426 615.999 426H679.999C688.486 426 696.625 422.629 702.626 416.627C708.628 410.626 711.999 402.487 711.999 394V330"
              stroke="#4a5a7a"
              strokeWidth="36"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M632 186V186.157"
              stroke="#4a5a7a"
              strokeWidth="36"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M664 378V378.157"
              stroke="#4a5a7a"
              strokeWidth="36"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Text stack - positioned to the right */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "8px",
            marginLeft: "416px",
            padding: "60px 80px",
          }}
        >
          {/* Subtitle */}
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              color: "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
              letterSpacing: "6px",
              fontWeight: 500,
            }}
          >
            after dark
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              fontSize: "120px",
              fontWeight: "bold",
              color: "white",
              lineHeight: 1,
            }}
          >
            nteract
          </div>

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "36px",
              marginTop: "12px",
              lineHeight: 1.3,
            }}
          >
            <span>
              <span style={{ color: "#a3e635" }}>Fresh bugs</span>
              <span style={{ color: "rgba(255,255,255,0.3)", padding: "0 12px" }}>·</span>
              <span style={{ color: "#7DB5AC" }}>Served daily</span>
            </span>
            <span style={{ color: "#B5A3C0" }}>Developers welcome</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
