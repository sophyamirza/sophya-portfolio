export default function ToolkitPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="text-xs tracking-[0.35em] text-white/50">TOOLKIT</div>

        <h1 className="mt-4 text-4xl md:text-5xl tracking-wide">
          Technical Arsenal
        </h1>

        <p className="mt-6 max-w-2xl text-white/70">
          Full lifecycle hardware ownership from first principles to deployed
          systems. Design, analysis, build, test, iterate.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* COLUMN 1 */}
          <div>
            <h3 className="text-lg tracking-wide mb-4">CAD</h3>
            <ul className="space-y-2 text-white/70">
              <li>Solidworks</li>
              <li>CATIA</li>
              <li>NX</li>
              <li>Fusion</li>
              <li>Onshape</li>
              <li>GD&T & DFM</li>
              <li>PDM & PLM</li>
            </ul>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h3 className="text-lg tracking-wide mb-4">ANALYSIS + SIM</h3>
            <ul className="space-y-2 text-white/70">
              <li>ANSYS</li>
              <li>ANSA</li>
              <li>LabVIEW</li>
              <li>Abaqus</li>
              <li>MATLAB</li>
              <li>Python, Excel</li>
              <li>Thermal Desktop</li>
              <li>Nastran</li>
              <li>FEA, CFD, FMEA</li>
              
            </ul>
          </div>

          <div>
            <h3 className="text-lg tracking-wide mb-4">BUILD, INTEGRATION & TEST</h3>
            <ul className="space-y-2 text-white/70">
              <li>Prototyping & Dev articles</li>
                <li>CNC & Manual Machining</li>
              <li>Fluids P&ID Design, Cryo experience</li>
              <li>3D Printing: FDM & SLA</li>
              <li>Instrumentation, Seals, manifold, tubes</li>
              <li>DAQ</li>
              <li>Valves & regulators</li>
              <li>ATP Authoring</li>
              <li>Sift, Grafana, Ion, WarpDrive</li>
              <li>Amateur welding: MIG, HHLBW, Stud, TIG</li>
              <li> cleanroom (ISO 8)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg tracking-wide mb-4">ADDITIONAL</h3>
            <ul className="space-y-2 text-white/70">
              <li>Polyglot: English, Farsi, Spanish, Hindi, Urdu, Arabic</li>
              <li>EAGLE</li> 
              <li>Altium</li>
              <li> S-016, 91-710 & addit. standards</li>
              <li> ESD Rev L(24) by NASA JPL</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}