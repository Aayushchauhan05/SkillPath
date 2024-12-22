"use client"
import Image from "next/image"
import Link from "next/link"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { TrendingUp } from "lucide-react"
import {
  BaggageClaimIcon,
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

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useSearchParams } from "next/navigation";
import { useState,useEffect,useCallback } from "react"
import AxiosInstance from "@/lib/AxiosInstance"
import { useSelector,useDispatch } from "react-redux"
import { loadUser } from "@/features/todo/Slice";
import EventDialog from "@/app/component/Session"
import SideBar from "@/app/component/MentorSideBar"
import CourseForm from "@/app/component/CourseForm"
import { FaGoogle } from "react-icons/fa"
import { useAuth } from "@/context/context";
import QuizForm from "@/app/component/QuizForm"
export const description =
  "An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information."

export default function Page() {
  const [listing,setListing]=useState([]);
  // const dispatch= useDispatch()
  const dispatch= useDispatch()
  const { addToken,addCode } = useAuth();

 
  
useEffect(() => {
    const unsubscribe = dispatch(loadUser());
    return () => unsubscribe(); 
  }, [dispatch]);
  const userId=  useSelector(state=>state.auth.currentuser?.uid);
  const fetchData = useCallback(async () => {
    try {
      if (!userId) {
        console.error('User ID is undefined');
        return;
      }
      console.log(`Fetching listings for user ID: ${userId}`);
      const response = await AxiosInstance.get(`/listing/get_listings_by_mentor/${userId}`);
      setListing(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [userId]);
  useEffect(()=>{
fetchData()
  },[fetchData,userId])
  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ]
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    }}
    const handleAuth = async () => {
      try {
        if (!userId) {
          console.error('User ID is undefined for meet auth');
          alert("try again to authorise")
          return;
        }
       
    console.log("Fetching authorization URL...");
    const response = await AxiosInstance.get("auth/url");

   
    const authUrl = response.data.authUrl;
    if (!window.location.search) {
      console.log("Redirecting to:", authUrl);
      window.location.href = authUrl;
      return; 
    }

   
    const searchParams = new URLSearchParams(window.location.search);
    const authCode = searchParams.get("code");

    if (!authCode) {
      throw new Error("Authorization code not found in the query parameters.");
    }
    console.log("Authorization code received:", authCode);

    
    const oAuthResponse = await AxiosInstance.get(`/oauth2callback?code=${authCode}`);
    const tokens = oAuthResponse.data.tokens;

   
    localStorage.setItem("oAuthToken", JSON.stringify(tokens));
    console.log("OAuth tokens stored:", tokens);
   
    const refreshtoken= JSON.stringify(tokens)
    console.log("token>>>>",tokens.refresh_token)
    if(tokens.refresh_token){
      const tokenSave= await AxiosInstance(`/Auth/update/${userId}`,{
        refresh_token:tokens.refresh_token
      })
    }

    window.history.replaceState({}, document.title, window.location.pathname);
  } catch (error) {
    console.error("Error during OAuth process:", error.message);
  }
    };
  return (
    <div className="flex flex-col w-full min-h-screen bg-muted/40">
       <SideBar/>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-4 border-b h-14 bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Meets</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Recent Meets</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative flex-1 ml-auto md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/placeholder-user.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href={"/logout"}>Logout</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid items-start flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid items-start gap-4 auto-rows-max md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="w-full max-w-4xl p-4 mx-auto md:col-span-2">
      <CardHeader className="space-y-4">
        <CardTitle className="text-xl font-bold md:text-2xl">
         Mentor Dashboard
        </CardTitle>
        <CardDescription className="max-w-lg text-sm leading-relaxed md:text-base">
          Introducing Our Dynamic Orders Dashboard for Seamless
          Management and Insightful Analysis.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-center justify-start gap-4 pt-6 sm:flex-row">
        <div className="w-full sm:w-auto">
          <EventDialog />
        </div>
        <div className="w-full sm:w-auto">
          <QuizForm />
        </div>
        <div className="w-full sm:w-auto">
        <Button 
          onClick={handleAuth}
          className="flex items-center min-w-[4vw] gap-2 sm:w-auto "
        >
          Auth for meet
          <FaGoogle className="w-4 h-4" />
        </Button>
        </div>
        
      </CardFooter>
    </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>Total revenue</CardDescription>
                  <CardTitle className="text-4xl"> 
  ₹ {listing.reduce((Total, elem) => {
      return elem.sessionStatus === "completed" ? Total + elem.sessionPrice : Total;
  }, 0)}
</CardTitle>
                </CardHeader>
                <CardContent>
                
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
            
            </div>
            <Tabs defaultValue="week">
              
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Session</CardTitle>
                    <CardDescription>
                      Recent Session.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mentee</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Type
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="hidden md:table-cell">
                           view
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {listing.map((elem,index)=>(<TableRow key={index} className="bg-accent">
                          <TableCell>
                            <div className="font-medium">{elem?.topic}</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {elem.domain}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              {elem?.sessionStatus}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {elem.start}
                          </TableCell>
                          <TableCell className="text-right">{` ₹ ${elem?.sessionPrice}`}</TableCell>
                          <TableCell className="hidden md:table-cell">
                           <Link href={`/mentor/dashboard/${elem._id}`}>View</Link>
                          </TableCell>
                        </TableRow>))}
                        
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <Card>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="w-4 h-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
    
        </main>
      </div>
    </div>
  )
}
