const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t border-neutral-950/10 bg-neutral-100 py-4 text-center text-xs font-semibold text-neutral-700 shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-2 sm:order-2 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center justify-center gap-2 sm:order-1 sm:flex-row sm:justify-end">
            <a
              href="#"
              className="text-neutral-700 underline-offset-4 hover:text-neutral-800 hover:underline"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-neutral-700 underline-offset-4 hover:text-neutral-800 hover:underline"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-neutral-700 underline-offset-4 hover:text-neutral-800 hover:underline"
            >
              info@zarareviews.com
            </a>
          </div>
          <p>© {currentYear} Zara Reviews</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
