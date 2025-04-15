import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";

export default function Header() {
  return (
    <header className="flex h-24 w-full shrink-0 items-center px-4 md:px-6 bg-gradient-to-r from-gray-100 to-gray-300 shadow-md">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden bg-white hover:bg-gray-50 border-gray-300 rounded-full shadow-sm transition-all duration-200"
          >
            <MenuIcon className="h-6 w-6 text-gray-700" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] bg-white p-6 shadow-lg">
          <div className="mb-8 flex justify-center">
            <img
              src="" alt="Logo"

              className="w-32 h-auto object-contain"
            />
          </div>
          <div className="grid gap-4">
            {["Home", "About", "Services", "Portfolio", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="flex items-center py-3 px-4 text-lg font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex justify-around items-center w-full">
        <div className="flex items-center">
          <img
            src="/public/logo-cnpm-preview.png"
            alt="Logo"
            className="w-32 h-auto object-contain"
          />
        </div>
        <NavigationMenu className="hidden lg:flex space-x-2">
          <NavigationMenuList className="flex space-x-20">
            {["Trang Chủ", "Sản phẩm", "Giới thiệu", "Portfolio", "Contact"].map((item) => (
              <NavigationMenuLink key={item} asChild>
                <div className="">
                  <Button className="group inline-flex h-10 items-center justify-center  bg-white px-6 py-6 text-sm font-semibold text-gray-800 hover:bg-gray-100 hover:text-gray-900 shadow-md transition-all duration-200  text-[1rem]">
                    {item}
                  </Button></div>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center">
          <Button
            className=" hover:bg-blue-700 text-white font-semibold py-6 px-6 rounded-full shadow-md transition-all duration-200 cursor-pointer"
          >
            Đăng nhập
          </Button>
        </div>
      </div>
    </header>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

