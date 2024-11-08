"use client";
import InfluencerSignupForm from "@/components/my-components/InfluencerSignupForm";
import Image from "next/image";

import heroImage from "@/assets/images/hero.webp";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (session?.user) {
      router.push("/dashboard");
    }
  }, [session, router]);
  return (
    <div className="w-full flex h-screen flex-col lg:flex-row">
      <div className="bg-[#101010] w-full lg:w-2/3 h-screen overflow-hidden relative">
        <Image
          src={heroImage}
          alt="Hero Image"
          fill
          priority
          quality={100}
          className="object-cover object-top"
        />
      </div>
      <div className="flex items-center justify-center lg:w-1/3 relative">
        <InfluencerSignupForm />
      </div>
    </div>
  );
  // return (
  //   <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
  //     <div className="hidden border-r bg-muted/40 md:block">
  //       <div className="flex h-full max-h-screen flex-col gap-2">
  //         <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
  //           <Link href="/" className="flex items-center gap-2 font-semibold">
  //             <span className="">LITTO EDU</span>
  //           </Link>
  //         </div>
  //         <div className="flex-1">
  //           <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
  //             <Link
  //               href="#"
  //               className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
  //               <Home className="h-4 w-4" />
  //               Dashboard
  //             </Link>
  //             <Link
  //               href="#"
  //               className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
  //               <GraduationCap className="h-4 w-4" />
  //               Education
  //               <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
  //                 6
  //               </Badge>
  //             </Link>
  //             <Link
  //               href="#"
  //               className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
  //               <NotebookPen className="h-4 w-4" />
  //               Test
  //             </Link>
  //             <Link
  //               href="#"
  //               className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
  //               <Users className="h-4 w-4" />
  //               Customers
  //             </Link>
  //             <Link
  //               href="#"
  //               className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
  //               <LineChart className="h-4 w-4" />
  //               Analytics
  //             </Link>
  //           </nav>
  //         </div>
  //         <div className="mt-auto p-4 text-xs text-center">
  //           &copy;Copyright 2024
  //         </div>
  //       </div>
  //     </div>
  //     <div className="flex flex-col">
  //       <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
  //         <Sheet>
  //           <SheetTrigger asChild>
  //             <Button
  //               variant="outline"
  //               size="icon"
  //               className="shrink-0 md:hidden">
  //               <Menu className="h-5 w-5" />
  //               <span className="sr-only">Toggle navigation menu</span>
  //             </Button>
  //           </SheetTrigger>
  //           <SheetContent side="left" className="flex flex-col">
  //             <nav className="grid gap-2 text-lg font-medium">
  //               <Link
  //                 href="#"
  //                 className="flex items-center gap-2 text-lg font-semibold">
  //                 <Package2 className="h-6 w-6" />
  //                 <span className="sr-only">Acme Inc</span>
  //               </Link>
  //               <Link
  //                 href="#"
  //                 className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
  //                 <Home className="h-5 w-5" />
  //                 Dashboard
  //               </Link>
  //               <Link
  //                 href="#"
  //                 className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground">
  //                 <GraduationCap className="h-5 w-5" />
  //                 Education
  //                 <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
  //                   6
  //                 </Badge>
  //               </Link>
  //               <Link
  //                 href="#"
  //                 className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
  //                 <Package className="h-5 w-5" />
  //                 Products
  //               </Link>
  //               <Link
  //                 href="#"
  //                 className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
  //                 <Users className="h-5 w-5" />
  //                 Customers
  //               </Link>
  //               <Link
  //                 href="#"
  //                 className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
  //                 <LineChart className="h-5 w-5" />
  //                 Analytics
  //               </Link>
  //             </nav>
  //             <div className="mt-auto">
  //               <Button size="sm" className="w-full">
  //                 Upgrade
  //               </Button>
  //             </div>
  //           </SheetContent>
  //         </Sheet>
  //         <div className="w-full flex-1"></div>
  //         <ModeToggle />
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="secondary" size="icon" className="rounded-full">
  //               <CircleUser className="h-5 w-5" />
  //               <span className="sr-only">Toggle user menu</span>
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuLabel>My Account</DropdownMenuLabel>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem>Settings</DropdownMenuItem>
  //             <DropdownMenuItem>Support</DropdownMenuItem>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem>Logout</DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       </header>
  //       <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
  //         <DataTable />
  //       </main>
  //     </div>
  //   </div>
  // );
}
