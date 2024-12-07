import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ChangePasswordModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          Đổi mật khẩu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="">Đổi mật khẩu</DialogTitle>
        </DialogHeader>
        <div className="max-h-[500px] overflow-auto">
          <hr />
          <div className="grid gap-4 py-4  sm:px-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="oldPassword" className="text-right">
                Mật khẩu cũ
              </Label>
              <Input id="oldPassword" className="col-span-3" type="password" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newPassword" className="text-right">
                Mật khẩu mới
              </Label>
              <Input id="newPassword" className="col-span-3" type="password" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirmPassword" className="text-right">
                Nhập lại mật khẩu
              </Label>
              <Input
                id="confirmPassword"
                className="col-span-3"
                type="password"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Hủy
            </Button>
          </DialogClose>
          <Button type="submit">Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
