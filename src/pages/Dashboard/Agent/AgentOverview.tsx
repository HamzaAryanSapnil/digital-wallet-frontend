import { DashboardOverview } from "@/components/dashboard.overview";
import { useGetDashboardOverviewQuery } from "@/redux/features/dashboard.api"






export default function AgentOverview() {
  const {data} = useGetDashboardOverviewQuery()
  console.log(data)
  return (
    <div>
      <DashboardOverview/>
    </div>
  )
}
