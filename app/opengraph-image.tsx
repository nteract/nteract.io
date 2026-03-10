import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "nteract — native interactive notebooks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Tangerine accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            display: "flex",
            backgroundColor: "#2DD4BF",
          }}
        />

        {/* Logo - stylized corner, rotated, hanging off bottom-left */}
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
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="clip1">
                <rect x="-8" y="59" width="876" height="876" rx="128" />
              </clipPath>
            </defs>
            <g clipPath="url(#clip1)">
              <rect x="-8" y="59" width="438" height="438" fill="#73FCCE" />
              <rect x="430" y="497" width="438" height="438" fill="#FCFA73" />
              <rect x="430" y="59" width="438" height="438" fill="#73C9FC" />
              <rect x="-8" y="497" width="438" height="438" fill="#D573FC" />
            </g>
            <path
              d="M359.251 58.667V975.167M206.501 58.667H766.584C793.592 58.667 819.494 69.3958 838.591 88.4933C857.688 107.591 868.417 133.492 868.417 160.5V771.5C868.417 798.508 857.688 824.41 838.591 843.507C819.494 862.605 793.592 873.334 766.584 873.334H206.501C192.997 873.334 180.046 867.969 170.497 858.421C160.948 848.872 155.584 835.921 155.584 822.417V109.584C155.584 96.0797 160.948 83.1289 170.497 73.5801C180.046 64.0314 192.997 58.667 206.501 58.667Z"
              stroke="black"
              strokeWidth="64"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M504 666C504 684.91 507.725 703.636 514.961 721.106C522.198 738.577 532.805 754.452 546.177 767.823C559.548 781.195 575.423 791.802 592.894 799.039C610.364 806.275 629.09 810 648 810C666.91 810 685.636 806.275 703.106 799.039C720.577 791.802 736.452 781.195 749.823 767.823C763.195 754.452 773.802 738.577 781.039 721.106C788.275 703.636 792 684.91 792 666C792 647.09 788.275 628.364 781.039 610.894C773.802 593.423 763.195 577.548 749.823 564.177C736.452 550.805 720.577 540.198 703.106 532.961C685.636 525.725 666.91 522 648 522C629.09 522 610.364 525.725 592.894 532.961C575.423 540.198 559.548 550.805 546.177 564.177C532.805 577.548 522.198 593.423 514.961 610.894C507.725 628.364 504 647.09 504 666Z"
              stroke="black"
              strokeWidth="36"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M671.521 808.112L648.001 714C605.617 712.592 568.001 688.016 568.001 658C568.001 627.072 603.825 602 648.001 602C692.177 602 712.001 618 728.001 650C728.385 650.768 739.041 685.44 760.001 754"
              stroke="black"
              strokeWidth="36"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M648 650H648.158"
              stroke="black"
              strokeWidth="36"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M648 234H536C527.513 234 519.374 237.371 513.373 243.373C507.371 249.374 504 257.513 504 266V330C504 338.487 507.371 346.626 513.373 352.627C519.374 358.629 527.513 362 536 362H584"
              stroke="black"
              strokeWidth="36"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M648 330H760C768.487 330 776.626 326.629 782.627 320.627C788.629 314.626 792 306.487 792 298V234C792 225.513 788.629 217.374 782.627 211.373C776.626 205.371 768.487 202 760 202H712"
              stroke="black"
              strokeWidth="36"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M583.999 234V170C583.999 161.513 587.37 153.374 593.372 147.373C599.373 141.371 607.512 138 615.999 138H679.999C688.486 138 696.625 141.371 702.626 147.373C708.628 153.374 711.999 161.513 711.999 170V250C711.999 258.487 708.628 266.626 702.626 272.627C696.625 278.629 688.486 282 679.999 282H615.999C607.512 282 599.373 285.371 593.372 291.373C587.37 297.374 583.999 305.513 583.999 314V394C583.999 402.487 587.37 410.626 593.372 416.627C599.373 422.629 607.512 426 615.999 426H679.999C688.486 426 696.625 422.629 702.626 416.627C708.628 410.626 711.999 402.487 711.999 394V330"
              stroke="black"
              strokeWidth="36"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M632 186V186.157"
              stroke="black"
              strokeWidth="36"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M664 378V378.157"
              stroke="black"
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
              color: "#9ca3af",
              textTransform: "uppercase",
              letterSpacing: "6px",
              fontWeight: 500,
            }}
          >
            native interactive notebooks
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              fontSize: "120px",
              fontWeight: "bold",
              color: "#111827",
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
              color: "#6b7280",
              marginTop: "12px",
              lineHeight: 1.3,
            }}
          >
            <span>
              <span style={{ color: "#7DB5AC" }}>Fast to launch</span>
              <span style={{ color: "#9ca3af", padding: "0 12px" }}>·</span>
              <span style={{ color: "#C4A3A3" }}>Agent ready</span>
            </span>
            <span style={{ color: "#B5A3C0" }}>Humans welcome</span>
          </div>

          {/* Call to action */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "32px",
              fontSize: "28px",
              fontWeight: 600,
              color: "#2DD4BF",
            }}
          >
            Download Now →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
