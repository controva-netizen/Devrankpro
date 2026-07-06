import { motion } from 'framer-motion';
import SectionHeader from '@/components/shared/SectionHeader';

export default function WorkPage() {
  return (
    <div className="pt-32 pb-24 min-h-[80vh]" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[800px] mx-auto px-6">
        <SectionHeader 
          label="ENGINEERING LOG" 
          headline="Technical Release v2.4" 
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 space-y-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold font-display mb-4 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-subtle)' }}>
              1. Interactive Terminals System
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--accent-1)' }}>InteractiveTerminal.tsx</h3>
                <p className="mb-2">Click-to-run command demo terminal for case studies. Features include:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Clickable command buttons with labels (▶ GENERATE PROPOSAL, etc.)</li>
                  <li>Typewriter animation for command typing (28ms per char)</li>
                  <li>Line-by-line colored output with custom delays</li>
                  <li>Always-dark terminal theme + cyan border + fill-on-hover buttons</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--accent-1)' }}>ContactTerminal.tsx & HomeTerminal.tsx</h3>
                <p className="text-sm leading-relaxed">
                  Replaced the traditional HTML contact form with a conversational multi-step terminal flow. 
                  Users can type 'send' to submit directly via our API integration. The Home Terminal introduces a pulsing cyan minimized pill that expands into a full CodeTerminal on click.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold font-display mb-4 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-subtle)' }}>
              2. Responsive Pages & Navigation Fixes
            </h2>
            <div className="space-y-4 text-sm leading-relaxed">
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>About & Contact Pages:</strong> Removed legacy md:items-center centering utility that caused content to overflow upward behind the fixed navbar on laptops (768-900px tall). Added explicit padding to guarantee navbar clearance.
              </p>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>Mobile Navigation:</strong> Implemented a slide-in right-edge panel for mobile devices (below md breakpoint). Includes a custom asymmetric hamburger animation, staggered link entrances (50ms apart), and scroll-locking while the menu is open.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold font-display mb-4 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-subtle)' }}>
              3. Vercel Deployment Architecture
            </h2>
            <div className="bg-[#0d1117] p-5 rounded-xl font-mono text-sm border my-4" style={{ borderColor: 'var(--border-subtle)', color: '#c9d1d9' }}>
              <span className="text-pink-400">"framework"</span>: <span className="text-green-300">"nextjs"</span>,<br/>
              <span className="text-pink-400">"installCommand"</span>: <span className="text-green-300">"yarn install --ignore-engines"</span>,<br/>
              <span className="text-pink-400">"buildCommand"</span>: <span className="text-green-300">"yarn build"</span>
            </div>
            <p className="text-sm leading-relaxed">
              Resolved an internal npm process exhaustion error during peer dependency resolution (caused by the React 19 + Three.js + GSAP ecosystem). Bypassed peer dep resolution via Yarn configuration to achieve stable zero-downtime Vercel deployments.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold font-display mb-4 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-subtle)' }}>
              4. UI/UX Enhancements
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Created the <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-xs">.btn-fill-bottom</code> CSS class for sweep-fill hover effects.</li>
              <li>Fixed visibility issues on interactive terminal buttons in light mode by enforcing an always-dark aesthetic for developer components.</li>
              <li>Integrated 8 new enterprise Case Studies into the data layer.</li>
            </ul>
          </section>

        </motion.div>
      </div>
    </div>
  );
}
