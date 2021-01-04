import React, { useState, useContext } from 'react'
import { SocialMediaContext } from './Context'
import { Form } from 'react-bootstrap'
import SearchedPageBar from './SearchedPageBar'
const SearchBar = React.forwardRef((props, ref) => {
  const [Search, setSearch] = useState({
    SearchInput: ''
  })

  const { SearchUserCALL, setshowSearchMenu, showSearchMenu} = useContext(SocialMediaContext)

  const onchangHandler = e => {
    setSearch({ SearchInput: e.target.value })
  }

  const handelSubmit = (e, typedName) => {
    e.preventDefault()
    SearchUserCALL(typedName)
    setshowSearchMenu(true)
  }

  return (
    <>
      <Form
        onSubmit={e => handelSubmit(e, Search.SearchInput)}
        // onClick={e => handelSubmit(e, Search.SearchInput)}
      >
        <Form.Control
          type='text'
          placeholder='  Search...'
          onChange={e => onchangHandler(e)}
          value={Search.SearchInput}
          ref={ref}
        />
      </Form>
      {showSearchMenu && (
        <div className='searche-bar'>
          <SearchedPageBar closeBar={()=> setshowSearchMenu(false)}/>
        </div>
      )}
    </>
  )
})

export default SearchBar
