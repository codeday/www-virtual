import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@codeday/topo/Atom/Box';
import Content from '@codeday/topo/Molecule/Content';
import Text, { Heading, Link } from '@codeday/topo/Atom/Text';
import { default as Input } from '@codeday/topo/Atom/Input/Text';
import Form from '@codeday/topo/Molecule/CognitoForm';
import Button from '@codeday/topo/Atom/Button';
import moment from 'moment-timezone';
import axios from 'axios';
import { eventColors } from './Calendar';
import colors from '@codeday/topo/Theme/vars/colors';
import seed from 'random-seed';
const renderMultiline = (str) => str && str
  .replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/\n/g, '<br />')
  .replace(/(https?:\/\/[^\s]+)/g, (url) => `<a href="${url}" style="text-decoration: underline" target="_blank">${url}</a>`);

export default function Event({ event }) {
  const [phone, setPhone] = useState('');
  const [fromNow, setFromNow] = useState('');
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const [error, setError] = useState(null);

  const timezone = 'America/Los_Angeles';
  const localTimezone = typeof window !== 'undefined'
    ? Intl.DateTimeFormat().resolvedOptions().timeZone || timezone
    : timezone;

  const localStart = moment.utc(event.Date).tz(localTimezone);
  const start = moment.utc(event.Date).tz(timezone);

  const dateFormat = 'MMMM DD, YYYY';
  const timeFormat = 'h:mma';
  const combinedFormat = `${dateFormat} @ ${timeFormat}`;

  const localIdentical = localStart.format(combinedFormat) === start.format(combinedFormat);
  const localDateMatches = localStart.format(dateFormat) === start.format(dateFormat);
  const colorHues = Object.keys(colors)
  const baseColor = eventColors[event.Type || ''] || colorHues[seed(event.Type.toLowerCase()).intBetween(0, colorHues.length)];
  const calendarEventStart = moment.utc(event.Date);
  const calendarEventFormat = 'YYYYMMDDTHHmmSS';
  const calendarDescription = event.Description;
  const calendarInviteURL = event.Link;
  const momentRefreshInterval = null;
  useEffect(() => {
    setFromNow(start.fromNow());
    setInterval(() => setFromNow(start.fromNow()), 60000);
    return () => clearInterval(momentRefreshInterval);
  }, [start.format(combinedFormat)]);

  return (
    <Content>
      <Box>
        <Box
          d="inline-block"
          borderRadius={2}
          bg={`${baseColor}.100`}
          borderColor={`${baseColor}.300`}
          borderWidth={2}
          color={`${baseColor}.900`}
          p={1}
          pl={2}
          pr={2}
          mb={4}
          fontSize="sm"
        >
          {event.Type}
        </Box>
        <Text>
          {localStart.format(combinedFormat)}
          {!localIdentical && ` (${start.format(localDateMatches ? timeFormat : combinedFormat)} Pacific)`}
          {fromNow && ` - ${fromNow}`}
        </Text>
        <Heading as="h2" fontSize="4xl">{event.Title || 'TBA'}</Heading>
        <Text fontSize="xl" mb={8} fontStyle="italic">{event.Location}</Text>
        <Text fontSize="xl" mb={8} dangerouslySetInnerHTML={{ __html: renderMultiline(event.Description) }} />

        {(
          start.clone().subtract(1, 'hours').isBefore(moment.now())
          && start.clone().add(2, 'hours').isAfter(moment.now())
        ) ? (
          <Box mb={12}>
            <Button
              as="a"
              variantColor="green"
              href={`/api/join?id=${event.id}`}
              size="lg"
            >
              Join
            </Button>
          </Box>
          ) : (start.clone().add(2, 'hours').isAfter(moment.now()) && (
          <Box mb={12}>
            <Input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              size="lg"
              d="inline-block"
              w="md"
              verticalAlign="top"
              borderTopRightRadius={0}
              borderBottomRightRadius={0}
              borderRightWidth={0}
            />
            <Button
              variantColor="green"
              variant="outline"
              onClick={async () => {
                try {
                  const response = (await axios({
                    method: 'POST',
                    url: '/api/notify',
                    headers: { 'Content-type': 'application/json' },
                    data: JSON.stringify({ id: event.id, phone }),
                    responseType: 'json',
                  })).data;
                  if (response.error) {
                    setError(response.error);
                    setHasSubscribed(false);
                  } else {
                    setHasSubscribed(true);
                    setPhone('');
                    setError(null);
                  }
                } catch (err) {
                  setError(err);
                  setHasSubscribed(false);
                }
              }}
              size="lg"
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
            >
              Text Me When This Starts
            </Button>
            {error && <Text color="red.700" bold mt={2}>{error.toString()}</Text>}
            {hasSubscribed && <Text color="green.700" bold mt={2}>We&apos;ll text you when this starts!</Text>}
            <Text>
              or <Link href={calendarInviteURL} target="_blank">add to Google Calendar</Link>
            </Text>
          </Box>
          ))}
      </Box>
    </Content>
  );
}
Event.propTypes = {
  event: PropTypes.object.isRequired,
};
