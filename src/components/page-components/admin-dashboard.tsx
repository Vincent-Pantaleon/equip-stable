'use client'

import { 
    CardContainer, 
    CardContent, 
    CardDescription, 
    CardWrapper 
} from '../card';

import { 
    LineChart, // LINE CHART 
    XAxis, 
    YAxis, 
    Line, 
    CartesianGrid, 
    Legend, 
    Tooltip,
    PieChart, // PIE CHART
    Pie,
    Cell,
    BarChart, // BAR CHART
    Bar,
    ResponsiveContainer
} from 'recharts';

import { Skeleton } from '../ui/skeleton';
import MainLayoutLoading from '@/app/loading';

import { useQuery } from '@tanstack/react-query';
import { GetDashboardCounts } from '@/utils/server-actions/fetch-dashboard-counts';
import { toast } from 'sonner';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const COLORS = [
  '#1f77b4', // Muted Blue
  '#ff7f0e', // Safety Orange
  '#2ca02c', // Cooked Asparagus (Dark Green)
  '#d62728', // Brick Red
  '#9467bd', // Muted Purple
  '#8c564b', // Brown
  '#e377c2', // Raspberry
  '#7f7f7f', // Middle Gray
  '#bcbd22', // Olive Green
  '#17becf', // Muted Cyan
  '#aec7e8', // Light Steel Blue
  '#ffbb78', // Light Orange
  '#98df8a', // Light Green
  '#ff9896', // Light Coral
  '#c5b0d5', // Light Purple
  '#c49c94', // Light Brown
  '#f7b6d2', // Pale Pink
  '#c7c7c7', // Silver
  '#dbdb8d', // Light Olive
  '#9edae5'  // Pale Cyan
];


const AdminDashboard = () => {
    const { data: DashboardCount, error, isPending } = useQuery({
        queryKey: ['dashboard-count'],
        queryFn: GetDashboardCounts,
    });

    if (error) {
        toast.error(error.message)
    }

    const numbersData = [
        { count: DashboardCount?.data?.totalEquipmentCount, name: 'No. Of Equipments' },
        { count: DashboardCount?.data?.totalVenueCount, name: 'No. Of Venues' },
        { count: DashboardCount?.data?.totalReleasesCount, name: 'Released Items' },
        { count: DashboardCount?.data?.totalBookingCount, name: 'Total No. Of Bookings' },
    ];

    return (
        <div className="h-full flex flex-col space-y-6">
                {/* Header */}
                <div className="my-4 border-b pb-4">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <p className="mt-1 text-gray-600 text-sm">
                        Monitor key statistics and resource usage across your office.
                    </p>
                </div>

                {/* KPI Cards */}
                <CardWrapper>
                    {numbersData.map((item, index) => (
                        isPending ? (
                            <Skeleton key={index} className="h-20 flex-1"/>
                        ) : (
                            <CardContainer key={index}>
                                <CardContent>
                                    {item.count ? item.count : "No Data Available"}
                                </CardContent>
                                <CardDescription>
                                    {item.name ? item.name : "No Data Available"}
                                </CardDescription>
                            </CardContainer>
                        )
                    ))}
                </CardWrapper>

                {/* Charts Section */}
                {isPending ? (
                    <MainLayoutLoading />
                ) : (
                    <div className='grid gap-2 p-2 overflow-auto grid-cols-2'>
                        {/* Line Chart - BOOKING BY MONTH */}
                        <div className='p-3 outline-1 rounded-lg'>
                            <h2 className='text-lg mb-4'>Booking Activity</h2>
                            <div>
                                <LineChart
                                    data={DashboardCount?.data?.bookingCount}
                                    style={{
                                        width: "100%",
                                        height: "420px",
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

                                    <XAxis
                                        dataKey="booking_month"
                                        tick={{ fill: "#6b7280" }}
                                        stroke="#9ca3af"
                                    />

                                    <YAxis
                                        dataKey="booking_count"
                                        tick={{ fill: "#6b7280" }}
                                        stroke="#9ca3af"
                                        allowDecimals={false}
                                    />

                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "white",
                                            borderRadius: "12px",
                                            border: "1px solid #e5e7eb",
                                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                        }}
                                    />

                                    <Legend
                                        wrapperStyle={{
                                        color: "#374151",
                                        }}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="booking_count"
                                        stroke="#6366f1"
                                        strokeWidth={2}
                                        dot={{ r: 5, fill: "#6366f1" }}
                                        activeDot={{ r: 8, strokeWidth: 0 }}
                                    />
                                </LineChart>

                            </div>
                        </div>
                        {/* Bar Chart - BY ITEM (SWAP BETWEEN EQUIPMENT OR VENUE)*/}
                        <div className='p-3 outline-1 rounded-lg'>
                            <h2 className='text-lg mb-4'>Total Borrowed Items</h2>

                            <ResponsiveContainer width="100%" height={420}>
                                <BarChart data={DashboardCount?.data?.releasesCount}>
        
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

                                    <XAxis
                                        dataKey="request_type"
                                        tick={{ fill: "#6b7280" }}
                                        stroke="#d1d5db"
                                    />

                                    <YAxis
                                        tick={{ fill: "#6b7280" }}
                                        stroke="#d1d5db"
                                        allowDecimals={false}
                                    />

                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "white",
                                            borderRadius: "8px",
                                            border: "1px solid #e5e7eb",
                                            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                                        }}
                                        labelStyle={{ color: "#374151" }}
                                    />

                                    <Legend/>

                                    <Bar
                                        dataKey="release_count"
                                        fill="#6366f1"
                                        radius={[6, 6, 0, 0]}   // Rounded top corners
                                        maxBarSize={50}         // Prevent bars from being too wide
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Pie Chart - SHOW EACH NUMBER OF EACH EQQUIPMENT AND VENUE */}
                        <div className='p-3 outline-1 rounded-lg'>
                            <h2 className='text-lg mb-4'>Equipment Metrics</h2>

                            <div className='flex items-center justify-center'>
                                <PieChart
                                    style={{ width: '100%', height: '100%', maxWidth: '100%', maxHeight: '50vh', aspectRatio: 1 }}
                                    responsive
                                >
                                    <Pie
                                        data={DashboardCount?.data?.normalizeEquipmentData}
                                        dataKey="count"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius="60%"
                                        isAnimationActive={true}
                                        label
                                    >
                                        {
                                            DashboardCount?.data?.normalizeEquipmentData?.map((entry: string, index: number) => (
                                                <Cell 
                                                    key={`cell-${index}`} 
                                                    fill={COLORS[index % COLORS.length]} // Cycles through the 20 colors
                                                />
                                            ))
                                        }
                                    </Pie>

                                    <Legend align='right' layout='vertical' verticalAlign='middle'/>
                                </PieChart>
                            </div>
                        </div>
                        <div className='p-3 outline-1 rounded-lg'>
                            <h2 className='text-lg mb-4'>Venue Metrics</h2>

                            <div className='flex items-center justify-center'>
                                <PieChart
                                    style={{ width: '100%', height: '100%', maxWidth: '100%', maxHeight: '50vh', aspectRatio: 1 }}
                                    responsive
                                >
                                    <Pie
                                        data={DashboardCount?.data?.normalizeVenueData}
                                        dataKey="count"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius="60%"
                                        isAnimationActive={true}
                                        label
                                    >
                                        {
                                            DashboardCount?.data?.normalizeVenueData?.map((entry: string, index: number) => (
                                                <Cell 
                                                    key={`cell-${index}`} 
                                                    fill={COLORS[index % COLORS.length]} // Cycles through the 20 colors
                                                />
                                            ))
                                        }
                                    </Pie>
                
                                    <Legend align='right' layout='vertical' verticalAlign='middle'/>
                                </PieChart>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
};

export { AdminDashboard };
