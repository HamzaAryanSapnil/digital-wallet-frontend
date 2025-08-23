import { useUserInfoQuery } from '@/redux/features/auth/auth.api'


export default function Profile() {
    const {data} = useUserInfoQuery(undefined)
  return (
    <div>
      this is {data?.data?.role} {data?.data?.name}'s profile page.
    </div>
  );
}
