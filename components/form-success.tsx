import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="border-2 border-emerald-600/5 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-600">
      <CheckCircledIcon className="h-4 2-4" />
      <p className="font-bold">{message}</p>
    </div>
  );
};

export default FormSuccess;
