import { getUserName } from '@/lib/getUser';

const UserName = async () => {
  const userName = await getUserName();

  return (
    <p className="">{userName}</p>
  )
}

export default UserName