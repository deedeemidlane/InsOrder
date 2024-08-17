import { useEffect, useState } from "react";
import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import useLogin from "@/hooks/useLogin";
import { useAuthContext } from "@/context/AuthContext";

export default function LoginPage() {
  const { authUser } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    switch (authUser?.role) {
      case "ADMIN":
        navigate("/admin");
        break;
      case "MANAGER":
        navigate("/shop/manager");
        break;
      case "STAFF":
        navigate("/shop/staff");
        break;
      default:
        break;
    }
  }, [authUser]);

  const [showPassword, setShowPassword] = useState(false);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    login(inputs.username, inputs.password);
  };

  return (
    <main className="flex h-screen align-middle">
      <div className="m-auto w-96 rounded-lg border-gray-500 bg-white/90 p-5 shadow-lg dark:bg-zinc-800 dark:sm:border-4">
        <a href="/" className="my-10 flex justify-center">
          <img src="/logo.png" className="mr-2 h-10 w-10" />
          <span className="self-center whitespace-nowrap text-3xl font-bold dark:text-white">
            InsOrder
          </span>
        </a>
        <form
          className="flex max-w-md flex-col gap-4"
          method="post"
          onSubmit={handleSubmitForm}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Tên đăng nhập" />
            </div>
            <TextInput
              id="username"
              type="text"
              required
              shadow
              placeholder="Nhập tên đăng nhập"
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Mật khẩu" />
            </div>
            <TextInput
              id="password"
              type={showPassword ? "text" : "password"}
              required
              shadow
              placeholder="∗∗∗∗∗∗∗∗∗"
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              color="red"
              id="showPassword"
              className="hover:cursor-pointer"
              onChange={() => setShowPassword(!showPassword)}
            />
            <Label htmlFor="showPassword" className="hover:cursor-pointer">
              Hiện mật khẩu
            </Label>
          </div>

          <Button
            className="mb-10 mt-5"
            gradientMonochrome="failure"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Spinner aria-label="Spinner button example" size="sm" />
            ) : (
              "Đăng nhập"
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}
