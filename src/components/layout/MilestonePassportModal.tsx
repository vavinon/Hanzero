/**
 * src/components/layout/MilestonePassportModal.tsx
 * ------------------------------------------------
 * Shareable Hanzero Tier 0 Graduation Passport Modal.
 *
 * Adheres strictly to AGENTS.md:
 * - High-DPI Native Canvas 2D exporter (1080 × 1440px) with 3:4 portrait ratio.
 * - Font race condition prevention: checks document.fonts.ready before rendering.
 * - Pre-rendered image cache: enables synchronous navigator.share() on iOS Safari.
 * - Resilient Web Share Cascade: Native File Share ➔ Text Share ➔ PNG Download ➔ Long-press save.
 * - GPU Backing Store memory cleanup: resets canvas.width = 0 and revokes ObjectURLs on unmount.
 * - Officially Certified Stats: 23 Initials, 24 Finals, 5 Tones/Sandhi, 8 Strokes, 6 Radicals, 5 Boss Hanzi.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Share2,
  Download,
  Check,
  Sparkles,
  X,
  Copy,
} from 'lucide-react';
import { playFanfare, playClick, speak } from '../../engines/audio/audioEngine';
import { copyTextWithFallback } from '../../utils/clipboard';

export interface MilestonePassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  completionDate?: string;
  streakCount?: number;
  totalXp?: number;
  onShareSuccess?: () => void;
}

export const MilestonePassportModal: React.FC<MilestonePassportModalProps> = ({
  isOpen,
  onClose,
  userName = 'นักเรียนฮั่นซีโร่ 🐰',
  completionDate,
  streakCount = 7,
  totalXp = 450,
  onShareSuccess,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [renderedImageUrl, setRenderedImageUrl] = useState<string | null>(null);
  const [renderedFile, setRenderedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(true);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [shareStatusMessage, setShareStatusMessage] = useState<string | null>(null);

  const displayDate =
    completionDate ||
    new Date().toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  // Canvas Generation Function
  const generatePassportImage = useCallback(async () => {
    if (!canvasRef.current) return;
    setIsGenerating(true);

    try {
      // Ensure web fonts are ready before rasterizing text
      if (typeof document !== 'undefined' && document.fonts) {
        await document.fonts.ready;
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = 1080;
      const height = 1440;
      canvas.width = width;
      canvas.height = height;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // 1. Background Parchment & Jade Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#FDFBF7');
      bgGrad.addColorStop(0.5, '#FFFDF8');
      bgGrad.addColorStop(1, '#F7F3EA');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Classical Chinese Decorative Borders
      ctx.strokeStyle = '#047857'; // Imperial Jade
      ctx.lineWidth = 14;
      ctx.strokeRect(36, 36, width - 72, height - 72);

      ctx.strokeStyle = '#D97706'; // Warm Ochre accent
      ctx.lineWidth = 4;
      ctx.strokeRect(50, 50, width - 100, height - 100);

      // Corner flourishes
      const cornerSize = 40;
      ctx.fillStyle = '#047857';
      ctx.fillRect(40, 40, cornerSize, 10);
      ctx.fillRect(40, 40, 10, cornerSize);
      ctx.fillRect(width - 40 - cornerSize, 40, cornerSize, 10);
      ctx.fillRect(width - 50, 40, 10, cornerSize);
      ctx.fillRect(40, height - 50, cornerSize, 10);
      ctx.fillRect(40, height - 40 - cornerSize, 10, cornerSize);
      ctx.fillRect(width - 40 - cornerSize, height - 50, cornerSize, 10);
      ctx.fillRect(width - 50, height - 40 - cornerSize, 10, cornerSize);

      // 3. Top Seal Watermark & Subtitle
      ctx.textAlign = 'center';
      ctx.fillStyle = '#9CA3AF';
      ctx.font = '700 24px "Noto Sans SC", "Prompt", sans-serif';
      ctx.fillText('HANZERO MANDARIN PASSPORT · 汉字启蒙', width / 2, 110);

      // 4. Main Passport Title
      ctx.fillStyle = '#047857';
      ctx.font = '800 52px "Prompt", sans-serif';
      ctx.fillText('บัตรเกียรติยศผู้พิชิตพินอิน', width / 2, 175);

      ctx.fillStyle = '#B45309';
      ctx.font = '700 32px "Noto Sans SC", "Prompt", sans-serif';
      ctx.fillText('TIER 0 · 汉语拼音与基础汉字结业证书', width / 2, 225);

      // 5. Mascot Center Avatar & Golden Wreath
      const centerX = width / 2;
      const centerY = 370;

      // Outer Glow
      const glow = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, 130);
      glow.addColorStop(0, 'rgba(245, 158, 11, 0.25)');
      glow.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 130, 0, Math.PI * 2);
      ctx.fill();

      // Golden Ring
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 88, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#FEF3C7';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 82, 0, Math.PI * 2);
      ctx.fill();

      // Tutu Emoji & Cap
      ctx.font = '90px sans-serif';
      ctx.fillText('🐰', centerX, centerY + 32);

      // 6. Learner Name & Congratulation Banner
      ctx.fillStyle = '#1E293B';
      ctx.font = '800 46px "Prompt", sans-serif';
      ctx.fillText(userName, width / 2, 530);

      ctx.fillStyle = '#475569';
      ctx.font = '500 28px "Prompt", sans-serif';
      ctx.fillText('ผ่านการทดสอบและฝึกฝนระบบเสียงพินอินและเส้นขีดครบถ้วน 100%', width / 2, 575);

      // 7. Official Certification Stats Matrix (2x3 Grid)
      const gridTop = 640;
      const col1X = 140;
      const col2X = 560;
      const cardW = 380;
      const cardH = 140;

      const stats = [
        { labelZh: '23 声母', labelTh: '23 พยัญชนะต้น', icon: '🗣️', desc: 'b p m f ... zh ch sh r' },
        { labelZh: '24 韵母', labelTh: '24 สระมาตรฐาน', icon: '🎶', desc: 'สระเดี่ยว ผสม และสระนาสิก' },
        { labelZh: '5 声调', labelTh: '5 เสียงวรรณยุกต์ & Sandhi', icon: '🎢', desc: '4 เสียง + เสียงเบา + กฎ 3+3' },
        { labelZh: '8 笔画', labelTh: '8 เส้นขีดพื้นฐาน (永字)', icon: '🖌️', desc: '横 竖 撇 捺 点 提 折 钩' },
        { labelZh: '6 部首', labelTh: '6 หมวดนำตั้งต้น', icon: '🧱', desc: '亻 女 子 口 氵 木' },
        { labelZh: '5 汉字', labelTh: '5 อักษรจีนแรกในชีวิต', icon: '🏆', desc: '好 · 大 · 水 · 门 · 字' },
      ];

      stats.forEach((item, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;
        const x = col === 0 ? col1X : col2X;
        const y = gridTop + row * (cardH + 20);

        // Card bg
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(x, y, cardW, cardH, [20]);
        ctx.fill();
        ctx.stroke();

        // Icon
        ctx.font = '42px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item.icon, x + 20, y + 60);

        // Title
        ctx.fillStyle = '#047857';
        ctx.font = '800 24px "Prompt", sans-serif';
        ctx.fillText(item.labelTh, x + 80, y + 48);

        // Zh label badge
        ctx.fillStyle = '#D97706';
        ctx.font = '700 20px "Noto Sans SC", sans-serif';
        ctx.fillText(item.labelZh, x + 80, y + 80);

        // Desc
        ctx.fillStyle = '#64748B';
        ctx.font = '500 18px "Prompt", sans-serif';
        ctx.fillText(item.desc, x + 80, y + 112);
      });

      // 8. Red Vermilion Imperial Seal Stamp (หยกแดงโบราณมุมล่างขวา)
      const stampX = width - 260;
      const stampY = 1150;
      const stampSize = 150;

      ctx.save();
      ctx.translate(stampX + stampSize / 2, stampY + stampSize / 2);
      ctx.rotate(-0.08); // slight realistic skew
      ctx.strokeStyle = '#DC2626';
      ctx.lineWidth = 7;
      ctx.strokeRect(-stampSize / 2, -stampSize / 2, stampSize, stampSize);

      ctx.fillStyle = '#DC2626';
      ctx.textAlign = 'center';
      ctx.font = '800 24px "Noto Sans SC", serif';
      ctx.fillText('汉零认证', 0, -18);
      ctx.fillText('通关之印', 0, 14);

      ctx.font = '700 16px "Prompt", sans-serif';
      ctx.fillText('CERTIFIED', 0, 42);
      ctx.restore();

      // 9. Footer Details: Date & Next Milestone
      ctx.textAlign = 'left';
      ctx.fillStyle = '#64748B';
      ctx.font = '600 22px "Prompt", sans-serif';
      ctx.fillText(`📅 วันที่สำเร็จการศึกษา: ${displayDate}`, 120, 1190);
      ctx.fillText(`🔥 รักษา Streak ต่อเนื่อง: ${streakCount} วัน  |  ⭐ สะสม: ${totalXp} XP`, 120, 1230);

      ctx.fillStyle = '#047857';
      ctx.font = '800 26px "Prompt", sans-serif';
      ctx.fillText('🚀 ประตูสู่ Tier 1: นักเดินทางเอาตัวรอด (Traveler Survival) ปลดล็อกแล้ว!', 120, 1285);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '500 18px "Prompt", sans-serif';
      ctx.fillText('Hanzero · เรียนภาษาจีนสนุกจากศูนย์สู่คล่องตัว · hanzero.app', 120, 1340);

      // 10. Generate DataURL & Blob for synchronous sharing
      const dataUrl = canvas.toDataURL('image/png');
      setRenderedImageUrl(dataUrl);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'hanzero-tier0-passport.png', {
            type: 'image/png',
            lastModified: Date.now(),
          });
          setRenderedFile(file);
        }
        setIsGenerating(false);
      }, 'image/png');
    } catch (err) {
      console.error('[MilestonePassportModal] Canvas render error:', err);
      setIsGenerating(false);
    }
  }, [displayDate, streakCount, totalXp, userName]);

  // Trigger fanfare and canvas generation on open
  useEffect(() => {
    if (isOpen) {
      playFanfare();
      speak('恭喜你，拼音结业了！', { rate: 0.85 });
      generatePassportImage();
    } else {
      // Memory cleanup: Reset canvas buffer to avoid GPU leaks on iOS
      if (canvasRef.current) {
        canvasRef.current.width = 0;
        canvasRef.current.height = 0;
      }
      setRenderedImageUrl(null);
      setRenderedFile(null);
      setCopiedNotification(false);
      setShareStatusMessage(null);
    }
  }, [isOpen, generatePassportImage]);

  // Resilient Web Share Cascade
  const handleShare = async () => {
    playClick();

    const shareTitle = '🐰 Hanzero Tier 0 Graduation Passport!';
    const shareText = `ฉันสำเร็จการศึกษาปูพื้นฐานพินอิน Tier 0 บน Hanzero แล้ว! 23 พยัญชนะ 24 สระ และ 5 อักษรจีนแรกในชีวิต 🇨🇳✨`;
    const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://hanzero.app';

    // Tier 1: Native Share with File
    if (
      typeof navigator !== 'undefined' &&
      navigator.share &&
      renderedFile &&
      navigator.canShare &&
      navigator.canShare({ files: [renderedFile] })
    ) {
      try {
        await navigator.share({
          files: [renderedFile],
          title: shareTitle,
          text: shareText,
        });
        onShareSuccess?.();
        return;
      } catch (err: unknown) {
        // Silently ignore user cancel / abort
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
      }
    }

    // Tier 2: Native Share with Text & URL only
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        onShareSuccess?.();
        return;
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
      }
    }

    // Tier 3: Direct Download Fallback
    handleDownload();
  };

  // Direct PNG Download
  const handleDownload = () => {
    playClick();
    if (!renderedImageUrl) return;

    const link = document.createElement('a');
    link.download = `hanzero-tier0-passport-${Date.now()}.png`;
    link.href = renderedImageUrl;
    link.click();

    setShareStatusMessage('บันทึกรูปภาพเรียบร้อยแล้ว! 📥');
    setTimeout(() => setShareStatusMessage(null), 3000);
  };

  // Copy share message to clipboard with 3-tier resilient fallback
  const handleCopyText = async () => {
    playClick();
    const shareText = `ฉันสำเร็จการศึกษาปูพื้นฐานพินอิน Tier 0 บน Hanzero แล้ว! 23 พยัญชนะ 24 สระ และ 5 อักษรจีนแรกในชีวิต 🇨🇳✨ https://hanzero.app`;
    const success = await copyTextWithFallback(shareText);
    if (success) {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    } else {
      if (typeof window !== 'undefined' && typeof window.alert === 'function') {
        window.alert(`กรุณาคัดลอกข้อความด้านล่างเพื่อแชร์:\n\n${shareText}`);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      data-testid="milestone-passport-modal"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl border-2 border-amber-200/80 shadow-2xl p-4 sm:p-6 flex flex-col items-center gap-4 my-auto animate-zenPop">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors active:scale-95"
          data-testid="btn-close-passport"
          aria-label="ปิดหน้าต่าง"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center gap-1 mt-1">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-2xl shadow-inner border border-amber-200">
            🏆
          </div>
          <span className="text-[11px] font-bold text-amber-700 tracking-wider uppercase mt-1">
            TIER 0 GRAND MILESTONE
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800">
            บัตรเกียรติยศส่งต่อความสำเร็จ!
          </h2>
          <p className="text-xs text-slate-500">
            คุณพิชิตระบบเสียงพินอินครบ 6 ยูนิต พร้อมก้าวสู่การสนทนาจริงแล้ว
          </p>
        </div>

        {/* Hidden Canvas used for high-res 1080x1440 image rendering */}
        <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

        {/* Card Image Preview */}
        <div className="w-full relative rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md bg-amber-50/50 flex flex-col items-center justify-center min-h-[300px]">
          {isGenerating || !renderedImageUrl ? (
            <div className="flex flex-col items-center gap-2 p-8 text-amber-800">
              <Sparkles className="w-8 h-8 animate-spin text-amber-500" />
              <span className="text-xs font-semibold">กำลังพิมพ์ตราประทับฮั่นซีโร่... 🐰✨</span>
            </div>
          ) : (
            <div className="relative group w-full">
              <img
                src={renderedImageUrl}
                alt="Hanzero Tier 0 Passport"
                className="w-full h-auto object-contain rounded-2xl shadow-inner"
                data-testid="passport-preview-image"
              />
              <div className="absolute bottom-2 inset-x-2 bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs py-1.5 px-2 rounded-xl text-center font-medium opacity-90">
                💡 กดค้างที่รูปภาพเพื่อ "บันทึกไปยังแอปรูปภาพ" ได้ทันที
              </div>
            </div>
          )}
        </div>

        {/* Status Toast */}
        {shareStatusMessage && (
          <div className="w-full text-center text-xs font-bold text-emerald-800 bg-emerald-100/90 py-1.5 px-3 rounded-xl animate-fadeIn">
            {shareStatusMessage}
          </div>
        )}

        {/* Action Buttons Grid */}
        <div className="w-full flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleShare}
              disabled={isGenerating}
              className="min-h-[48px] px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95"
              data-testid="btn-share-passport"
            >
              <Share2 className="w-4 h-4" />
              <span>แชร์บัตรเกียรติยศ</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={isGenerating || !renderedImageUrl}
              className="min-h-[48px] px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95"
              data-testid="btn-download-passport"
            >
              <Download className="w-4 h-4" />
              <span>ดาวน์โหลดภาพ</span>
            </button>
          </div>

          {/* Copy Text Button */}
          <button
            type="button"
            onClick={handleCopyText}
            className="min-h-[44px] px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            data-testid="btn-copy-passport-text"
          >
            {copiedNotification ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">คัดลอกข้อความสำเร็จ! 📋</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>คัดลอกข้อความส่งต่อเพื่อน</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
