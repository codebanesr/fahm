import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

interface ApiKey {
  id: string;
  name: string;
  key: string;
}

export default function ApiKeys() {
  const [deleteKey, setDeleteKey] = useState(null);

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: '1', name: 'Default', key: 'default123' },
    { id: '2', name: 'Payments', key: 'payments456' },
  ]);

  const [newName, setNewName] = useState('');

  function handleDelete(id: string) {
    setApiKeys(apiKeys.filter((key) => key.id !== id));
  }

  function handleAddKey() {
    const newKey = {
      id: crypto.randomUUID(),
      name: newName,
      key: crypto.randomUUID(),
    };

    setApiKeys([...apiKeys, newKey]);
    setNewName('');
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {apiKeys.map((key) => (
          <li key={key.id} className="px-4 py-4 hover:bg-gray-50 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="truncate text-sm leading-5 font-medium text-gray-900 max-w-xs">
                {key.name}
              </div>
              <div className="text-sm leading-5 text-gray-500 flex-shrink-0">
                {key.key}...
              </div>
              <div className="text-sm leading-5 text-gray-500 flex-shrink-0 space-x-4">
                <button
                  onClick={() => setDeleteKey(key)}
                  className="text-gray-500 hover:text-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(key.key)}
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Copy
                </button>
              </div>
            </div>
          </li>
        ))}

        {deleteKey && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
              <p className="text-gray-800 mb-6">
                Are you sure you want to delete the key: {deleteKey.name}?
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    handleDelete(deleteKey.id);
                    setDeleteKey(null);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteKey(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md ml-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </ul>
      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <div className="flex">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter a name"
            className="form-input flex-1 block w-full rounded-md sm:text-sm sm:leading-5"
          />
          <button
            onClick={handleAddKey}
            disabled={!newName}
            className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
          >
            <AiOutlinePlus className="-ml-1 mr-2 h-5 w-5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
