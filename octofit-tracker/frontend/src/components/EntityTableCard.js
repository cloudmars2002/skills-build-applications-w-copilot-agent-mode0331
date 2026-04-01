import { useEffect, useMemo, useState } from 'react';

function EntityTableCard({
  title,
  description,
  endpoint,
  columns,
  rowKey,
  loadData,
  emptyMessage,
}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);

  const fetchRows = async () => {
    setLoading(true);
    setError('');

    try {
      const loadedRows = await loadData(endpoint);
      setRows(loadedRows);
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
    // endpoint/loadData are stable values created at module level in each page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return rows;
    }

    return rows.filter((row) =>
      columns.some((column) => {
        const value = column.render
          ? column.render(row)
          : row[column.field] ?? '';
        return String(value).toLowerCase().includes(normalizedQuery);
      })
    );
  }, [columns, query, rows]);

  return (
    <section className="card shadow-sm border-0 octo-card">
      <div className="card-body p-4">
        <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
          <div>
            <h2 className="h4 mb-1">{title}</h2>
            <p className="text-secondary mb-0">{description}</p>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <a className="link-primary fw-semibold" href={endpoint} target="_blank" rel="noreferrer">
              API Link
            </a>
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={fetchRows}>
              Refresh
            </button>
          </div>
        </div>

        <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-12 col-md-7 col-lg-5">
            <label htmlFor={`${title}-search`} className="form-label fw-semibold">
              Search
            </label>
            <input
              id={`${title}-search`}
              type="text"
              className="form-control"
              placeholder="Type to filter rows"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </form>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle mb-0 octo-table">
            <thead className="table-light">
              <tr>
                {columns.map((column) => (
                  <th key={column.header} scope="col">
                    {column.header}
                  </th>
                ))}
                <th scope="col" className="text-end">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading && filteredRows.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center text-secondary py-4">
                    {emptyMessage}
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center text-secondary py-4">
                    Loading...
                  </td>
                </tr>
              )}
              {!loading &&
                filteredRows.map((row) => (
                  <tr key={rowKey(row)}>
                    {columns.map((column) => (
                      <td key={column.header}>
                        {column.render ? column.render(row) : row[column.field]}
                      </td>
                    ))}
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={() => setSelectedRow(row)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRow && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">{title} Details</h3>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedRow(null)}
                  />
                </div>
                <div className="modal-body">
                  <div className="table-responsive">
                    <table className="table table-bordered mb-0">
                      <tbody>
                        {columns.map((column) => (
                          <tr key={column.header}>
                            <th className="w-25">{column.header}</th>
                            <td>{column.render ? column.render(selectedRow) : selectedRow[column.field]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedRow(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelectedRow(null)} />
        </>
      )}
    </section>
  );
}

export default EntityTableCard;
