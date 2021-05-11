import moment from 'moment';
import { print } from 'graphql';
import { apiFetch } from '@codeday/topo/utils';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Text, { Heading } from '@codeday/topo/Atom/Text';
import Image from '@codeday/topo/Atom/Image'
import Content from '@codeday/topo/Molecule/Content';
import Page from '../components/Page';
import { PostersQuery } from './posters.gql';
import Skelly from '@codeday/topo/Atom/Skelly'
import Poster from "../components/Poster";
export default function Home({ upcoming}) {
    if (!upcoming || upcoming.length === 0) {
        return (
            <Page title="Posters" slug="/posters">
                <Content>
                    <Text fontSize="xl">
                        There's no scheduled Virtual CodeDay. Check back later.
                    </Text>
                </Content>
            </Page>
        );
    }
    const programPosters = upcoming.program?.posters?.items || []
    const eventPosters = upcoming.posters?.items || []
    const allPosters = programPosters.concat(eventPosters)
    return (
        <Page title="Posters" slug="/posters">
            <Content>
                <Heading textAlign="center" fontSize="5xl" as="h1" mb={2}>
                    Posters - {upcoming.title}
                </Heading>
                <Text textAlign="center" fontSize="l">Want to share CodeDay with your friends, family, or school?
                    <br/>
                    Pick your favorite design from the gallery below and send it to them!
                </Text>
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} alignItems="center" gap={8} mb={12}>
                    {allPosters.map((poster) => {
                        return <Poster poster={poster}/>
                    })}
                </Grid>
            </Content>
        </Page>
    )
}

export async function getStaticProps() {
    const data = await apiFetch(print(PostersQuery), {
        endDate: (new Date(new Date().getTime())).toISOString(),
    });
    return {
        props: {
            upcoming: data?.cms?.events?.items[0] || null,
            query: data,
        },
        revalidate: 300,
    };
}
