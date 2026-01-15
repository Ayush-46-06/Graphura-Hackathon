import React from "react";

const TermsCondition = () => {
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
          <h1 className="text-white text-5xl lg:text-6xl font-bold mt-10">
            Term and Condition
          </h1>

          <p className="mt-4 text-white/90 text-lg">
            <span className="text-[#F8C62F] font-semibold">
              Graphura India Private Limited
            </span>
          </p>

          <p className="mt-2 text-white/70 text-sm">
            Last Updated: June 20, 2025
          </p>

          <p className="mt-6 text-white/80 text-base leading-relaxed">
            Graphura India Private Limited values individuals&apos; privacy and
            actively seeks to preserve the privacy rights of those who share
            information with us. The following information explains the Internet
            privacy policy and practices our company has adopted. Graphura India
            Private Limited reserves the right to amend it at any time without
            notice.
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
            <h2 className="text-3xl font-bold text-[#03594E] mb-3">
              1. Aim of the Graphura Hackathons
            </h2>

            <h3 className="text-2xl font-bold text-yellow-600 mb-3">
              1.1 Purpose
            </h3>

            <p>
              The Graphura Open Hackathons Program aims to encourage developers,
              innovators, students, and professionals to build practical,
              real-world solutions that address current industry and social
              challenges. The program focuses on hands-on learning,
              collaboration, and rapid prototyping across domains such as
              software development, AI/ML, data science, design, and
              cross-disciplinary innovation.
            </p>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              1.2 Format of Graphura Hackathons
            </h3>

            <p className="mt-2 mb-2">
              The Graphura Open Hackathons Program aims to encourage developers,
              innovators, students, and professionals to build practical,
              real-world solutions that address current industry and social
              challenges. The program focuses on hands-on learning,
              collaboration, and rapid prototyping across domains such as
              software development, AI/ML, data science, design, and
              cross-disciplinary innovation.
            </p>

            <h4>
              <strong>1.2.1</strong>
            </h4>
            <p className="mt-2 mb-2">
              {" "}
              All Graphura Hackathons are managed and administered solely by{" "}
              <strong>Graphura India Private Limited </strong> (“Graphura”) or
              by event partners designated by Graphura.
            </p>

            <strong>1.2.2</strong>
            <p className="mt-2 mb-2">
              Hackathons may be conducted in any of the following formats:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Fully online (virtual)</li>
              <li>Hybrid (online + physical venues)</li>
              <li>In-person events (as announced by Graphura)</li>
            </ul>

            <strong>1.2.3</strong>
            <p className="mt-2 mb-2">
              Hackathons are fast-paced, collaborative events where participants
              work in teams to conceptualize, develop, and deliver solution
              prototypes within a limited time.
            </p>

            <strong>1.2.4</strong>
            <p className="mt-2 mb-2">
              Hackathons are fast-paced, collaborative events where participants
              work in teams to conceptualize, develop, and deliver solution
              prototypes within a limited time.
            </p>

            <strong>1.2.5</strong>
            <p className="mt-2 mb-2">
              Graphura and its partners will assign experienced mentors,
              evaluators, trainers, and subject-matter experts to guide
              participants. Mentors will provide advisory support but will not
              develop solutions for participants.
            </p>

            <strong>1.2.6</strong>
            <p className="mt-2 mb-2">
              Participants may receive access to cloud credits, APIs, datasets,
              or tools for the duration of the event. All such access is limited
              to hackathon usage only.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-3xl font-bold text-[#03594E] mb-3">
              2. Date and Location of the Hackathon
            </h2>
            <p className="mt-2 mb-2">
              Each Hackathon’s date, duration, format, and location (in case of
              physical or hybrid events) will be specified separately on the
              event announcement page. Participants must comply with all rules,
              restrictions, and venue policies established by Graphura or its
              event partners.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-3xl font-bold text-[#03594E] mb-3">
              3. Participation in the Hackathon
            </h2>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              {" "}
              3.1 Eligibility
            </h3>

            <p className="mt-2 mb-2">
              The Hackathon is open to all individuals{" "}
              <strong>18 years of age or older</strong> . (For events hosted in
              jurisdictions with different age rules, the corresponding minimum
              age requirements will apply.)
            </p>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              {" "}
              3.2 Application
            </h3>

            <p className="mt-2 mb-2">
              Participants must complete the official online
              application/registration form provided by Graphura.
            </p>

            <p className="mt-2 mb-2"> By submitting the application:</p>

            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Participants accept these Terms and Conditions.</li>
              <li>
                Participants consent to Graphura handling their personal data
                for hackathon-related purposes.
              </li>
              <li>
                Participants consent to their data being shared with Graphura’s
                event partners, sponsors, and co-organizers as required.
              </li>
            </ul>

            <h3 className="text-1xxl font-bold text-Black-700 mt-4 mb-3">
              {" "}
              3.2.1 Warranty
            </h3>
            <p className="mt-2 mb-2">
              Participants represent and warrant that their submission or
              application does not violate any agreement regarding:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Confidentiality</li>
              <li>Employment obligations</li>
              <li>Intellectual property assignment</li>
              <li>Non-competition</li>
              <li>Any other binding contractual or legal obligation</li>
            </ul>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              3.3 Team Requirements
            </h3>
            <p className="mt-2 mb-2">
              Participants must register in teams of at least 2 members. Some
              events may specify a maximum team size.
            </p>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              3.4 Selection
            </h3>
            <p className="mt-2 mb-2">
              Graphura will review applications based on merit, relevance, and
              available seats. Selected teams will receive confirmation up to{" "}
              <strong>three weeks or less</strong> three weeks or less before
              the event start date.
            </p>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              3.5 Team Updates
            </h3>
            <p className="mt-2 mb-2">
              Graphura must be informed of changes in team composition. Failure
              to do so may result in:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Communication delays</li>
              <li>Missed instructions</li>
              <li>Possible disqualification</li>
            </ul>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              3.6 Conduct
            </h3>
            <p className="mt-2 mb-2">
              Participants must adhere to the{" "}
              <strong>Graphura Code of Conduct</strong>. Violations may result
              in:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Disqualification</li>
              <li>Removal from the event or communication channels</li>
              <li>Removal from Graphura’s community spaces</li>
            </ul>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              3.7 Equipment & Facilities
            </h3>
            <p className="mt-2 mb-2">
              Participants are responsible for their own devices and tools.
            </p>

            <h3 className="text-1xxl font-bold text-Black-700 mt-4 mb-3">
              3.7.1 For Physical Events
            </h3>
            <p className="mt-2 mb-2">Graphura or its partners may provide:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Workspaces</li>
              <li>Seating and power supply</li>
              <li>Wi-Fi/internet access</li>
              <li>Monitors/screens (as available)</li>
              <li>Restroom access</li>
              <li>Light refreshments (optional)</li>
            </ul>
            <p className="mt-2 mb-2">
              Accessibility considerations will be provided to the extent
              reasonably possible.
            </p>

            <h3 className="text-1xxl font-bold text-Black-700 mt-4 mb-3">
              3.7.2 For Remote Events
            </h3>
            <p className="mt-2 mb-2">Graphura or partners will provide:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Online meeting links</li>
              <li>Communication channels (Slack, Discord, etc.)</li>
            </ul>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              3.8 Employee Participation
            </h3>
            <p className="mt-2 mb-2">
              Graphura employees may participate but{" "}
              <strong> cannot win cash or monetary prizes.</strong>
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-3xl font-bold text-[#03594E] mb-3">
              4. Registration for the Hackathon
            </h2>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              4.1 Mandatory Registration
            </h3>
            <p className="mt-2 mb-2">
              Accepted teams must complete a registration/confirmation form. By
              registering, participants consent to data processing under
              Graphura’s Privacy Policy and the policies of event partners.
            </p>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              4.2 Individual Responsibility
            </h3>
            <p className="mt-2 mb-2">
              Each team member must register individually.
            </p>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              4.3 Accuracy of Information
            </h3>
            <p className="mt-2 mb-2">
              Participants must provide correct and truthful information.
              Falsified or inaccurate information may lead to team
              disqualification.
            </p>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              4.4 Submission of Licensed Work
            </h3>
            <p className="mt-2 mb-2">
              Participants must ensure that any ideas, prototypes, or work
              submitted:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Are original</li>
              <li>Do not violate third-party rights</li>
              <li>
                Do not include confidential or proprietary information without
                authorization
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              4.5 Liability
            </h3>
            <p className="mt-2 mb-2">For physical events:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                Participants are responsible for damages caused to people or
                property.
              </li>
              <li>
                Graphura is not responsible for loss, theft, or damage to
                personal belongings.
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              4.6 Right to Refuse Entry
            </h3>
            <p className="mt-2 mb-2">
              Graphura may refuse entry or expel participants displaying
              inappropriate, harmful, or disruptive behavior.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-3xl font-bold text-[#03594E] mb-3">
              {" "}
              5. Hackathon Winners
            </h2>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              5.1 Prize Information
            </h3>
            <p className="mt-2 mb-2">
              If a Hackathon includes competitive judging or prizes, all details
              will be provided on the official event page or partner website.
            </p>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              5.2 Prize Distribution
            </h3>
            <p className="mt-2 mb-2">
              Graphura is not responsible for how winning teams choose to
              distribute prizes internally.
            </p>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              5.3 No Future Obligations
            </h3>
            <p className="mt-2 mb-2">
              Winning a prize does <strong>not</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Create a contract</li>
              <li>Guarantee employment</li>
              <li>
                Create any ongoing obligation between Graphura and participants
              </li>
            </ul>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-3xl font-bold text-[#03594E] mb-3">
              6. Intellectual Property Rights
            </h2>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              6.1 Participant Warranties
            </h3>
            <p className="mt-2 mb-2">By participating, each participant:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                Declares that their submission does not violate third-party IP
                rights
              </li>
              <li>
                Agrees to indemnify Graphura from claims arising from IP
                violations
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              6.2 Definition of IP
            </h3>
            <p className="mt-2 mb-2">
              Intellectual Property includes (but is not limited to):
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Ideas, concepts, and know-how</li>
              <li>Patents, copyrights, designs</li>
              <li>Software, source code, documentation</li>
              <li>Algorithms, prototypes, models</li>
              <li>Data processing techniques</li>
            </ul>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              6.3 Moral Rights
            </h3>
            <p className="mt-2 mb-2">
              Participants retain moral rights including authorship recognition
              unless explicitly waived by separate agreement.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-3xl font-bold text-[#03594E] mb-3">
              7. Miscellaneous
            </h2>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              7.1 Media & Photogr aphy Consent
            </h3>
            <p className="mt-2 mb-2">
              Participants understand that photos, videos, or screen recordings
              may be taken and used by Graphura for promotional or informational
              purposes without compensation.
            </p>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              7.2 Communication
            </h3>
            <p className="mt-2 mb-2">
              Graphura may contact participants during and after the event
              regarding logistics, instructions, and relevant updates.
            </p>
            <p className="mt-2 mb-2">
              {" "}
              Post-event communications will be sent only to those who opt-in.
            </p>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              7.3 Disqualification
            </h3>
            <p className="mt-2 mb-2">
              Graphura may disqualify any participant or team at its sole
              discretion for:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Eligibility issues</li>
              <li>Misconduct</li>
              <li>Breaching these Terms and Conditions</li>
            </ul>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              7.4 Data Processing
            </h3>
            <p className="mt-2 mb-2">
              Participants agree that Graphura and its partners may process
              personal information in accordance with their respective privacy
              policies.
            </p>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              7.5 Entire Agreement
            </h3>
            <p className="mt-2 mb-2">
              These Terms, along with event-specific forms, constitute the whole
              agreement between the participant and Graphura.
            </p>

            <h3 className="text-2xl font-bold text-yellow-600 mt-4 mb-3">
              7.6 Amendments
            </h3>
            <p className="mt-2 mb-2">
              Graphura reserves the right to modify these Terms at any time.
              Participants will be notified of major updates where necessary.
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

export default TermsCondition;