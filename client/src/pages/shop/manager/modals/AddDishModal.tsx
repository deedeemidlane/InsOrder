import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  // DialogDescription,
  DialogFooter,
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

export default function AddDishModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sm:whitespace-nowrap">Thêm món</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="">Thêm món</DialogTitle>
        </DialogHeader>
        <div className="max-h-[500px] overflow-auto">
          <hr />
          {/* <div className="grid gap-4 py-4 sm:px-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shopName" className="text-right">
                Tên
              </Label>
              <Input
                id="shopName"
                className="col-span-3"
                placeholder="Nhập tên cửa hàng"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Ảnh đại diện
              </Label>
              <Input id="image" className="col-span-3 p-0" type="file" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountNo" className="text-right">
                Số tài khoản
              </Label>
              <Input id="accountNo" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="BIN" className="text-right">
                Mã BIN ngân hàng
              </Label>
              <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
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
          </div> */}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Hủy bỏ
            </Button>
          </DialogClose>
          <Button type="submit">Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
