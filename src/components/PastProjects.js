import Box from '@codeday/topo/Atom/Box';
import BlobImage from './BlobImage';
import Text, { Link } from '@codeday/topo/Atom/Text';
import { useSlideshow } from '../slideshow';

export default function PastProjects({ query }) {
  const projects = (query?.showcase?.projects || []).filter((p) => p?.media[0]?.image || true);
  const i = useSlideshow(projects.length, 5000);

  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
    >
      {projects.map((p, j) => (
        <Box
          position={j === 0 ? undefined : 'absolute'}
          top={0}
          right={0}
          bottom={0}
          left={0}
          opacity={i === j ? 1 : 0}
          transition="all 1s ease-in-out"
          as="a"
          href={`https://showcase.codeday.org/project/${p.id}`}
          zIndex={i === j ? 500 : 400}
          target="_blank"
          rel="noopener"
        >
          <Text textAlign="center" color="current.textLight" bold fontSize="lg" mb={-1}>
            We'll help you make something like...
          </Text>
          <BlobImage
            src={p.media.sort((a, b) => (2 * ((b.type === 'IMAGE') - (a.type === 'IMAGE'))) - 1)[0].image}
            height={{ base: 64, md: 'md'}}
            maxWidth={{ base: 'lg', md: 'unset' }}
            margin="0 auto"
          />
          <Text mb={0} textAlign="center" fontSize="lg" bold>{p.name}</Text>
          {p.eventGroup && <Text textAlign="center" color="current.textLight" mb={0}>{p.eventGroup?.title}</Text>}
        </Box>
      ))}
    </Box>
  )
}
