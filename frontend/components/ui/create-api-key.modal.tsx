// Modal.js
import { useState } from 'react';

interface Props {
  onSubmit: (keyName: string) => Promise<void>;
  onCancel: () => void;
}

export default function ApiKeyModal({ onSubmit, onCancel }: Props) {
  const [keyName, setKeyName] = useState('');

  const handleCreateKey = () => {
    onSubmit(keyName);
    setKeyName('');
  };

  const handleCancel = () => {
    setKeyName('');
    onCancel();
  };

  return (
    <div className="z-50 fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div
          className="w-full transform rounded-2xl p-6 text-left align-middle shadow-xl transition-all max-w-md bg-white opacity-100 scale-100"
          id="headlessui-dialog-panel-:rn:"
          data-headlessui-state="open"
        >
          <h3
            className="text-lg font-medium leading-6 text-stone-800 mb-1"
            id="headlessui-dialog-title-:ro:"
            data-headlessui-state="open"
          >
            Create Key
          </h3>
          <div className="max-h-[80vh] flex flex-col">
            <div className="w-full text-stone-500 sm:text-right pb-4">
              <div className="flex-grow">
                <div className="relative flex items-center">
                  <pre
                    aria-hidden="true"
                    className="box-border overflow-hidden whitespace-pre-wrap p-2 text-sm leading-5 font-sans"
                  ></pre>
                  <textarea
                    name=""
                    placeholder="shanur-rahman-secret-key"
                    className="box-border overflow-hidden whitespace-pre-wrap p-2 text-sm leading-5 font-sans text-stone-600 placeholder:text-stone-400 border-stone-200 border-[.1rem] w-full h-[2.5rem] absolute top-0 resize-none transition-colors transition-transform rounded focus:border-blue-500 focus:ring-blue-500 disabled:bg-stone-50"
                    tabIndex={0}
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="mt-4 gap-2 flex flex-row-reverse">
              <button
                className="inline-flex items-center justify-center gap-1 py-2 px-3 text-sm font-semibold md:font-medium rounded-lg transition-colors bg-uivory-300 ring-1 ring-inset ring-stone-200 hover:bg-white"
                onClick={handleCreateKey}
              >
                Create Key
              </button>
              <button
                className="inline-flex items-center justify-center gap-1 py-2 px-3 text-sm font-semibold md:font-medium rounded-lg transition-colors bg-uivory-300 ring-1 ring-inset ring-stone-200 hover:bg-white"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
