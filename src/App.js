import { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {
  Box,
  Text,
  Textarea,
} from '@chakra-ui/react'
import _ from 'lodash'

import { list } from './list'

function App() {
  const [text, setText] = useState(list)
  const [search, setSearch] = useState('')
  const [res, setRes] = useState('')

  useEffect(() => {
    const rows = _.split(text, '\n')
    const obj = []
    _.each(rows, r => {
      const s = _.split(r, ',')
      obj.push({
        id: _.get(s, 0, ''),
        name: _.get(s, 1, ''),
      })
    })

    const searchSplited = _.map(_.split(search, ','), i => _.trim(i)).filter(i => !!i)
    const filtered = _.filter(obj, ({ name }) => {
      let contains = false
      
      _.each(searchSplited, searchItem => {
        if (_.includes(name, searchItem)) {
          contains = true
        }
      })
      
      return contains
    })

    console.log(filtered)

    setRes(_.map(filtered, ({ id }) => id).filter(i => !!i).join(', '))
  }, [text, search])

  return (
    <ChakraProvider>
      <Box p="2">
        <Box p="2">
          <Text fontSize="4xl" fontWeight="extrabold" color="primary">
            CSV filter
          </Text>
        </Box>
        <Box display='flex'>
          <Box flex="1" p="2">
            <Text fontSize="14" mb="1">
              CSV data
            </Text>
            <Textarea
              onChange={e => setText(e.target.value)}
              value={text}
              placeholder=''
              w="100%"
              minH="calc(100vh - 220px)"
            />
          </Box>
          <Box flex="1" p="2">
            <Box>
              <Text fontSize="14" mb="1">
                Searched
              </Text>
              <Textarea
                onChange={e => setSearch(e.target.value)}
                value={search}
                placeholder=''
                w="100%"
              />

            </Box>
            <Box>
              <Text fontSize="14" mb="1">
                Output
              </Text>
              <Textarea
                value={res}
                placeholder=''
                w="100%"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
