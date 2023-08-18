import { Flex, Text } from '@mantine/core'
import React from 'react'
import { Users } from 'tabler-icons-react'

const DashboardStat = ({ heading , count,icon}) => {

  





  
  return (
    
    <Flex justify={"space-between"}  style={{
        backgroundColor:"orange",
        padding:20,
        borderRadius: 10
      }}>
        <Flex
          direction={"column"}
          justify={'space-between'}
          style={{
            flex: 1,
          }}
        >
          <Text fz="lg" fw={600}>{heading}</Text>
          <Text>{count}</Text>
        </Flex>


       


          <Flex align={'center' } justify={'center'} style={{
            width:40,
            height:40,
            borderRadius:'50%',
            backgroundColor:"black"
          }}>
            {/* <Users strokeWidth={2} color="orange" size={20} /> */}
            {icon}
          </Flex>
      </Flex>







      





  )
}

export default DashboardStat