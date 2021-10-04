import { useContext, useEffect } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../context/AuthContext";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

import { Flex, Text, Button, Stack, Box } from "@chakra-ui/react";

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex as="form" w="100%" maxWidth={360} bg="gray.800" p="8" borderRadius={8} flexDir="column">
        <Stack spacing="4">
          <Box>
            <Text fontSize="4xl">Dashboard</Text>
            <Text fontSize="lg" color="gray.500">
              {user?.email}
            </Text>
          </Box>

          <Text fontSize="lg" color="gray.500">
            <Can permissions={["metrics.list"]}>
              <Text fontSize="lg">📕 Possui métricas </Text>
            </Can>
          </Text>
        </Stack>

        <Button colorScheme="blue" mt="6" size="lg" onClick={signOut}>
          Sign Out
        </Button>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/me");

  console.log(response.data);

  return {
    props: {},
  };
});
