const LoginLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-[100vw] h-[100vh]">
      {children}
    </div>
  );
};

export default LoginLayout;
