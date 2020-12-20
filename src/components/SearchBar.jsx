import React, { useState, useContext } from 'react'
import { SocialMediaContext } from './Context'
import { useHistory } from 'react-router-dom'
import { Form } from 'react-bootstrap'
const SearchBar = React.forwardRef((props, ref) => {
  const [Search, setSearch] = useState({
    SearchInput: ''
  })
  let history = useHistory()
  const { SearchUserCALL } = useContext(SocialMediaContext)

  const onchangHandler = e => {
    setSearch({ SearchInput: e.target.value })
  }

  const handelSubmit = (e, typedName) => {
    e.preventDefault()
    SearchUserCALL(typedName)
    if (history.location.pathname !== '/search') {
      history.push('/search')
    }
  }

  return (
    <>
      <Form
        onSubmit={e => handelSubmit(e, Search.SearchInput)}
        onClick={e => handelSubmit(e, Search.SearchInput)}
      >
        <Form.Control
          type='text'
          placeholder='  Search...'
          onChange={e => onchangHandler(e)}
          value={Search.SearchInput}
          ref={ref}
        />
      </Form>
    </>
  )
})

export default SearchBar
