const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="rounded-t-sm bg-white p-4 shadow md:flex md:items-center md:justify-between md:p-6">
      <span className="text-sm text-neutral-500 sm:text-center">
        © {currentYear}{" "}
        <a href="#" className="hover:underline" target="_blank">
          Zara Reviews
        </a>
        . All Rights Reserved.
      </span>
      <ul className="mt-3 flex flex-wrap items-center sm:mt-0">
        <li>
          <a
            href="#"
            className="mr-4 text-sm text-neutral-500 hover:underline md:mr-6"
          >
            Blogs
          </a>
        </li>
        <li>
          <a
            href="#"
            className="mr-4 text-sm text-neutral-500 hover:underline md:mr-6"
          >
            Privacy Policy
          </a>
        </li>
        <li>
          <a
            href="#"
            className="mr-4 text-sm text-neutral-500 hover:underline md:mr-6"
          >
            Licensing
          </a>
        </li>
        <li>
          <a href="#" className="text-sm text-neutral-500 hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
