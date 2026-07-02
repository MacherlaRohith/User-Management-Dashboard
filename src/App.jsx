import { useState, useMemo } from 'react';
import { Users, Plus } from 'lucide-react';
import useUsers from './hooks/useUsers';
import useSearch from './hooks/useSearch';
import useFilter from './hooks/useFilter';
import useSort from './hooks/useSort';
import usePagination from './hooks/usePagination';

import { Button, ConfirmDialog } from './components/common';
import SearchBar from './components/SearchBar/SearchBar';
import FilterPopup from './components/FilterPopup/FilterPopup';
import UserTable from './components/UserTable/UserTable';
import UserForm from './components/UserForm/UserForm';
import Pagination from './components/Pagination/Pagination';
import { useToast, ToastProvider } from './components/Toast/Toast';

import './App.css';

function Dashboard() {
  const { users, loading, error, addUser, updateUser, deleteUser, fetchUsers } = useUsers();
  const { searchTerm, inputValue, setInputValue, clearSearch } = useSearch();
  const { filters, applyFilters, clearFilters, activeFilterCount, filterData } = useFilter();
  const { sortColumn, sortDirection, handleSort, sortData } = useSort();
  
  const { addToast } = useToast();

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);

  // 1. Filter by search term across multiple fields
  const searchedData = useMemo(() => {
    if (!searchTerm.trim()) return users;
    const lowerQuery = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(lowerQuery) ||
        user.lastName.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery) ||
        user.department.toLowerCase().includes(lowerQuery)
    );
  }, [users, searchTerm]);

  // 2. Apply column filters
  const filteredData = filterData(searchedData);

  // 3. Sort data
  const sortedData = sortData(filteredData);

  // 4. Paginate data
  const {
    currentPage,
    pageSize,
    totalPages,
    startIndex,
    endIndex,
    setPage,
    setPageSize,
    hasNextPage,
    hasPrevPage,
  } = usePagination(sortedData.length);

  const paginatedData = sortedData.slice(startIndex, endIndex);

  // Handlers for Add/Edit Form
  const handleOpenAdd = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData);
        addToast({ type: 'success', title: 'User Updated', message: 'The user has been successfully updated.' });
      } else {
        await addUser(formData);
        addToast({ type: 'success', title: 'User Added', message: 'A new user has been successfully created.' });
      }
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: err.message || 'Failed to save user.' });
      throw err; // Rethrow to let the form know not to close on API error
    }
  };

  // Handlers for Delete Confirmation
  const handleOpenDelete = (user) => {
    setDeletingUser(user);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingUser) return;
    try {
      await deleteUser(deletingUser.id);
      addToast({ type: 'success', title: 'User Deleted', message: 'The user has been removed.' });
      setIsDeleteOpen(false);
      setDeletingUser(null);
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: err.message || 'Failed to delete user.' });
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="headerContent">
          <Users size={28} className="logo" />
          <h1 className="headerTitle">User Management</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        {/* Error State — top level API failure */}
        {error && (
          <div style={{ padding: '1rem', background: 'var(--color-error-bg)', color: 'var(--color-error)', borderRadius: 'var(--radius-md)' }}>
            <strong>Error loading users:</strong> {error}
            <Button variant="secondary" size="small" onClick={fetchUsers} style={{ marginLeft: '1rem' }}>Retry</Button>
          </div>
        )}

        {/* Toolbar */}
        <div className="toolbar">
          <div className="toolbarLeft">
            <SearchBar
              value={inputValue}
              onChange={setInputValue}
              onClear={clearSearch}
            />
            <FilterPopup
              filters={filters}
              activeFilterCount={activeFilterCount}
              onApply={applyFilters}
              onClear={clearFilters}
            />
          </div>
          <div className="toolbarRight">
            <Button onClick={handleOpenAdd}>
              <Plus size={18} />
              Add User
            </Button>
          </div>
        </div>

        {/* Table */}
        <UserTable
          users={paginatedData}
          loading={loading}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />

        {/* Pagination */}
        {!loading && sortedData.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={sortedData.length}
            startIndex={startIndex}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
        )}
      </main>

      {/* Modals */}
      <UserForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingUser}
      />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message={
          deletingUser
            ? `Are you sure you want to delete ${deletingUser.firstName} ${deletingUser.lastName}? This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        confirmVariant="danger"
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Dashboard />
    </ToastProvider>
  );
}
