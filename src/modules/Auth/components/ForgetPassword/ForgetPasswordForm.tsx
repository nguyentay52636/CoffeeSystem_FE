import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MoveLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function ForgetPasswordForm({
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


                        <form className="p-6 md:p-8 w-full max-w-md">
                            <Button className=" bg-transparent text-white border-2 rounded-none border-[#A27B5C] hover:bg-transparent text-bg-primary absolute top-12 cursor-pointer  right-20">
                                <MoveLeft /> Quay về Home
                            </Button>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-start">
                                    <h1 className="text-4xl font-bold my-6">Quên mật khẩu</h1>
                                    <p className="text-muted-foreground text-sm">
                                        Nhập thông tin đăng nhập để truy cập tài khoản của bạn.
                                    </p>
                                </div>

                                {/* Google Sign-In Button */}


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






                                <Button
                                    onClick={() => window.location.href = '/auth/confirm-password'}
                                    type="submit"
                                    className="w-full bg-[#5A3E2B] text-white hover:bg-[#4A3223] cursor-pointer"
                                >
                                    Gửi
                                </Button>

                                {/* Sign Up Link */}
                                <div className="text-center text-sm">
                                    Bạn chưa có tài khoản?{" "}
                                    <Link
                                        to="/auth/register"
                                        className="text-bg-primary text-[1rem] underline underline-offset-4"
                                    >
                                        Tạo tài khoản
                                    </Link>

                                </div>
                            </div>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}