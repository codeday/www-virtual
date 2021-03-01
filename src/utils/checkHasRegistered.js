import { apiFetch } from '@codeday/topo/utils';
import { getSession } from 'next-auth/client';
import getConfig from 'next/config';
import { sign } from 'jsonwebtoken';

const { serverRuntimeConfig } = getConfig();

const query = () => `query IsRegisteredQuery ($username: String!) {
  account {
    getUser(where: {username: $username}, fresh: true) {
      roles {
        id
      }
    }
  }

  cms {
    events(
      limit: 1,
      order: startsAt_ASC,
      where: {
        program: { webname: "virtual" }
        endsAt_gte: "${(new Date((new Date()).getTime())).toISOString()}"
      }
    ) {
      items {
        participantRoleId
      }
    }
  }
}`;

export default async function checkHasRegistered(req) {
  const session = await getSession({ req });
  if (!session || !session.user) return false;

  const gqltoken = serverRuntimeConfig.auth0.ACCOUNT_ADMIN_TOKEN;
  const token = sign({ scopes: 'read:users' }, gqltoken, { expiresIn: '30s' });

  const { account, cms } = await apiFetch(query(), {
    username: session.user.nickname
  }, {
    Authorization: `Bearer ${token}`
  });

  const currentRole = cms?.events?.items[0]?.participantRoleId;
  const hasRoles = account?.getUser?.roles;
  if (!currentRole || !hasRoles) return false;

  return hasRoles.reduce((hasRole, role) => hasRole || role.id === currentRole, false);
}
