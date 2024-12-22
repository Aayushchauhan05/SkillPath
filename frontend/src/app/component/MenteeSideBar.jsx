import {
  BaggageClaimIcon,
  Book,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  Users2,
  MessageCircle,
  Store,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function SideBar() {
  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-10 flex-col hidden border-r w-14 bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="flex items-center justify-center gap-2 text-lg font-semibold rounded-full group h-9 w-9 shrink-0 bg-primary text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="w-4 h-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Skill Path</span>
          </Link>

          {/* Dashboard Link */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/mentee/dashboard"
                className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8"
              >
                <Home className="w-5 h-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>

          {/* Chat Link */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/mentee/dashboard/chat"
                className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="sr-only">Chat</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Chat</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/mentee/dashboard/quiz"
                className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8"
              >
                <Book className="w-5 h-5" />
                <span className="sr-only">Quiz</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Quiz</TooltipContent>
          </Tooltip>
          {/* Marketplace Link */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/mentee/marketplace"
                className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8"
              >
                <Store className="w-5 h-5" />
                <span className="sr-only">Marketplace</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Marketplace</TooltipContent>
          </Tooltip>

         
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="w-5 h-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>

        {/* Sheet for mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="w-5 h-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center justify-center w-10 h-10 gap-2 text-lg font-semibold rounded-full group shrink-0 bg-primary text-primary-foreground md:text-base"
              >
                <Package2 className="w-5 h-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Skill Path</span>
              </Link>
              {/* Links in Mobile Menu */}
              <Link
                href="/mentee/dashboard"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Home className="w-5 h-5" />
                Dashboard
              </Link>
              <Link
                href="/mentee/dashboard/chat"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <MessageCircle className="w-5 h-5" />
                Chat
              </Link>
              <Link
                href="/mentee/marketplace"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Store className="w-5 h-5" />
                Marketplace
              </Link>
              <Link
                href="/mentee/appointments"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Package className="w-5 h-5" />
                Appointments
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Settings className="w-5 h-5" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </aside>
    </TooltipProvider>
  );
}
