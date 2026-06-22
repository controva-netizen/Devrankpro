import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Sun, Moon, Check, Palette } from 'lucide-react';
import { useTheme, defaultPalettes } from '@/context/ThemeContext';

export default function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const [customTab, setCustomTab] = useState(false);
  const {
    palette, isDark, toggleMode, setPalette,
    customAccent1, customAccent2, isCustom, applyCustomColors,
  } = useTheme();

  const [hex1, setHex1] = useState(customAccent1);
  const [hex2, setHex2] = useState(customAccent2);

  const handleApplyCustom = () => {
    const clean1 = hex1.startsWith('#') ? hex1 : `#${hex1}`;
    const clean2 = hex2.startsWith('#') ? hex2 : `#${hex2}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(clean1) && /^#[0-9A-Fa-f]{6}$/.test(clean2)) {
      applyCustomColors(clean1, clean2);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 p-5 rounded-2xl w-[260px]"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-active)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
            }}
          >
            {/* Mode Toggle */}
            <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
              Appearance
            </p>
            <button
              onClick={toggleMode}
              className="flex items-center gap-3 w-full p-2.5 rounded-xl transition-colors duration-200 mb-5"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              {isDark ? <Moon size={16} style={{ color: 'var(--text-primary)' }} /> : <Sun size={16} style={{ color: 'var(--text-primary)' }} />}
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </span>
            </button>

            {/* Tabs */}
            <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <button
                onClick={() => setCustomTab(false)}
                className="flex-1 text-[11px] font-semibold py-1.5 rounded-md transition-all"
                style={{
                  backgroundColor: !customTab ? 'var(--accent-1)' : 'transparent',
                  color: !customTab ? 'white' : 'var(--text-muted)',
                }}
              >
                Presets
              </button>
              <button
                onClick={() => setCustomTab(true)}
                className="flex-1 text-[11px] font-semibold py-1.5 rounded-md transition-all"
                style={{
                  backgroundColor: customTab ? 'var(--accent-1)' : 'transparent',
                  color: customTab ? 'white' : 'var(--text-muted)',
                }}
              >
                Custom
              </button>
            </div>

            {!customTab ? (
              <>
                <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                  Color Presets
                </p>
                <div className="grid grid-cols-4 gap-2.5">
                  {defaultPalettes.map((p, i) => (
                    <button
                      key={p.name}
                      onClick={() => setPalette(i)}
                      className="w-11 h-11 rounded-xl transition-all duration-200 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${p.accent1}, ${p.accent2})`,
                        boxShadow: (palette === i && !isCustom) ? `0 0 0 2px ${isDark ? '#fff' : '#000'}, 0 0 0 4px ${p.accent1}40` : 'none',
                        transform: (palette === i && !isCustom) ? 'scale(1.05)' : 'scale(1)',
                      }}
                      title={p.name}
                    >
                      {(palette === i && !isCustom) && <Check size={14} className="text-white" />}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] mt-3 text-center" style={{ color: 'var(--text-muted)' }}>
                  {defaultPalettes[palette]?.name || 'Custom'}
                </p>
              </>
            ) : (
              <>
                <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                  Custom Colors
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-medium mb-1 block" style={{ color: 'var(--text-muted)' }}>Primary</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={hex1}
                        onChange={(e) => setHex1(e.target.value)}
                        className="w-8 h-8 rounded-lg border-0 cursor-pointer flex-shrink-0"
                      />
                      <input
                        type="text"
                        value={hex1}
                        onChange={(e) => setHex1(e.target.value)}
                        className="flex-1 text-xs px-2.5 py-2 rounded-lg outline-none"
                        style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' }}
                        maxLength={7}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-medium mb-1 block" style={{ color: 'var(--text-muted)' }}>Secondary</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={hex2}
                        onChange={(e) => setHex2(e.target.value)}
                        className="w-8 h-8 rounded-lg border-0 cursor-pointer flex-shrink-0"
                      />
                      <input
                        type="text"
                        value={hex2}
                        onChange={(e) => setHex2(e.target.value)}
                        className="flex-1 text-xs px-2.5 py-2 rounded-lg outline-none"
                        style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' }}
                        maxLength={7}
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleApplyCustom}
                    className="w-full py-2 rounded-lg text-xs font-semibold text-white mt-2"
                    style={{ background: 'var(--accent-gradient)' }}
                  >
                    Apply Colors
                  </button>
                  {isCustom && (
                    <p className="text-[10px] text-center" style={{ color: 'var(--accent-1)' }}>
                      <Palette size={10} className="inline mr-1" />
                      Custom colors active
                    </p>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: 'var(--accent-gradient)',
          boxShadow: '0 4px 20px var(--accent-glow)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings size={18} className="text-white" />
      </motion.button>
    </div>
  );
}
