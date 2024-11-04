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
    ShoppingCart,
    Truck,
    Users2,
  } from "lucide-react"
  import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import { TooltipProvider } from "@/components/ui/tooltip"; 
  import Link from "next/link";


  
  export default function MenteeSideBar() {
    return (
      <TooltipProvider>
        <aside className="fixed inset-y-0 left-0 z-10 flex-col hidden border-r w-14 bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="#"
              className="flex items-center justify-center gap-2 text-lg font-semibold rounded-full group h-9 w-9 shrink-0 bg-primary text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Package2 className="w-4 h-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
  
            {/* Tooltip examples */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={"/mentee/dashboard"}
                  className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="w-5 h-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
  
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/mentee/marketplace"
                  className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8"
                >
                  <BaggageClaimIcon className="w-5 h-5" />
                  <span className="sr-only">Market</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Market</TooltipContent>
            </Tooltip>
            <Tooltip>
               <TooltipTrigger asChild>
                <Link
                  href="/mentor/dashboard/courses"
                  className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8"
                >
                  <Book className="w-5 h-5" />
                  <span className="sr-only">Course</span>
                </Link>
              </TooltipTrigger> 
               <TooltipContent side="right">Course</TooltipContent>
            </Tooltip>
          </nav>
          
          <nav className="flex flex-col items-center gap-4 px-2 mt-auto sm:py-5">
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
        </aside>
      </TooltipProvider>
    );
  }
  