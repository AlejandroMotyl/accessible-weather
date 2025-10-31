interface ErorrMessageProps {
  error?: Error | null;
}

export default function ErrorMessage({ error }: ErorrMessageProps) {
  return (
    <p
      role="alert"
      aria-live="assertive"
      className="text-[16px] text-center max-w-[600px] my-[40px] mx-auto py-[12px] px-[16px] rounded-[6px] border text-[#d32f2f] bg-[#fdecea] border-[#f5c2c0]"
    >
      There was an error {error?.message && `(${error.message})`}, please try
      again...
    </p>
  );
}
