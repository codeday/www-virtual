import Box, { Grid } from '@codeday/topo/Atom/Box';
import Content from '@codeday/topo/Molecule/Content';
import Text, { Heading } from '@codeday/topo/Atom/Text';
import Image from '@codeday/topo/Atom/Image';
import { useSlideshow } from '../slideshow';

const SIZE = 'xs';

function Highlight({ children }) {
  return <Text as="span" bold color="purple.700">{children}</Text>;
}

export default function StudentQuotes({ query, ...props }) {
  const quotes = query?.cms?.testimonials?.items || [];
  const i = useSlideshow(quotes.length, 6000);

  if (quotes.length === 0) return <></>;

  return (
    <Content {...props}>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} alignItems="center" gap={8}>
        <Box textAlign="center">
          <Heading as="h3">
            <Highlight>50,000+ students</Highlight> have made <Highlight>more than 10,000 projects</Highlight>{' '}
            at CodeDays around the world.
          </Heading>
          <Text color="current.textLight" mt={4} mb={0}>Welcome to our friendly and creative community!</Text>
        </Box>

        <Box position="relative" height={SIZE} ml={-4}>
          {quotes.map((quote, j) => (
            <Grid
              position="absolute"
              top={0}
              templateColumns="1px 100%"
              alignItems="center"
              opacity={i === j ? 1 : 0}
              transition="all 0.5s ease-in-out"
            >
              <Box borderRightWidth={2} borderRightColor="purple.300" height={SIZE} />
              <Box pl={8}>
                <Text italic>{quote.quote}</Text>
                <Text mb={0} bold>
                  {quote.image && (
                    <Image src={quote.image.url} d="inline-block" mr={4} alt="" rounded="full" height={8} />
                  )}
                  {quote.firstName ? `${quote.firstName} ${quote.lastName || ''}` : 'Anonymous'},{' '}
                  {quote.experience?.toLowerCase() || 'beginner'} coder
                </Text>
              </Box>
            </Grid>
          ))}
        </Box>
      </Grid>
    </Content>
  )
}
