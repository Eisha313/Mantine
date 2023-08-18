import { Input, Button, Container, Flex, Space } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";



const MantineSearchBar = () => {
    return (
      <>
        <Container mt={120}>
          <Flex direction={{ base: "column", sm: "row" }} gap="sm" align="center">
            <Input
              icon={<IconSearch size={18} />}
              placeholder="Search"
              radius="sm"
            />
          </Flex>
          <Space h="md" />
          {/* <Flex direction={{ base: "column", sm: "row" }} gap="sm" align="center">
            <Input
              icon={<IconSearch size={18} />}
              placeholder="Search"
              radius="xl"
            />
          </Flex> */}
          {/* <Space h="md" />
          <Flex direction={{ base: "column", sm: "row" }} gap="sm" align="center">
            <Input
              icon={<IconSearch size={18} />}
              placeholder="Search"
              radius="xl"
            />
            <Button size="xs" radius="xl">
              Search
            </Button>
          </Flex>
          <Space h="md" /> */}
        </Container>
      </>
    );
  };
  
  export default MantineSearchBar;