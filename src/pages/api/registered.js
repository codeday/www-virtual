import { getSession } from 'next-auth/client';
import checkHasRegistered from '../../utils/checkHasRegistered';

export default async function isRegistered(req, res) {
  const session = await getSession({ req });

  res.send({
    registered: await checkHasRegistered(req),
    name: session?.user?.name || null,
    signedIn: Boolean(session?.user),
  });
}
