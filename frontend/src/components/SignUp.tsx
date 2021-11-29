const SignUp = () => (
  <div className="min-h-full flex items-center justify-center my-0 mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <main className="max-w-xl w-full p-5 space-y-8 ">
      <h1 className="h1">Sign up for RdxCMS</h1>
      <form>
        <div className="block sm:flex sm:justify-between">
          <label htmlFor="firstName">
            First name
            <input type="text" id="firstName" className="input mb-4 sm:mb-0" />
          </label>
          <label htmlFor="lastName">
            Last name
            <input type="text" id="lastName" className="input" />
          </label>
        </div>
        <div>
          <div className="my-4">
            <label htmlFor="email">
              Email
              <input type="email" id="email" className="input" />
            </label>
          </div>
          <div className="my-4">
            <label htmlFor="password">
              Password
              <input type="password" id="password" className="input" />
            </label>
          </div>
          <button type="submit" className="btn w-full">
            Sign up
          </button>
          <small className="flex mt-5 text-sm">
            Already have an account?
            <a href="/" className="text-green hover:text-darkerGreen ml-2">
              Log in
            </a>
          </small>
        </div>
      </form>
    </main>
  </div>
);

export default SignUp;
