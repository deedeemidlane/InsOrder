import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Spinner } from "flowbite-react";

export default function AddShopModal({
  handleSubmitForm,
  open,
  setOpen,
  loading,
}: {
  handleSubmitForm: (e: React.FormEvent, inputs: {}) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}) {
  const [inputs, setInputs] = useState({
    shopName: "",
    accountNo: "",
    accountName: "",
    acqId: "",
    managerName: "",
    phone: "",
    username: "",
    password: "",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sm:whitespace-nowrap">Thêm cửa hàng</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="">Tạo cửa hàng</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => handleSubmitForm(e, inputs)}>
          <div className="max-h-[500px] overflow-auto">
            <hr />
            <h3 className="text-md mt-2 font-bold text-cyan-700">
              Thông tin cửa hàng
            </h3>
            <div className="grid gap-4 py-4 sm:px-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="shopName" className="text-right">
                  Tên
                </Label>
                <Input
                  id="shopName"
                  className="col-span-3"
                  placeholder="Nhập tên cửa hàng"
                  required
                  onChange={(e) =>
                    setInputs({ ...inputs, shopName: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="accountNo" className="text-right">
                  Số tài khoản
                </Label>
                <Input
                  id="accountNo"
                  className="col-span-3"
                  required
                  pattern={REGEXP_ONLY_DIGITS}
                  onChange={(e) =>
                    setInputs({ ...inputs, accountNo: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="accountName" className="text-right">
                  Tên tài khoản
                </Label>
                <Input
                  id="accountName"
                  className="col-span-3"
                  required
                  placeholder="Nhập tiếng Việt không dấu, viết hoa"
                  onChange={(e) =>
                    setInputs({ ...inputs, accountName: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="BIN" className="text-right">
                  Mã BIN ngân hàng
                </Label>
                <InputOTP
                  maxLength={6}
                  minLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  required
                  value={inputs.acqId}
                  onChange={(value) => setInputs({ ...inputs, acqId: value })}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            <hr />
            <h3 className="text-md mt-2 font-bold text-cyan-700">
              Thông tin quản lý
            </h3>
            <div className="grid gap-4 py-4  sm:px-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="managerName" className="text-right">
                  Tên
                </Label>
                <Input
                  id="managerName"
                  className="col-span-3"
                  placeholder="Nhập tên quản lý"
                  required
                  onChange={(e) =>
                    setInputs({ ...inputs, managerName: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Số điện thoại
                </Label>
                <Input
                  id="phone"
                  minLength={10}
                  maxLength={10}
                  className="col-span-3"
                  type="tel"
                  required
                  onChange={(e) =>
                    setInputs({ ...inputs, phone: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Tên đăng nhập
                </Label>
                <Input
                  id="username"
                  className="col-span-3"
                  required
                  onChange={(e) =>
                    setInputs({ ...inputs, username: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Mật khẩu
                </Label>
                <Input
                  id="password"
                  className="col-span-3"
                  type="password"
                  required
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          {/* <DialogFooter> */}
          {loading ? (
            <div className="w-full">
              <Button className="w-full" disabled>
                <Spinner className="h-5" />
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Hủy bỏ
                </Button>
              </DialogClose>
              <Button type="submit">Lưu</Button>
            </div>
          )}
        </form>
        {/* </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
