export default function CenterText({ message }: { message: string }) {
  return (
    <div className="flex justify-center items-center h-64">
      <p className="text-lg text-center">{message}</p>
    </div>
  );
}
