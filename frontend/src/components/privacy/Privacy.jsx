import React from "react";
import { Play, Users, BookOpen, Award } from "lucide-react";
import Navbar from "../Navbar";


const PrivacyPolicy = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#03594E] via-[#03594E] to-[#1AB69D]">
      <Navbar />
      {/* ================= HEADER ================= */}
      <div className="relative min-h-[65vh] flex items-center justify-center text-center px-6">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#1AB69D]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F8C62F]/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 max-w-4xl animate-fade-in">
          <h1 className="text-white text-5xl lg:text-6xl font-bold">
            Privacy Policy
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
            <h2 className="text-2xl font-bold text-[#03594E] mb-3">
              1. What personal information do we collect?
            </h2>

            <p>
              We collect no personal information except when you deliberately
              send it to us, for example, by sending us an email or applying to
              our program. When submitting an application for our program you
              are asked to submit:
            </p>

            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Your name, so we know what to call you.</li>
              <li>
                Your email address and phone number, so we know how to reach
                you.
              </li>
              <li>
                Your nationality, so we can determine the visa rules applicable
                in the location of your program/internship host company.
              </li>
              <li>
                Your university, so we know if you attend a partner university
                and may be eligible for a program discount.
              </li>
              <li>
                Your CV/resume, so we can place you in a suitable internship
                role.
              </li>
            </ul>

            <p className="mt-4">
              When you interview with us, and if you choose to participate in
              our program, we collect additional information from you in order
              to provide benefits to you during and after the program. We may
              ask you about any medical conditions, dietary requirements, or
              religious needs to ensure that we can best accommodate your needs
              while you are in our program.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-2xl font-bold text-[#03594E] mb-3">
              2. What technical information do we collect?
            </h2>

            <p>
              <strong>2.1</strong> When you access our web pages, certain
              technical information is automatically collected. We analyze
              aggregate traffic/access information for resource management and
              site planning purposes. We reserve the right to use log detail to
              investigate resource management or security concerns.
            </p>

            <p className="mt-3">
              <strong>2.2</strong> Some of our web pages use cookies. Usually a
              cookie enables a website to tailor what you see according to the
              way you entered the site (for example, if you entered via a
              certain link, or if you are using a mobile device).
            </p>

            <p className="mt-3">
              <strong>2.3</strong> We also use non-identifying and aggregate
              information to better design our website. We do not gather or
              disclose information that could identify specific individuals.
            </p>

            <p className="mt-3">
              <strong>2.4</strong> Our web pages may use Google Analytics or
              other similar services. We do not control the privacy policies of
              these vendors.
            </p>

            <p className="mt-3">
              <strong>2.5</strong> You may visit our site without having
              information collected by declining cookies in your browser.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-2xl font-bold text-[#03594E] mb-3">
              3. Why do we collect information?
            </h2>

            <p>
              We collect only such personal information as we need in order to
              confirm that you are eligible for the internship program in which
              you have expressed interest, and then to place you in that program
              and deliver the program to you.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-2xl font-bold text-[#03594E] mb-3">
              4. Who do we share your information with?
            </h2>

            <p>
              <strong>4.1</strong> We use your information to fulfill or respond
              to your request.
            </p>
            <p className="mt-2">
              <strong>4.2</strong> Contact information may be shared with host
              company partners once the internship match is confirmed.
            </p>
            <p className="mt-2">
              <strong>4.3</strong> Educational institutions may be contacted for
              academic monitoring, reporting, insurance, or discounts.
            </p>
            <p className="mt-2">
              <strong>4.4</strong> We do not share personal information unless
              required by law or with your permission.
            </p>
            <p className="mt-2">
              <strong>4.5</strong> Non-personally identifiable visitor
              information may be shared for marketing.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-2xl font-bold text-[#03594E] mb-3">
              5. How do we protect your information?
            </h2>

            <p>
              <strong>5.1</strong> We strive to prevent unauthorized data
              access, maintain data accuracy, and ensure appropriate use of
              information.
            </p>

            <p className="mt-2">
              <strong>5.2</strong> Your information is encrypted at rest and in
              transit. Administrative access is protected by two-factor
              authentication.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-2xl font-bold text-[#03594E] mb-3">
              6. How long do we keep your information?
            </h2>

            <p>
              Participants receive lifetime membership to our Alumni Network.
              Information is retained unless a removal request is made.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-2xl font-bold text-[#03594E] mb-3">
              7. What rights do you have?
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Right to be informed</li>
              <li>Right of access</li>
              <li>Right to amend</li>
              <li>Right to be erased</li>
              <li>Right to stop receiving marketing messages</li>
              <li>Right to restrict processing</li>
            </ul>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-2xl font-bold text-[#03594E] mb-3">
              8. Your consent
            </h2>

            <p>By using our website, you consent to this Privacy Policy.</p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-bold text-[#03594E] mb-3">
              Contact us
            </h2>

            <p>
              Should you have any questions, please contact us at{" "}
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

export default PrivacyPolicy;
