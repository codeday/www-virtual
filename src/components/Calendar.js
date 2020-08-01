import Box, { Grid } from '@codeday/topo/Atom/Box';
import Content from '@codeday/topo/Molecule/Content';
import Text, { Heading, Link } from '@codeday/topo/Atom/Text';
import moment from 'moment-timezone';
import seed from "random-seed";
import colors from '@codeday/topo/Theme/vars/colors'

export const eventColors = {
  Event: 'gray',
  'Workshop': 'orange',
  'Livestream': 'purple',
  'Deadline': 'red',
};

export default ({ calendar, title, border }) => {
  const eventsByDay = {};
  calendar.forEach((e) => {
    const day = e.Date.clone().startOf('day').format('YYYY-MM-DD');
    if (!(day in eventsByDay)) eventsByDay[day] = [];
    eventsByDay[day].push(e);
  });
  const displayStarts = calendar[0].Date;
  const displayEnds = calendar[calendar.length - 1].Date;
  while(displayStarts.isoWeekday() !== 7){
    displayStarts.subtract(1, 'd')
  }
  while (displayEnds.isoWeekday() !== 6){
    displayEnds.add(1, 'd')
  }
  const drawDays = [];
  let day = displayStarts.clone();
  while (day.isSameOrBefore(displayEnds)) {
    drawDays.push(day.startOf('day'));
    day = day.clone().add(1, 'day');
  }

  return (
    <>
      { title && (
        <Content>
          <Heading paddingBottom={3} textAlign="center">A full calendar of events.</Heading>
          <Text textAlign="center" paddingBottom={6}>
            It's not all project work, you'll get to talk to leaders from the tech industry.
          </Text>
        </Content>
      )}
      <Content maxWidth="containers.xl">
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(7, 1fr)' }}
          borderWidth={{ base: 0, md: border ? 1 : 0 }}
          borderBottom={0}
          borderColor="gray.100"
        >
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
            <Box
              fontSize="sm"
              display={{ base: 'none', md: 'block' }}
              textAlign="center"
              color="gray.500"
              borderColor="gray.100"
              borderLeftWidth={day === 'Sunday' ? 0 : 1}
            >
              {day}
            </Box>
          ))}
          {drawDays.map((date) => (
            <Box
              borderColor="gray.100"
              borderBottomWidth={1}
              marginTop={{ base: 4, md: 0 }}
              borderLeftWidth={{ base: 0, md: date.isoWeekday() === 7 ? 0 : 1 }}
              pt={1}
            >
              <Box fontSize="sm" color="gray.500" textAlign="center">{date.format('MMM D')}</Box>
              {(date.format('YYYY-MM-DD') in eventsByDay) ? eventsByDay[date.format('YYYY-MM-DD')].sort((a, b) => (a.Date.isAfter(b.Date) ? 1 : -1)).map((event) => {
                const colorHues = Object.keys(colors)
                const baseColor = eventColors[event.Type || ''] || colorHues[seed(event.Type.toLowerCase()).intBetween(0, colorHues.length)];

                const timezone = typeof window !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Los_Angeles' : 'America/Los_Angeles';
                const start = moment.utc(event.Date).tz(timezone);

                return (
                  <Box
                    as="a"
                    d="block"
                    href={`/schedule/e/${event.id}`}
                    m={4}
                    borderWidth={1}
                    borderRadius="sm"
                    borderColor={`${baseColor}.200`}
                    backgroundColor={`${baseColor}.50`}
                  >
                    <Box
                      p={2}
                      pb={1}
                      color={`${baseColor}.800`}
                      fontSize="xs"
                      fontWeight="bold"
                      backgroundColor={`${baseColor}.200`}
                      marginBottom={2}
                      borderBottomWidth={1}
                      borderColor={`${baseColor}.200`}
                    >
                      {event.Type}&thinsp;&mdash;&thinsp;{start.format('h:mma')} your time
                    </Box>
                    <Box pl={2} pr={2} pb={1} fontSize="sm" fontWeight="bold" color={`${baseColor}.900`} textDecoration="underline">
                      {event.Title || 'TBA'}
                    </Box>
                    {start.format('MMMM-DD-YYYY') !== start.clone().tz('America/Los_Angeles').format('MMMM-DD-YYYY') && (
                    <Box pl={2} pr={2} pb={2} fontSize="xs" color="red.700" fontStyle="italic" fontWeight="bold">
                      ({start.format('MMMM D')} in your timezone)
                    </Box>
                    )}
                  </Box>
                );
              }): null}
            </Box>
          ))}
        </Grid>
      </Content>
    </>
  );
};
