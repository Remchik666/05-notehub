import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { FetchNotesResponse } from '../../types/note'
import { fetchNotes } from '../../services/noteService'
import SearchBox from '../SearchBox/SearchBox'
import NoteList from '../NoteList/NoteList'
import Pagination from '../Pagination/Pagination'
import Modal from '../Modal/Modal'
import NoteForm from '../NoteForm/NoteForm'
import css from './App.module.css'

export default function App() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, 12, search),
  })

  const totalPages = data?.totalPages || 0
  const notes = data?.notes || []

  const handleSearch = (q: string) => {
    setSearch(q)
    setPage(1)
  }

  const handlePageChange = (p: number) => setPage(p)

  const handleSuccess = () => {
    setIsOpen(false)
    queryClient.invalidateQueries({ queryKey: ['notes', page, search] })
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        <button onClick={() => setIsOpen(true)} className={css.createButton}>
          Create note
        </button>
      </header>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading notes.</p>
      ) : (
        <>
          <NoteList notes={notes} />
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onSuccess={handleSuccess} />
        </Modal>
      )}
    </div>
  )
}
