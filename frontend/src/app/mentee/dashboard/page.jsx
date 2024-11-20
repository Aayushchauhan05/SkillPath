"use client"
import Image from "next/image"
import Link from "next/link"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  Eye
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
import { useState, useEffect, useCallback } from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "@/features/todo/Slice";
import MenteeSideBar from "@/app/component/MenteeSideBar";

export const description = "A bar chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};
function Dashboard() {
  const [session, setSession] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = dispatch(loadUser());
    return () => unsubscribe();
  }, [dispatch]);
  const userId = useSelector((state) => state.auth.currentuser?.uid);
  const fetchSession = useCallback(async () => {
    if (!userId) {
      console.log("user id not found");
      return;
    }
    try {

      const response = await AxiosInstance.get(`/bid/bids/mentee/${userId}`);
      setSession(response.data);
    } catch (e) {
      console.log(e);
    }
  }, [userId]);
  useEffect(() => {
    fetchSession();
  }, userId);
  return (
    <div className="flex flex-col w-full min-h-screen bg-muted/40">
      <MenteeSideBar />
      {/* <Card>
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
      </Card> */}
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
                  <Link href="#">Sessions</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All sessions</BreadcrumbPage>
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
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid items-start flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid items-start gap-4 auto-rows-max md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                <CardHeader className="pb-3">
                  <CardTitle>Your sesssions</CardTitle>
                  <CardDescription className="max-w-lg leading-relaxed text-balance">
                    Introducing Our Dynamic Orders Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter></CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>Total revenue</CardDescription>
                  <CardTitle className="text-4xl">
                    {/* ₹ {listing.reduce((Total, elem) => {
      return elem.sessionStatus === "completed" ? Total + elem.sessionPrice : Total;
  }, 0)} */}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div> */}
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>

              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className="text-4xl">$5,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +10% from last month
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={12} aria-label="12% increase" />
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="week">
             
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Bids</CardTitle>
                    <CardDescription>Bids details.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Bids</TableHead>
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
                            View
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {session.map((elem) => (
                          <TableRow key={elem.listingId} className="bg-accent">
                            <TableCell>
                              <div className="font-medium">{elem?.topic}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                {elem.mentorId?.email}
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {elem.menteeId?.role}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                {elem?.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {elem.meetId?.start}
                            </TableCell>
                            <TableCell className="text-right">{`₹ ${elem?.payingAmount}`}</TableCell>
                            <TableCell className="hidden md:table-cell">
                            <Dialog>
                               <DialogTrigger>
                                <Eye className="w-5 h-5 text-blue-500 cursor-pointer" />
                                 </DialogTrigger>
                               <DialogContent>
                                  <DialogHeader>
                                     <DialogTitle>
                                     User Details
                                     </DialogTitle>
                                  <DialogDescription>
                                    Review the details below.
                                      </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <strong>User Name:</strong>
                                    {elem.menteeId?.username}
                                  </div>
                                  <div>
                                    <strong>Email:</strong>
                                    {elem.menteeId?.email}
                                  </div>
                                  <div>
                                    <strong>Experience:</strong>
                                    {elem.menteeId?.experience || "N/A"}
                                  </div>
                                  <div>
                                    <strong>Description:</strong>
                                    {elem?.description || "N/A"}
                                  </div>
                                  <div>
                                    <strong>Payment Amount:</strong> ₹
                                    {elem?.paymentAmount || "N/A"}
                                  </div>
                                  <div>
                                    <strong>MeetLink:</strong> 
                                    {elem?.meetId?.meetLink || "N/A"}
                                  </div>
                                  <div>
                                    <strong>Start Date and Time:</strong>
                                    {new Date(
                                      elem?.listingId?.start
                                    ).toLocaleString() || "N/A"}
                                  </div>
                                  <div>
                                    <strong>End Date and Time:</strong>
                                    {new Date(
                                      elem?.listingId?.end
                                    ).toLocaleString() || "N/A"}
                                  </div>
                                </div>
                                 </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
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
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={8}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
