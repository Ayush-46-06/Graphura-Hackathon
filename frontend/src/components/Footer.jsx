import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="
        relative w-full
        bg-[var(--it-heading-primary)]
        text-[var(--it-text-body)]
        overflow-hidden
        px-8 py-8
        border border-white/10 border-b-0
        backdrop-blur-[20px]
        shadow-[0_4px_30px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]
      "
    >
      {/* CONTENT GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 mb-12">
        {/* ABOUT */}
        <div>
          <img
            src="/image/Graphura-logo-white.png"
            alt="Graphura Logo"
            className="mt-2 w-[200px] max-h-[150px]"
          />

          <p className="mt-[10px] mb-6 text-[var(--it-text-body)]">
            Your trusted digital marketing partner helping businesses grow their
            online presence and reach their target audience effectively.
          </p>

          <div className="flex">
            {[
              {
                icon: <FaFacebookF />,
                link: "https://www.facebook.com/share/19nKAMTopZ/",
              },
              {
                icon: <FaTwitter />,
                link: "https://share.google/w9KeZZ72v8KQxGpFn",
              },
              {
                icon: <FaLinkedinIn />,
                link: "https://www.linkedin.com/company/graphura-india-private-limited/",
              },
              {
                icon: <FaInstagram />,
                link: "https://www.instagram.com/graphura.in",
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="
                  w-10 h-10 mr-4 rounded-full
                  bg-white/10 text-white
                  flex items-center justify-center
                  transition
                  hover:bg-[var(--it-theme-2)]
                  hover:text-black
                "
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4
            className="
              text-[var(--it-common-white)]
              text-[1.3rem]
              mb-6
              relative
              after:content-['']
              after:absolute
              after:-bottom-2
              after:left-0
              after:w-10
              after:h-[3px]
              after:bg-[var(--it-theme-2)]
            "
          >
            Quick Links
          </h4>

          <ul className="space-y-3">
            {[
              "Home",
              "Services",
              "About Us",
              "Intership",
              "Career",
              "Blog",
              "Contact",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="
                      text-[var(--it-text-body)]
                      transition
                      hover:text-[var(--it-theme-2)]
                      hover:pl-[5px]
                    "
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h4
            className="
              text-[var(--it-common-white)]
              text-[1.3rem]
              mb-6
              relative
              after:content-['']
              after:absolute
              after:-bottom-2
              after:left-0
              after:w-10
              after:h-[3px]
              after:bg-[var(--it-theme-2)]
            "
          >
            Our Services
          </h4>

          <ul className="space-y-3">
            {[
              "SEO Services",
              "Social Media Marketing",
              "Social Media Optimization",
              "Flyers",
              "Content Writing",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="
                    text-[var(--it-text-body)]
                    transition
                    hover:text-[var(--it-theme-2)]
                    hover:pl-[5px]
                  "
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <img
            src="/image/Footer/razorpay.jpg"
            alt="Razorpay"
            className="w-[230px] h-[85px] mt-3"
          />
        </div>

        {/* CONTACT */}
        <div>
          <h4
            className="
              text-[var(--it-common-white)]
              text-[1.3rem]
              mb-6
              relative
              after:content-['']
              after:absolute
              after:-bottom-2
              after:left-0
              after:w-10
              after:h-[3px]
              after:bg-[var(--it-theme-2)]
            "
          >
            Contact Us
          </h4>

          <ul className="space-y-4 text-[var(--it-text-body)]">
            <li className="flex items-start">
              <FaMapMarkerAlt className="text-[var(--it-theme-2)] mr-4 mt-1 w-5" />
              Graphura India Private Limited, near Renu Sharma Foundation,
              Pataudi, Gurgaon, Haryana 122503
            </li>

            <li className="flex items-center">
              <FaPhone className="text-[var(--it-theme-2)] mr-4 w-5" />
              +91 7378021327
            </li>

            <li className="flex items-center">
              <FaEnvelope className="text-[var(--it-theme-2)] mr-4 w-5" />
              support@graphura.in
            </li>

            <li className="grid grid-cols-2 gap-3">
              <img
                src="/image/Footer/skill india.jpg"
                alt="Skill India"
                className="h-[88px]"
              />
              <img
                src="/image/Footer/startup.png"
                alt="Startup India"
                className="h-[88px] w-[150px]"
              />
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 pt-6 flex flex-col items-center gap-3 text-center">
        <p className="text-white/70 text-sm">
          © 2025 Graphura India Private Limited. All Rights Reserved.
        </p>

        <ul className="flex gap-6 text-sm">
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
            (item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="
                  text-white/70
                  transition
                  hover:text-[var(--it-theme-2)]
                "
                >
                  {item}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </footer>
  );
}