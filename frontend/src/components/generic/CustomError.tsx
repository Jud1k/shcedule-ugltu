export default function CustomError({ message }: { message: string | null }) {
  return (
    <div className="btn m-1 bg-base-100 border border-base-300 shadow-lg rounded-box">
      Ошибка: {message}
    </div>
  );
}
