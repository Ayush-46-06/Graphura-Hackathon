import { Link } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const navItems = [
  { name: "Home", path: "/" },
  {
    name: "Pages",
    dropdown: [
      { name: "About Us", path: "/about" },
      { name: "Our Team", path: "/team" },
      { name: "FAQ", path: "/faq" },
      { name: "Pricing", path: "/pricing" },
    ],
  },
  { name: "Courses", path: "/courses" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <nav
      className="
        fixed top-0 w-full z-50
        bg-[var(--it-heading-primary)]
        backdrop-blur-md
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/GraphuraLogo.jpg" alt="Graphura" className="h-10" />
        </Link>

        {/* MENU + CTA */}
        <div className="flex items-center gap-6">
          {/* MENU */}
          <div className="hidden md:flex items-center gap-8 text-[var(--it-text-body)] font-medium">
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                {item.dropdown ? (
                  <div
                    onMouseEnter={() => setOpenDropdown(index)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className="
                      cursor-pointer flex items-center gap-1
                      transition
                      hover:text-[var(--it-theme-2)]
                    "
                  >
                    {item.name}
                    <IoIosArrowDown size={16} />

                    {openDropdown === index && (
                      <div
                        className="
                          absolute left-0 top-8
                          bg-[var(--it-heading-primary)]
                          border border-white/10
                          shadow-lg rounded-md
                          p-3 w-44
                        "
                      >
                        <ul className="flex flex-col gap-2 text-sm text-[var(--it-text-body)]">
                          {item.dropdown.map((sub, i) => (
                            <li key={i}>
                              <Link
                                to={sub.path}
                                className="
                                  transition
                                  hover:text-[var(--it-theme-2)]
                                "
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className="
                      transition
                      hover:text-[var(--it-theme-2)]
                    "
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA BUTTON */}
          <button
            className="
              bg-[var(--it-theme-3)]
              text-black
              px-6 py-2
              font-semibold
              rounded
              transition
              hover:scale-105
            "
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
