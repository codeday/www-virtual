import { apiFetch } from '@codeday/topo/utils';

const query = () => `{
  cms {
    events(
      limit: 1,
      order: startsAt_ASC,
      where: {
        program: { webname: "virtual" }
        endsAt_gte: "${new Date(
          new Date().getTime() - 1000 * 60 * 60 * 24
        ).toISOString()}"
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
