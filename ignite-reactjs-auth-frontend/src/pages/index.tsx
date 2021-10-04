import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { withSSRQuest } from "../utils/withSSRGuest";

import { Flex, Input, Button, Stack, FormLabel, FormControl } from "@chakra-ui/react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    await signIn(data);
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit}
      >
        <Stack spacing="4">
          <FormControl>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              focusBorderColor="pink.500"
              bgColor="gray.900"
              variant="filled"
              size="lg"
              _hover={{
                bgColor: "gray.900",
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              focusBorderColor="pink.500"
              bgColor="gray.900"
              variant="filled"
              size="lg"
              _hover={{
                bgColor: "gray.900",
              }}
            />
          </FormControl>
        </Stack>

        <Button type="submit" colorScheme="pink" mt="6" size="lg">
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRQuest(async (ctx) => {
  return {
    props: {},
  };
});
