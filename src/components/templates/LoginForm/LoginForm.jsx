import { LoginFormField } from "../../../constants/LoginFormFields";
import LOGO from "../../../assets/images/university-logo.png";
const LoginForm = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-[100vw] h-[100vh]">
      <div className="bg-slate-500 md:order-1 order-2 flex flex-col items-center justify-center">
        <h1 className="mb-10 font-bold text-slate-50">
          سامانه اخذ پروژه کارشناسی
        </h1>

        <form className="flex flex-col gap-10">
          <div>
            <label
              htmlFor={LoginFormField.Username.key}
              className="block mb-2 text-sm text-slate-50">
              {LoginFormField.Username.label}
            </label>
            <input
              type="text"
              className="outline-none rounded-lg w-[100%] p-2 focus:border-slate-800 focus:border-2 border-2 border-transparent"
              id={LoginFormField.Username.key}
              required
            />
          </div>
          <div>
            <label
              htmlFor={LoginFormField.Password.key}
              className="block mb-2 text-sm text-slate-50">
              {LoginFormField.Password.label}
            </label>
            <input
              type="text"
              className="outline-none rounded-lg w-[100%] p-2 focus:border-slate-800 focus:border-2 border-2 border-transparent"
              id={LoginFormField.Password.key}
              required
            />
          </div>
          <button className="bg-slate-50 border-none outline-none rounded-lg w-[100%] p-2">
            ورود
          </button>
        </form>
      </div>
      <div className="bg-gray-50 flex items-center justify-center md:order-2 order-1">
        <img src={LOGO} className="w-[40%]" alt="" />
      </div>
    </div>
  );
};

export default LoginForm;
