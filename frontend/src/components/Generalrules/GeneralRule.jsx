import React from "react";

const GeneralRule = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D]">
      {/* ================= HEADER ================= */}
      <div className="relative min-h-[65vh] flex items-center justify-center text-center px-6">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#1AB69D]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F8C62F]/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 max-w-4xl animate-fade-in">
          <h1 className="text-white text-5xl lg:text-6xl font-bold">
            Online Hackathon Rules & Guidelines
          </h1>

          <p className="mt-4 text-white/90 text-lg">
            <span className="text-[#F8C62F] font-semibold">
              Graphura India Private Limited
            </span>
          </p>

          <p className="mt-6 text-white/80 text-base leading-relaxed">
            These rules govern all online hackathons conducted by Graphura India
            Private Limited. By registering and participating, you agree to
            comply with these rules, Graphura’s Terms of Service, and Privacy
            Policy.
          </p>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none">
          <path
            d="M0,50 C360,100 720,0 1080,50 C1200,65 1320,80 1440,80 L1440,100 L0,100 Z"
            fill="white"
            fillOpacity="0.1"
          />
        </svg>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-gray-700 space-y-10 leading-relaxed">
          {/* 1 */}
          <div>
            <h2 className="text-2xl font-bold text-[#03594E] mb-3">
              1. Introduction
            </h2>
            <p>
              The hackathon is designed to encourage creativity, innovation, and
              problem-solving through software or hardware prototypes, digital
              solutions, and creative concepts aligned with event themes.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-2xl font-bold text-[#03594E] mb-3">
              2. Definitions
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Hackathon Organizer:</strong> Graphura India Private
                Limited
              </li>
              <li>
                <strong>Hackathon Platform:</strong> Online platform used to
                host the event
              </li>
              <li>
                <strong>Participant:</strong> Registered individual taking part
              </li>
              <li>
                <strong>Team:</strong> Group collaborating on one submission
              </li>
              <li>
                <strong>Submission:</strong> Final project submitted
              </li>
              <li>
                <strong>Winning Submissions:</strong> Projects selected by
                judges
              </li>
            </ul>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-2xl font-bold text-[#03594E] mb-3">
              3. Eligibility
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Participants must be 18 years or older</li>
              <li>
                Only residents of India may participate unless stated otherwise
              </li>
              <li>
                Graphura employees may participate but are not eligible to win
                prizes
              </li>
              <li>Valid identity and email are required</li>
            </ul>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-2xl font-bold text-[#03594E] mb-3">
              4. Registration & Timelines
            </h2>
            <p>
              Registration dates, hackathon duration, submission deadlines, and
              presentation schedules will be specified for each event. All
              timelines follow Indian Standard Time (IST).
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-2xl font-bold text-[#03594E] mb-3">
              5. Team Formation
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Teams may consist of 1–5 members</li>
              <li>Each participant can join only one team</li>
              <li>One member must act as the Team Leader</li>
            </ul>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-2xl font-bold text-[#03594E] mb-3">
              6. Participation Rules
            </h2>
            <p>
              <strong>Permitted:</strong> Open-source tools, public APIs,
              pre-event brainstorming
            </p>
            <p className="mt-2">
              <strong>Not Permitted:</strong> Pre-built proprietary code,
              multiple accounts, cross-team collaboration
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-2xl font-bold text-[#03594E] mb-3">
              7. Submission & Judging
            </h2>
            <p>
              Submissions must include code, demo, documentation, and
              presentation materials. Judging is based on technical quality,
              innovation, feasibility, impact, and presentation.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-2xl font-bold text-[#03594E] mb-3">
              8. Intellectual Property Rights
            </h2>
            <p>
              Participants retain ownership of their projects while granting
              Graphura a non-exclusive license to evaluate and showcase
              submissions.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-2xl font-bold text-[#03594E] mb-3">
              9. Ethics & Code of Conduct
            </h2>
            <p>
              Participants must act professionally, respectfully, and ethically.
              Any misconduct may lead to disqualification.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="text-2xl font-bold text-[#03594E] mb-3">
              10. Contact
            </h2>
            <p>
              For questions regarding these rules, contact us at{" "}
              <a
                href="mailto:official@graphura.in"
                className="text-[#1AB69D] font-semibold"
              >
                official@graphura.in
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </section>
  );
};

export default GeneralRule;