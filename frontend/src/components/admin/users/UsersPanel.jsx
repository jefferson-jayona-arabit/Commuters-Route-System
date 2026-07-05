import { useEffect, useState } from 'react'
import { PlusIcon } from './icons.jsx'
import UserFilters from './UserFilters.jsx'
import UserTable from './UserTable.jsx'
import Pagination from './Pagination.jsx'
import UserFormModal from './UserFormModal.jsx'
import UserViewModal from './UserViewModal.jsx'
import ConfirmDialog from './ConfirmDialog.jsx'
import { fetchUsers, createUser, updateUser, deleteUser } from '../../../services/userService.js'
import '../../../styles/users.css'

const PAGE_SIZE = 5
const SEARCH_DEBOUNCE_MS = 350

function UsersPanel() {
  const [users, setUsers] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)

  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  const [activeModal, setActiveModal] = useState(null) // 'add' | 'edit' | 'view' | 'delete' | null
  const [selectedUser, setSelectedUser] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState('')

  // Debounce the search box so we're not firing a request on every keystroke.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timeout)
  }, [search])

  async function loadUsers() {
    setIsLoading(true)
    setLoadError('')
    try {
      const result = await fetchUsers({
        search: debouncedSearch,
        role: roleFilter,
        status: statusFilter,
        page,
        size: PAGE_SIZE,
      })
      setUsers(result.items)
      setTotalItems(result.totalItems)
      setTotalPages(result.totalPages)
    } catch (error) {
      setLoadError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, roleFilter, statusFilter, page])

  function openAddModal() {
    setSelectedUser(null)
    setFormError('')
    setActiveModal('add')
  }

  function openEditModal(user) {
    setSelectedUser(user)
    setFormError('')
    setActiveModal('edit')
  }

  function openViewModal(user) {
    setSelectedUser(user)
    setActiveModal('view')
  }

  function openDeleteConfirm(user) {
    setSelectedUser(user)
    setActiveModal('delete')
  }

  function closeModal() {
    if (isSaving) return
    setActiveModal(null)
    setSelectedUser(null)
    setFormError('')
  }

  async function handleAddSubmit(formValues) {
    setIsSaving(true)
    setFormError('')
    try {
      await createUser(formValues)
      closeModal()
      setPage(1)
      await loadUsers()
    } catch (error) {
      setFormError(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleEditSubmit(formValues) {
    setIsSaving(true)
    setFormError('')
    try {
      await updateUser(selectedUser.user_id, formValues)
      closeModal()
      await loadUsers()
    } catch (error) {
      setFormError(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDeleteConfirm() {
    setIsSaving(true)
    try {
      await deleteUser(selectedUser.user_id)
      closeModal()
      await loadUsers()
    } catch (error) {
      setLoadError(error.message)
      closeModal()
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="users-panel">
      <div className="users-toolbar">
        <UserFilters
          search={search}
          onSearchChange={setSearch}
          roleFilter={roleFilter}
          onRoleChange={(value) => {
            setRoleFilter(value)
            setPage(1)
          }}
          statusFilter={statusFilter}
          onStatusChange={(value) => {
            setStatusFilter(value)
            setPage(1)
          }}
        />

        <button type="button" className="btn btn-primary" onClick={openAddModal}>
          <PlusIcon />
          Add User
        </button>
      </div>

      {loadError && <div className="users-error">{loadError}</div>}

      {isLoading ? (
        <div className="users-empty">
          <p>Loading users…</p>
        </div>
      ) : (
        <UserTable
          users={users}
          onView={openViewModal}
          onEdit={openEditModal}
          onDelete={openDeleteConfirm}
        />
      )}

      {!isLoading && totalItems > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      )}

      {activeModal === 'add' && (
        <UserFormModal
          mode="add"
          onSubmit={handleAddSubmit}
          onClose={closeModal}
          isSaving={isSaving}
          errorMessage={formError}
        />
      )}

      {activeModal === 'edit' && selectedUser && (
        <UserFormModal
          mode="edit"
          initialValues={{
            first_name: selectedUser.first_name,
            last_name: selectedUser.last_name,
            email: selectedUser.email,
            phone_number: selectedUser.phone_number,
            address: selectedUser.address,
            role: selectedUser.role,
            status: selectedUser.status,
          }}
          onSubmit={handleEditSubmit}
          onClose={closeModal}
          isSaving={isSaving}
          errorMessage={formError}
        />
      )}

      {activeModal === 'view' && selectedUser && (
        <UserViewModal user={selectedUser} onClose={closeModal} />
      )}

      {activeModal === 'delete' && selectedUser && (
        <ConfirmDialog
          title="Delete this user?"
          message={`This will permanently remove ${selectedUser.first_name} ${selectedUser.last_name} from the system.`}
          confirmLabel={isSaving ? 'Deleting…' : 'Delete'}
          onConfirm={handleDeleteConfirm}
          onCancel={closeModal}
        />
      )}
    </div>
  )
}

export default UsersPanel