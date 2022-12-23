import { useState, useEffect } from 'react';
import {
  Stack,
  Text,
  Container,
  Box,
  Flex,
  Spacer,
  Center,
  Spinner,
  Heading,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { HiOutlineNewspaper } from 'react-icons/hi';
import { BsCalendarFill, BsPencilSquare } from 'react-icons/bs';
import { MdEditLocation } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';

export default function IndividualPaper() {
  const { id } = useParams();
  const [paper, setPaper] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('loggedin') !== 'true') {
      window.location.href = '/login';
    }
    fetch('http://localhost:3001/paper/getPaper/')
      .then(resp => resp.json())
      .then(resp => setPaper(resp.filter(paper => paper.id === parseInt(id))))
      .then(resp => console.log(resp))
      .catch(error => console.log(error));

    setIsLoading(false);
  }, []);
  console.log(paper);
  return (
    <Container maxW="container.md" as="section" justifyContent={'center'}>
      {isLoading ? (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color={'green.500'}
            size="xl"
          />
        </Center>
      ) : (
        <>
          <Stack rounded={'lg'} p={8} bg={'yellow.50'}>
            <Heading
              as={'h1'}
              align={'center'}
              fontSize={['4xl', '4xl', '6xl']}
              color={'yellow.500'}
            >
              {paper[0]?.paper_name}
            </Heading>

            <Flex
              gap={1}
              align={['flex-start', 'flex-start', 'center']}
              direction={['column', 'column', 'row']}
            >
              <FaUserCircle size={'20px'} color="gray.300" />
              <Text
                align={'center'}
                color={'gray.500'}
                fontSize={['md', 'md', 'lg']}
              >
                {paper[0]?.publishers_id}
              </Text>
              <Spacer />

              <MdEditLocation mt={2} size={'20px'} color="gray.300" />
              <Text
                align={'left'}
                color={'gray.500'}
                fontSize={['md', 'md', 'lg']}
              >
                {paper[0]?.publication_place}
              </Text>

              <Spacer />

              <BsCalendarFill mt={2} size={'20px'} color="gray.300" />
              <Text
                align={'left'}
                color={'gray.500'}
                fontSize={['md', 'md', 'lg']}
              >
                {paper[0]?.publication_date.split('T')[0]}
              </Text>
            </Flex>
            {/* <Flex gap={1} align={'center'}>
            <Spacer />

            <MdEditLocation mt={2} size={'20px'} color="gray.300" />
            <Text
              align={'left'}
              color={'gray.500'}
              fontSize={['md', 'md', 'lg']}
            >
              {paper[0]?.publication_place}
            </Text>
            <Spacer />
          </Flex> */}
          </Stack>
          <Stack mt={6}>
            <Text
              fontSize={['2xl', '2xl', '3xl']}
              letterSpacing="wide"
              justifyContent={'flex-end'}
              justifySelf={'flex'}
              sx={{
                textAlign: 'justify',
                textJustify: 'inter-word',
                hyphens: 'auto',
              }}
            >
              {paper[0]?.full_text}
            </Text>
          </Stack>
        </>
      )}
    </Container>
  );
}
