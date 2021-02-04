
import Button from '@codeday/topo/Atom/Button';
import Box from '@codeday/topo/Atom/Box';
import { signIn } from "next-auth/client";
import useSwr from 'swr';
import fetch from 'node-fetch';

const fetcher = url => fetch(url).then(r => r.json())

export default function RegisterButton() {
  const { data } = useSwr('/api/registered', fetcher);

  const signedIn = Boolean(data?.signedIn);
  const name = data?.name;
  const registered = Boolean(data?.registered);

  if (!registered) return (
    <>
      <Button
        href={signedIn && '/registration/address'}
        as={signedIn && 'a'}
        onClick={!signedIn && (() =>
          signIn("auth0", {
            callbackUrl: "https://virtual.codeday.org/registration/address",
          }))
        }
        variant="solid"
        variantColor="purple"
        size="lg"
      >
        Register Now (Free!)
      </Button>
      <Box mt={2} mb={0} color="current.textLight">
        {signedIn
          ? `Signed in to CodeDay as ${name}`
          : `You'll need to create a CodeDay account.`}
      </Box>
    </>
  );

  return (
    <>
      <Button
        as="a"
        href="https://discord.gg/codeday"
        variant="solid"
        variantColor="purple"
        size="lg"
      >
        Join the CodeDay Discord
      </Button>
      <Box mt={2} mb={0} color="current.textLight">
        You've already registered, but you'll need to join the Discord to participate.
      </Box>
    </>
  );
}
