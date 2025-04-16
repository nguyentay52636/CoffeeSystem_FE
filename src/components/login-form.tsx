import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MoveLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("flex min-h-screen w-full", className)} {...props}>

      <Card className="overflow-hidden p-0 h-screen w-full rounded-none">
        <CardContent className="grid p-0 md:grid-cols-[40%_60%] h-full">
          <div className="bg-[#F5E8D3] relative hidden md:block h-full p-8">

            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-[#5A3E2B]">IMAJI COFFEE.</h1>
              <h2 className="text-4xl font-bold text-[#5A3E2B]">
                Chúng Tôi Cũng Có Cà Phê Dành Cho Bạn Tại Nhà.
              </h2>
              <p className="text-[#5A3E2B] text-sm">
                Ngày lễ, công việc và tiệc tùng là cơ hội tuyệt vời để thưởng thức một tách cà phê thơm ngon.
              </p>
              <Button className="bg-[#5A3E2B] text-white w-fit hover:bg-[#4A3223]">
                Đặt Hàng Ngay
              </Button>
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


            <form className="p-6 md:p-8 w-full max-w-md">
              <Button className=" bg-transparent text-white border-2 rounded-none border-[#A27B5C] hover:bg-transparent text-bg-primary absolute top-12 cursor-pointer  right-20">
                <MoveLeft /> Back To Home
              </Button>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-start">
                  <h1 className="text-4xl font-bold my-6">Chào Mừng Trở Lại</h1>
                  <p className="text-muted-foreground text-sm">
                    Nhập thông tin đăng nhập để truy cập tài khoản của bạn.
                  </p>
                </div>

                {/* Google Sign-In Button */}
                <Button
                  variant="outline"
                  type="button"
                  className="w-full flex gap-2 border-gray-300 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Đăng Nhập Bằng Google
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Hoặc sử dụng email
                </div>

                {/* Email Input */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Nhập email"
                    required
                  />
                </div>

                {/* Password Input */}
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
                <div className="flex justify-between">

                  <div className="flex items-center justify-begin gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm">
                      Ghi Nhớ Tôi
                    </Label>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <a href="#"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Quên Mật Khẩu?
                    </a>
                  </div>
                </div>

                {/* Remember Me Checkbox */}


                {/* Sign In Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#5A3E2B] text-white hover:bg-[#4A3223] cursor-pointer"
                >
                  Đăng Nhập
                </Button>

                {/* Sign Up Link */}
                <div className="text-center text-sm">
                  Bạn chưa có tài khoản?{" "}
                  <a
                    href="#"
                    className="text-bg-primary text-[1rem] underline underline-offset-4"
                  >
                    Tạo tài khoản
                  </a>
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}