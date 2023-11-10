// Libraries
import React from "react";
// Atomic Components
import {
  Flex,
  IconButton,
  Spacer,
  Heading,
  useBreakpointValue,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";

// UI Components
import { useEffect } from 'react'
import { useBoolean } from '@chakra-ui/react'


// Utilities
import hrefs from "modules/layout/utilities/hrefs";

const Navigation = () => {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

    const [navScrolled, setNavScrolled] = useBoolean()

  const setScroll = () => {
    if (window.scrollY < 40) {
      setNavScrolled.off()
    } else if (window.scrollY >= 40) {
      setNavScrolled.on()
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', setScroll)
    return () => window.removeEventListener('scroll', setScroll)
  }, [])


  const isMobileNavigation = useBreakpointValue({ base: true, lg: false });


  if (!isMobileNavigation) {
    return (
      <Flex
        py="6"
        px="12"
        height="auto"
        bg={navScrolled ? "lau.black" : "transparent"}
        position="fixed"
        width="100%"
        zIndex="100"
        alignItems="center"
        justifyContent="space-between"
        transition="background .2s ease 0s, color .2s ease 0s, height .2s ease 0s"
        sx={{ "@media print": { display: "none" } }}
      >

        <Spacer />
        <IconButton
          visibility="hidden"
          mx="2"
          colorScheme="whiteAlpha"
          variant="ghost"
          aria-label="Search blog"
          icon={<SearchIcon />}
        />
        <BlogLink
          href={hrefs.recipes}
          navScrolled={navScrolled}
          linkText="Recipes"
          mx="6"
          size="md"
        />
        <BlogLink
          href={hrefs.collections}
          navScrolled={navScrolled}
          linkText="Collections"
          mx="6"
          size="md"
        />
        <BlogLink
          href={hrefs.family}
          navScrolled={navScrolled}
          linkText="Our Family"
          mx="6"
          size="md"
        />
        <BlogLink
          href={hrefs.masterclass}
          navScrolled={navScrolled}
          linkText="Join Masterclass"
          mx="6"
          size="md"
        />
        <Button
          variant="link"
          _hover={{ textDecoration: "none" }}
          onClick={onModalOpen}
        >
          <Heading color="lau.yellow" mx="6" size="md">
            Subscribe
          </Heading>
        </Button>

        <SubscribeModal isModalOpen={isModalOpen} onModalClose={onModalClose} />
      </Flex>
    );
  }

  return (
    <Flex
      p="6"
      height={navScrolled ? "80px" : undefined}
      bg={navScrolled ? "black" : "transparent"}
      position="fixed"
      width="100%"
      zIndex="100"
      alignItems="center"
      justifyContent="space-between"
      transition="background .2s ease 0s, color .2s ease 0s, height .2s ease 0s"
      sx={{ "@media print": { display: "none" } }}
    >

      <Spacer />
      <IconButton
        mx="2"
        onClick={onDrawerOpen}
        colorScheme="whiteAlpha"
        variant="ghost"
        aria-label="Search blog"
        icon={<HamburgerIcon boxSize="8" />}
      />

      <MobileDrawer
        hrefs={hrefs}
        onDrawerClose={onDrawerClose}
        isDrawerOpen={isDrawerOpen}
        onSubscribe={() => {
          onDrawerClose();
          onModalOpen();
        }}
      />
      <SubscribeModal isModalOpen={isModalOpen} onModalClose={onModalClose} />
    </Flex>
  );
};

export default Navigation;
