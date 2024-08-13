import { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main
      className={`flex h-screen align-middle sm:bg-[url('/login-background.jpg')]`}
    >
      <div className="m-auto w-96 rounded-lg border-gray-500 bg-white/90 p-5 shadow-lg dark:bg-zinc-800 dark:sm:border-4">
        <a href="/" className="my-10 flex justify-center">
          <img src="/logo.png" className="mr-2 h-10 w-10" />
          <span className="self-center whitespace-nowrap text-3xl font-bold dark:text-white">
            InsOrder
          </span>
        </a>
        <p className="mb-3 font-bold text-red-600 dark:text-red-400">
          {/* {actionData} */}
        </p>
        <form className="flex max-w-md flex-col gap-4" method="post">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Tên đăng nhập" />
            </div>
            <TextInput
              id="email"
              type="text"
              required
              shadow
              name="username"
              placeholder="Nhập tên đăng nhập"
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
              name="password"
              placeholder="∗∗∗∗∗∗∗∗∗"
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
          >
            Đăng nhập
          </Button>
        </form>
      </div>
    </main>
  );
}
