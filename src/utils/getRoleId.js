import { apiFetch } from '@codeday/topo/utils';

const query = () => `{
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

export default async function getRoleId() {
  const { cms } = await apiFetch(query());
  return cms?.events?.items[0]?.participantRoleId || null;
}
