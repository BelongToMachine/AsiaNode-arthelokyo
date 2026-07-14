'use client';

const CookiePreferencesButton = () => (
  <button
    className="text-left duration-150 ease-in-out hover:text-gray-950 hover:underline dark:text-gray-400 dark:hover:text-white"
    onClick={() => window.dispatchEvent(new Event('asianode:open-cookie-preferences'))}
    type="button"
  >
    Cookie settings
  </button>
);

export default CookiePreferencesButton;
