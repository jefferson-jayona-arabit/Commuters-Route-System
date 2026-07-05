import { useMemo, useState } from 'react'
import { PlusIcon } from './icons.jsx'
import UserFilters from './UserFilters.jsx'
import UserTable from './UserTable.jsx'
import Pagination from './Pagination.jsx'
import UserFormModal from './UserFormModal.jsx'
import UserViewModal from './UserViewModal.jsx'
import ConfirmDialog from './ConfirmDialog.jsx'
import { MOCK_USERS } from './mockUsers.js'
import '../../../styles/users.css'

const PAGE_SIZE = 5

function UsersPanel() {
  const [users, setUsers] = useState(MOCK_USERS)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)

  const [activeModal, setActiveModal] = useState(null) // 'add' | 'edit' | 'view' | 'delete' | null
  const [selectedUser, setSelectedUser] = useState(null)

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()

    return users.filter((user) => {
      const matchesSearch =
        query === '' ||
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      const matchesRole = roleFilter === 'all' || user.role === roleFilter
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, search, roleFilter, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  function openAddModal() {
    setSelectedUser(null)
    setActiveModal('add')
  }

  function openEditModal(user) {
    setSelectedUser(user)
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
    setActiveModal(null)
    setSelectedUser(null)
  }

  // UI-only handlers for now — backend wiring comes in a later phase.
  function handleAddSubmit(formValues) {
    const nextId = Math.max(0, ...users.map((user) => user.user_id)) + 1
    setUsers((current) => [
      ...current,
      {
        user_id: nextId,
        first_name: formValues.first_name,
        last_name: formValues.last_name,
        email: formValues.email,
        phone_number: formValues.phone_number,
        role: formValues.role,
        status: formValues.status,
        created_at: new Date().toISOString().slice(0, 10),
      },
    ])
    closeModal()
  }

  function handleEditSubmit(formValues) {
    setUsers((current) =>
      current.map((user) =>
        user.user_id === selectedUser.user_id
          ? {
              ...user,
              first_name: formValues.first_name,
              last_name: formValues.last_name,
              email: formValues.email,
              phone_number: formValues.phone_number,
              role: formValues.role,
              status: formValues.status,
            }
          : user
      )
    )
    closeModal()
  }

  function handleDeleteConfirm() {
    setUsers((current) => current.filter((user) => user.user_id !== selectedUser.user_id))
    closeModal()
  }

  return (
    <div className="users-panel">
      <div className="users-toolbar">
        <UserFilters
          search={search}
          onSearchChange={(value) => {
            setSearch(value)
            setPage(1)
          }}
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

      <UserTable
        users={paginatedUsers}
        onView={openViewModal}
        onEdit={openEditModal}
        onDelete={openDeleteConfirm}
      />

      {filteredUsers.length > 0 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          totalItems={filteredUsers.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      )}

      {activeModal === 'add' && (
        <UserFormModal mode="add" onSubmit={handleAddSubmit} onClose={closeModal} />
      )}

      {activeModal === 'edit' && selectedUser && (
        <UserFormModal
          mode="edit"
          initialValues={{
            first_name: selectedUser.first_name,
            last_name: selectedUser.last_name,
            email: selectedUser.email,
            phone_number: selectedUser.phone_number,
            role: selectedUser.role,
            status: selectedUser.status,
          }}
          onSubmit={handleEditSubmit}
          onClose={closeModal}
        />
      )}

      {activeModal === 'view' && selectedUser && (
        <UserViewModal user={selectedUser} onClose={closeModal} />
      )}

      {activeModal === 'delete' && selectedUser && (
        <ConfirmDialog
          title="Delete this user?"
          message={`This will remove ${selectedUser.first_name} ${selectedUser.last_name} from the users list. This action cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={handleDeleteConfirm}
          onCancel={closeModal}
        />
      )}
    </div>
  )
}

export default UsersPanel