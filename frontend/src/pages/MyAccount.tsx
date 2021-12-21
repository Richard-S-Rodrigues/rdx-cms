import { GoGear } from "react-icons/go";
import { CgDanger } from "react-icons/cg";
import { FaTrashAlt } from "react-icons/fa";
import Header from "../components/Header";

const MyAccount = () => (
  <>
    <Header />
    <main className="m-4 block sm:w-4/5 sm:mx-auto">
      <h1 className="h1">
        My account
        <div className="bg-blue w-10 h-3 rounded-md" />
      </h1>
      <section className="mt-10">
        <form>
          <div className="sm:flex sm:justify-between">
            <label htmlFor="firstName">
              First name
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="input mb-4 sm:mb-0"
              />
            </label>
            <label htmlFor="lastName">
              Last name
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="input"
              />
            </label>
          </div>
          <table className="border rounded-md my-10 w-full">
            <thead>
              <tr className="flex border-b p-4 w-full">
                <th>Credentials</th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex border-b p-4">
                <td className="flex items-center justify-between w-full">
                  <div className="w-4/5">
                    <span className="text-gray-600">Email</span>
                    <br />
                    <span className="break-all">
                      richardsouzarodrigues555@gmail.com
                    </span>
                  </div>
                  <GoGear className="w-6 h-6 cursor-pointer" />
                </td>
              </tr>
              <tr className="flex border-b p-4">
                <td className="flex items-center justify-between w-full">
                  <div className="text-gray-600">Password</div>
                  <GoGear className="w-6 h-6 cursor-pointer" />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="btn w-full sm:w-40">
            Save updates
          </button>
        </form>
      </section>
      <section className="my-10">
        <table className="border border-red-600 rounded-md my-10 w-full">
          <thead>
            <tr className="flex border-b border-red-600 p-4">
              <th className="flex items-center text-red-600">
                <CgDanger className="mr-1" />
                Danger zone
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="flex p-4">
              <td className="block w-full sm:flex sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center">
                    <FaTrashAlt className="mr-1" />
                    Delete account
                  </div>
                  <p className="text-gray-500">
                    Once you delete this account, all your projects will be
                    removed
                  </p>
                </div>
                <button
                  type="button"
                  className="btn w-full border border-red-600 bg-transparent text-red-600 mt-4 hover:bg-red-600 hover:text-white sm:w-40 sm:mt-0"
                >
                  Delete account
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </>
);

export default MyAccount;
