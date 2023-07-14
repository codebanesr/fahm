import ApiKeyModal from '@/components/ui/create-api-key.modal';
import Header from '@/components/ui/header';
import { ApiKey } from '@/types/api-key';
import { performAPICall } from '@/utils/perform-api-call';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';

export default function ApiKeys() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [tableData, setTableData] = useState<ApiKey[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await performAPICall(`chat/keys/${email}`, 'GET');
        if (data) {
          console.log({ data });
          setTableData(data);
        }
      } catch (error) {
        console.error(error);
        // Handle the error or show an error message to the user
      }
    }

    fetchData();
  }, []);

  const onModalCancel = () => {
    setIsModalVisible(false);
  };

  async function switchApiState(row: ApiKey): Promise<void> {
    const updatedRow = { ...row, enabled: !row.enabled };
    await performAPICall(`chat/key/${row.key}`, 'PUT', updatedRow);

    // Update the state to reflect the changes
    setTableData((prevTableData) =>
      prevTableData.map((item) => (item.key === row.key ? updatedRow : item)),
    );
  }

  const email = useUser().user?.email;
  async function handleCreate(keyName: string): Promise<void> {
    const row = await performAPICall('chat/key', 'POST', {
      keyName,
      username: email,
    });
    if (row) {
      setTableData((prevTableData) => [...prevTableData, row]);
    }
  }

  return (
    <div>
      <Header />
      {isModalVisible && (
        <ApiKeyModal onSubmit={handleCreate} onCancel={onModalCancel} />
      )}
      <main className="flex flex-grow min-h-0 w-full overflow-auto">
        <div className="flex-grow w-full overflow-scroll">
          <div className="flex flex-col p-6 max-w-4xl mx-auto h-full">
            <div
              className="flex rounded-2xl bg-stone-100 border border-stone-200 py-6 px-6 mb-12 items-center"
              role="alert"
            >
              <div className="flex flex-col grow gap-4">
                <h2 className="flex flex-row text-2xl font-medium text-stone-700">
                  Ready to deploy?
                </h2>
                <div className="flex flex-col lg:flex-row lg:items-end gap-6">
                  <div className="flex flex-col grow gap-2">
                    <div className="flex w-full items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        className="h-5 w-auto text-stone-700 "
                        aria-hidden="true"
                      >
                        <path d="M207.06,80.67A111.24,111.24,0,0,0,128,48h-.4C66.07,48.21,16,99,16,161.13V184a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V160A111.25,111.25,0,0,0,207.06,80.67ZM224,184H119.71l54.76-75.3a8,8,0,0,0-12.94-9.42L99.92,184H32V161.13c0-3.08.15-6.12.43-9.13H56a8,8,0,0,0,0-16H35.27c10.32-38.86,44-68.24,84.73-71.66V88a8,8,0,0,0,16,0V64.33A96.14,96.14,0,0,1,221,136H200a8,8,0,0,0,0,16h23.67c.21,2.65.33,5.31.33,8Z"></path>
                      </svg>
                      <div className="ml-3 flex-1 flex items-center">
                        <p className="text-normal text-stone-700">
                          Increased rate limits to support production traffic
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        className="h-5 w-auto text-stone-700"
                        aria-hidden="true"
                      >
                        <path d="M103.77,185.94C103.38,187.49,93.63,224,40,224a8,8,0,0,1-8-8c0-53.63,36.51-63.38,38.06-63.77a8,8,0,0,1,3.88,15.53c-.9.25-22.42,6.54-25.56,39.86C81.7,204.48,88,183,88.26,182a8,8,0,0,1,15.51,4Zm93-67.4L192,123.31v58.33A15.91,15.91,0,0,1,187.32,193L153,227.3A15.91,15.91,0,0,1,141.7,232a16.11,16.11,0,0,1-5.1-.83,15.94,15.94,0,0,1-10.78-12.92l-5.37-38.49L76.24,135.55l-38.47-5.37A16,16,0,0,1,28.7,103L63,68.68A15.91,15.91,0,0,1,74.36,64h58.33l4.77-4.77c26.68-26.67,58.83-27.82,71.41-27.07a16,16,0,0,1,15,15C224.6,59.71,223.45,91.86,196.78,118.54ZM40,114.34l37.15,5.18L116.69,80H74.36ZM91.32,128,128,164.68l57.45-57.45a76.46,76.46,0,0,0,22.42-59.16,76.65,76.65,0,0,0-59.11,22.47ZM176,139.31l-39.53,39.53L141.67,216,176,181.64Z"></path>
                      </svg>
                      <div className="ml-3 flex-1 flex items-center">
                        <p className="text-normal text-stone-700">
                          Use Fahm in commercial applications
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full md:w-auto self-justify-end justify-end shrink-0">
                    <button className="inline-flex items-center justify-center gap-1 py-2 font-semibold md:font-medium rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none px-3 bg-blue-800 hover:bg-blue-900 disabled:bg-gray-500 text-white w-full md:w-auto">
                      Upgrade API Keys
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex flex-row justify-between items-center">
                <div className="py-4 font-medium text-stone-800 text-2xl">
                  API Keys
                </div>
                <div className="my-4 text-right">
                  <button
                    onClick={() => setIsModalVisible(true)}
                    className="inline-flex items-center justify-center gap-1 py-2 font-semibold md:font-medium rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none px-3 bg-uivory-300 ring-1 ring-inset ring-stone-200 hover:bg-white"
                  >
                    Create Key
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto sm:-mx-0">
                <table className="min-w-full divide-y divide-stone-300 border-b border-stone-200 whitespace-nowrap">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="text-left text-[.685rem] font-medium uppercase tracking-wider text-stone-500  py-3 pr-3 sm:pl-0"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-left text-[.685rem] font-medium uppercase tracking-wider text-stone-500  py-3 pr-3 sm:pl-0"
                      >
                        Key
                      </th>
                      <th
                        scope="col"
                        className="text-left text-[.685rem] font-medium uppercase tracking-wider text-stone-500  py-3 sm:table-cell"
                      >
                        Created at
                      </th>
                      <th
                        scope="col"
                        className="text-left text-[.685rem] font-medium uppercase tracking-wider text-stone-500 px-3 py-3 sm:table-cell"
                      >
                        Updated at
                      </th>
                      <th
                        scope="col"
                        className="text-right text-[.685rem] font-medium uppercase tracking-wider text-stone-500 pl-3 py-3 sm:table-cell"
                      >
                        Enabled
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {tableData.map((row, index) => (
                      <tr key={index}>
                        <td className="whitespace-normal overflow-x-auto overflow-hidden sm:overflow-visible w-full max-w-0 py-4 pl-6 pr-3 text-sm sm:w-auto sm:max-w-none sm:pl-0">
                          {row.key}
                        </td>
                        <td className="overflow-x-auto overflow-ellipsis whitespace-nowrap sm:overflow-visible sm:whitespace-normal w-full max-w-0 py-4 pl-6 pr-3 text-sm sm:w-auto sm:max-w-none sm:pl-0">
                          {row.apiKey}
                        </td>
                        <td className="overflow-x-auto overflow-ellipsis whitespace-nowrap sm:overflow-visible sm:whitespace-normal px-3 py-3 text-sm text-stone-500 lg:table-cell">
                          {row.startDate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-sm text-stone-500 lg:table-cell">
                          {row.endDate}
                        </td>
                        <td className="flex h-full items-center py-3 pr-6 sm:pr-0">
                          <div className="grow w-0 h-0"></div>
                          <div className="flex items-center">
                            <button
                              className="bg-stone-300 relative inline-flex h-6 w-11 items-center rounded-full"
                              id={`headlessui-switch-${index}`}
                              role="switch"
                              type="button"
                              tabIndex={0}
                              aria-checked={row.enabled}
                              data-headlessui-state=""
                              onClick={() => switchApiState(row)}
                            >
                              <span className="sr-only">Enable key</span>
                              <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
