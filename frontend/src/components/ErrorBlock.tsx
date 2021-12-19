import { HiX } from "react-icons/hi";

interface IErrorBlockProps {
  message: string;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

const ErrorBlock = ({ message, setIsError }: IErrorBlockProps) => (
  <div className="block p-4 text-center rounded-md bg-red-500 bg-opacity-50 text-white font-bold">
    <HiX
      className="float-right cursor-pointer"
      onClick={() => setIsError(false)}
    />
    {message}
  </div>
);

export default ErrorBlock;
