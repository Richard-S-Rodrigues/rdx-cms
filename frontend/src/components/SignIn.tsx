const SignIn = () => (
  <div className="min-h-full flex items-center justify-center my-0 mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <main className="max-w-xl w-full p-5 space-y-8 ">
      <h1 className="h1">Login to RdxCMS</h1>
      <form>
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
            Log in
          </button>
          <small className="flex mt-5 text-sm">
            Forgot your password?
            <a href="/" className="text-green hover:text-darkerGreen ml-2">
              Reset password
            </a>
          </small>
          <small className="flex mt-5 text-sm">
            Not registered?
            <a href="/" className="text-green hover:text-darkerGreen ml-2">
              Sign up
            </a>
          </small>
        </div>
      </form>
    </main>
  </div>
);

export default SignIn;
