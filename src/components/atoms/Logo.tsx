type LogoProps = {
  isOnLandingPage?: boolean;
};

const Logo = ({ isOnLandingPage = false }: LogoProps) => (
  <span
    className={`ml-2 self-center whitespace-nowrap text-2xl font-bold md:text-xl ${
      isOnLandingPage ? 'text-white' : 'text-gray-900 dark:text-white'
    }`}
  >
    Asianode
  </span>
);

export default Logo;
