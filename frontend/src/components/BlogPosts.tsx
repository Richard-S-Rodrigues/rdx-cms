const BlogPosts = () => (
  <section className="overflow-x-auto">
    <table
      className="border rounded-md my-10 w-full"
      style={{ minWidth: "35em" }}
    >
      <thead>
        <tr className="flex justify-between border-b p-4 w-full">
          <th className="flex float-left w-full">
            <input type="checkbox" className="mr-1" />
            Name
          </th>
          <th className="flex float-left w-full">Updated</th>
          <th className="flex float-left w-full">Author</th>
          <th className="flex float-left w-full">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr className="flex justify-between items-center border-b p-4 w-full">
          <td className="flex float-left w-full">
            <input type="checkbox" className="mr-1" />
            Post 1
          </td>
          <td className="flex float-left w-full">Nov 3, 2021</td>
          <td className="flex float-left w-full">Richard Rodrigues</td>
          <td className="flex float-left w-full">
            <button
              type="button"
              className="btn bg-yellow-400 w-full hover:bg-yellow-400"
            >
              DRAFT
            </button>
          </td>
        </tr>
        <tr className="flex justify-between items-center border-b p-4 w-full">
          <td className="flex float-left w-full">
            <input type="checkbox" className="mr-1" />
            Post 2
          </td>
          <td className="flex float-left w-full">Nov 3, 2021</td>
          <td className="flex float-left w-full">Richard Rodrigues</td>
          <td className="flex float-left w-full">
            <button
              type="button"
              className="btn bg-darkerGreen w-full hover:bg-darkerGreen"
            >
              PUBLISHED
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
);

export default BlogPosts;
