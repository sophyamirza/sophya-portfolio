export default function ToolkitPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="text-xs tracking-[0.35em] text-white/50">TOOLKIT</div>

        <h1 className="mt-4 text-4xl md:text-5xl tracking-wide">
          Engineering Skillsets
        </h1>

        <p className="mt-6 max-w-2xl text-white/70">
          Full lifecycle hardware ownership from first principles to deployed
          systems. Design, analysis, build, test, iterate.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* COLUMN 1 */}
          <div>
            <h3 className="text-lg tracking-wide mb-4">Mechanical + Systems</h3>
            <ul className="space-y-2 text-white/70">
              <li>CAD (SolidWorks, CATIA)</li>
              <li>Mechanism Design</li>
              <li>Composites Layup</li>
              <li>Vacuum + Cryogenic Hardware</li>
              <li>Test Stands & GSE</li>
              <li>Integration Engineering</li>
            </ul>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h3 className="text-lg tracking-wide mb-4">Analysis + Simulation</h3>
            <ul className="space-y-2 text-white/70">
              <li>CFD (ANSYS Fluent)</li>
              <li>Structural FEA</li>
              <li>Thermal Analysis</li>
              <li>Convergence Studies</li>
              <li>MATLAB</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg tracking-wide mb-4">Build + Test</h3>
            <ul className="space-y-2 text-white/70">
              <li>Prototyping & Fabrication</li>
              <li>P&ID Mindset</li>
              <li>Instrumentation</li>
              <li>DAQ Integration</li>
              <li>ATP Authoring</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg tracking-wide mb-4">Software + Web</h3>
            <ul className="space-y-2 text-white/70">
              <li>Next.js App Router</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
              <li>React</li>
              <li>Interactive Canvas Graphics</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}