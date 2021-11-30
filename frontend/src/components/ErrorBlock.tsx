import { HiX } from "react-icons/hi";

interface IMessage {
  message: string;
  // eslint-disable-next-line no-unused-vars
  setIsError: (argv: boolean) => void;
}

const ErrorBlock = ({ message, setIsError }: IMessage) => (
  <div className="block p-4 text-center rounded-md bg-red-500 bg-opacity-50 text-white font-bold">
    <HiX
      className="float-right cursor-pointer"
      onClick={() => setIsError(false)}
    />
    {message}
  </div>
);

export default ErrorBlock;
