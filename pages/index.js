import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Grid, GridItem } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import {
  ListItem, OrderedList
} from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';


export default function Home() {

  const [title, setTitle] = useState("");
  const [category, setCategoty] = useState("");
  const [submittedRequest, setSubmittedRequest] = useState(null);
  const [coursesList, setCoursesList] = useState([]);
  const [courseToDeleteId, setCourseToDeleteId] = useState(null);

    useEffect(() => {
      async function fetchCourses() {
        const response = await fetch(
          "https://openstudybrief.herokuapp.com/courses"
        );
      
        const data = await response.json();
        setCoursesList(data.payload);
      } fetchCourses();
    }, [coursesList] );

    useEffect(() => {
      if ( courseToDeleteId){
      async function deleteRequest() {
        
        const course_id = courseToDeleteId;
        const result = await fetch(`https://openstudybrief.herokuapp.com/courses/${course_id}`
         ,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }})
        const data = await result.json();
      } deleteRequest();
    }
    }, [courseToDeleteId])


    useEffect( () => {
      if (submittedRequest) {
        async function postRequest() {
    
          const result = await fetch("https://openstudybrief.herokuapp.com/courses", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: submittedRequest.title,
              category: submittedRequest.category,
            })
          })
          const data = await result.json();
          setSubmittedRequest(null)
  
        }
        postRequest();
      }
    }, [submittedRequest])


    function handleSubmit(e){
      e.preventDefault();

      setSubmittedRequest({title: title , category: category});
      console.log("Added", submittedRequest);
      setTitle("");
      setCategoty("")
    }
    function handleDelete(index, course_id){
      console.log("Why am i not showing");
      setCourseToDeleteId(course_id);
      setCoursesList([...coursesList.slice(0,index), ...coursesList.slice(index + 1)]);
      console.log("They are here", courseToDeleteId, coursesList);
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid
  templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
  gridTemplateRows={'50px 1fr 30px'}
  gridTemplateColumns={'150px 1fr'}
  h='200px'
  gap='1'
  color='blackAlpha.700'
  fontWeight='bold'
>
  <GridItem pl='2' bg='pink.300' area={'header'}>
    OPEN STUDY COLLEGE COURSES
  </GridItem>
  <GridItem pl='2' bg='pink.300' area={'nav'}>
    Open Study College

  </GridItem>
  <GridItem pl='2' bg='pink.200' area={'main'}>
    Couse Table
      <Box bg='#D4A6A0' w='600px' p={4} color='white'>
      <TableContainer>
  <Table size='sm'>
    <Thead>
      <Tr>
        <Th isNumeric>Course ID</Th>
        <Th>Course title</Th>
        <Th >Course category</Th>
      </Tr>
    </Thead>
    <Tbody>
    {coursesList.map((course, index)=> {return(
      <>
            <Tr>
              <Td isNumeric>{course.course_id}</Td>
              <Td>{course.title}</Td>
              <Td >{course.category}</Td>
              <Td><Button onClick={()=>{ handleDelete(index, course.course_id) }} colorScheme='red' >X</Button></Td>
            </Tr>
      </>
      )})}

    </Tbody>
  </Table>
</TableContainer>
<label>Course Title : </label>
<br/>
  <input type="text" name="title" required style={{margin: "10px", color: "black"}}
        onChange={(e) =>
          console.log("%cinput change event", "color:red") ||
          setTitle(e.target.value)
        }
        value={title}
        placeholder="title"
      />
      <br/>
      <label>Course Category : </label>
      <br/>
      <input type="text" name="category" required style={{margin: "10px", color: "black"}}
        onChange={(e) =>
          console.log("%cinput change event", "color:red") ||
          setCategoty(e.target.value)
        }
        value={category}
        placeholder="category"
      />
      <Button onClick={handleSubmit} colorScheme='blue'>Add Course</Button>
      </Box>
  </GridItem>
  <GridItem pl='2' bg='blue.300' area={'footer'}>
    Footer
  </GridItem>
</Grid>
    </div>
  )
}