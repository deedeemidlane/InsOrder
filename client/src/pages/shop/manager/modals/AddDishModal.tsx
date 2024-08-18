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
import { useEffect, useState } from "react";

export default function AddDishModal({
  handleSubmitForm,
  open,
  setOpen,
  loading,
}: {
  handleSubmitForm: (
    e: React.FormEvent,
    image: File,
    name: string,
    price: number,
  ) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}) {
  const [inputs, setInputs] = useState({
    name: "",
    price: 0,
  });

  const [image, setImage] = useState<File>(new File(["foo"], "foo.txt"));

  useEffect(() => {
    console.log("image: ", image);
  }, [image]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <form
          onSubmit={(e) =>
            handleSubmitForm(e, image, inputs.name, inputs.price)
          }
        >
          <div className="max-h-[500px] overflow-auto">
            <hr />
            <div className="grid gap-4 py-4 sm:px-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="shopName" className="text-right">
                  Tên món
                </Label>
                <Input
                  id="shopName"
                  className="col-span-3"
                  placeholder="Nhập tên món"
                  required
                  value={inputs.name}
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Ảnh minh họa
                </Label>
                <Input
                  id="image"
                  className="col-span-3 p-0"
                  type="file"
                  required
                  onChange={(e) => {
                    // console.log(e.target.files[0]);
                    if (e.target.files) {
                      setImage(e.target.files[0]);
                    }
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="accountNo" className="text-right">
                  Giá
                </Label>
                <Input
                  id="accountNo"
                  className="col-span-3"
                  required
                  type="number"
                  value={inputs.price || ""}
                  onChange={(e) =>
                    setInputs({ ...inputs, price: parseInt(e.target.value) })
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
