import React from 'react';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Content from '@codeday/topo/Molecule/Content';
import moment from 'moment-timezone';
import seed from 'random-seed';
import { useTheme } from '@codeday/topo/utils';

export const eventColors = {
  Event: 'gray',
  Workshop: 'orange',
  Livestream: 'purple',
  Deadline: 'red',
  'Gaming Tournament': 'pink',
};

export default ({
  calendar, border, displayStarts, displayEnds,
}) => {
  const eventsByDay = {};
  calendar.forEach((e) => {
    const day = e.Date.clone().tz('America/Los_Angeles').startOf('day').format('YYYY-MM-DD');
    if (!(day in eventsByDay)) eventsByDay[day] = [];
    eventsByDay[day].push(e);
  });

  const drawDays = [];
  let day = displayStarts.clone();
  while (day.isSameOrBefore(displayEnds)) {
    drawDays.push(day.startOf('day'));
    day = day.clone().add(1, 'day');
  }

  return (
    <>
      <Content maxWidth="containers.xl">
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
          borderWidth={{ base: 0, md: border ? 1 : 0 }}
          borderBottom={0}
          borderColor="gray.100"
        >
          {['Friday', 'Saturday', 'Sunday'].map((day) => (
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
                const { colors } = useTheme();
                const colorHues = Object.keys(colors);
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
              }) : null}
            </Box>
          ))}
        </Grid>
      </Content>
    </>
  );
};
