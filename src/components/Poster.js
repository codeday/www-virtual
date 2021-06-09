import React from 'react';
import Box from '@codeday/topo/Atom/Box';
import Skelly from '@codeday/topo/Atom/Skelly';
import Text from '@codeday/topo/Atom/Text';
import Slides from '@codeday/topo/Molecule/Slides';
import Button from '@codeday/topo/Atom/Button'

import Image from "@codeday/topo/Atom/Image";

export default function Poster({ poster, ...props }) {
    return (
        <Box as="a" bg="gray.100" borderRadius={10} download={"codeday_" + poster.fileName} href={poster.contentfulBaseUrl} {...props}>
            <Image key={poster.url} src={poster.url} borderRadius={10} fallback={<Skelly/>}/>
            </Box>
    )
}
