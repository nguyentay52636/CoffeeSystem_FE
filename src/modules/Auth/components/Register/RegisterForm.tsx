
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("flex min-h-screen w-full", className)} {...props}>
      <Card className="overflow-hidden p-0 h-screen w-full rounded-none">
        <CardContent className="grid p-0 md:grid-cols-[40%_60%] h-full">
          <div className="bg-[#F5E8D3] relative hidden md:block h-full p-8">
            <div className="flex flex-col gap-6 my-20 justify-center items-center">
              <div className="flex justify-center gap-2">
                <h1 className="text-3xl font-semibold text-black text-center">SGU</h1>
                <h1 className="text-3xl font-semibold text-bg-primary text-center ">COFFEE</h1>
              </div>
              <div className="mx-4 ">
                <h2 className="text-4xl font-semibold text-[#5A3E2B] whitespace-break-space mx-20 text-center">
                  Chúng Tôi Cũng Có Cà Phê Dành Cho Bạn Tại Nhà.
                </h2>
                <p className="text-[#5A3E2B] text-sm  mx-20 my-4">
                  Ngày lễ, công việc và tiệc tùng là cơ hội tuyệt vời để thưởng thức một tách cà phê thơm ngon.
                </p>
                <div className="my-8 flex justify-center">
                  <Button className=" bg-transparent text-white border-2  rounded-none border-[#A27B5C] hover:bg-transparent text-bg-primary  cursor-pointer">
                    Đặt hàng ngày
                  </Button>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full">
              <img
                src="/coffee-bags.png"
                alt="Túi Cà Phê"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>

          <div className="flex items-center justify-center h-full bg-white">
            <div className="p-6 md:p-8 w-full max-w-md">
              <Button className=" bg-transparent text-white border-2 rounded-none border-[#A27B5C] hover:bg-transparent text-bg-primary absolute top-12 cursor-pointer right-20">
                <MoveLeft /> Quay về Home
              </Button>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-start">
                  <h1 className="text-4xl font-bold my-6">Tạo Tài Khoản</h1>
                  <p className="text-muted-foreground text-sm">
                    Điền thông tin để đăng ký tài khoản mới.
                  </p>
                </div>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full flex gap-2 border-gray-300 cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="svg0 9">
                      <path id="Path" d="M19.9997 10.2247C19.9997 9.56634 19.9401 8.94134 19.8379 8.33301H10.2168V12.0913H15.7255C15.4786 13.3247 14.7549 14.3663 13.6821 15.0747V17.5747H16.9686C18.8928 15.833 19.9997 13.2663 19.9997 10.2247Z" fill="#4285F4" />
                      <path id="Path_2" d="M10.2174 19.9999C12.976 19.9999 15.2834 19.0999 16.9692 17.5749L13.6827 15.0749C12.7632 15.6749 11.5967 16.0415 10.2174 16.0415C7.55244 16.0415 5.29616 14.2832 4.48731 11.9082H1.09863V14.4832C2.77594 17.7499 6.22422 19.9999 10.2174 19.9999Z" fill="#34A853" />
                      <path id="Path_3" d="M4.48702 11.9083C4.27416 11.3083 4.16347 10.6666 4.16347 9.99993C4.16347 9.33327 4.28267 8.6916 4.48702 8.0916V5.5166H1.09834C0.40017 6.8666 0 8.38327 0 9.99993C0 11.6166 0.40017 13.1333 1.09834 14.4833L4.48702 11.9083Z" fill="#FBBC05" />
                      <path id="Path_4" d="M10.2174 3.95833C11.7244 3.95833 13.0697 4.46667 14.134 5.45833L17.0458 2.60833C15.2834 0.991667 12.976 0 10.2174 0C6.22422 0 2.77594 2.25 1.09863 5.51667L4.48731 8.09167C5.29616 5.71667 7.55244 3.95833 10.2174 3.95833Z" fill="#EA4335" />
                    </g>
                  </svg>

                  Đăng Nhập Bằng Google
                </Button>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">Họ và Tên</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Nhập họ và tên"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Nhập email"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">Mật Khẩu</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">Số Điện Thoại</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="address">Địa Chỉ</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Nhập địa chỉ"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#5A3E2B] text-white hover:bg-[#4A3223] cursor-pointer"
                >
                  Đăng Ký
                </Button>

                <div className="text-center text-sm">
                  Đã có tài khoản?{" "}
                  <Link
                    to="/auth/login"
                    className="text-bg-primary text-[1rem] underline underline-offset-4"
                  >
                    Tạo tài khoản
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}