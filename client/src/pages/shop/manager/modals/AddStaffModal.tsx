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
import { Spinner } from "flowbite-react";

import { PlusCircle } from "lucide-react";
import { useState } from "react";

export default function AddStaffModal({
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
    name: "",
    username: "",
    password: "",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sm:whitespace-nowrap">
            Tạo tài khoản nhân viên mới
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="">Tạo tài khoản</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => handleSubmitForm(e, inputs)}>
          <div className="max-h-[500px] overflow-auto">
            <hr />
            <div className="grid gap-4 py-4 sm:px-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="staffName" className="text-right">
                  Tên nhân viên
                </Label>
                <Input
                  id="staffName"
                  className="col-span-3"
                  placeholder="Nhập tên nhân viên"
                  required
                  value={inputs.name}
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
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
                  value={inputs.username}
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
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
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
      </DialogContent>
    </Dialog>
  );
}
