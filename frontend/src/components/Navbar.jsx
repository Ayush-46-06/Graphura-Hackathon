import { Link } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowDown, IoMdMenu, IoMdClose } from "react-icons/io";

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
  { name: "Hackathons", path: "/hackathons" },
  { name: "Blog", path: "/all-blog" },
  { name: "Partners", path: "/partner" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  
  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="bg-white backdrop-blur-md rounded-full shadow-lg px-8 py-4 flex justify-between items-center">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/Hackathon_.svg" alt="Graphura" className="h-10" />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 text-[var(--it-text-body)] font-medium">
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                {item.dropdown ? (
                  <div
                    onMouseEnter={() => setOpenDropdown(index)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className="cursor-pointer flex items-center gap-1 hover:text-[var(--it-theme-2)]"
                  >
                    {item.name}
                    <IoIosArrowDown size={16} />

                    {openDropdown === index && (
                      <div className="absolute left-0 top-10 bg-white shadow-xl rounded-xl p-3 w-44">
                        <ul className="flex flex-col gap-2 text-sm text-black">
                          {item.dropdown.map((sub, i) => (
                            <li key={i}>
                              <Link
                                to={sub.path}
                                className="hover:text-yellow-300 transition"
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
                    className="hover:text-yellow-300 transition"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* LOGIN BUTTON */}
            <Link to="/login">
              <button className="bg-yellow-400 hover:bg-yellow-500 transition text-gray-900 font-semibold px-6 py-2 rounded-full">
                Login
              </button>
            </Link>
          </div>

          {/* MOBILE TOGGLER */}
          <button
            className="md:hidden text-3xl text-gray-800"
            onClick={() => setMobileOpen(true)}
          >
            <IoMdMenu />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MOBILE SLIDE MENU */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[260px] z-50
          bg-white
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6 flex justify-between items-center border-b relative">
          <img src="/Hackathon_.svg" alt="Graphura" className="h-8" />
          <button
            onClick={() => setMobileOpen(false)}
            className={`absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#03594E] text-xl hover:bg-gray-100 transition-all duration-300 ease-in-out shadow-lg ${
              mobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <IoMdClose />
          </button>
        </div>

        <div className="flex flex-col p-6 gap-4 text-[var(--it-text-body)] font-medium">
          {navItems.map((item, index) => (
            <div key={index}>
              {item.dropdown ? (
                <>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === index ? null : index)
                    }
                    className="flex justify-between items-center w-full"
                  >
                    {item.name}
                    <IoIosArrowDown
                      className={`transition ${
                        openDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === index && (
                    <div className="ml-4 mt-2 flex flex-col gap-2 text-sm">
                      {item.dropdown.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.path}
                          onClick={() => setMobileOpen(false)}
                          className="hover:text-[var(--it-theme-2)]"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-[var(--it-theme-2)]"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          <Link to="/login" onClick={() => setMobileOpen(false)}>
            <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-lg w-full">
              Login
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;