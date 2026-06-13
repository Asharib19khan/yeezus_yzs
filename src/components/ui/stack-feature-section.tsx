"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FaReact, FaAws, FaDocker, FaNodeJs, FaGithub,
  FaTwitter, FaLinkedin, FaInstagram, FaGoogle, FaApple
} from "react-icons/fa";
import {
  SiNextdotjs, SiVercel, SiRedux, SiTypescript, SiFacebook
} from "react-icons/si";

const fallbackUrls = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/96/Among_Us_icon.png"
];

const iconConfigs = [
  { Icon: FaReact, color: "#61DAFB" },
  { Icon: FaAws, color: "#FF9900" },
  { Icon: FaDocker, color: "#2496ED" },
  { Icon: FaNodeJs, color: "#339933" },
  { Icon: SiNextdotjs, color: "#000000" },
  { Icon: SiVercel, color: "#000000" },
  { Icon: SiRedux, color: "#764ABC" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: FaGithub, color: "#181717" },
  { Icon: FaTwitter, color: "#1DA1F2" },
  { Icon: FaLinkedin, color: "#0077B5" },
  { Icon: FaInstagram, color: "#E1306C" },
  { Icon: FaGoogle, color: "#DB4437" },
  { Icon: FaApple, color: "#000000" },
  { Icon: SiFacebook, color: "#1877F2" },
  { Icon: null, img: fallbackUrls[0] },
  { Icon: null, img: fallbackUrls[1] },
];

export default function FeatureSection() {
  const orbitCount = 3;
  const orbitGap = 4; // rem between orbits (reduced for bento grid)
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-transparent">
      <div className="absolute inset-0 flex items-center justify-center opacity-30 md:opacity-50">
        <div className="relative w-[30rem] h-[30rem] flex items-center justify-center">
          {/* Center Circle */}
          <div className="w-12 h-12 rounded-full bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center backdrop-blur-md border border-white/10 z-10">
            <FaReact className="w-6 h-6 text-white" />
          </div>

          {/* Generate Orbits */}
          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${8 + orbitGap * (orbitIdx + 1)}rem`;
            const angleStep = (2 * Math.PI) / iconsPerOrbit;

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border border-dashed border-white/10"
                style={{
                  width: size,
                  height: size,
                  animation: `spin ${12 + orbitIdx * 6}s linear infinite`,
                }}
              >
                {iconConfigs
                  .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                  .map((cfg, iconIdx) => {
                    const angle = iconIdx * angleStep;
                    const x = (50 + 50 * Math.cos(angle)).toFixed(4);
                    const y = (50 + 50 * Math.sin(angle)).toFixed(4);

                    return (
                      <div
                        key={iconIdx}
                        className="absolute bg-white/5 rounded-full p-1.5 shadow-[0_0_10px_rgba(255,255,255,0.05)] border border-white/10 backdrop-blur-sm"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {cfg.Icon ? (
                          <cfg.Icon className="w-4 h-4" style={{ color: cfg.color }} />
                        ) : (
                          <img
                            src={cfg.img}
                            alt="icon"
                            className="w-4 h-4 object-contain"
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
